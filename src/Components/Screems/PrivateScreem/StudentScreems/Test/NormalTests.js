import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const NormalTests = () => {
  const data = [
    { title: 'MATEMATICAS', id: 1 },
    { title: 'PSICOLOGIA', id: 2 },
    { title: 'LITERATURA', id: 3 },
    { title: 'FILOSOFIA', id: 7 },
    { title: 'HISTORIA', id: 8 },
    { title: 'CIVICA', id: 9 },
    { title: 'FISICA', id: 10 },
    { title: 'QUIMICA', id: 10 },
  ]
  return (
    <Layaut>
      <ScrollView style={{ marginBottom: 50 }}>
        {data.map((e, index) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 25,
              borderRadius: 5,
              marginBottom: 15,
            }}
            key={index}>
            <TouchableOpacity>
              <Text
              >{e.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Layaut>
  )
}

export default NormalTests