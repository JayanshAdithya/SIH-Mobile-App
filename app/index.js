import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={()=>router.push("/auth/login")}>
          <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})