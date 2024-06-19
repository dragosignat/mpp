import React from 'react';
import {LlamaIcon} from '@/components/LlamaChatBox/Icons';

interface LlamaMessageProps {
    message: string;
}

function LlamaMessage({message}: LlamaMessageProps) {
    return (
        <>
            <div className='flex items-start gap-3'>
                <LlamaIcon className='w-6 h-6' />
                <div className='bg-primary rounded-lg p-3 max-w-[75%] text-sm text-primary-foreground'>
                    <p>{message}</p>
                </div>
            </div>
        </>
    );
}

export default LlamaMessage;
