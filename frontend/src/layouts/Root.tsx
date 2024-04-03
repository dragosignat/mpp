import React from 'react';
import Navbar from '@/components/Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import {Toaster} from '@/components/ui/toaster';
import {API_URL} from '@/config/apiConfig';
import {useToast} from '@/components/ui/use-toast';
import {useEffect} from 'react';
import axios from 'axios';

function Root() {
    const {toast} = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${API_URL}`);
            } catch (error) {
                // Handle API error here
                toast({
                    title: 'API Error',
                    description: 'Could not connect to the API server.',
                    variant: 'destructive',
                });
            }
        };

        // Call fetchData initially
        fetchData();

        // Set up interval to call fetchData every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

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
