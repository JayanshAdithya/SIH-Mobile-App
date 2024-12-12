
// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import Animated, { FadeIn, Easing, withSpring } from 'react-native-reanimated';

// const Home = () => {
//   const router = useRouter();
  
//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.button, { opacity: withSpring(1), transform: [{ scale: withSpring(1.05) }] }]}
//         entering={FadeIn.duration(1000).easing(Easing.ease)}
//       >
//         <TouchableOpacity onPress={() => router.push("/auth/login")}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View
//         style={[styles.button, { opacity: withSpring(1), transform: [{ scale: withSpring(1.05) }] }]}
//         entering={FadeIn.duration(1000).easing(Easing.ease).delay(200)}
//       >
//         <TouchableOpacity onPress={() => router.push("/generate")}>
//           <Text style={styles.buttonText}>Go to Generate Page</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FD',
//     padding: 20,
//   },
//   button: {
//     width: '100%',
//     maxWidth: 400,
//     height: 50,
//     backgroundColor: '#000000',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/login")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/generate")}>
        <Text style={styles.buttonText}>Go to Generate Page</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD', 
    padding: 20,
  },
  button: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#000000', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});