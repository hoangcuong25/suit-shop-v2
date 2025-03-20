import { View, Text } from 'react-native'
import React from 'react'
import styles from '@/styles/navbar.styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function Navbar() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 600 }}>SUIT </Text>SHOP</Text>

            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={styles.handBag}>
                    <SimpleLineIcons name="handbag" size={24} color="black" />
                    <View style={styles.quantiy}>
                        <Text style={{ color: 'white', fontSize: 11 }} >10</Text>
                    </View>
                </View>

                <View>
                    <Ionicons name="menu-outline" size={26} color="black" />
                </View>
            </View>
        </View>
    )
}