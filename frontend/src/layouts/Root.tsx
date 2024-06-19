import Navbar from '@/components/Navbar';
import {Outlet, useNavigate} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import {Toaster} from '@/components/ui/toaster';
import {API_URL} from '@/config/apiConfig';
import {useToast} from '@/components/ui/use-toast';
import {useEffect} from 'react';
import axios from 'axios';
import useAuth from '@/hooks/auth';
import axiosInstance from '@/config/axiosConfig';
import LlamaChatBox from '@/components/LlamaChatBox/LlamaChatBox';

function Root() {
    const {toast} = useToast();

    const isAuth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await axios.get(`${API_URL}`);

    //             // If local storage has any failed requests, retry them
    //             for (let i = 0; i < localStorage.length; i++) {
    //                 const key = localStorage.key(i);
    //                 if (key && key.startsWith(API_URL)) {
    //                     const {method, body} = JSON.parse(
    //                         localStorage.getItem(key) || '{}',
    //                     );
    //                     try {
    //                         await axiosInstance(key, {method, data: body});
    //                     } catch (error) {
    //                         // Handle API error here
    //                         toast({
    //                             title: 'API Error',
    //                             description:
    //                                 'Could not perform the backlogged request.',
    //                             variant: 'destructive',
    //                         });
    //                     }
    //                     localStorage.removeItem(key);
    //                 }
    //             }
    //         } catch (error) {
    //             // Handle API error here
    //             toast({
    //                 title: 'API Error',
    //                 description: 'Could not connect to the API server.',
    //                 variant: 'destructive',
    //             });
    //         }
    //     };

    //     fetchData();
    //     const intervalId = setInterval(fetchData, 5000);
    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        <html>
            <div className='margin-0 flex flex-col h-screen'>
                <div className=''>
                    <Navbar></Navbar>
                </div>
                <div className='grow flex flex-row'>
                    <Sidebar></Sidebar>
                    <main id='detail' className=' grow bg-slate-50 '>
                        <Outlet />
                    </main>
                </div>
            </div>
            <div className='fixed bottom-4 right-4 w-full max-w-md z-50'>
                <LlamaChatBox />
            </div>
            <Toaster />
        </html>
    );
}

export default Root;
