import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      {/* Set the login screen as the initial route without a header */}
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      
      {/* Define the main tab layout without a header */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Define the second tab layout without a header */}
      <Stack.Screen name="(tabs2)" options={{ headerShown: false }} />

      
      {/* Define the Extract page directly */}
      <Stack.Screen name="(tabs2)/extract" options={{ headerShown: true }} />
      
      {/* Fallback for unmatched routes */}
      <Stack.Screen name="(tabs)/+not-found" options={{ title: "Not Found" }} />
    </Stack>
  );
}