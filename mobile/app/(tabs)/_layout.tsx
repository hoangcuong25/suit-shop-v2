import React from 'react';
import { Tabs } from 'expo-router';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
    return (
        <>
            <Header />
            <Navbar />
            <Tabs screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: () => (
                            <MaterialIcons name="home" size={30} color={'#273d52'} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: () => (
                            <FontAwesome name="user" size={30} color={'#273d52'} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="product"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="shopping-cart" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="product12"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="shopping-cart" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
