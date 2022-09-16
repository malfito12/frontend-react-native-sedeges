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
    {title:'RELACIONES ESPACIALES',image:TestGrafico,navi:()=>navigation.navigate('InicioTest',{factor:'RELACIONES ESPACIALES'})},
    {title:'RAZONAMIENTO LOGICO',image:TestAnalitico,navi:()=>navigation.navigate('InicioTest',{factor:'RAZONAMIENTO LOGICO'})},
    {title:'RAZONAMIENTO NUMERICO',image:TestMatematico,navi:()=>navigation.navigate('InicioTest',{factor:'RAZONAMIENTO NUMERICO'})},
    {title:'CONCEPTOS VERVALES',image:TestGrafico,navi:()=>navigation.navigate('InicioTest',{factor:'CONCEPTOS VERVALES'})},
  ]

  const categoryDat = [
    {
      id: 1,
      title: 'TEST GRAFICO',
      image: TestGrafico,
      direction: () => navigation.push('InicioTest',
        {
          categoria: 'TEST GRAFICO',
          id_cartegory: 'test-grafico',
        })
    },
    {
      id: 2,
      title: 'TEST ANALITICO',
      image: TestAnalitico,
      direction: () => navigation.push('InicioTest',
        {
          categoria: 'TEST ANALITICO',
          id_cartegory: 'test-analitico'
        })
    },
    {
      id: 3, title: 'TEST MATEMATICO',
      image: TestMatematico,
      direction: () => navigation.push('InicioTest',
        {
          categoria: 'TEST MATEMATICO',
          id_cartegory: 'test-matematico'
        })
    },
  ]
  return (
    <Layaut>
      {/* <FlatList 
      data={categoryDat}
      style={{width:'100%'}}
      keyExtractor={item=>item.id}
      renderItem={c=>(
          <View>
              <TouchableOpacity onPress={c.item.direction}  style={styles.testView}>
                  <Text style={{alignSelf:'center',fontFamily:'Roboto_500Medium'}}>{c.item.title}</Text>
              </TouchableOpacity>
          </View>
      )}
      /> */}
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
        {/* <LinearGradient style={{ borderRadius: 2, marginTop:30 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
          <TouchableOpacity style={{padding:10}} onPress={()=>navigation.navigate('RealizeTestVocational')}>
            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf:'center' }} >Terminar y Guardar</Text>
          </TouchableOpacity>
        </LinearGradient> */}
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