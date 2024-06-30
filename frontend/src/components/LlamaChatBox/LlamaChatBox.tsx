import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {LlamaIcon, SendIcon, XIcon} from '@/components/LlamaChatBox/Icons';
import LlamaMessage from './LlamaMessage';
import UserMessage from './UserMessage';
import LoadingMessage from './LoadingMessage';
import {RemoteRunnable} from '@langchain/core/runnables/remote';
import {AI_API_URL} from '@/config/apiConfig';

export default function LlamaChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [userMesage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            message: 'Hello! How can I help you today?',
            isLlama: true,
        },
    ]);

    const remoteChain = new RemoteRunnable({
        url: `${AI_API_URL}/copilot`,
    });

    async function sendMessage() {
        const trimmedMessage = userMesage.trim();
        if (!trimmedMessage) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: prevMessages.length + 1,
                message: trimmedMessage,
                isLlama: false,
            },
        ]);

        setUserMessage('');
        setIsLoading(true);

        const result: any = await remoteChain.invoke({
            question: userMesage,
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: prevMessages.length + 1,
                message: result.content,
                isLlama: true,
            },
        ]);

        setIsLoading(false);
    }

    function populateMessages() {
        return messages.map((message) => {
            if (message.isLlama) {
                return (
                    <LlamaMessage key={message.id} message={message.message} />
                );
            } else {
                return (
                    <UserMessage key={message.id} message={message.message} />
                );
            }
        });
    }

    return (
        <div className='fixed bottom-4 right-4 z-50'>
            <div
                className={`flex flex-col w-full max-w-md mx-auto bg-background rounded-2xl shadow-lg overflow-hidden ${
                    isOpen ? '' : 'hidden'
                }`}
            >
                {isOpen ? (
                    <>
                        <header className='flex items-center justify-between gap-3 bg-card p-4 border-b border-border'>
                            <div className='flex items-center gap-3'>
                                <LlamaIcon className='w-8 h-8' />
                                <div className='text-sm font-medium'>
                                    LLama Smart Assistant™
                                </div>
                            </div>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='rounded-full'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <XIcon className='w-5 h-5' />
                                <span className='sr-only'>Close</span>
                            </Button>
                        </header>
                        <div className='flex-1 overflow-auto p-4 space-y-4'>
                            {populateMessages()}
                            {isLoading ? (
                                <LlamaMessage message={<LoadingMessage />} />
                            ) : null}
                        </div>
                        <div className='bg-card border-t border-border p-2 flex items-center gap-2'>
                            <Textarea
                                placeholder='Type your message...'
                                className='flex-1 resize-none rounded-lg p-2 text-sm'
                                value={userMesage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDownCapture={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage();
                                    }
                                }}
                            />
                            <Button
                                variant='ghost'
                                size='icon'
                                className='rounded-full'
                                onClick={sendMessage}
                            >
                                <SendIcon className='w-5 h-5' />
                                <span className='sr-only'>Send</span>
                            </Button>
                        </div>
                    </>
                ) : null}
            </div>
            {!isOpen && (
                <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full p-2 m-2'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <LlamaIcon className='w-8 h-8' />
                    <span className='sr-only'>Maximize</span>
                </Button>
            )}
        </div>
    );
}
