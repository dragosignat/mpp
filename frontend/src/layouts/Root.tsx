import Navbar from '@/components/Navbar';
import {Outlet, useNavigate} from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import {Toaster} from '@/components/ui/toaster';
import {useEffect} from 'react';
import useAuth from '@/hooks/auth';
import LlamaChatBox from '@/components/LlamaChatBox/LlamaChatBox';

function Root() {
    const isAuth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return (
        <html>
            <div className='margin-0 flex flex-col h-screen'>
                <div className=''>
                    <Navbar></Navbar>
                </div>
                <div className='grow flex flex-row'>
                    <Sidebar></Sidebar>
                    <main
                        id='detail'
                        className=' grow bg-zinc-50 dark:bg-pink-400 '
                    >
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
