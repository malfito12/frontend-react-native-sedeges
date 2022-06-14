import { View, Text } from 'react-native'
import React from 'react'

const Preguntas = ({route}) => {
    console.log(route.params)
  return (
    <View>
      <Text>Preguntas</Text>
      <Text>{route.params.title}</Text>
      <Text>{route.params.contenido.instructions}</Text>
    </View>
  )
}

export default Preguntas