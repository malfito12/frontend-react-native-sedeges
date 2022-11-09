import { View, TouchableOpacity, Text, FlatList, StyleSheet, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import TestMatematico from '../../../../../images/ImagesFondo/test-matematico.jpg'
import TestGrafico from '../../../../../images/ImagesFondo/test-grafico.jpg'
import TestAnalitico from '../../../../../images/ImagesFondo/test-analitico.jpg'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const CategoryTest = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params))
  const [carriedOutAll, setCarriedOutAll] = useState([])
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getResults()
      return () => { isActive = false }
    }, [])
  )

  const getResults = async () => {
    await axios.get(`${PORT_URL}get-carried-out-madurez-all?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
      .then(resp => {
        setCarriedOutAll(resp.data)
        // alert(JSON.stringify(resp.data))
      })
  }

  const data = [
    { title: 'RELACIONES ESPACIALES', image: TestGrafico, navi: () => navigation.navigate('InicioTest', { factor: 'RELACIONES ESPACIALES', student_id: route.params.student_id,event_id:route.params.event_id }) },
    { title: 'RAZONAMIENTO LOGICO', image: TestAnalitico, navi: () => navigation.navigate('InicioTest', { factor: 'RAZONAMIENTO LOGICO', student_id: route.params.student_id,event_id:route.params.event_id }) },
    { title: 'RAZONAMIENTO NUMERICO', image: TestMatematico, navi: () => navigation.navigate('InicioTest', { factor: 'RAZONAMIENTO NUMERICO', student_id: route.params.student_id,event_id:route.params.event_id }) },
    { title: 'CONCEPTOS VERBALES', image: TestGrafico, navi: () => navigation.navigate('InicioTest', { factor: 'CONCEPTOS VERBALES', student_id: route.params.student_id,event_id:route.params.event_id }) },
  ]
  return (
    <Layaut>
      <ScrollView>
        {/* {data.map((e, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={e.navi}  style={styles.testView}>
              <ImageBackground source={e.image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{e.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))} */}
        {carriedOutAll.result_testRE === true ? (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.testView}>
              <ImageBackground source={data[0].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium' }}>{data[0].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={data[0].navi} style={styles.testView}>
              <ImageBackground source={data[0].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{data[0].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {carriedOutAll.result_testRL === true ? (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity  style={styles.testView}>
              <ImageBackground source={data[1].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium' }}>{data[1].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={data[1].navi} style={styles.testView}>
              <ImageBackground source={data[1].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{data[1].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {carriedOutAll.result_testRN === true ? (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity  style={styles.testView}>
              <ImageBackground source={data[2].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium' }}>{data[2].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={data[2].navi} style={styles.testView}>
              <ImageBackground source={data[2].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{data[2].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {carriedOutAll.result_testCV === true ? (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.testView}>
              <ImageBackground source={data[3].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium' }}>{data[3].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={data[3].navi} style={styles.testView}>
              <ImageBackground source={data[3].image} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={{ padding: 30 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>{data[3].title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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