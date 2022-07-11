import { View, TouchableOpacity, Text, FlatList, StyleSheet, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import TestMatematico from '../../../../../images/ImagesFondo/test-matematico.jpg'
import TestGrafico from '../../../../../images/ImagesFondo/test-grafico.jpg'
import TestAnalitico from '../../../../../images/ImagesFondo/test-analitico.jpg'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

const CategoryTest = ({ navigation, route }) => {
  // const [avance, setAvance] = useState({
  //   test1: 0,
  //   test2: 0,
  //   test3: 0,
  //   test4: 0,
  // })
  // useEffect(()=>{
  //   getData()
  // },[])
  // const getData=async()=>{
  //   await AsyncStorageLib.getItem('prueba')
  //   .then(resp=>{
  //     if(resp){
  //       setAvance({
  //         ...avance,
  //         test1:JSON.parse(resp)
  //       })
  //     }
  //   })
  //   // AsyncStorageLib.getItem('rol').then(resp => setRol(JSON.parse(resp)))
  //   // if(aa){
  //   //   setAvance({test1:aa})
  //   // }
  // }
  // console.log(avance.test1)

  const categoryDat = [
    {
      id: 1,
      title: 'TEST GRAFICO',
      image: TestGrafico,
      direction: () => navigation.push('InicioTest',
        {
          categoria: 'TEST GRAFICO',
          id_cartegory: 'test-grafico',
          // avance1:avance.test1,
          // avance2:avance.test2,
          // avance3:avance.test3,
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

        {categoryDat.map((e, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={e.direction} style={styles.testView}>
              <ImageBackground source={e.image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{e.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <LinearGradient style={{ borderRadius: 2, marginTop:30 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
          <TouchableOpacity style={{padding:10}} onPress={()=>navigation.navigate('RealizeTestScreem')}>
            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf:'center' }} >Terminar y Guardar</Text>
          </TouchableOpacity>
        </LinearGradient>
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