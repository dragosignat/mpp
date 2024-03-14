import Navbar from '@/components/Navbar';
import React from 'react';

function ErrorPage() {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' container '>
                <h1 className=' text-5xl justify-center flex font-bold p-5 '>
                    404 Not Found
                </h1>
                <div className=' flex justify-center '>
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/dQw4w9WgXcQ?si=xaLTYbu1yfO4LZk8'
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
