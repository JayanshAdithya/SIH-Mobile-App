import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analyze = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analysis</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD', 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', 
  },
});

export default Analyze;