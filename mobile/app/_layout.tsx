import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' options={{ title: 'home' }} />
            <Stack.Screen name='(auth)' options={{ title: 'auth' }} />
          </Stack>
          <StatusBar style="auto" />
        </SafeScreen>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
