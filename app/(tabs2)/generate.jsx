import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Generate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generated</Text>
    </View>
  );
}

export default Generate;


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

