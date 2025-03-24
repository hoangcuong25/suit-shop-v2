import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '@/context/AppContext'
import { useRouter } from "expo-router";

export default function profile() {

    const { token } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.replace("/(auth)/login")
        }
    }, [token]);

    return (
        <View>
            <Text>profile</Text>
        </View>
    )
}