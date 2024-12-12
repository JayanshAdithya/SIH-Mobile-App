// import { Tabs } from "expo-router";
// import { FontAwesome } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       {/* <Tabs.Screen name="MainLogin" options={{ headerShown: false }} /> */}
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="search" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="screen1"
//         options={{
//           title: "Instagram",
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="instagram" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="screen2"
//         options={{
//           title: "X",
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="twitter" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="screen3"
//         options={{
//           title: "Whatsapp",
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="whatsapp" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="screen4"
//         options={{
//           title: "Facebook",
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="facebook" color={color} size={size} />
//           ),
//         }}
//       />
//       {/* <Tabs.Screen name="PDFdisplay" options={{ title: "PDF Display" }} /> */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="home" color={color} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen name="explore" options={{ title: "Explore" }} />
//       <Tabs.Screen name="screen1" options={{ title: "Instagram" }} />
//       <Tabs.Screen name="screen2" options={{ title: "X" }} />
//       <Tabs.Screen name="screen3" options={{ title: "Whatsapp" }} />
//       <Tabs.Screen name="screen4" options={{ title: "Facebook" }} />
//       {/* <Tabs.Screen name="PDFdisplay" options={{ title: "PDF Display" }} /> */}
//       <Tabs.Screen name="index" options={{ headerShown: false }} />
//     </Tabs>
//   );
// }


// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './index';
// import Screen1 from './screen1';
// import Screen2 from './screen2';
// import Screen3 from './screen3';
// import Screen4 from './screen4';

// const Stack = createStackNavigator();

// export default function TabLayout() {
//   return (
//     <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Screen1" component={Screen1} />
//       <Stack.Screen name="Screen2" component={Screen2} />
//       <Stack.Screen name="Screen3" component={Screen3} />
//       <Stack.Screen name="Screen4" component={Screen4} />
//     </Stack.Navigator>
//   );
// }