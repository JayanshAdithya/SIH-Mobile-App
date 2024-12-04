import React, { useState, useRef, useEffect } from 'react';
import { useGlobalSearchParams } from 'expo-router';
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
  const selectedPlatforms = params.selectedPlatforms
    ? JSON.parse(params.selectedPlatforms)
    : [];

  const initialCredentials = {
    twitter: { username: '', password: '' },
    instagram: { username: '', password: '' },
    facebook: { username: '', password: '' },
    telegram: { username: '', password: '' },
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const goToNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < selectedPlatforms.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const goToPreviousSlide = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true); // Start loading
    Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a network request
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting the data.');
    }
    // Do not set loading to false here, keep it true until tab change
  };

  // Reset loading state when the currentIndex changes
  useEffect(() => {
    if (loading) {
      setLoading(false); // Reset loading state when changing tabs
    }
  }, [currentIndex]);

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
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width );
              setCurrentIndex(index);
            }}
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
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  submitContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
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
});

export default DisplayingIcons;


// import React, { useState, useRef } from 'react';
// import { useGlobalSearchParams } from 'expo-router';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Dimensions,
//   TextInput,
//   Button,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// const DisplayingIcons = () => {
//   const params = useGlobalSearchParams(); 
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

//   const handleSubmit = () => {
//     Alert.alert('Submitted Data', JSON.stringify(credentials, null, 2));
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
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Back"
//           onPress={goToPreviousSlide}
//           disabled={currentIndex === 0}
//         />
//         <Button
//           title="Next"
//           onPress={goToNextSlide}
//           disabled={currentIndex === selectedPlatforms.length - 1}
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
//           <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//           >
//             <FlatList
//               ref={flatListRef}
//               data={selectedPlatforms}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => `${item}-${index}`}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               pagingEnabled
//             />
//           </KeyboardAvoidingView>
//           <View style={styles.submitContainer}>
//             <Button title="Submit" onPress={handleSubmit} />
//           </View>
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
//     backgroundColor: '#F8F9FA',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//     textAlign: 'center',
//   },
//   noneText: {
//     fontSize: 18,
//     color: '#777',
//   },
//   card: {
//     marginTop: '30%',
//     width: Dimensions.get('window').width * 0.8,
//     height: Dimensions.get('window').height * 0.4,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     marginHorizontal: Dimensions.get('window').width * 0.05,
//   },
//   platformName: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#4A90E2',
//     textAlign: 'center',
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#F8F9FA',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   submitContainer: {
//     marginTop: 20,
//     width: Dimensions.get('window').width * 0.8,
//     borderRadius: 10,
//   },
// });

// export default DisplayingIcons;
