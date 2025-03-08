import UserRegiserForm from '@/components/UserRegiserForm';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | SUIT SHOP',
    description: 'Create an account on SUIT SHOP to enjoy exclusive offers and gifts.',
};

const Register = () => {
    return (
        <div className='flex items-center justify-center mt-5'>
            <div className='flex flex-col items-center p-7 gap-5 mt-3 mb-10 md:mt-5 w-fit h-fit border border-gray-300 rounded-xl shadow-xl'>
                <Link href={'/'} className='font-semibold text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></Link>

                <div className='text-center'>
                    <p className='font-medium'>Sign Up</p>
                    <p className='text-gray-600 text-sm'>Are you a new member? Exclusive offers and gifts are waiting for you</p>
                </div>

                <UserRegiserForm />

                <div className='flex flex-col items-center justify-center text-gray-700 text-sm mt-3.5  '>
                    <p className=''>Already a member?</p>
                    <p>Login to access your account</p>
                    <Link href='/login' className='text-blue-500 hover:text-blue-700 underline underline-offset-2'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register