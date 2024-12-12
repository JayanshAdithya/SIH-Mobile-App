// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useGlobalSearchParams, useRouter } from "expo-router";
// import { StyleSheet, Text, View, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { createLanguageService } from "typescript";

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams();
//   const router = useRouter();

//   const selectedPlatforms = params.selectedPlatforms ? JSON.parse(params.selectedPlatforms) : [];
//   const initialCredentials = {
//     x: { username: "", password: "" },
//     instagram: { username: "", password: "" },
//     facebook: { username: "", password: "" },
//     google: { username: "", password: "" },
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [loading, setLoading] = useState(false);
//   const [caseInfo, setCaseInfo] = useState({ 
//     name: "", 
//     caseId: "",
//     description: "", // Add description
//     nia_officer: "", // Add NIA officer
//     title: "", // Add title
//     cio_officer: "", // Add CIO officer
//     eo_officer: "", // Add EO officer
//     eo_designation: "", // Add EO designation
//     suspect_name: "" // Add suspect name
//   });
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const caseData = await AsyncStorage.getItem("caseInfo");
//         if (caseData) setCaseInfo(JSON.parse(caseData));

//         const userToken = await AsyncStorage.getItem("authToken");
//         console.log("UserToken:", userToken);
//         if (userToken) {
//           setToken(userToken);
//         } else {
//           console.log("No token found");
//         }
//       } catch (error) {
//         console.error("Error loading initial data", error);
//       }
//     };

//     loadInitialData();
//   }, []);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleCaseInputChange = (field, value) => {
//     setCaseInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const { name, caseId, description, nia_officer, title, cio_officer, eo_officer, eo_designation, suspect_name } = caseInfo;

//     // Check if the token is available
//     if (!token) {
//       Alert.alert("Error", "Token is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     if (selectedPlatforms.length === 0) {
//       Alert.alert("Error", "No platform selected.");
//       setLoading(false);
//       return;
//     }

//     const requestBody = {
//       suspect_name,
//       case: caseId,
//       description, 
//       nia_officer, 
//       title, 
//       cio_officer, 
//       eo_officer, 
//       eo_designation, 
//       platform: selectedPlatforms[0],
//       username: credentials[selectedPlatforms[0]].username,
//       password: credentials[selectedPlatforms[0]].password,
//     };
//     console.log("Request Body:", requestBody);

//     try {
//       const response = await axios.post(
//         "http://60.70.3.125:8000/api/v1/data/scrape",
//         requestBody,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Bearer ${token}`, // Include the token in headers
//           },
//         }
//       );

//         if (response.status === 200) {
//             console.log("Response data:", response.data);
//             Alert.alert("Success", "Data submitted successfully!");
//             // Navigate to the Generate page after successful submission
//             router.push("/generate"); // Adjust the path as necessary
//         } else {
//             console.error("Error in response:", response.status);
//             Alert.alert("Error", "Failed to submit the request.");
//         }
//     } catch (error) {
//         console.error("Error submitting request", error);
//         Alert.alert("Error", "An error occurred while submitting the request.");
//     } finally {
//         setLoading(false);
//     }
// };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ""}
//           onChangeText={(value) => handleInputChange(item, "username", value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ""}
//           onChangeText={(value) => handleInputChange(item, "password", value)}
//           secureTextEntry
//         />
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
//           </TouchableOpacity>
//         </>
//       ) : (
//         <Text style={styles.noPlatformsText}>No platforms selected.</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: '#000000',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   noPlatformsText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default DisplayingIcons;



