import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Screen4() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedUsername) setUsername(storedUsername);
        if (storedPassword) setPassword(storedPassword);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      console.log("Username and password saved!");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facebook Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );

  // Uncomment below code if you want to use Tailwind styles
  // return (
  //   <View className="flex-1 justify-center p-4">
  //     <Text className="text-2xl font-bold text-center mb-5">Facebook Login</Text>
  //     <TextInput
  //       placeholder="Username"
  //       value={username}
  //       onChangeText={setUsername}
  //       className="border border-gray-300 rounded p-2 mb-3"
  //     />
  //     <TextInput
  //       placeholder="Password"
  //       secureTextEntry
  //       value={password}
  //       onChangeText={setPassword}
  //       className="border border-gray-300 rounded p-2 mb-3"
  //     />
  //     <Button title="Login" onPress={handleLogin} />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '80%',
    alignSelf: 'center',
  },
});

// import React from "react";
// import { View, Text, StyleSheet  } from "react-native";
// import Card from "../../components/Card";
// import InputField from "../../components/InputField";

// const Screen4 = () => {
//   return (
//     <View style={styles.container}>
//       <Card>
//         <Text style={styles.title}>Screen 4</Text>
//         <InputField placeholder="Username" />
//         <InputField placeholder="Password" secureTextEntry />
//       </Card>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f3f3f3",
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: "bold",
//       marginBottom: 15,
//       textAlign: "center",
//     },
//   });

// export default Screen4;
