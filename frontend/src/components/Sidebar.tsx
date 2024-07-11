import {NavLink} from 'react-router-dom';
import {Users, Settings, Home, FolderKanban, Percent} from 'lucide-react';

function Sidebar() {
    return (
        <>
            <aside className='flex flex-col border-r-[2px] justify-between w-40'>
                <ul>
                    <li className='group'>
                        <NavLink
                            className='flex items-center p-5 m-2 space-x-4 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
                            to='/'
                        >
                            <Home className='h-5 w-5 text-gray-500 dark:text-gray-400 ' />
                            <span className='text-sm font-medium'>
                                Dashboard
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='flex items-center p-5 m-2 space-x-4 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
                            to='/people'
                        >
                            <Users className='h-6 w-5 text-gray-500 dark:text-gray-400' />
                            <span className='text-sm font-medium'>People</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='flex items-center p-5 m-2 space-x-4 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 '
                            to='/campaign'
                        >
                            <div>
                                <Percent className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            </div>
                            <span className='text-sm font-medium'>
                                Campaigns
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='flex items-center p-5 m-2 space-x-4 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 '
                            to='/kanban'
                        >
                            <div>
                                <FolderKanban className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                            </div>
                            <span className='text-sm font-medium'>Kanban</span>
                        </NavLink>
                    </li>
                </ul>

                <div className='flex flex-col'>
                    <NavLink
                        className='flex items-center p-5 m-2 space-x-4 hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 '
                        to='/settings'
                    >
                        <Settings className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                        <span className='text-sm font-medium'>Settings</span>
                    </NavLink>
                    <div className='justify-center m-2'></div>
                    <div className=' text-sm text-gray-200 px-2 '>v0.0.3</div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
