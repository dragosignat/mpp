import React from 'react';
import Navbar from '@/components/Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import {Toaster} from '@/components/ui/toaster';
import {API_URL} from '@/config/apiConfig';
import {useToast} from '@/components/ui/use-toast';
import {useEffect} from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import {useDispatch} from 'react-redux';
import {loadClients} from '@/redux/clients/clientsSlice';
import {AppDispatch} from '@/redux/store';

function Root() {
    const {toast} = useToast();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            // If we can't connect to the API, show an error toast
            // if we can't reach the internet, the browser will show a different error
            try {
                await axios.get(`${API_URL}`);
            } catch (error) {
                // Handle API error here
                if (navigator.onLine === false) {
                    toast({
                        title: 'Network Error',
                        description: 'Could not connect to the internet.',
                        variant: 'destructive',
                    });
                    return;
                } else {
                    toast({
                        title: 'API Error',
                        description: 'Could not connect to the API server.',
                        variant: 'destructive',
                    });
                }
            }
        };

        fetchData();

        // Set up interval to call fetchData every 10 seconds
        const intervalId = setInterval(fetchData, 10000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const SOCKET_URL = 'ws://localhost:8080/apiv1/clients/watch';

    const {lastMessage} = useWebSocket(SOCKET_URL, {
        shouldReconnect: () => true,
        share: true,
    });

    useEffect(() => {
        if (lastMessage?.data === 'clients_updated') {
            dispatch(loadClients());
        }
    }, [lastMessage, dispatch]);

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
