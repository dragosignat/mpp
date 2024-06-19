import React from 'react';
import {User} from 'lucide-react';

interface UserMessageProps {
    message: string;
}

function UserMessage({message}: UserMessageProps) {
    return (
        <>
            <div className='flex items-start gap-3 justify-end'>
                <div className='bg-muted rounded-lg p-3 max-w-[75%] text-sm'>
                    <p>{message}</p>
                </div>
                <User className='w-6 h-6' />
            </div>
        </>
    );
}

export default UserMessage;
