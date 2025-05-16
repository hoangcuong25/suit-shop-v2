/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineReload } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import axiosClient from '@/lib/axiosClient';

const UserRegiserForm = () => {

    const router = useRouter()

    const [isShow, setIsShow] = useState<boolean>(false)

    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password1, setPassword1] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [dob, setDob] = useState<string>('')

    const register = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault()
        setLoadingLogin(true)

        try {
            const payload = {
                firstName,
                lastName,
                email,
                phone,
                password1,
                password2,
                dob
            }

            const { data } = await axiosClient.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, payload)

            if (data.statusCode === 201) {
                router.push('/login')
                window.scrollTo(0, 0);
                toast.success("Registration Successful")
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong!")
        }

        setLoadingLogin(false)
    }

    return (
        <form onSubmit={register} className='flex flex-col gap-3.5 text-sm'>
            <div className='flex gap-3'>
                <div className='w-1/2'>
                    <p>Last name*:</p>
                    <input
                        type="text"
                        className='border-b border-gray-500 focus:outline-none mt-2'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='w-1/2'>
                    <p>First name*:</p>
                    <input
                        type="text"
                        className='border-b border-gray-500 focus:outline-none mt-2'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <p>Email*:</p>
                <input
                    type="text"
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <p>Phone*:</p>
                <input
                    type="number"
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className='relative'>
                <p>Password*:</p>
                <input
                    type={`${isShow ? 'text' : 'password'}`}
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />

                {isShow ?
                    <FaRegEye onClick={() => setIsShow(false)} className='absolute top-8 right-0 cursor-pointer' />
                    : <FaRegEyeSlash onClick={() => setIsShow(true)} className='absolute top-8 right-0 cursor-pointer' />
                }
            </div>

            <div className='relative'>
                <p>Password*:</p>
                <input
                    type={`${isShow ? 'text' : 'password'}`}
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />

                {isShow ?
                    <FaRegEye onClick={() => setIsShow(false)} className='absolute top-8 right-0 cursor-pointer' />
                    : <FaRegEyeSlash onClick={() => setIsShow(true)} className='absolute top-8 right-0 cursor-pointer' />
                }
            </div>

            <div>
                <p>Date of birth*:</p>
                <input
                    type="date"
                    className='border-b border-gray-500 focus:outline-none w-full mt-2'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>

            {loadingLogin ?
                <button type='submit' className='flex justify-center bg-gray-300 mt-3.5 rounded-[13px]  py-1 '>
                    <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                </button>
                : <button type='submit' className='bg-red-500 text-white mt-3.5 rounded-[13px] px-24 py-3 '>Sign Up</button>
            }

            <div className='text-xs'>
                <p>By registering, you agree to <span className='font-bold'>the terms of use.</span> and forum rules.</p>
                <p>receive email notifications from the forum and <span className='font-bold'>SUIT SHOP</span></p>
            </div>
        </form>
    )
}

export default UserRegiserForm