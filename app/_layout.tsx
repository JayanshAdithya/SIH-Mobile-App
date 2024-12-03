import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs2)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/+not-found" options={{ title: "Not Found" }} />
    </Stack>
  );
}