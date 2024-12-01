import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      {/* Routes to screens inside (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      
      {/* Fallback for unmatched routes */}
      <Stack.Screen name="(tabs)/+not-found" options={{ title: "Not Found" }} />

      
    </Stack>
  );
}


// export default function Layout() {
//   return (
//     <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
//       <StatusBar barStyle="dark-content" />
//       <Slot /> {/* Slot is used for nested navigation */}
//     </View>
//   );
// }
