import { Link } from "expo-router";
import { Image, Text, View, ScrollView, Pressable } from "react-native";
const imageHero = require('@/assets/images/spring_2025_hero.jpg')
const image1 = require('@/assets/images/spotlight-collection-essentials.jpg')
const image2 = require('@/assets/images/spotlight-collection-mens-2.jpg')
const image3 = require('@/assets/images/spotlight-collection-prom.jpg')
const image4 = require('@/assets/images/spotlight-collection-womens.jpg')
const fullImage = require('@/assets/images/tan-magazine.jpg')
import styles from "@/styles/home.styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={imageHero} style={styles.image} />

        <View>
          <Text style={{ fontSize: 40, fontWeight: 700, color: '#0e141a' }}>Style that suits you</Text>
          <Text style={{ marginTop: 10, textAlign: 'center' }}>Yours to own, from your wedding day to everyday.</Text>
          <Text style={{ textAlign: 'center' }}>Starting under $200.</Text>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 300, borderBottomWidth: 1, paddingBottom: 10 }}>SHOP MEN</Text>
            <Text style={{ fontWeight: 300, borderBottomWidth: 1, paddingBottom: 10 }}>SHOP WOMEN</Text>
            <Text style={{ fontWeight: 300, borderBottomWidth: 1, paddingBottom: 10 }}>SHOP MAKE-TO-ORDER</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column', gap: 15 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <MaterialCommunityIcons name="truck-fast" size={35} color="#0e141a" />
            <View>
              <Text style={{ fontSize: 20, color: '#0e141a', fontWeight: 600 }}>Ready to Ship, Free</Text>
              <Text>Fast + free shipping, returns, +</Text>
              <Text>exchanges made easy</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <FontAwesome5 name="box" size={35} color="#0e141a" />
            <View>
              <Text style={{ fontSize: 20, color: '#0e141a', fontWeight: 600 }}>Ownership at Rental Prices</Text>
              <Text>Starting at just $199, get brand</Text>
              <Text>new, quality suits to keep</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Ionicons name="wine-sharp" size={35} color="#0e141a" />
            <View>
              <Text style={{ fontSize: 20, color: '#0e141a', fontWeight: 600 }}>Well-Suited for Groups</Text>
              <Text>Weddings + event groups get</Text>
              <Text>organization + attention</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <FontAwesome6 name="ruler" size={35} color="#0e141a" />
            <View>
              <Text style={{ fontSize: 20, color: '#0e141a', fontWeight: 600 }}>Sizing Made Simple</Text>
              <Text>Broad size range, easy fit tools, no</Text>
              <Text>measurements required</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', gap: 15, }}>
          <View style={{ position: 'relative' }}>
            <Image source={image1} style={{ width: 400, height: 400 }} />
            <View style={styles.textImage}>
              <Text style={{ fontSize: 30, fontWeight: 600, color: 'white' }}>Suiting Essentials</Text>
              <Text style={styles.text}>SHOP NOW</Text>
            </View>
          </View>

          <View style={{ position: 'relative' }}>
            <Image source={image2} style={{ width: 400, height: 400 }} />
            <View style={styles.textImage}>
              <Text style={{ fontSize: 30, fontWeight: 600, color: 'white' }}>Men&apos;s Suits & Tuxedos</Text>
              <Text style={styles.text}>SHOP NOW</Text>
            </View>
          </View>

          <View style={{ position: 'relative' }}>
            <Image source={image3} style={{ width: 400, height: 400 }} />
            <View style={styles.textImage}>
              <Text style={{ fontSize: 30, fontWeight: 600, color: 'white' }}>Prom & Homecoming</Text>
              <Text style={styles.text}>SHOP NOW</Text>
            </View>
          </View>

          <View style={{ position: 'relative' }}>
            <Image source={image4} style={{ width: 400, height: 400 }} />
            <View style={styles.textImage}>
              <Text style={{ fontSize: 30, fontWeight: 600, color: 'white' }}>Women&apos;s Suits & Tuxedos</Text>
              <Text style={styles.text}>SHOP NOW</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, borderBottomWidth: 1, paddingBottom: 10 }}>Interesting products:</Text>
        </View>

        <View style={{ position: 'relative' }}>
          <Image source={fullImage} style={{ width: 400, height: 300 }} />

          <View style={styles.viewFullImage}>
            <Text style={{ fontSize: 25, fontWeight: 600, color: 'white', fontFamily: 'sans-serif' }}>
              Street-stopping: {"\n"}
              Tan takes noteworthy {"\n"}
              neutrals in stride
            </Text>

            <Pressable style={{ marginTop: 12, borderWidth: 1, borderColor: 'white', padding: 10, width: 200, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 18 }}>FIND YOUR LOOK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
