import React from 'react';
import {Link} from 'react-router-dom';
import {
    UsersIcon,
    ShoppingCartIcon,
    SettingsIcon,
    HomeIcon,
} from '@/assets/svgs';

function Sidebar() {
    return (
        <>
            <aside className='flex flex-col border-r-[2px] justify-between w-40'>
                <ul>
                    <li className='flex items-center p-5 m-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-lg'>
                        <Link className='flex items-center space-x-4' to='/'>
                            <HomeIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            <span className='text-sm font-medium'>
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li className='flex items-center p-5 m-2 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'>
                        <Link
                            className='flex items-center space-x-4'
                            to='/clients'
                        >
                            <UsersIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            <span className='text-sm font-medium'>Clients</span>
                        </Link>
                    </li>
                    <li className='flex items-center p-5 m-2 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'>
                        <Link className='flex items-center space-x-4' to='/'>
                            <ShoppingCartIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            <span className='text-sm font-medium'>Orders</span>
                        </Link>
                    </li>
                    <li className='flex items-center p-5 m-2 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'>
                        <Link className='flex items-center space-x-4' to='/'>
                            <SettingsIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            <span className='text-sm font-medium'>
                                Settings
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className='flex flex-col'>
                    <div className='justify-center m-2'></div>
                    <div className=' text-sm text-gray-200 px-2 '>v0.0.1</div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
