import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack,Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        {/* <Tabs.Screen name="index" options={{headerShown:false}} /> */}
        <Tabs.Screen name="extract" options={{headerShown:true, title:"Extract"}} />
        <Tabs.Screen name="generate" options={{headerShown:false, title:"Generate"}} />
        {/* <Tabs.Screen name="extract" options={{headerShown:false, title:"Generate"}} /> */}
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})