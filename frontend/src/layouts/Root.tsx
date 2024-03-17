import React from 'react';
import Navbar from '@/components/Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import {Toaster} from '@/components/ui/toaster';

function Root() {
    return (
        <html>
            <div className='margin-0 flex flex-col h-screen'>
                <div className=''>
                    <Navbar></Navbar>
                </div>
                <div className='grow flex flex-row'>
                    <Sidebar></Sidebar>
                    <main id='detail' className=' grow '>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Toaster />
        </html>
    );
}

export default Root;
