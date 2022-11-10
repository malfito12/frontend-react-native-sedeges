import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { cuetionarioIntereses } from '../../../../../../TestData/CuestionarioIntereses'
import { LinearGradient } from 'expo-linear-gradient'

const InstructionTestIntereses = ({ navigation, route }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getDataIntereses()
  }, [])
  // ------------------GET DATA-------------------------
  const getDataIntereses = async () => {
    setData(cuetionarioIntereses)
  }
  return (
    <Layaut>
      <ScrollView>
        {data.length > 0 ? (
          <View >
            <Text style={{ ...styles.textFont, alignSelf: 'center', marginHorizontal: 15 }}>{data[0].contenido.instructions.guia}</Text>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <View style={{ backgroundColor: '#ef6c00', width: '90%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={{ ...styles.textFont, marginHorizontal: 20 }}>{data[0].contenido.instructions.a}</Text>
              </View>
              <View style={{ backgroundColor: '#ef6c00', width: '90%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={{ ...styles.textFont, marginHorizontal: 20 }}>{data[0].contenido.instructions.b}</Text>
              </View>
              <View style={{ backgroundColor: '#ef6c00', width: '90%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={{ ...styles.textFont, marginHorizontal: 20 }}>{data[0].contenido.instructions.c}</Text>
              </View>
              <View style={{ backgroundColor: '#ef6c00', width: '90%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={{ ...styles.textFont, marginHorizontal: 20 }}>{data[0].contenido.instructions.d}</Text>
              </View>
              <View style={{ backgroundColor: '#ef6c00', width: '90%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={{ ...styles.textFont, marginHorizontal: 20 }}>{data[0].contenido.instructions.e}</Text>
              </View>
            </View>
            <LinearGradient style={{ borderRadius: 2, marginTop: 10, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
              <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.navigate('PreguntasTestIntereses', { contenido: data[0].contenido.cuestionario, cont: 0, student_id: route.params.student_id })}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Comenzar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (null)}
      </ScrollView>
    </Layaut>
  )
}

export default InstructionTestIntereses
const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    fontSize: 14,
    margin: 5,
    // alignSelf: 'center',
  },
})