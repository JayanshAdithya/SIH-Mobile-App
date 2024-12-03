// import React from "react";
// import { StyleSheet, View, Text, Image } from "react-native";
// import Carousel from "react-native-snap-carousel";

// const DisplayingIcons = ({ route }) => {
//   const { selectedPlatforms } = route.params; // Retrieve selected platforms
//   console.log("in displaying icons:",selectedPlatforms);

//   // Map each platform to its respective icon URL
//   const platformIcons = {
//     twitter: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
//     instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
//     facebook: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
//     telegram: "https://cdn-icons-png.flaticon.com/512/2111/2111644.png",
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.carouselItem}>
//       <Image source={{ uri: platformIcons[item] }} style={styles.icon} />
//       <Text style={styles.label}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Selected Platforms</Text>
//       <Carousel
//         data={selectedPlatforms}
//         renderItem={renderItem}
//         sliderWidth={300}
//         itemWidth={200}
//       />
//     </View>
//   );
// };

// export default DisplayingIcons;

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
//   carouselItem: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     width: 100,
//     height: 100,
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333333",
//   },
// });
