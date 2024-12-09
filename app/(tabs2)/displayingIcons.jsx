import React, { useState, useRef, useEffect } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router'; 
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const DisplayingIcons = () => {
  const params = useGlobalSearchParams(); 
  const router = useRouter(); // Initialize the router
  const selectedPlatforms = params.selectedPlatforms
    ? JSON.parse(params.selectedPlatforms)
    : [];

  const initialCredentials = {
    x: { username: '', password: '' }, // Changed from twitter to x
    instagram: { username: '', password: '' },
    facebook: { username: '', password: '' },
    google: { username: '', password: '' }, // Changed from telegram to google
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAnalysisButton, setShowAnalysisButton] = useState(false); // State for Analysis button
  const flatListRef = useRef(null);

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
    if (loading) return; 
    setLoading(true); 
    Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      setShowAnalysisButton(true); 
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting the data.');
    }
  };

  const handleExtract = (platform) => {
    const { username, password } = credentials[platform];
    Alert.alert(`Extracted ${platform}`, `Username: ${username}\nPassword: ${password}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.platformName}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={credentials[item]?.username || ''}
          onChangeText={(value) => handleInputChange(item, 'username', value)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={credentials[item]?.password || ''}
          onChangeText={(value) => handleInputChange(item, 'password', value)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity 
        style={styles.extractButton} 
        onPress={() => handleExtract(item)}
      >
        <Text style={styles.buttonText}>Extract</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.heading}>Selected Platforms:</Text>
      {selectedPlatforms.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={selectedPlatforms}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center" 
            snapToInterval={300} // Adjust this value based on your card width
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
              setCurrentIndex(index);
            }}
            contentContainerStyle={styles.flatListContent} // Add padding to the Flat List
          />
          <View style={styles.submitContainer}>
            <TouchableOpacity 
              style={[styles.button, loading && styles.loadingButton]} 
              onPress={handleSubmit} 
              disabled={loading} 
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" /> 
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
          {showAnalysisButton && ( 
          <TouchableOpacity 
            style={styles.newButton} 
            onPress={() => {
              console.log(credentials); 
              router.push("/(tabs2)/analyze"); 
            }}
          >
            <Text style={styles.buttonText}>Analysis</Text>
          </TouchableOpacity>
        )}
        </>
      ) : (
        <Text style={styles.noneText}>None</Text>
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
//     twitter: { username: '', password: '' },
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
//             snapToAlignment="center" // Ensures the item snaps to the center
//             snapToInterval={300} // Adjust this value based on your card width
//             onMomentumScrollEnd={(event) => {
//               const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
//               setCurrentIndex(index);
//             }}
//             contentContainerStyle={styles.flatListContent} // Add padding to the FlatList
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
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#3D4AB1',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#f9f9f9',
//     marginRight: 10,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3D4AB1',
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
//     backgroundColor: '#3D4AB1', 
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
//     backgroundColor: '#3D4AB1', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
//   flatListContent: {
//     paddingHorizontal: 10, 
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
//   const router = useRouter(); // Initialize the router
//   const selectedPlatforms = params.selectedPlatforms
//     ? JSON.parse(params.selectedPlatforms)
//     : [];

//   const initialCredentials = {
//     twitter: { username: '', password: '' },
//     instagram: { username: '', password: '' },
//     facebook: { username: '', password: '' },
//     telegram: { username: '', password: '' },
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

//   const goToNextSlide = () => {
//     const nextIndex = currentIndex + 1;
//     if (nextIndex < selectedPlatforms.length) {
//       setCurrentIndex(nextIndex);
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     }
//   };

//   const goToPreviousSlide = () => {
//     const prevIndex = currentIndex - 1;
//     if (prevIndex >= 0) {
//       setCurrentIndex(prevIndex);
//       flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
//     }
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

//   useEffect(() => {
//     if (loading) {
//       setLoading(false); 
//     }
//   }, [currentIndex]);

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
//             onMomentumScrollEnd={(event) => {
//               const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
//               setCurrentIndex(index);
//             }}
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
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#3D4AB1',
//     marginBottom: 20,
//   },
//   card: {
//     width: 300,
//     height: 350,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#f9f9f9',
//     marginRight: 10,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3D4AB1',
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
//     backgroundColor: '#3D4AB1', 
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
//     backgroundColor: '#3D4AB1', 
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginTop: 10, 
//   },
// });

// export default DisplayingIcons;






