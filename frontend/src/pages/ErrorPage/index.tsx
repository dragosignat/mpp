import Navbar from '@/components/Navbar';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {Home} from 'lucide-react';
import NotFoundImg from '@/assets/NotFoundImg';

function ErrorPage() {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' container flex flex-col space-y-2 justify-center'>
                <h1 className=' text-5xl justify-center flex font-bold p-5 '>
                    404 Not Found
                </h1>
                <div className='flex justify-center'>
                    <Button className='  ' variant='outline'>
                        <Link to='/' className='flex items-center space-x-4 '>
                            <Home />
                            <span>Go to the Dashboard</span>
                        </Link>
                    </Button>
                </div>
                <div className=' flex justify-center p-5 '>
                    <NotFoundImg />
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
