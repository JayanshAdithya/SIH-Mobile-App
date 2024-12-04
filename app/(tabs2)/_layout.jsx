import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const _layout = () => {
  return (
    <Tabs>
      {/* Define the tabs/screens you need */}
      <Tabs.Screen name="extract" options={{ headerShown: true, title: "Extract" }} />
      <Tabs.Screen name="generate" options={{ headerShown: false, title: "Generate" }} />
      <Tabs.Screen name="displayingIcons" options={{ headerShown: true, title: "Displaying Icons" }} />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
