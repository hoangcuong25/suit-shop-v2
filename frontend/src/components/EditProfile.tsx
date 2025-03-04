/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useContext, useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaFacebook, FaRegWindowClose } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { AiOutlineMenu, AiOutlineReload } from "react-icons/ai";
import Image from 'next/image';
import { AppContext } from '@/context/AppContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import axiosClient from '@/lib/axiosClient';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
}

const EditProfile = ({ setShow, show }: Props) => {

    const { userData, loadUserProfileData } = useContext(AppContext)

    const [loading, setLoading] = useState<boolean>(false)

    const [isUpdatePhone, setIsUpdatePhone] = useState<boolean>(false)

    const [image, setImage] = useState<File | null>(null)
    const [lastName, setLastName] = useState(userData ? userData.lastName : '')
    const [firstName, setFirstName] = useState(userData ? userData.firstName : '')
    const [gender, setGender] = useState(userData ? userData.gender : '')
    const [address, setAddress] = useState(userData ? userData.address : '')
    const [dob, setdob] = useState(userData ? userData.dob : '')
    const [phone, setPhone] = useState<string>()

    const [oldPassword, setOldPassword] = useState<string>()
    const [newPassword1, setnewPassword1] = useState<string>()
    const [newPassword2, setnewPassword2] = useState<string>()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (file) {
            setImage(file);
        }
    }

    const editProfile = async (): Promise<void> => {
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('gender', gender)
            formData.append('address', address)
            formData.append('dob', dob)

            if (image) {
                formData.append('image', image)  // Append image file
            }

            const { data } = await axiosClient.put(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/update-profile',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (data.success) {
                toast.success('Changes saved successfully');
                await loadUserProfileData();
            } else {
                toast.error(data.message);
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message)
        }

        setLoading(false)
    }

    const updatePassword = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.put(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/update-password', { oldPassword, newPassword1, newPassword2 })

            if (data.success) {
                toast.success('Password changed successfully')
                // loadProductData()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const updatePhone = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()

        try {
            const { data } = await axiosClient.put(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/update-phone', { phone })

            if (data.success) {
                toast.success('Change phone number successfully')
                loadUserProfileData();
            }

        }
        catch (error: any) {
            toast.error(error.response?.data?.message || error.message)
        }

        setIsUpdatePhone(false)
    }

    return (
        <div className='flex flex-col xl:flex-row gap-3 w-full bg-gray-100 px-3 py-3 shadow-md'>
            <div className='w-full xl:w-1/2 xl:border-r'>
                <div
                    className='flex md:hidden items-center gap-3 mb-3 cursor-pointer'
                    onClick={() => setShow(!show)}
                >
                    {show ?
                        <FaRegWindowClose className='text-gray-700' />
                        : <AiOutlineMenu className='text-gray-700' />
                    }
                    <p>Menu</p>
                </div>
                <p className='font-bold text-lg'>Account information</p>
                <div className='flex flex-col md:flex-row gap-7 mt-3'>
                    <label htmlFor="image">
                        <div className='inline-block relative cursor-pointer'>
                            <Image className='size-24 rounded-full' width={100} height={100} src={image ? URL.createObjectURL(image) : userData && userData.image ? userData.image : ''} alt="avata" />
                            <p className='mt-3 text-sm text-center'>Upload your photo</p>
                        </div>
                        <input onChange={handleFileChange} type="file" id='image' hidden />
                    </label>

                    <div className='flex flex-col gap-3.5'>
                        <div className='w-72 py-2 border border-gray-300 bg-gray-200 px-3 relative'>
                            <p>{userData ? userData.email : ''}</p>
                            <HiOutlineMail className='absolute bottom-3 right-2' />
                        </div>
                        <div className='flex gap-8'>
                            <div>
                                <p className='text-sm'>Last name</p>
                                <input
                                    className='w-32 py-2 border border-gray-300 px-3 focus:outline-none'
                                    type="text"
                                    placeholder='Họ'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div>
                                <p className='text-sm'>First name</p>
                                <input
                                    className='w-32 py-2 border border-gray-300 px-3 focus:outline-none'
                                    type="text"
                                    placeholder='Tên'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {['Male', 'Female', 'Unknown'].map((selectGender) => (
                                <label key={selectGender} className="inline-flex items-center text-sm">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={gender === selectGender}
                                        onChange={() => setGender(selectGender)}
                                        className="form-radio text-blue-600 h-5 w-5"
                                    />
                                    <span className="ml-2">{selectGender}</span>
                                </label>
                            ))}
                        </div>

                        <p className='text-sm font-semibold'>Date of birth</p>
                        <input
                            type="date"
                            className='w-72 py-2 border border-gray-300 px-3'
                            value={dob}
                            onChange={(e) => setdob(e.target.value)}
                        />

                        <p className='text-sm font-semibold'>Address</p>
                        <input
                            type="text"
                            className='w-72 py-2 border border-gray-300 px-3'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <div className='flex text-sm gap-3'>
                            <input type="checkbox" />
                            <p>Receive promotional information via e-mail</p>
                        </div>

                        {loading ?
                            <div className='flex items-center justify-center w-32 h-9 cursor-pointer bg-gray-300 text-center'>
                                <AiOutlineReload className='animate-spin text-green-500 text-2xl' />
                            </div>
                            : <div onClick={editProfile} className='w-32 py-1.5 cursor-pointer bg-red-500 hover:bg-red-600 text-center text-white'>Save changes</div>
                        }
                    </div>
                </div>
            </div>

            <hr className='xl:hidden block my-3.5' />

            <div className='w-full xl:w-1/2'>
                <p className='font-bold text-lg'>Phone Number and Email</p>

                <div className='mt-5 flex justify-between'>
                    {isUpdatePhone ?
                        <div className=''>
                            <div className='flex gap-3 items-center'>
                                <MdLocalPhone className='text-2xl text-gray-700' />
                                <p>New phone number:</p>
                            </div>

                            <input
                                type="number"
                                className='mt-2 border border-gray-300 py-1 pl-1.5'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        : <div className='flex gap-5 items-center'>
                            <MdLocalPhone className='text-2xl text-gray-700' />

                            <div>
                                <p>Phone number</p>
                                <p className='text-gray-400'>{userData && userData.phone}</p>
                            </div>
                        </div>
                    }

                    {isUpdatePhone ?
                        <div onClick={updatePhone} className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300 cursor-pointer '>
                            Update
                        </div>
                        : <div onClick={() => setIsUpdatePhone(!isUpdatePhone)} className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300 cursor-pointer '>
                            Update
                        </div>
                    }
                </div>

                <div className='mt-5 flex items-center gap-5'>
                    <HiOutlineMail className='text-2xl text-gray-700' />

                    <div>
                        <p>Email</p>
                        <p className='text-gray-400'>Update email</p>
                    </div>
                </div>

                <p className='font-bold text-lg mt-5'>Security</p>

                <div className='flex justify-between mt-3'>
                    <div className='flex items-center gap-5'>
                        <IoMdLock className='text-2xl text-gray-700' />
                        <p>Change password</p>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <div className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300 cursor-pointer'>
                                Update
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Change password</DialogTitle>
                                <div>
                                    <div className='mt-10'>
                                        <p>Old password:</p>
                                        <input
                                            type="text"
                                            className='border border-gray-300 w-60 py-1 pl-1.5 mt-1.5'
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            value={oldPassword}
                                        />
                                    </div>

                                    <div className='mt-3.5'>
                                        <p>New Password:</p>
                                        <input
                                            type="text"
                                            className='border border-gray-300 w-60 py-1 pl-1.5 mt-1.5'
                                            onChange={(e) => setnewPassword1(e.target.value)}
                                            value={newPassword1}
                                        />
                                    </div>

                                    <div className='mt-3.5'>
                                        <p>Re-enter New Password:</p>
                                        <input
                                            type="text"
                                            className='border border-gray-300 w-60 py-1 pl-1.5 mt-1.5'
                                            onChange={(e) => setnewPassword2(e.target.value)}
                                            value={newPassword2}
                                        />
                                    </div>

                                    <Button onClick={() => updatePassword()} className='mt-8 py-6 font-semibold w-full '>
                                        Save changes
                                    </Button>

                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <p className='font-bold text-lg mt-5'>Social Network Links</p>

                <div className='flex justify-between mt-3'>
                    <div className='flex items-center gap-5'>
                        <FaFacebook className='text-2xl text-blue-500' />
                        <p>Facebook</p>
                    </div>
                    <div className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300'>
                        Update
                    </div>
                </div>

                <div className='flex justify-between mt-7'>
                    <div className='flex items-center gap-5'>
                        <FcGoogle className='text-2xl' />
                        <p>Google</p>
                    </div>
                    <div className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300'>
                        Update
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditProfile