'use client'

import { useContext } from 'react'
import { Button } from './ui/button'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'

const NavbarAdmin = () => {

    const { logout } = useContext(AppContext)

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white w-full'>
            <div className='flex items-center gap-2 text-xs'>
                <Link href={'/admin/dashboard'} className='font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></Link>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>Admin</p>
            </div>
            <Button onClick={() => logout()} className='px-10 py-2 rounded-full'>Logout</Button>
        </div>
    )
}

export default NavbarAdmin