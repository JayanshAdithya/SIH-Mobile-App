import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontSize: 18,
    color: "#B00020",
  },
});
