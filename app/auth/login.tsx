import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'
import {Formik} from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'expo-router';

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").label("Username"),
  password: Yup.string().required("Password is required").label("Password"),
})

const Login = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Login</Text>
      <Formik
      initialValues={{username: "abcd", password: "123456789"}}
      onSubmit={(values) => {
        console.log(values)
        router.push("../(tabs)")}
      }
      validationSchema={validationSchema}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Text>Username</Text>
            <TextInput
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            />
            <Text>Password</Text>
            <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}

      </Formik>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})