import { View, Text, TextInput, Pressable, Image, Button } from 'react-native'
import React, { useState } from 'react'
import styles from '@/styles/signup.styles'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Signup() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setDate(new Date(selectedDate)); // Convert to Date object
        }
        setShowPicker(false);
    };

    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>
                <Text style={{ fontWeight: '600' }}>SUIT </Text>SHOP
            </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>Sign Up</Text>

            <View style={{ marginTop: 15, flexDirection: 'row', gap: 20 }}>
                <View>
                    <Text style={{ fontSize: 18 }}>Last name:</Text>
                    <TextInput
                        placeholder="Type your Last name"
                        style={styles.inputHalf}
                        keyboardType='default'
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 18 }}>First name:</Text>
                    <TextInput
                        placeholder="Type your First name"
                        style={styles.inputHalf}
                        keyboardType='default'
                    />
                </View>
            </View>

            <View>
                <Text style={{ fontSize: 18 }}>Email:</Text>
                <TextInput
                    placeholder="Type your email"
                    style={styles.input}
                    keyboardType="email-address"
                />
            </View>

            <View>
                <Text style={{ fontSize: 18 }}>Phone:</Text>
                <TextInput
                    placeholder="Type your email"
                    style={styles.input}
                    keyboardType="phone-pad"
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

            <View style={{flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 5}}>
                <Text style={{ fontSize: 18 }}>Date of birth:</Text>
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            </View>

            <Pressable style={styles.button}>
                <Text style={{ fontSize: 20, color: 'white' }}>Sign Up</Text>
            </Pressable>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text>By registering, you agree to the terms of use. and forum rules.</Text>
                <Text>receive email notifications from the forum and SUIT SHOP</Text>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.signup}>login</Text>
                </Pressable>
            </View>
        </View>
    )
}
