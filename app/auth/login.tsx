import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").label("Username"),
  password: Yup.string().required("Password is required").label("Password"),
});

const Login = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);

            router.push("/(tabs2)/case");
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#ccc"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9", 
    padding: 20,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;



// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'expo-router';

// const validationSchema = Yup.object().shape({
//   username: Yup.string().required("Username is required").label("Username"),
//   password: Yup.string().required("Password is required").label("Password"),
// });

// const Login = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         onSubmit={(values) => {
//           console.log(values);
//           // Navigate to the Case Information screen after successful login
//           router.push("/(tabs2)/case");
//         }}
//         validationSchema={validationSchema}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values }) => (
//           <View style={styles.form}>
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your username"
//               placeholderTextColor="#ccc"
//               onChangeText={handleChange("username")}
//               onBlur={handleBlur("username")}
//               value={values.username}
//             />
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#ccc"
//               secureTextEntry
//               onChangeText={handleChange("password")}
//               onBlur={handleBlur("password")}
//               value={values.password}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//               <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// };

// export default Login;




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8F9FD",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#3D4AB1",
//     marginBottom: 20,
//   },
//   form: {
//     width: "100%",
//     alignItems: "center",
//   },
//   label: {
//     alignSelf: "flex-start",
//     marginLeft: 10,
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     width: "100%",
//     height: 45,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#3D4AB1",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
