import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type InputFieldProps = {
  value: string; // Value is a string
  onChangeText: (text: string) => void; // onChangeText is a function that receives a string
  placeholder?: string; // Placeholder is optional and is a string
  secureTextEntry?: boolean; // secureTextEntry is optional and is a boolean
};

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: InputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

// import React from "react";
// import { TextInput, StyleSheet } from "react-native";

// const InputField = ({
//   placeholder,
//   secureTextEntry = false,
// }: {
//   placeholder: string;
//   secureTextEntry?: boolean;
// }) => {
//   return (
//     <TextInput
//       placeholder={placeholder}
//       secureTextEntry={secureTextEntry}
//       style={styles.input}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     width: "100%",
//   },
// });

// export default InputField;

