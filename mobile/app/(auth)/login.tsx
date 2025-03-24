import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '@/styles/login.styles'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)

    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>
                <Text style={{ fontWeight: '600' }}>SUIT </Text>SHOP
            </Text>

            <Text style={{ fontSize: 20, marginTop: 18 }}>login</Text>

            <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 18 }}>Email:</Text>
                <TextInput
                    placeholder="Type your email"
                    style={styles.input}
                    keyboardType="email-address"
                />
            </View>

            <View style={{ position: 'relative' }}>
                <Text style={{ fontSize: 18 }}>Password:</Text>
                <TextInput
                    placeholder="Type your email"
                    style={styles.input}
                    secureTextEntry={isShow}
                />

                {isShow
                    ? <Pressable
                        style={styles.paswwrod}
                        onPress={() => setIsShow(!isShow)}
                    >
                        <Feather name="eye-off" size={18} color="black" />
                    </Pressable>
                    : <Pressable
                        style={styles.paswwrod}
                        onPress={() => setIsShow(!isShow)}
                    >
                        <Feather name="eye" size={18} color="black" />
                    </Pressable>
                }
            </View>

            <Pressable>
                <Text style={{ color: '#007AFF' }}>Forget Password</Text>
            </Pressable>

            <Pressable style={styles.button}>
                <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
            </Pressable>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text>Or sign in with</Text>

                <Pressable style={styles.loginGoogle} >
                    <Image
                        source={require('@/assets/images/google.jpg')}
                        style={styles.logo}
                    />
                    <Text style={{ textAlign: 'center', width: '100%', fontSize: 18 }}>Login With Google</Text>
                </Pressable>

                <Text>New member?</Text>
                <Text>Become a member of SUIT SHOP</Text>
                <Text>to receive amazing offers and services</Text>
                <Pressable onPress={() => router.push('/signup')}>
                    <Text style={styles.signup}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
}