import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useGlobalSearchParams, useRouter } from "expo-router"; 
import { StyleSheet, Text, View, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from "react-native"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const DisplayingIcons = () => { 
  const params = useGlobalSearchParams(); 
  const router = useRouter(); 

  const selectedPlatforms = params.selectedPlatforms ? JSON.parse(params.selectedPlatforms) : []; 
  const initialCredentials = { 
    x: { username: "", password: "" }, 
    instagram: { username: "", password: "" }, 
    facebook: { username: "", password: "" }, 
    google: { username: "", password: "" }, 
  }; 

  const [credentials, setCredentials] = useState(initialCredentials); 
  const [loading, setLoading] = useState(false); 
  const [caseInfo, setCaseInfo] = useState({ name: "", caseId: "" });

  useEffect(() => {
    const loadCaseInfo = async () => {
      try {
        const caseData = await AsyncStorage.getItem("caseInfo");
        if (caseData) {
          setCaseInfo(JSON.parse(caseData));
        }
      } catch (error) {
        console.error("Error loading case information", error);
      }
    };

    loadCaseInfo();
  }, []);

  const handleInputChange = (platform, field, value) => { 
    setCredentials((prev) => ({ 
      ...prev, 
      [platform]: { 
        ...prev[platform], 
        [field]: value, 
      }, 
    })); 
  };

const handleSubmit = async () => {
  setLoading(true);
  const { name, caseId } = caseInfo;

  // Prepare the request body with credentials for all selected platforms
  const requestBody = {
    caseName: name,
    caseId: caseId,
  };

  // Assuming you want to include the username and password for the first selected platform
  if (selectedPlatforms.length > 0) {
    const firstPlatform = selectedPlatforms[0]; // Get the first selected platform
    requestBody.username = credentials[firstPlatform].username; // Add username
    requestBody.password = credentials[firstPlatform].password; // Add password
  }

  console.log("Request Body:", requestBody); // Log the request body for debugging

  try {
    const response = await axios.post(
      "http://60.70.3.125:8000/api/v1/data/scrape",
      requestBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      console.log("Response data:", response.data);
      // Handle successful response
      Alert.alert("Success", "Data submitted successfully!");
    } else {
      console.error("Error in response:", response.status);
      Alert.alert("Error", "Failed to submit the request.");
    }
  } catch (error) {
    console.error("Error submitting request", error);
    Alert.alert("Error", "An error occurred while submitting the request.");
  } finally {
    setLoading(false);
  }
};


  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const { name, caseId } = caseInfo;
  
  //   // Prepare the request body with credentials for all selected platforms
  //   const requestBody = {
  //     caseName: name,
  //     caseId: caseId,
  //   };
  
  //   // Assuming you want to include the username and password for the first selected platform
  //   if (selectedPlatforms.length > 0) {
  //     const firstPlatform = selectedPlatforms[0]; // Get the first selected platform
  //     requestBody.username = credentials[firstPlatform].username; // Add username
  //     requestBody.password = credentials[firstPlatform].password; // Add password
  //   }
  
  //   console.log(caseInfo, requestBody);
  
  //   try {
  //     const response = await fetch("http://60.70.3.125:8000/api/v1/data/scrape", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams(requestBody).toString(),
  //       });

  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Response data:", data);
  //       // Handle successful response
  //       Alert.alert("Success", "Data submitted successfully!"); 
  //     } else {
  //       console.error("Error in response:", response.status);
  //       Alert.alert("Error", "Failed to submit the request.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting request", error);
  //     Alert.alert("Error", "An error occurred while submitting the request.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  const renderItem = ({ item }) => ( 
    <View style={styles.card}> 
      <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text> 
      <View style={styles.formGroup}> 
        <Text style={styles.label}>Username:</Text> 
        <TextInput 
          style={styles.input} 
          value={credentials[item]?.username || ""} 
          onChangeText={(value) => handleInputChange(item, "username", value)} 
        /> 
      </View> 
      <View style={styles.formGroup}> 
        <Text style={styles.label}>Password:</Text> 
        <TextInput 
          style={styles.input} 
          value={credentials[item]?.password || ""} 
          onChangeText={(value) => handleInputChange(item, "password", value)} 
          secureTextEntry 
        /> 
      </View> 
    </View> 
  ); 

  return ( 
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
    > 
      <Text style={styles.heading}>Selected Platforms:</Text> 
      {selectedPlatforms.length > 0 ? ( 
        <> 
          <FlatList 
            data={selectedPlatforms} 
            renderItem={renderItem} 
            keyExtractor={(item , index) => `${item}-${index}`} 
            horizontal 
            showsHorizontalScrollIndicator={false} 
          /> 
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noPlatformsText}>No platforms selected.</Text>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  card: {
    width: 300,
    height: 350,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  submitContainer: {
    marginTop: 10, 
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000000', 
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
  noneText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingButton: {
    backgroundColor: '#6c757d',
  },
  newButton: {
    backgroundColor: '#000000', 
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10, 
  },
  flatListContent: {
    paddingHorizontal: 10, 
  },
  extractButton: {
    backgroundColor: '#000000', 
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default DisplayingIcons;


// import React, { useState, useRef } from 'react';
// import { useGlobalSearchParams, useRouter } from 'expo-router'; 
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams(); 
//   const router = useRouter(); 
//   const selectedPlatforms = params.selectedPlatforms
//     ? JSON.parse(params.selectedPlatforms)
//     : [];

//   const initialCredentials = {
//     x: { username: '', password: '' },
//     instagram: { username: '', password: '' },
//     facebook: { username: '', password: '' },
//     google: { username: '', password: '' },
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [loading, setLoading] = useState(false);
//   const [showAnalysisButton, setShowAnalysisButton] = useState(false); 
//   const flatListRef = useRef(null);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };


//   const handleSubmit = async () => {
//     if (loading) return; 
//     setLoading(true); 
//     Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000)); 
//       setShowAnalysisButton(true); 
//     } catch (error) {
//       Alert.alert('Error', 'There was an error submitting the data.');
//     } finally {
//       setLoading(false); // Ensure loading is set to false after submission
//     }
//   };

//   const handleExtract = (platform) => {
//     const { username, password } = credentials[platform];
//     Alert.alert(`Extracted ${platform}`, `Username: ${username}\nPassword: ${password}`);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ''}
//           onChangeText={(value) => handleInputChange(item, 'username', value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ''}
//           onChangeText={(value) => handleInputChange(item, 'password', value)}
//           secureTextEntry
//         />
//       </View>
//       {/* <TouchableOpacity 
//         style={styles.extractButton} 
//         onPress={() => handleExtract(item)}
//       >
//         <Text style={styles.buttonText}>Extract</Text>
//       </TouchableOpacity> */}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             ref={flatListRef}
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             snapToAlignment="center" 
//             snapToInterval={300} 
//             contentContainerStyle={styles.flatListContent} 
//           />
//           <View style={styles.submitContainer}>
//             <TouchableOpacity 
//               style={[styles.button, loading && styles.loadingButton]} 
//               onPress={handleSubmit} 
//               disabled={loading} 
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" /> 
//               ) : (
//                 <Text style={styles.buttonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//           {showAnalysisButton && ( 
//           <TouchableOpacity 
//             style={styles.newButton} 
//  onPress={() => {
//               console.log(credentials); 
//               router.push("/(tabs2)/analyze"); 
//             }}
//           >
//             <Text style={styles.buttonText}>Analysis</Text>
//           </TouchableOpacity>
//           )}
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   submitContainer: {
//     marginTop: 10, 
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   noneText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   loadingButton: {
//     backgroundColor: '#6c757d',
//   },
//   newButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
//   flatListContent: {
//     paddingHorizontal: 10, 
//   },
//   extractButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
// });

// export default DisplayingIcons;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,

//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   submitContainer: {
//     marginTop: 10, 
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   noneText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   loadingButton: {
//     backgroundColor: '#6c757d',
//   },
//   newButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
//   flatListContent: {
//     paddingHorizontal: 10, 
//   },
//   extractButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
// });

// export default DisplayingIcons;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 15,
//     marginVertical: 10,
//     width: 200,
//   },
//   platformName: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   noPlatformsText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
// });


// import React, { useState, useEffect } from "react"; 
// import { useGlobalSearchParams, useRouter } from "expo-router"; 
// import { StyleSheet, Text, View, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from "react-native"; 
// import AsyncStorage from "@react-native-async-storage/async-storage"; 

// const DisplayingIcons = () => { 
//   const params = useGlobalSearchParams(); 
//   const router = useRouter(); 

//   const selectedPlatforms = params.selectedPlatforms ? JSON.parse(params.selectedPlatforms) : []; 
//   const initialCredentials = { 
//     x: { username: "", password: "" }, 
//     instagram: { username: "", password: "" }, 
//     facebook: { username: "", password: "" }, 
//     google: { username: "", password: "" }, 
//   }; 

//   const [credentials, setCredentials] = useState(initialCredentials); 
//   const [loading, setLoading] = useState(false); 
//   const [caseInfo, setCaseInfo] = useState({ name: "", caseId: "" });

//   useEffect(() => {
//     const loadCaseInfo = async () => {
//       try {
//         const caseData = await AsyncStorage.getItem("caseInfo");
//         if (caseData) {
//           setCaseInfo(JSON.parse(caseData));
//         }
//       } catch (error) {
//         console.error("Error loading case information", error);
//       }
//     };

//     loadCaseInfo();
//   }, []);

//   const handleInputChange = (platform, field, value) => { 
//     setCredentials((prev) => ({ 
//       ...prev, 
//       [platform]: { 
//         ...prev[platform], 
//         [field]: value, 
//       }, 
//     })); 
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const { name, caseId } = caseInfo;
//     const requestBody = {
//       username: credentials.instagram.username,
//       password: credentials.instagram.password,
//       caseName: name,
//       caseId: caseId,
//     };
//     console.log(caseInfo,requestBody)

//     try {
//       const response = await fetch("YOUR_API_ENDPOINT", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams(requestBody).toString(),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Response data:", data);
//         // Handle successful response
//         Alert.alert("Success", "Data submitted successfully!");
//       } else {
//         console.error("Error in response:", response.status);
//         Alert.alert("Error", "Failed to submit the request.");
//       }
//     } catch (error) {
//       console.error("Error submitting request", error);
//       Alert.alert("Error", "An error occurred while submitting the request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => ( 
//     <View style={styles.card}> 
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text> 
//       <View style={styles.formGroup}> 
//         <Text style={styles.label}>Username:</Text> 
//         <TextInput 
//           style={styles.input} 
//           value={credentials[item]?.username || ""} 
//           onChangeText={(value) => handleInputChange(item, "username", value)} 
//         /> 
//       </View> 
//       <View style={styles.formGroup}> 
//         <Text style={styles.label}>Password:</Text> 
//         <TextInput 
//           style={styles.input} 
//           value={credentials[item]?.password || ""} 
//           onChangeText={(value) => handleInputChange(item, "password", value)} 
//           secureTextEntry 
//         /> 
//       </View> 
//     </View> 
//   ); 

//   return ( 
//     <KeyboardAvoidingView 
//       style={styles.container} 
//       behavior={Platform.OS === "ios" ? "padding" : "height"} 
//     > 
//       <Text style={styles.heading}>Selected Platforms:</Text> 
//       {selectedPlatforms.length > 0 ? ( 
//         <> 
//           <FlatList 
//             data={selectedPlatforms} 
//             renderItem={renderItem} 
//             keyExtractor={(item, index) => `${item}-${index}`} 
//             horizontal 
//             showsHorizontalScrollIndicator={false} 
//           /> 
//           <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
//           </TouchableOpacity>
//         </>
//       ) : (
//         <Text style={styles.noPlatformsText}>No platforms selected.</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 15,
//     marginVertical: 10,
//     width: 200,
//   },
//   platformName: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   noPlatformsText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
// });

// export default DisplayingIcons;

// import React, { useState, useRef, useEffect } from "react";
// import { useGlobalSearchParams, useRouter } from "expo-router";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams();
//   const router = useRouter();
//   const selectedPlatforms = params.selectedPlatforms ? JSON.parse(params.selectedPlatforms) : [];
//   const caseInfo = params.caseInfo ? JSON.parse(params.caseInfo) : { name: "", caseId: "" };

//   const initialCredentials = {
//     x: { username: "", password: "" },
//     instagram: { username: "", password: "" },
//     facebook: { username: "", password: "" },
//     google: { username: "", password: "" },
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const payload = {
//         caseName: caseInfo.name,
//         caseId: caseInfo.caseId,
//         selectedPlatforms,
//         credentials,
//       };

//       const urlEncodedData = encodeURIComponent(JSON.stringify(payload));

//       console.log("URL Encoded Data:", urlEncodedData);

//       // Simulate API submission
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       Alert.alert("Success", "Data submitted successfully!");
//     } catch (error) {
//       Alert.alert("Error", "There was an error submitting the data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ""}
//           onChangeText={(value) => handleInputChange(item, "username", value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ""}
//           onChangeText={(value) => handleInputChange(item, "password", value)}
//           secureTextEntry
//         />
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           />
//           <TouchableOpacity
//             style={[styles.button, loading && styles.loadingButton]}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <Text style={styles.buttonText}>Submit</Text>
//             )}
//           </TouchableOpacity>
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
//   heading: { fontSize: 24, fontWeight: "bold", color: "#000000", marginBottom: 20 },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   platformName: { fontSize: 20, fontWeight: "bold", color: "#000000", marginBottom: 10 },
//   formGroup: { marginBottom: 15 },
//   label: { fontSize: 16, color: "#555", marginBottom: 5 },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
//   button: { backgroundColor: "#000000", padding: 10, borderRadius: 5, width: "100%", marginTop: 10 },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
//   noneText: { fontSize: 18, textAlign: "center", marginTop: 20 },
//   loadingButton: { backgroundColor: "#6c757d" },
// });

// export default DisplayingIcons;








// import React, { useState, useRef, useEffect } from 'react';
// import { useGlobalSearchParams, useRouter } from 'expo-router'; 
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams(); 
//   const router = useRouter(); // Initialize the router
//   const selectedPlatforms = params.selectedPlatforms
//     ? JSON.parse(params.selectedPlatforms)
//     : [];

//   const initialCredentials = {
//     x: { username: '', password: '' }, // Changed from twitter to x
//     instagram: { username: '', password: '' },
//     facebook: { username: '', password: '' },
//     google: { username: '', password: '' }, // Changed from telegram to google
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [showAnalysisButton, setShowAnalysisButton] = useState(false); // State for Analysis button
//   const flatListRef = useRef(null);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     if (loading) return; 
//     setLoading(true); 
//     Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000)); 
//       setShowAnalysisButton(true); 
//     } catch (error) {
//       Alert.alert('Error', 'There was an error submitting the data.');
//     }
//   };

//   const handleExtract = (platform) => {
//     const { username, password } = credentials[platform];
//     Alert.alert(`Extracted ${platform}`, `Username: ${username}\nPassword: ${password}`);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ''}
//           onChangeText={(value) => handleInputChange(item, 'username', value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ''}
//           onChangeText={(value) => handleInputChange(item, 'password', value)}
//           secureTextEntry
//         />
//       </View>
//       <TouchableOpacity 
//         style={styles.extractButton} 
//         onPress={() => handleExtract(item)}
//       >
//         <Text style={styles.buttonText}>Extract</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             ref={flatListRef}
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             snapToAlignment="center" 
//             snapToInterval={300} // Adjust this value based on your card width
//             onMomentumScrollEnd={(event) => {
//               const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
//               setCurrentIndex(index);
//             }}
//             contentContainerStyle={styles.flatListContent} // Add padding to the Flat List
//           />
//           <View style={styles.submitContainer}>
//             <TouchableOpacity 
//               style={[styles.button, loading && styles.loadingButton]} 
//               onPress={handleSubmit} 
//               disabled={loading} 
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" /> 
//               ) : (
//                 <Text style={styles.buttonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//           {showAnalysisButton && ( 
//           <TouchableOpacity 
//             style={styles.newButton} 
//             onPress={() => {
//               console.log(credentials); 
//               router.push("/(tabs2)/analyze"); 
//             }}
//           >
//             <Text style={styles.buttonText}>Analysis</Text>
//           </TouchableOpacity>
//         )}
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,

//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   submitContainer: {
//     marginTop: 10, 
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   noneText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   loadingButton: {
//     backgroundColor: '#6c757d',
//   },
//   newButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
//   flatListContent: {
//     paddingHorizontal: 10, 
//   },
//   extractButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
// });

// export default DisplayingIcons;


// import React, { useState, useRef, useEffect } from 'react';
// import { useGlobalSearchParams, useRouter } from 'expo-router'; 
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams(); 
//   const router = useRouter(); 
//   const selectedPlatforms = params.selectedPlatforms
//     ? JSON.parse(params.selectedPlatforms)
//     : [];

//   const initialCredentials = {
//     x: { username: '', password: '' }, 
//     instagram: { username: '', password: '' },
//     facebook: { username: '', password: '' },
//     google: { username: '', password: '' }, // Changed from telegram to google
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [showAnalysisButton, setShowAnalysisButton] = useState(false); // State for Analysis button
//   const flatListRef = useRef(null);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     if (loading) return; 
//     setLoading(true); 
//     Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000)); 
//       setShowAnalysisButton(true); 
//     } catch (error) {
//       Alert.alert('Error', 'There was an error submitting the data.');
//     }
//   };

//   const handleExtract = (platform) => {
//     const { username, password } = credentials[platform];
//     Alert.alert(`Extracted ${platform}`, `Username: ${username}\nPassword: ${password}`);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ''}
//           onChangeText={(value) => handleInputChange(item, 'username', value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ''}
//           onChangeText={(value) => handleInputChange(item, 'password', value)}
//           secureTextEntry
//         />
//       </View>
//       <TouchableOpacity 
//         style={styles.extractButton} 
//         onPress={() => handleExtract(item)}
//       >
//         <Text style={styles.buttonText}>Extract</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             ref={flatListRef}
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             pagingEnabled
//             snapToAlignment="center" 
//             snapToInterval={300} // Adjust this value based on your card width
//             onMomentumScrollEnd={(event) => {
//               const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
//               setCurrentIndex(index);
//             }}
//             contentContainerStyle={styles.flatListContent} // Add padding to the Flat List
//           />
//           <View style={styles.submitContainer}>
//             <TouchableOpacity 
//               style={[styles.button, loading && styles.loadingButton]} 
//               onPress={handleSubmit} 
//               disabled={loading} 
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" /> 
//               ) : (
//                 <Text style={styles.buttonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//           {showAnalysisButton && ( 
//           <TouchableOpacity 
//             style={styles.newButton} 
//             onPress={() => {
//               console.log(credentials); 
//               router.push("/(tabs2)/analyze"); 
//             }}
//           >
//             <Text style={styles.buttonText}>Analysis</Text>
//           </TouchableOpacity>
//         )}
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 20,
//   },

//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,

//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 10,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   submitContainer: {
//     marginTop: 10, 
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   noneText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   loadingButton: {
//     backgroundColor: '#6c757d',
//   },
//   newButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
//   flatListContent: {
//     paddingHorizontal: 10, 
//   },
//   extractButton: {
//     backgroundColor: '#000000', 
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
// });

// export default DisplayingIcons;











// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useGlobalSearchParams, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams();
//   const router = useRouter();
//   const selectedPlatforms = params.selectedPlatforms
//     ? JSON.parse(params.selectedPlatforms)
//     : [];

//   const initialCredentials = {
//     x: { username: "", password: "" },
//     instagram: { username: "", password: "" },
//     facebook: { username: "", password: "" },
//     google: { username: "", password: "" },
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleExtract = async () => {
//     try {
//       // Retrieve case information from AsyncStorage
//       const caseInfo = await AsyncStorage.getItem("caseInfo");
//       const parsedCaseInfo = caseInfo ? JSON.parse(caseInfo) : {};

//       // Prepare the payload
//       const payload = {
//         caseName: parsedCaseInfo.name,
//         caseId: parsedCaseInfo.caseId,
//         selectedPlatforms,
//         credentials,
//       };

//       // URL encode the payload
//       const encodedPayload = encodeURIComponent(JSON.stringify(payload));

//       // Simulate backend API call (replace with actual request if needed)
//       console.log("Extracting data with payload:", payload);
//       console.log("URL Encoded Payload:", encodedPayload);

//       Alert.alert("Success", "Data extracted and encoded successfully!");
//     } catch (error) {
//       console.error("Error during extraction:", error);
//       Alert.alert("Error", "Failed to extract data.");
//     }
//   };

//   const handleSubmit = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       // Simulate sending to a backend (you can replace this with an actual API request)
//       console.log("Submitting credentials:", credentials);

//       Alert.alert("Success", "Credentials submitted successfully!");

//       setLoading(false);

//       // Navigate to analysis or next step
//       router.push("/(tabs2)/analyze");
//     } catch (error) {
//       console.error("Error submitting credentials:", error);
//       Alert.alert("Error", "Failed to submit credentials.");
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>
//         {item.charAt(0).toUpperCase() + item.slice(1)}
//       </Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ""}
//           onChangeText={(value) => handleInputChange(item, "username", value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ""}
//           onChangeText={(value) => handleInputChange(item, "password", value)}
//           secureTextEntry
//         />
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           />
//           <View style={styles.buttonContainer}>
//             {/* Extract Button */}
//             <TouchableOpacity style={styles.button} onPress={handleExtract}>
//               <Text style={styles.buttonText}>Extract</Text>
//             </TouchableOpacity>
//             {/* Submit Button */}
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 loading && styles.loadingButton,
//                 { marginTop: 10 },
//               ]}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" />
//               ) : (
//                 <Text style={styles.buttonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
//   heading: { fontSize: 24, fontWeight: "bold", color: "#000000", marginBottom: 20 },
//   card: {
//     width: 300,
//     height: 200,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     marginRight: 10,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#000000",
//     marginBottom: 10,
//   },
//   formGroup: { marginBottom: 15 },
//   label: { fontSize: 16, color: "#555", marginBottom: 5 },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
//   buttonContainer: { marginTop: 10, alignItems: "center" },
//   button: {
//     backgroundColor: "#000000",
//     padding: 10,
//     borderRadius: 5,
//     width: "100%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   noneText: { fontSize: 18, textAlign: "center", marginTop: 20 },
//   loadingButton: { backgroundColor: "#6c757d" },
// });

// export default DisplayingIcons;




// import React, { useState, useRef, useEffect } from 'react';
// import { useGlobalSearchParams, useRouter } from 'expo-router';
// import { StyleSheet, Text, View, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams();
//   const router = useRouter();
//   const selectedPlatforms = params.selectedPlatforms ? JSON.parse(params.selectedPlatforms) : [];

//   const initialCredentials = {
//     x: { username: '', password: '' },
//     instagram: { username: '', password: '' },
//     facebook: { username: '', password: '' },
//     google: { username: '', password: '' },
//   };

//   const [credentials, setCredentials] = useState(initialCredentials);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (platform, field, value) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [platform]: {
//         ...prev[platform],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       // Retrieve case information from AsyncStorage
//       const caseInfo = await AsyncStorage.getItem("caseInfo");
//       const parsedCaseInfo = caseInfo ? JSON.parse(caseInfo) : {};

//       // Prepare the payload
//       const payload = {
//         caseName: parsedCaseInfo.name,
//         caseId: parsedCaseInfo.caseId,
//         selectedPlatforms,
//         credentials,
//       };

//       // URL encode the payload
//       const encodedPayload = encodeURIComponent(JSON.stringify(payload));

//       // Simulate sending to a backend (you can replace this with an actual API request)
//       console.log("Sending data:", payload);

//       // Simulated success message
//       Alert.alert("Success", "Data submitted successfully!");

//       setLoading(false);

//       // Navigate to analysis or next step
//       router.push("/(tabs2)/analyze");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       Alert.alert("Error", "Failed to submit data.");
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.username || ''}
//           onChangeText={(value) => handleInputChange(item, 'username', value)}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={credentials[item]?.password || ''}
//           onChangeText={(value) => handleInputChange(item, 'password', value)}
//           secureTextEntry
//         />
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <Text style={styles.heading}>Selected Platforms:</Text>
//       {selectedPlatforms.length > 0 ? (
//         <>
//           <FlatList
//             data={selectedPlatforms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           />
//           <View style={styles.submitContainer}>
//             <TouchableOpacity
//               style={[styles.button, loading && styles.loadingButton]}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" />
//               ) : (
//                 <Text style={styles.buttonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <Text style={styles.noneText}>None</Text>
//       )}
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#F9F9F9' },
//   heading: { fontSize: 24, fontWeight: 'bold', color: '#000000', marginBottom: 20 },
//   card: { width: 300, height: 200, padding: 20, borderRadius: 10, backgroundColor: '#FFFFFF', marginRight: 10 },
//   platformName: { fontSize: 20, fontWeight: 'bold', color: '#000000', marginBottom: 10 },
//   formGroup: { marginBottom: 15 },
//   label: { fontSize: 16, color: "#555", marginBottom: 5 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
//   submitContainer: { marginTop: 10, alignItems: 'center' },
//   button: { backgroundColor: '#000000', padding: 10, borderRadius: 5, width: '100%' },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: "bold", textAlign: 'center' },
//   noneText: { fontSize: 18, textAlign: 'center', marginTop: 20 },
//   loadingButton: { backgroundColor: '#6c757d' },
// });

// export default DisplayingIcons;














