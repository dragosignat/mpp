import {CustomKanban} from '@/components/KanbanBoard/KanbanBoard';

function KanbanDashboard() {
    return (
        <>
            <div className='relative h-full w-full'>
                <div className='absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] z-0'></div>
                <div className='relative z-10'>
                    <CustomKanban />
                </div>
            </div>
        </>
    );
}

export default KanbanDashboard;
