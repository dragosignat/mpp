import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Link, useNavigate} from 'react-router-dom';
import {API_URL} from '@/config/apiConfig';
import LoginCatSVG from '@/assets/login_cat';

export function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_URL}/u/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });

            if (!response.ok) {
                throw new Error('Failed to create account');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className='flex h-screen w-screen'>
            <div className='flex items-center justify-center w-full lg:w-1/2'>
                <form
                    className='mx-auto grid w-[350px] gap-6'
                    onSubmit={handleSignup}
                >
                    <div className='grid gap-2 text-center'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                        <p className='text-balance text-muted-foreground'>
                            Enter your details below to create a new account
                        </p>
                    </div>
                    {error && (
                        <p className='text-red-500 text-center'>{error}</p>
                    )}
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                id='username'
                                type='text'
                                placeholder='Your username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='email@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type='submit' className='w-full'>
                            Sign Up
                        </Button>
                        <Button variant='outline' className='w-full'>
                            {/* Google icon */}
                            <div className=' flex flex-col '>
                                Sign up with Google
                            </div>
                        </Button>
                    </div>
                    <div className='mt-4 text-center text-sm'>
                        Already have an account?{' '}
                        <Link to='/login' className='underline'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
            <div className='hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center relative overflow-hidden'>
                <div className='absolute top-4 right-4 text-3xl font-bold text-gray-800'>
                    OpenInvoice
                </div>
                <p className='mb-4 text-center text-xl text-gray-600 absolute bottom-10'>
                    Join us to manage your invoices with ease and simplicity
                </p>
                <div className='absolute inset-0 flex flex-col justify-center items-center space-y-4'>
                    <LoginCatSVG className='w-96 h-96' />
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
