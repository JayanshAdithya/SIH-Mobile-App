
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function Screen1() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [pdfUrl, setPdfUrl] = useState(null); // Replace with actual URL

//   useEffect(() => {
//     const loadCredentials = async () => {
//       try {
//         const storedUsername = await AsyncStorage.getItem("username");
//         const storedPassword = await AsyncStorage.getItem("password");
//         if (storedUsername) setUsername(storedUsername);
//         if (storedPassword) setPassword(storedPassword);
//       } catch (error) {
//         console.error("Error loading credentials from AsyncStorage:", error);
//       }
//     };

//     loadCredentials();
//   }, []);

//   const handleLogin = async () => {
//     try {
//       // Save username and password to AsyncStorage
//       await AsyncStorage.multiSet([
//         ["username", username],
//         ["password", password],
//       ]);

//       console.log("Username and password saved locally!");

//       // Send login details to backend
//       const response = await axios.post(
//         "http://your-backend-url.com/api/login",
//         {
//           username,
//           password,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Login successful:", response.data);
//         setPdfUrl(
//           "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
//         );
//         // Update pdfUrl if needed based on response
//       } else {
//         console.error("Login failed with status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const handleDownloadPdf = () => {
//     Linking.openURL(pdfUrl).catch((err) =>
//       console.error("Failed to open URL:", err)
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Instagram Login </Text>

// import { View, TextInput, Button, Text, StyleSheet } from "react-native";
// import React, { useState, useEffect  } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Screen1() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
  
//     useEffect(() => {
//       const loadCredentials = async () => {
//         try {
//           const storedUsername = await AsyncStorage.getItem('username');
//           const storedPassword = await AsyncStorage.getItem('password');
//           if (storedUsername) setUsername(storedUsername);
//           if (storedPassword) setPassword(storedPassword);
//         } catch (error) {
//           console.error("Error loading data", error);
//         }
//       };
  
//       loadCredentials();
//     }, []);
  
//     const handleLogin = async () => {
//       try {
//         await AsyncStorage.setItem('username', username);
//         await AsyncStorage.setItem('password', password);
//         console.log("Username and password saved!");
//       } catch (error) {
//         console.error("Error saving data", error);
//       }
//     };

//     // return (
//     //     <View className="flex-1 justify-center p-4">
//     //       <Text className="text-2xl font-bold text-center mb-5">Instagram Login</Text>
//     //       <TextInput
//     //         placeholder="Username"
//     //         value={username}
//     //         onChangeText={setUsername}
//     //         className="border border-gray-300 rounded p-2 mb-3"
//     //       />
//     //       <TextInput
//     //         placeholder="Password"
//     //         secureTextEntry
//     //         value={password}
//     //         onChangeText={setPassword}
//     //         className="border border-gray-300 rounded p-2 mb-3"
//     //       />
//     //       <Button title="Login" onPress={handleLogin} />
//     //     </View>
//     //   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Instagram Login</Text>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Generate</Text>
//       </TouchableOpacity>

//       {pdfUrl && (
//         <TouchableOpacity
//           onPress={handleDownloadPdf}
//           style={styles.downloadButton}
//         >
//           <Text style={styles.downloadText}>
//             Click here to download the PDF
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F0F4F8", // Light gray background
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 40,
//     color: "#1A1A1A", 
//     fontFamily: "TimesNewRoman", 
//   },
  
//   input: {
//     height: 50,
//     borderColor: "#E0E0E0",
//     borderWidth: 1,
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     width: "90%",
//     backgroundColor: "#FFFFFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     // elevation: 10,
//     marginBottom: 20,
//   },
//   button: {
//     marginTop: 20,
//     paddingVertical: 15, // Adjusted for better touch targets
//     backgroundColor: "#2D6ABA", // Blue button color
//     borderRadius: 30, // Rounded edges
//     alignItems: "center",
//     justifyContent: "center", // Center the text
//     width: "90%", // Match the input field width
//     alignSelf: "center", // Center the button horizontally
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5, // Shadow for Android
//   },
//   buttonText: {
//     color: "#fff", // White text color
//     fontSize: 16, // Slightly larger text for readability
//     fontWeight: "400",
//   },

//   downloadButton: {
//     marginTop: 20,
//     paddingVertical: 15, // Padding for consistent height
//     backgroundColor: "#FFFFFF", // White background
//     borderWidth: 2, // Blue border
//     borderColor: "#5E79AD", // Border color matches the theme
//     borderRadius: 30, // Rounded corners
//     alignItems: "center",
//     justifyContent: "center",
//     width: "90%", // Button width
//     alignSelf: "center", // Center horizontally
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   downloadText: {
//     color: "black",
//     fontSize: 13,
//     fontWeight: "500",
//   },
// });

//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       padding: 20,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: "bold",
//       textAlign: "center",
//       marginBottom: 20,
//     },
//     input: {
//       height: 40,
//       borderColor: "#ccc",
//       borderWidth: 1,
//       marginBottom: 10,
//       paddingHorizontal: 8,
//       width: '80%', 
//       alignSelf: 'center', 
//     },
//     button: {
//       width: '80%', 
//       alignSelf: 'center', 
//     },
//   });



// // import React from "react";
// // import { View, Text, StyleSheet } from "react-native";
// // import Card from "../../components/Card";
// // import InputField from "../../components/InputField"; // Ensure this exists

// // const Screen1 = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Card>
// //         <Text style={styles.title}>Screen 1</Text>
// //         <InputField placeholder="Username" />
// //         <InputField placeholder="Password" secureTextEntry />
// //       </Card>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#f3f3f3",
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     marginBottom: 15,
// //     textAlign: "center",
// //   },
// // });

// // export default Screen1;


