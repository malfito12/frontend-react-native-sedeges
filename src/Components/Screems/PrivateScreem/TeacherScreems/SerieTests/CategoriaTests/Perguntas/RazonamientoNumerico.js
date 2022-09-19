import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'


const RazonamientoNumerico = ({ route, navigation }) => {
  return (
    <Layaut>
      <ScrollView>
        <Text style={styles.textFont}>Preguntas</Text>
        {route.params.title === 'test 5 - Segunda Parte' ? (
          <>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
          </>
        ) : (
          <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
        )}
        <View>
          {route.params.data[route.params.cont].pregunta.resp.map((e, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={{ alignSelf: 'center' }}>{e.respuesta}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {route.params.cont == 4 ?
          (
            <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('InicioTest', { factor: route.params.description })} >
              <Text style={styles.textFont}>Volver</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('RazonamientoNumerico', { data: route.params.data, cont: route.params.cont + 1, description: route.params.description })} >
              <Text style={styles.textFont}>Siguiente</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </Layaut >
  )
}

export default RazonamientoNumerico

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal: 20,
    padding: 10
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 3,
    width: '40%',
    alignSelf: 'center'
  },
  buttonNext: {
    padding: 10,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal: 20,
    padding: 10
  },
  buttonBack: {
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
})