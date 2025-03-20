import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '@/styles/header.styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Fast & free shipping, returns, & exchanges</Text>
        </View>
    )
}