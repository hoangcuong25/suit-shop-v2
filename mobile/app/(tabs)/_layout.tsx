import React from 'react';
import { Tabs } from 'expo-router';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function Layout() {
    return (
        <>
            <Header />
            <Navbar />
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="profile" />
                <Tabs.Screen name="product" />
            </Tabs>
        </>
    );
}
