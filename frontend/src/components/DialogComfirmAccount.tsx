/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button'
import { toast } from 'react-toastify'
import axiosClient from '@/lib/axiosClient'

const DialogComfirmAccount = () => {

    const [codeId, setCodeId] = useState<string>("")

    const sendCode = async () => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/send-email-active')

            if (data.statusCode === 201) {
                toast.success('Email sent to you')
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const comfirmActive = async () => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/comfirm-active', { codeId })

            if (data.statusCode === 201) {
                toast.success('Active account successfully')
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className='bg-gray-300 shadow-lg rounded-md text-gray-500 font-bold px-5 py-1.5 h-fit hover:bg-green-300 cursor-pointer'>
                    Update
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comfirm active your account</DialogTitle>
                    <DialogDescription>
                        <div className='flex justify-center py-5'>
                            <InputOTP
                                maxLength={6}
                                value={codeId}
                                onChange={setCodeId}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot className='border-gray-700' index={0} />
                                    <InputOTPSlot className='border-gray-700' index={1} />
                                    <InputOTPSlot className='border-gray-700' index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot className='border-gray-700' index={3} />
                                    <InputOTPSlot className='border-gray-700' index={4} />
                                    <InputOTPSlot className='border-gray-700' index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className='flex gap-3'>
                        <Button onClick={sendCode}>Send OTP</Button>
                        <Button onClick={() => comfirmActive()}>Comfirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogComfirmAccount