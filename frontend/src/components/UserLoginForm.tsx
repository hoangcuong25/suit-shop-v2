'use client'

import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AppContext } from '@/context/AppContext';
import axiosClient from '@/lib/axiosClient';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineReload } from 'react-icons/ai';
import GoogleLogin from '@/components/GoogleLogin';
import Link from 'next/link';
import { jwtDecode } from "jwt-decode";

const UserLoginForm = () => {

    const { setToken } = useContext(AppContext)

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [isShow, setIsShow] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/login', { email, password })

            if (data.statusCode === 201) {
                toast.success("Login Successfully")
                localStorage.setItem('access_token', data.dataRes.access_token)
                localStorage.setItem('refresh_token', data.dataRes.refresh_token)
                setToken(data.dataRes.access_token)

                const decoded: { role: string } = jwtDecode(data.dataRes.access_token)
                if (decoded.role === 'admin') {
                    router.push('/admin/dashboard')
                    scrollTo(0, 0)
                } else {
                    router.push('/')
                    scrollTo(0, 0)
                }
            }

        } catch {
            toast.error('Incorrect email or password')
        }

        setLoading(false)
    }

    return (
        <form onSubmit={login} className='flex flex-col gap-3.5 text-sm mt-3.5'>
            <div>
                <p>Email*:</p>
                <input
                    type="text"
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='relative'>
                <p>Password*:</p>
                <input
                    type={`${isShow ? 'text' : 'password'}`}
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isShow ?
                    <FaRegEye onClick={() => setIsShow(false)} className='absolute top-8 right-0 cursor-pointer' />
                    : <FaRegEyeSlash onClick={() => setIsShow(true)} className='absolute top-8 right-0 cursor-pointer' />
                }
            </div>

            <div className='flex gap-2'>
                <input type="checkbox" />
                <p className='text-gray-500 text-xs'>Save login information</p>
            </div>

            <Link className='text-[13px] text-blue-400 text-center mt-3' href='/reset-password'>Forgot Password</Link>

            {loading ?
                <button type='submit' className='flex justify-center bg-gray-300 text-white  rounded-[13px] w-[230px] text-center py-3 '>
                    <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                </button>
                : <button type='submit' className='bg-red-500 text-white  rounded-[13px] px-24 py-3'>Login</button>
            }

            <p className='mt-3 text-center font-medium'>Sign in with</p>

            <GoogleLogin />

        </form>
    )
}

export default UserLoginForm