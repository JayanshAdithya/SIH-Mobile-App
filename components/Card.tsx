import React from "react";
import { View, Text } from "react-native";

type CardProps = {
  title: string; 
  content: string; 
};

export default function Card({ title, content }: CardProps) {
  return (
    <View className="bg-white rounded-lg p-4 my-2 shadow-md">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      <Text className="text-base text-gray-800">{content}</Text>
    </View>
  );
}


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// type CardProps = {
//   title: string; // Title is a string
//   content: string; // Content is a string
// };

// export default function Card({ title, content }: CardProps) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.content}>{content}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   content: {
//     fontSize: 14,
//     color: "#333",
//   },
// });

