import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").label("Username"),
  password: Yup.string().required("Password is required").label("Password"),
});

const Login = () => {
  const router = useRouter();
  

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://60.70.3.125:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: values.username,
          password: values.password,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("authToken", token);
        const userToken = await AsyncStorage.getItem("authToken");
        console.log("Token in header:", token);
        Alert.alert("Success", "Login successful!");

        // Navigate to the next page
        router.push("/(tabs2)/case");
      } else {
        Alert.alert("Error", "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred while logging in.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
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
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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


// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const validationSchema = Yup.object().shape({
//   username: Yup.string().required("Username is required").label("Username"),
//   password: Yup.string().required("Password is required").label("Password"),
// });

// const Login = () => {
//   const router = useRouter();
//   const [caseInfo, setCaseInfo] = useState({
//     name: "",
//     caseId: "",
//     description: "",
//     nia_officer: "",
//     title: "",
//     cio_officer: "",
//     eo_officer: "",
//     eo_designation: "",
//     suspect_name: "",
//   });

//   useEffect(() => {
//     const loadCaseInfo = async () => {
//       try {
//         const storedCaseInfo = await AsyncStorage.getItem("caseInfo");
//         if (storedCaseInfo) {
//           setCaseInfo(JSON.parse(storedCaseInfo));
//         }
//       } catch (error) {
//         console.error("Error loading case information:", error);
//       }
//     };

//     loadCaseInfo();
//   }, []);

//   const handleLogin = async (values) => {
//     try {
//       const response = await fetch(
//         "http://60.70.3.125:8000/api/v1/users/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             username: values.username,
//             password: values.password,
//           }).toString(),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token;

//         // Store the token and case information in AsyncStorage
//         await AsyncStorage.multiSet([
//           ["authToken", token],
//           ["caseInfo", JSON.stringify(caseInfo)],
//         ]);

//         console.log("Token in header:", token);
//         Alert.alert("Success", "Login successful!");

//         // Navigate to the next page
//         router.push("/(tabs2)/case");
//       } else {
//         Alert.alert("Error", "Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       Alert.alert("Error", "An error occurred while logging in.");
//     }
//   };

//   const handleCaseInputChange = (field, value) => {
//     setCaseInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <Text style={styles.title}>Login</Text>
//           <Formik
//             initialValues={{ username: "", password: "" }}
//             onSubmit={(values) => handleLogin(values)}
//             validationSchema={validationSchema}
//           >
//             {({ handleChange, handleBlur, handleSubmit, values }) => (
//               <View style={styles.form}>
//                 <Text style={styles.label}>Username</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your username"
//                   placeholderTextColor="#ccc"
//                   onChangeText={handleChange("username")}
//                   onBlur={handleBlur("username")}
//                   value={values.username}
//                 />
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your password"
//                   placeholderTextColor="#ccc"
//                   secureTextEntry
//                   onChangeText={handleChange("password")}
//                   onBlur={handleBlur("password")}
//                   value={values.password}
//                 />
//                 {/* Case Information Input Fields */}
//                 <Text style={styles.label}>Suspect Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter suspect name"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) =>
//                     handleCaseInputChange("suspect_name", text)
//                   }
//                   value={caseInfo.suspect_name}
//                 />
//                 <Text style={styles.label}>Case Title</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter case title"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) => handleCaseInputChange("title", text)}
//                   value={caseInfo.title}
//                 />
//                 <Text style={styles.label}>Case Description</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter case description"
//                   placeholderTextColor="#ccc"
//                   multiline
//                   onChangeText={(text) =>
//                     handleCaseInputChange("description", text)
//                   }
//                   value={caseInfo.description}
//                 />
//                 <Text style={styles.label}>NIA Officer</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter NIA officer's name"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) =>
//                     handleCaseInputChange("nia_officer", text)
//                   }
//                   value={caseInfo.nia_officer}
//                 />
//                 <Text style={styles.label}>CIO Officer</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter CIO officer's name"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) =>
//                     handleCaseInputChange("cio_officer", text)
//                   }
//                   value={caseInfo.cio_officer}
//                 />
//                 <Text style={styles.label}>EO Officer</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter EO officer's name"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) =>
//                     handleCaseInputChange("eo_officer", text)
//                   }
//                   value={caseInfo.eo_officer}
//                 />
//                 <Text style={styles.label}>EO Designation</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter EO designation"
//                   placeholderTextColor="#ccc"
//                   onChangeText={(text) =>
//                     handleCaseInputChange("eo_designation", text)
//                   }
//                   value={caseInfo.eo_designation}
//                 />
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={() => {
//                     Alert.alert(
//                       "Case Info Saved",
//                       "Case information has been saved locally."
//                     );
//                     AsyncStorage.setItem("caseInfo", JSON.stringify(caseInfo));
//                   }}
//                 >
//                   <Text style={styles.buttonText}>Save Case Info</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={handleSubmit}
//                 >
//                   <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </Formik>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F9F9F9",
//     padding: 20,
//   },
//   card: {
//     width: "90%",
//     maxWidth: 400,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 15,
//     padding: 30,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     alignItems: "center",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   form: {
//     width: "100%",
//   },
//   label: {
//     alignSelf: "flex-start",
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 5,
//     marginLeft: 5,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#FFFFFF",
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
//     height: 45,
//     backgroundColor: "#000",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default Login





