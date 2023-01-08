import { View, StyleSheet, StatusBar, Image, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import fondo2 from '../../../images/ImagesFondo/test-fondo2.jpg'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
const Layaut = ({ children }) => {
  const [cambio,setCambio]=useState([])
  AsyncStorageLib.getItem('fondo').then(resp=>setCambio(JSON.parse(resp)))
  // const fondo = { fondo1: false }
  // console.log(cambio)
  
  return (
    <>
      {cambio === '0'? (
        <LinearGradient style={{ height: '100%' }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#000010', '#010822', '#000010']}>
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>

        </LinearGradient>
      ) : cambio==='1'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/naruto.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='2'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/cuarto-hokage.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='3'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/bts1.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='4'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/bts2.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='5'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/chicos-rosas.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='6'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/corea.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='7'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/free-fire-1.png')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='8'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/free-fire-2.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ):cambio==='9'?(
        <View style={{height:'100%',width:'100%'}}>
          <Image style={styles.styleImage} source={require('../../../images/ImagesFondo2/goku.jpg')} />
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>
        </View>
      ): (
        <LinearGradient style={{ height: '100%' }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#000010', '#010822', '#000010']}>
          <Animatable.View animation='fadeInUp' style={styles.container}>
            {/* icons de celular arriba */}
            <StatusBar backgroundColor='#000010' />
            {children}
          </Animatable.View>

        </LinearGradient>
      )}


    </>
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
  fondoImage: {
    height: '100%',
  },
  styleImage:{
    height: '100%',
    width:'100%',
    position:'absolute', 
    marginBottom: 10, 
    alignSelf: 'center'
  }
})

export default Layaut