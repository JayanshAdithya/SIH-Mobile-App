import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Alert } from "react-native";
import { useRouter } from 'expo-router';

const Extract = () => {
  const [selectedIcons, setSelectedIcons] = useState({
    twitter: false,
    instagram: false,
    facebook: false,
    telegram: false,
  }); // State to track selected icons
  const router = useRouter();
  const toggleSelection = (iconName) => {
    setSelectedIcons((prev) => ({
      ...prev,
      [iconName]: !prev[iconName],
    }));
  };

  const handleButtonClick = () => {
    const selectedPlatforms = Object.keys(selectedIcons).filter(
      (icon) => selectedIcons[icon]
    );

    console.log("Selected platforms:", selectedPlatforms);
    router.push({
      pathname: '/displayingIcons',
      params: { selectedPlatforms: JSON.stringify(selectedPlatforms) }, 
    });


    setSelectedIcons({
      twitter: false,
      instagram: false,
      facebook: false,
      telegram: false,
    });
  };

  // Check if at least one platform is selected
  const isButtonEnabled = Object.values(selectedIcons).some((value) => value);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Social Media</Text>

      {/* Row 1 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.square,
            selectedIcons.twitter && styles.selectedSquare,
          ]}
          onPress={() => toggleSelection("twitter")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Twitter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.square,
            selectedIcons.instagram && styles.selectedSquare,
          ]}
          onPress={() => toggleSelection("instagram")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", // Instagram icon URL
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Instagram</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.square,
            selectedIcons.facebook && styles.selectedSquare,
          ]}
          onPress={() => toggleSelection("facebook")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.square,
            selectedIcons.telegram && styles.selectedSquare,
          ]}
          onPress={() => toggleSelection("telegram")}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2111/2111644.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Telegram</Text>
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isButtonEnabled ? "#1E90FF" : "#CCCCCC" },
        ]}
        disabled={!isButtonEnabled}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Extract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#333333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedSquare: {
    backgroundColor: "#ADD8E6", // Light blue for selected state
    borderWidth: 2,
    borderColor: "#1E90FF", // Blue border for selected state
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  button: {
    marginTop: 20,
    width: "60%",
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
  