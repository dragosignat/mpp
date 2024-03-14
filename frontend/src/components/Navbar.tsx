import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {Link} from 'react-router-dom';
import {FaRegUserCircle} from 'react-icons/fa';

function Navbar() {
    return (
        <header className=' border-b-[2px] top-0 z-40 w-full'>
            <NavigationMenu className='mx-5'>
                <NavigationMenuList className='h-14 px-7 w-screen flex justify-between'>
                    <NavigationMenuItem className='flex items-center'>
                        <Link
                            to='/'
                            className='text-2xl font-bold hover:text-gray-700 cursor-pointer'
                        >
                            OpenInvoce
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='flex gap-3 items-center'>
                        <span className='font-semibold'>John Doe</span>
                        <FaRegUserCircle className='text-3xl' />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

export default Navbar;
