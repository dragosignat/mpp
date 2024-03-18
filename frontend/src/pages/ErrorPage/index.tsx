import Navbar from '@/components/Navbar';
import React from 'react';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {Home} from 'lucide-react';

function ErrorPage() {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' container flex flex-col space-y-2 justify-center'>
                <h1 className=' text-5xl justify-center flex font-bold p-5 '>
                    404 Not Found
                </h1>
                <div className='flex justify-center'>
                    <Button className='  ' variant='outline'>
                        <Link to='/' className='flex items-center space-x-4 '>
                            <Home />
                            <span>Go to the Dashboard</span>
                        </Link>
                    </Button>
                </div>
                <div className=' flex justify-center p-5 '>
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
