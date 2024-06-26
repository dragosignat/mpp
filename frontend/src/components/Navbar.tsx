import {useEffect, useState} from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {Link} from 'react-router-dom';
import {API_URL} from '@/config/apiConfig';
import {useNavigate} from 'react-router-dom';
import {UserProfilePopup} from './UserProfilePopup';

function Navbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/u/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <header className='border-b-[2px] top-0 z-40 w-full'>
            <NavigationMenu className='mx-5'>
                <NavigationMenuList className='h-14 px-7 w-screen flex justify-between'>
                    <NavigationMenuItem className='flex items-center'>
                        <Link
                            to='/'
                            className='text-2xl font-bold hover:text-gray-700 cursor-pointer'
                        >
                            <div className='flex flex-row gap-1'>
                                <div>OpenInvoice</div>
                                <div className='text-sm italic drop-shadow-sm'>
                                    CRM
                                </div>
                            </div>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='flex gap-3 items-center'>
                        <UserProfilePopup username={username} />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

export default Navbar;
