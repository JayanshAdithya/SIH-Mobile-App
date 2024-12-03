import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Screen1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null); // Replace with actual URL

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");
        if (storedUsername) setUsername(storedUsername);
        if (storedPassword) setPassword(storedPassword);
      } catch (error) {
        console.error("Error loading credentials from AsyncStorage:", error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      // Save username and password to AsyncStorage
      await AsyncStorage.multiSet([
        ["username", username],
        ["password", password],
      ]);

      console.log("Username and password saved locally!");

      // Send login details to backend
      const response = await axios.post(
        "http://your-backend-url.com/api/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setPdfUrl(
          "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
        );
        // Update pdfUrl if needed based on response
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleDownloadPdf = () => {
    Linking.openURL(pdfUrl).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Instagram Login </Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>

      {pdfUrl && (
        <TouchableOpacity
          onPress={handleDownloadPdf}
          style={styles.downloadButton}
        >
          <Text style={styles.downloadText}>
            Click here to download the PDF
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8", // Light gray background
  },
  
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    color: "#1A1A1A", // Darker text color
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "90%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15, // Adjusted for better touch targets
    backgroundColor: "#4C8BF5", // Blue button color
    borderRadius: 30, // Rounded edges
    alignItems: "center",
    justifyContent: "center", // Center the text
    width: "90%", // Match the input field width
    alignSelf: "center", // Center the button horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 18, // Slightly larger text for readability
    fontWeight: "bold",
  },

  downloadButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#4C8BF5", // Blue button color
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
  },
  downloadText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
