import React from 'react';
import Navbar from '@/components/Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

function Root() {
    return (
        <>
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
        </>
    );
}

export default Root;
