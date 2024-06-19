import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {LlamaIcon, SendIcon, XIcon} from '@/components/LlamaChatBox/Icons';
import LlamaMessage from './LlamaMessage';
import UserMessage from './UserMessage';

export default function LlamaChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [userMesage, setUserMessage] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            message: 'Hello! How can I help you today?',
            isLlama: true,
        },
        {
            id: 2,
            message: 'I need help with my account.',
            isLlama: false,
        },
    ]);

    function sendMessage() {
        // Send the message to the server
        // get the message from the textarea
        let newMessage = {
            id: messages.length + 1,
            message: userMesage,
            isLlama: false,
        };
        setUserMessage('');
        setMessages([...messages, newMessage]);
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
                        </div>
                        <div className='bg-card border-t border-border p-2 flex items-center gap-2'>
                            <Textarea
                                placeholder='Type your message...'
                                className='flex-1 resize-none rounded-lg p-2 text-sm'
                                value={userMesage}
                                onChange={(e) => setUserMessage(e.target.value)}
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
                    <LlamaIcon className='w-5 h-5' />
                    <span className='sr-only'>Maximize</span>
                </Button>
            )}
        </div>
    );
}
