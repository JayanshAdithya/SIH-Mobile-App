import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { HeaderStyleInterpolators } from '@react-navigation/stack';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' }, 
        headerTitleAlign: 'center', 
      }}
    >
      {/* Main Login Screen */}
      <Tabs.Screen
        name="auth/login"
        options={{
          headerShown: false, 
          title: "Login",
        }}
      />

      {/* New Case Screen */}
      <Tabs.Screen
        name="case"
        options={{
          headerShown: true, 
          title: "Case Information",
        }}
      />

      {/* Extract Screen */}
      <Tabs.Screen
        name="extract"
        options={{
          headerShown: true, 
          title: "Extract",
        }}
      />

      {/* Generate Screen */}
      <Tabs.Screen
        name="generate"
        options={{
          headerShown: false, 
          title: "Generate",
        }}
      />

      {/* Displaying Icons Screen */}
      <Tabs.Screen
        name="displayingIcons"
        options={{
          headerShown: true, 
          title: "Login Information",
        }}
      />

      {/* Analyze Screen */}
      <Tabs.Screen
        name="analyze"
        options={{
          headerShown: true, 
          title: "Analysis",
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});




// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { Tabs } from 'expo-router';

// const _layout = () => {
//   return (
//     <Tabs>
//       <Tabs
//       screenOptions={{
//         tabBarStyle: { display: 'none' }, // Hides the tab bar for all screens
//       }}
//     ></Tabs>
      
//       {/* Main Login Screen */}
//       <Tabs.Screen name="auth/login" options={{ headerShown: false, title: "Login" }} />
      
//       {/* New Case Screen */}
//       <Tabs.Screen name="case" options={{ headerShown: true, title: "Case Information" }} />
      
//       {/* Extract Screen */}
//       <Tabs.Screen name="extract" options={{ headerShown: true, title: "Extract" }} />
      
//       {/* Generate Screen */}
//       <Tabs.Screen name="generate" options={{ headerShown: false, title: "Generate" }} />
      
//       {/* Displaying Icons Screen */}
//       <Tabs.Screen name="displayingIcons" options={{ headerShown: true, title: "Login Information" }} />

//       <Tabs.Screen name="analyze" options={{ headerShown: true, title: "Analysis" }} />
//     </Tabs>
//   );
// };

// export default _layout;

// const styles = StyleSheet.create({});
