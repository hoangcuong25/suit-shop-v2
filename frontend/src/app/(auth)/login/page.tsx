import UserLoginForm from '@/components/UserLoginForm';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | SUIT SHOP',
    description: 'Login to SUIT SHOP to access exclusive offers and services.',
}

const Login = () => {
    return (
        <div className='flex justify-center items-center mt-5'>
            <div className='flex flex-col items-center p-16 gap-5 mt-3 mb-10 md:mt-5 w-fit h-fit border border-gray-300 rounded-xl shadow-xl'>
                <Link href={'/'} className='font-semibold text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></Link>

                <div className='text-center'>
                    <p className='font-medium'>Login</p>
                </div>

                <UserLoginForm />

                <div className='flex flex-col items-center justify-center text-gray-700 text-sm mt-3.5'>
                    <p className=''>New member?</p>
                    <p>Become a member of SUIT SHOP</p>
                    <p>to receive amazing offers and services</p>
                    <Link href='/sign-up' className='text-blue-500 hover:text-blue-700 underline underline-offset-2'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login