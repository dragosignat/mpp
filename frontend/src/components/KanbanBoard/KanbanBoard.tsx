import React, {useState, DragEvent, FormEvent} from 'react';
import {FiPlus, FiTrash} from 'react-icons/fi';
import {motion} from 'framer-motion';
import {FaFire} from 'react-icons/fa';
import {KanbanTask, KanbanTaskCreate} from '@/types/KanbanTask';
import {useQuery} from '@tanstack/react-query';
import axiosInstance from '@/config/axiosConfig';
import {useQueryClient, useMutation} from '@tanstack/react-query';

export const CustomKanban = () => {
    return (
        <div className='h-full'>
            <Header />
            <div className='bg-white rounded-lg shadow-lg m-4 '>
                <Board />
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <h1 className='text-3xl font-bold text-center py-6'>
            Your projects are your{' '}
            <span className='italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
                future
            </span>
            .
        </h1>
    );
};

const Board = () => {
    const {
        status,
        data: cards,
        error,
    } = useQuery({
        queryKey: ['kanban-tasks'],
        queryFn: () => axiosInstance.get('/kanban').then((res) => res.data),
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error.message}</div>;

    return (
        <div className='flex h-full w-full gap-3 justify-evenly p-12'>
            <Column
                title='Backlog'
                column='backlog'
                headingColor='text-gray-600'
                cards={cards}
            />
            <Column
                title='TODO'
                column='todo'
                headingColor='text-yellow-600'
                cards={cards}
            />
            <Column
                title='In progress'
                column='doing'
                headingColor='text-blue-600'
                cards={cards}
            />
            <Column
                title='Complete'
                column='done'
                headingColor='text-green-600'
                cards={cards}
            />
            <BurnBarrel />
        </div>
    );
};

type ColumnProps = {
    title: string;
    headingColor: string;
    cards: KanbanTask[];
    column: ColumnType;
};

const Column = ({title, headingColor, cards, column}: ColumnProps) => {
    const [active, setActive] = useState(false);

    const queryClient = useQueryClient();
    const updateCardMutation = useMutation({
        mutationFn: (updatedCard: KanbanTask) =>
            axiosInstance.put(`/kanban/${updatedCard.id}`, updatedCard),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['kanban-tasks']});
        },
    });

    const handleDragStart = (e: DragEvent, card: KanbanTask) => {
        e.dataTransfer.setData('cardId', card.id.toString());
    };

    const handleDragEnd = (e: DragEvent) => {
        const cardId = parseInt(e.dataTransfer.getData('cardId'), 10);

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const {element} = getNearestIndicator(e, indicators);

        const before = element.dataset.before || '-1';

        if (before !== cardId.toString()) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = {...cardToTransfer, column_type: column};

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === '-1';

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex(
                    (el) => el.id === parseInt(before, 10),
                );
                if (insertAtIndex === -1) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            updateCardMutation.mutate(cardToTransfer);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = '0';
        });
    };

    const highlightIndicator = (e: DragEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = '1';
    };

    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child};
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            },
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(
            document.querySelectorAll(
                `[data-column="${column}"]`,
            ) as unknown as HTMLElement[],
        );
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column_type === column);

    return (
        <div className='w-56 shrink-0'>
            <div className='mb-3 flex items-center justify-between'>
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className='rounded text-sm text-gray-500'>
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${
                    active ? 'bg-gray-100' : 'bg-transparent'
                }`}
            >
                {filteredCards.map((c) => {
                    return (
                        <Card
                            key={c.id}
                            {...c}
                            handleDragStart={handleDragStart}
                        />
                    );
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} />
            </div>
        </div>
    );
};

type CardProps = KanbanTask & {
    handleDragStart: Function;
};

const Card = ({title, id, column_type, handleDragStart}: CardProps) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column_type} />
            <motion.div
                layout
                layoutId={id.toString()}
                draggable='true'
                onDragStart={(e) =>
                    handleDragStart(e, {title, id, column_type})
                }
                className='cursor-grab rounded border border-gray-300 bg-white p-3 shadow-sm active:cursor-grabbing'
            >
                <p className='text-sm text-gray-800'>{title}</p>
            </motion.div>
        </>
    );
};

type DropIndicatorProps = {
    beforeId: number | null;
    column: string;
};

const DropIndicator = ({beforeId, column}: DropIndicatorProps) => {
    return (
        <div
            data-before={beforeId || '-1'}
            data-column={column}
            className='my-0.5 h-0.5 w-full bg-blue-400 opacity-0'
        />
    );
};

const BurnBarrel = () => {
    const [active, setActive] = useState(false);

    const queryClient = useQueryClient();
    const deleteCardMutation = useMutation({
        mutationFn: (cardId: number) =>
            axiosInstance.delete(`/kanban/${cardId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['kanban-tasks']});
        },
    });

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: DragEvent) => {
        const cardId = parseInt(e.dataTransfer.getData('cardId'), 10);

        deleteCardMutation.mutate(cardId);

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active
                    ? 'border-red-500 bg-red-100 text-red-500'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
            }`}
        >
            {active ? <FaFire className='animate-bounce' /> : <FiTrash />}
        </div>
    );
};

type AddCardProps = {
    column: ColumnType;
};

const AddCard = ({column}: AddCardProps) => {
    const [text, setText] = useState('');
    const [adding, setAdding] = useState(false);

    const queryClient = useQueryClient();
    const addCardMutation = useMutation({
        mutationFn: (newCard: Omit<KanbanTask, 'id'>) =>
            axiosInstance.post('/kanban', newCard),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['kanban-tasks']});
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const cardTask: KanbanTaskCreate = {
            title: text.trim(),
            column_type: column,
        };

        addCardMutation.mutate(cardTask);

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder='Add new task...'
                        className='w-full rounded border border-blue-400 bg-blue-50 p-3 text-sm text-gray-800 placeholder-blue-300 focus:outline-0'
                    />
                    <div className='mt-1.5 flex items-center justify-end gap-1.5'>
                        <button
                            onClick={() => setAdding(false)}
                            className='px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-gray-800'
                        >
                            Close
                        </button>
                        <button
                            type='submit'
                            className='flex items-center gap-1.5 rounded bg-blue-500 px-3 py-1.5 text-xs text-white transition-colors hover:bg-blue-600'
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className='flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-gray-800'
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
};

type ColumnType = 'backlog' | 'todo' | 'doing' | 'done';
