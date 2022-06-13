import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Layaut = ({ children }) => {
  return (
    <View style={styles.container} >

      {/* icons de celular arriba */}
      <StatusBar backgroundColor='#000010' />
      {children}
    </View>
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
    height:'100%',
    // alignItems: 'center',
    backgroundColor: '#000010'
    // backgroundColor: '#212121'
    // backgroundColor: 'rgba(0,0,0,0)'
  },
})

export default Layaut