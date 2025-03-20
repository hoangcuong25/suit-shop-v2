import Header from "@/components/Header";
import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Header />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' options={{ title: 'home' }} />
          <Stack.Screen name='(auth)' options={{ title: 'auth' }} />
        </Stack>
        <StatusBar style="auto" />
      </SafeScreen>
    </SafeAreaProvider>
  )
}
