import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

const Extract = () => {
  const [selectedIcons, setSelectedIcons] = useState({
    x: false, 
    instagram: false,
    facebook: false,
    google: false, 
  }); 
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
      x: false, 
      instagram: false,
      facebook: false,
      google: false, 
    });
  };

  const isButtonEnabled = Object.values(selectedIcons).some((value) => value);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Social Media</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.square,
            selectedIcons.x && styles.selectedSquare,
          ]}
          onPress={() => toggleSelection("x")} 
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5968/5968830.png", // You can replace this with the X icon URL
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>X</Text> 
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
            selectedIcons.google && styles.selectedSquare, 
          ]}
          onPress={() => toggleSelection("google")} 
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", 
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Google</Text> 
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isButtonEnabled ? "#3D4AB1" : "#CCCCCC" },
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
    backgroundColor: "#F 8F9FA",
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.0,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedSquare: {
    borderColor: "#3D4AB1",
    borderWidth: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#333333",
  },
  button: {     
    marginTop: 20,
    width: "60%",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#3D4AB1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// import React, { useState } from "react";
// import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useRouter } from 'expo-router';

// const Extract = () => {
//   const [selectedIcons, setSelectedIcons] = useState({
//     twitter: false,
//     instagram: false,
//     facebook: false,
//     google: false, // Changed from telegram to google
//   }); // State to track selected icons
//   const router = useRouter();

//   const toggleSelection = (iconName) => {
//     setSelectedIcons((prev) => ({
//       ...prev,
//       [iconName]: !prev[iconName],
//     }));
//   };

//   const handleButtonClick = () => {
//     const selectedPlatforms = Object.keys(selectedIcons).filter(
//       (icon) => selectedIcons[icon]
//     );

//     console.log("Selected platforms:", selectedPlatforms);
    
//     // Navigate to the Displaying Icons screen with selected platforms
//     router.push({
//       pathname: '/displayingIcons',
//       params: { selectedPlatforms: JSON.stringify(selectedPlatforms) }, 
//     });

//     // Reset selected icons after navigation
//     setSelectedIcons({
//       twitter: false,
//       instagram: false,
//       facebook: false,
//       google: false, // Reset google selection
//     });
//   };

//   // Check if at least one platform is selected
//   const isButtonEnabled = Object.values(selectedIcons).some((value) => value);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Select Your Social Media</Text>

//       {/* Row 1 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.twitter && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("twitter")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Twitter</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.instagram && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("instagram")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", // Instagram icon URL
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Instagram</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Row 2 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.facebook && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("facebook")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Facebook</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.google && styles.selectedSquare, // Changed from telegram to google
//           ]}
//           onPress={() => toggleSelection("google")} // Changed from telegram to google
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", // Google icon URL
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Google</Text> {/* Changed from Telegram to Google */}
//         </TouchableOpacity>
//       </View>

//       {/* Button */}
//       <TouchableOpacity
//         style={[
//           styles.button,
//           { backgroundColor: isButtonEnabled ? "#1E90FF" : "#CCCCCC" },
//         ]}
//         disabled={!isButtonEnabled}
//         onPress={handleButtonClick}
//       >
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Extract;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginBottom: 30,
//     color: "#333333",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "75%",
//     marginBottom: 20,
//   },
//   square: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.0,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   selectedSquare: {
//     borderColor: "#3D4AB1",
//     borderWidth: 2,
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
//   label: {
//     fontSize: 16,
//     color: "#333333",
//   },
//   button: {     
//     marginTop: 20,
//     width: "60%",
//     paddingVertical: 10,
//     borderRadius: 8,
//     backgroundColor: "#3D4AB1",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });


// import React, { useState } from "react";
// import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useRouter } from 'expo-router';

// const Extract = () => {
//   const [selectedIcons, setSelectedIcons] = useState({
//     twitter: false,
//     instagram: false,
//     facebook: false,
//     telegram: false,
//   }); // State to track selected icons
//   const router = useRouter();

//   const toggleSelection = (iconName) => {
//     setSelectedIcons((prev) => ({
//       ...prev,
//       [iconName]: !prev[iconName],
//     }));
//   };

//   const handleButtonClick = () => {
//     const selectedPlatforms = Object.keys(selectedIcons).filter(
//       (icon) => selectedIcons[icon]
//     );

//     console.log("Selected platforms:", selectedPlatforms);
    
//     // Navigate to the Displaying Icons screen with selected platforms
//     router.push({
//       pathname: '/displayingIcons',
//       params: { selectedPlatforms: JSON.stringify(selectedPlatforms) }, 
//     });

//     // Reset selected icons after navigation
//     setSelectedIcons({
//       twitter: false,
//       instagram: false,
//       facebook: false,
//       telegram: false,
//     });
//   };

//   // Check if at least one platform is selected
//   const isButtonEnabled = Object.values(selectedIcons).some((value) => value);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Select Your Social Media</Text>

//       {/* Row 1 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.twitter && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("twitter")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>X</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.instagram && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("instagram")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", // Instagram icon URL
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Instagram</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Row 2 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.facebook && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("facebook")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Facebook</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.square,
//             selectedIcons.telegram && styles.selectedSquare,
//           ]}
//           onPress={() => toggleSelection("telegram")}
//         >
//           <Image
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/512/2111/2111644.png",
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.label}>Telegram</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Button */}
//       <TouchableOpacity
//         style={[
//           styles.button,
//           { backgroundColor: isButtonEnabled ? "#1E90FF" : "#CCCCCC" },
//         ]}
//         disabled={!isButtonEnabled}
//         onPress={handleButtonClick}
//       >
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Extract;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginBottom: 30,
//     color: "#333333",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "75%",
//     marginBottom: 20,
//   },
//   square: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.0,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   selectedSquare: {
//     borderColor: "#3D4AB1",
//     borderWidth: 2,
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
//   label: {
//     fontSize: 16,
//     color: "#333333",
//   },
//   button: {     
//     marginTop: 20,
//     width: "60%",
//     paddingVertical: 10,
//     borderRadius: 8,
//     backgroundColor: "#3D4AB1",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });