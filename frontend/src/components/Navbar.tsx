import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

function Navbar() {
    return (
        <header className=' border-b-[1px] top-0 z-40 w-full'>
            <NavigationMenu className='mx-auto'>
                <NavigationMenuList className='container h-10 px-5 w-screen flex justify-between'>
                    <NavigationMenuItem>
                        <span className=' text-2xl font-bold drop-shadow-2xl shadow-black '>
                            <a>OpenInvoce</a>
                        </span>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='flex gap-2'>
                        <a href='/'>Clients</a>
                        <a href='/'>Invoices</a>
                        <a href='/'>Purchases</a>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

export default Navbar;
