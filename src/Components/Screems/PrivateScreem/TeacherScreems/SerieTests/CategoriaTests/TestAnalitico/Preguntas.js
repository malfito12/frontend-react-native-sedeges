import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Preguntas = ({ route, navigation }) => {
  // console.log(route.params)
  // var cont=route.params.cont;
  // if (route.params.cont > 5) {

  //   alert('no mas')
  // }
  return (
    <View>
      <Text>Preguntas</Text>
      <Text>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
      <Text>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
      <Text style={{alignSelf:'center'}}>{route.params.cont}</Text>
      {route.params.cont == 4 ? (
        <TouchableOpacity onPress={() => navigation.navigate('CategoryTest')} style={{ backgroundColor: 'red' }}>
          <Text>volver --</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Preguntas', { data: route.params.data, cont: route.params.cont + 1 })} style={{ backgroundColor: 'green' }}>
          <Text>siguiente --</Text>
        </TouchableOpacity>
      )}

    </View>
  )
}

export default Preguntas