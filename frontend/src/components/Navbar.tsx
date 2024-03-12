import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

function Navbar() {
    return (
        <header className=' border-b-[2px] top-0 z-40 w-full'>
            <NavigationMenu className='mx-auto'>
                <NavigationMenuList className='container h-14 px-7 w-screen flex justify-between'>
                    <NavigationMenuItem>
                        <a className='text-2xl font-bold hover:text-gray-700 cursor-pointer '>
                            OpenInvoce
                        </a>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='flex gap-3'>
                        <a
                            href='/'
                            className='hover:text-gray-700 cursor-pointer '
                        >
                            Clients
                        </a>
                        <a
                            href='/'
                            className='hover:text-gray-700 cursor-pointer '
                        >
                            Invoices
                        </a>
                        <a
                            href='/'
                            className='hover:text-gray-700 cursor-pointer '
                        >
                            Purchases
                        </a>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

export default Navbar;
