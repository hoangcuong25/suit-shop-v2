/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AppContextType {
    token: string | false
    setToken: React.Dispatch<React.SetStateAction<string | false>>
    userData: UserData | false
    loadUserProfileData: () => Promise<void>
    sidebar: string
    setSidebar: React.Dispatch<React.SetStateAction<string>>
    cart: CartData[] | false
    wishlist: ProductData[] | false
    wishlistProduct: (productId: string) => Promise<void>
    isWishlist: (productId: string) => boolean
    totalPrice: () => number
    order: OrderData[] | false
    getOrder: () => Promise<void>
    logout: () => Promise<void>
    coupon: CouponData[] | false
    getCoupon: () => Promise<void>
    reqOrderData: any
    setReqOrderData: React.Dispatch<React.SetStateAction<any>>
    codePayment: string
    setCodePayment: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<AppContextType>({
    token: false,
    setToken: () => { },
    userData: false,
    loadUserProfileData: async () => { },
    sidebar: '',
    setSidebar: () => { },
    cart: false,
    wishlist: false,
    wishlistProduct: async () => { },
    isWishlist: () => false,
    totalPrice: () => 0,
    order: false,
    getOrder: async () => { },
    logout: async () => { },
    coupon: false,
    getCoupon: async () => { },
    reqOrderData: false,
    setReqOrderData: () => { },
    codePayment: '',
    setCodePayment: () => { }
})

interface AppContextProviderProps {
    children: ReactNode
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const router = useRouter()

    const [token, setToken] = useState<string | false>(false)

    const [sidebar, setSidebar] = useState<string>('')

    const [userData, setUserData] = useState<UserData | false>(false)

    const [cart, setCart] = useState<CartData[] | false>(false)
    const [wishlist, setWishlist] = useState<ProductData[] | false>(false)
    const [order, setOrder] = useState<OrderData[] | false>(false)
    const [coupon, setCounpon] = useState<CouponData[] | false>(false)
    const [reqOrderData, setReqOrderData] = useState<any>(false)
    const [codePayment, setCodePayment] = useState<string>('')

    const loadUserProfileData = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/users/get-profile')

            if (data.statusCode === 200) {
                setUserData(data.dataRes)
                setCart(data.dataRes.cart)
                setWishlist(data.dataRes.wishlist)
            } else {
                toast.error(data?.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const wishlistProduct = async (productId: string): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/products/wishlist', { productId })

            if (data.statusCode === 201) {
                toast.success(data.dataRes)
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const isWishlist = (productId: string): boolean => {
        return wishlist && wishlist.some((i) => i?._id === productId)
    }

    const totalPrice = (): number => {
        let totalPrice = 0
        if (!Array.isArray(cart)) return totalPrice

        cart.map((i: any) => {
            totalPrice += i?.product?.newPrice * i?.amount.quantity
        })
        return totalPrice
    }

    const getOrder = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/orders/get-orders')

            if (data.statusCode === 200) {
                setOrder(data.dataRes)
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const logout = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/logout')

            if (data.statusCode === 201) {
                setToken(false)
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                router.push('/')
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const getCoupon = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/coupon/get-coupon')

            if (data.success) {
                setCounpon(data.coupons)
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const value = {
        token, setToken,
        userData,
        loadUserProfileData,
        sidebar, setSidebar,
        cart,
        wishlist,
        wishlistProduct,
        isWishlist,
        totalPrice,
        order,
        getOrder,
        logout,
        coupon,
        getCoupon,
        reqOrderData, setReqOrderData,
        codePayment, setCodePayment
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData()
            getCoupon()
            getOrder()
        } else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider