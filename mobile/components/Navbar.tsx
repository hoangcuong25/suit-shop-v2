import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Drawer } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles from '@/styles/navbar.styles';

export default function Navbar() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [expanded, setExpanded] = useState(false)

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
                <View style={styles.overlay}>
                    <View style={styles.drawerContainer}>
                        <Drawer.Section style={{ flexDirection: 'column', gap: 20 }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Ionicons name="search-outline" size={20} color="black" />
                                <Text style={{ fontSize: 16 }}>Search</Text>
                            </View>

                            <TouchableOpacity style={styles.expanded} onPress={() => setExpanded(!expanded)}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16 }}>Shop</Text>
                                    <SimpleLineIcons name="arrow-down" size={13} color="black" />
                                </View>

                                {expanded && (
                                    <View style={{ flexDirection: 'column', gap: 15, marginTop: 10 }}>
                                        <Text>Occasions</Text>
                                        <Text>SuitShop Specials</Text>
                                        <Text>Suits & Tuxedos</Text>
                                        <Text>Separates</Text>
                                        <Text>Occasions</Text>
                                        <Text>Accessories</Text>
                                        <Text>Gifts & Extras</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 16 }}>Get Started</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Fit Guide</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Contact Us</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Location</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16 }}>Help</Text>
                            </View>
                        </Drawer.Section>

                        {/* Nút đóng Drawer */}
                        <TouchableOpacity onPress={() => setDrawerVisible(false)} style={styles.closeDrawer}>
                            <Ionicons name="close" size={23} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
