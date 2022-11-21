import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'

const Layaut = ({ children }) => {
  return (
    <LinearGradient style={{height:'100%'}}  start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#000010', '#010822', '#000010']}>
      <Animatable.View animation='fadeInUp' style={styles.container}>

        {/* icons de celular arriba */}
        <StatusBar backgroundColor='#000010' />
        {children}
      </Animatable.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 20,
  //   flex: 1,
  //   alignItems: 'center',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   height: 300,
  //   position: 'absolute',
  // },
  container: {
    padding: 20,
    flex: 1,
    height: '100%',
  },
})

export default Layaut