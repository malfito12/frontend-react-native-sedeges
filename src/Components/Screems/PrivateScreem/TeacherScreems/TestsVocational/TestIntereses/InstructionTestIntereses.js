import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { cuetionarioIntereses } from '../../../../../../TestData/CuestionarioIntereses'

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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.guia}</Text>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.a}</Text>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.b}</Text>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.c}</Text>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.d}</Text>
            <Text style={{ color: 'white' }}>{data[0].contenido.instructions.e}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PreguntasTestIntereses', { contenido: data[0].contenido.cuestionario, cont: 0, student_id: route.params.student_id })} style={{ borderRadius: 3, padding: 15, margin: 10, backgroundColor: 'green' }}>
              <Text style={{ color: 'white' }}>Comenzar</Text>
            </TouchableOpacity>
          </View>
        ) : (null)}
      </ScrollView>
    </Layaut>
  )
}

export default InstructionTestIntereses