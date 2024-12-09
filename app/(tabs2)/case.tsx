import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("Name"),
  caseId: Yup.string().required("Case ID is required").label("Case ID"),
});

const CaseInformation = () => {
  const router = useRouter();

  const storeCaseInformation = async (values) => {
    try {
      await AsyncStorage.setItem("caseInfo", JSON.stringify(values));
      console.log("Case information stored successfully!");
    } catch (error) {
      console.error("Error storing case information", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Case Information</Text>
        <Formik
          initialValues={{ name: "", caseId: "" }}
          onSubmit={(values) => {
            console.log(values);
            // Store case information
            storeCaseInformation(values);
            // Navigate to the Extract page after successful submission
            router.push("/(tabs2)/extract");
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Enter Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#ccc"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <Text style={styles.label}>Case ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter case ID"
                placeholderTextColor="#ccc"
                onChangeText={handleChange("caseId")}
                onBlur={handleBlur("caseId")}
                value={values.caseId}
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

export default CaseInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FD",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
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
    height: 50,
    backgroundColor: "#000000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});


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
//     height: 50,
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
//     borderRadius: 5,
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