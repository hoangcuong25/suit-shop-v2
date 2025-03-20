import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Drawer } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles from '@/styles/navbar.styles';

export default function Navbar() {
    const [active, setActive] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: '600' }}>SUIT </Text>SHOP
            </Text>

            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={styles.handBag}>
                    <SimpleLineIcons name="handbag" size={24} color="black" />
                    <View style={styles.quantiy}>
                        <Text style={{ color: 'white', fontSize: 11 }}>10</Text>
                    </View>
                </View>

                {/* Nút mở Drawer */}
                <TouchableOpacity onPress={() => setDrawerVisible(true)}>
                    <Ionicons name="menu-outline" size={26} color="black" />
                </TouchableOpacity>
            </View>

            {/* Drawer Modal */}
            <Modal visible={drawerVisible} animationType="slide" transparent={true}>
                <View style={styles.drawerContainer}>
                    <Drawer.Section title="Menu">
                        <Drawer.Item
                            label="First Item"
                            active={active === 'first'}
                            onPress={() => setActive('first')}
                        />
                        <Drawer.Item
                            label="Second Item"
                            active={active === 'second'}
                            onPress={() => setActive('second')}
                        />
                    </Drawer.Section>

                    {/* Nút đóng Drawer */}
                    <TouchableOpacity onPress={() => setDrawerVisible(false)} style={styles.closeDrawer}>
                        <Ionicons name="close" size={26} color="black" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
