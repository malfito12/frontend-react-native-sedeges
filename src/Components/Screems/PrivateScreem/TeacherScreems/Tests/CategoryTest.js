import { View, TouchableOpacity, Text, FlatList, StyleSheet, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import TestMatematico from '../../../../../images/ImagesFondo/test-matematico.jpg'
import TestGrafico from '../../../../../images/ImagesFondo/test-grafico.jpg'
import TestAnalitico from '../../../../../images/ImagesFondo/test-analitico.jpg'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

const CategoryTest = ({ navigation, route }) => {

  const data=[
    {title:'RELACIONES ESPACIALES',image:TestGrafico,navi:()=>navigation.navigate('InicioTest',{factor:'RELACIONES ESPACIALES',student_id: route.params.student_id})},
    {title:'RAZONAMIENTO LOGICO',image:TestAnalitico,navi:()=>navigation.navigate('InicioTest',{factor:'RAZONAMIENTO LOGICO',student_id: route.params.student_id})},
    {title:'RAZONAMIENTO NUMERICO',image:TestMatematico,navi:()=>navigation.navigate('InicioTest',{factor:'RAZONAMIENTO NUMERICO',student_id: route.params.student_id})},
    {title:'CONCEPTOS VERVALES',image:TestGrafico,navi:()=>navigation.navigate('InicioTest',{factor:'CONCEPTOS VERBALES',student_id: route.params.student_id})},
  ]
  return (
    <Layaut>
      <ScrollView>
        {data.map((e, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={e.navi}  style={styles.testView}>
              <ImageBackground source={e.image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{e.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

    </Layaut>
  )
}

const styles = StyleSheet.create({
  testView: {
    borderRadius: 5,
  },
  ImageView: {
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})

export default CategoryTest