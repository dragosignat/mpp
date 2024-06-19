import React from 'react';

function LoadingMessage() {
    return (
        <div className='flex items-center space-x-2'>
            <div className='h-2 w-2 rounded-full bg-secondary animate-fade-in-out animate-bounce animate-[bounce_1s_ease-in-out_infinite]' />
            <div className='h-2 w-2 rounded-full bg-secondary animate-fade-in-out animate-bounce animate-[bounce_1s_ease-in-out_infinite_0.1s]' />
            <div className='h-2 w-2 rounded-full bg-secondary animate-fade-in-out animate-bounce animate-[bounce_1s_ease-in-out_infinite_0.2s]' />
        </div>
    );
}

export default LoadingMessage;
