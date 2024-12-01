// HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined; 
  Screen1: undefined; 
  Screen2: undefined; 
  Screen3: undefined; 
  Screen4: undefined; 
};

const HomeScreen = () => {
  // Use NavigationProp with the defined parameter list
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Navigate to the respective screen based on button name
  const handleButtonPress = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Screen1')}>
        <Text style={styles.buttonText}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Screen2')}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Screen3')}>
        <Text style={styles.buttonText}>Whatsapp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Screen4')}>
        <Text style={styles.buttonText}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200EE', // Button background color
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Space between buttons
    width: '80%', // Button width
    alignItems: 'center', // Center text in button
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
  },
});

export default HomeScreen;