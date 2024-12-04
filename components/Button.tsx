// import React from "react";
// import { TouchableOpacity, Text,} from "react-native";

// type ButtonProps = {
//   title: string; // Title should be a string
//   onPress: (event: GestureResponderEvent) => void; // onPress is a function with a specific event type
// };

// export default function Button({ title, onPress }: ButtonProps) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="bg-purple-600 py-2 px-4 rounded-md items-center w-2/5 self-center"
//     >
//       <Text className="text-white text-lg font-bold">{title}</Text>
//     </TouchableOpacity>
//   );
// }


import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string; // Title should be a string
  onPress: (event: GestureResponderEvent) => void; // onPress is a function with a specific event type
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#6200EE",
      paddingVertical: 10,
      paddingHorizontal: 15, 
      borderRadius: 5,
      alignItems: "center",
      width: '40%', 
      alignSelf: 'center', 
    },
    text: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

