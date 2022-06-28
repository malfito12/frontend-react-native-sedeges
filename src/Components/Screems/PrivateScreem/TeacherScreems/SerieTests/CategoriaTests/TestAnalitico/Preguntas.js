import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'

const Preguntas = ({ route, navigation }) => {
  // console.log(route.params)
  // var cont=route.params.cont;
  // if (route.params.cont > 5) {

  //   alert('no mas')
  // }
  return (
    <Layaut>
      <Text style={styles.textFont}>Preguntas</Text>
      <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
      <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
      {/* <Text style={{ alignSelf: 'center',...styles.textFont }}>{route.params.cont}</Text> */}
      {route.params.cont == 4 ? (
        <TouchableOpacity onPress={() => navigation.navigate('CategoryTest')} style={{ backgroundColor: 'red' }}>
          <Text style={styles.textFont}>volver --</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Preguntas', { data: route.params.data, cont: route.params.cont + 1 })} style={{ backgroundColor: 'green' }}>
          <Text style={styles.textFont}>siguiente --</Text>
        </TouchableOpacity>
      )}

    </Layaut>
  )
}

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white'
  }
})

export default Preguntas