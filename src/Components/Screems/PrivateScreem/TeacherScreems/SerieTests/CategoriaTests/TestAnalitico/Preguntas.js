import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'

const Preguntas = ({ route, navigation }) => {
  console.log(route)
  
  return (
    <Layaut>
      <Text style={styles.textFont}>Preguntas</Text>
      <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
      <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
      <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.c}</Text>
      {/* <Text style={{ alignSelf: 'center',...styles.textFont }}>{route.params.cont}</Text> */}
      {
        route.params.data[route.params.cont].pregunta.resp.map((e,index)=>(
          <View key={index}>
            <TouchableOpacity style={styles.buttonRespuesta}>
              <Text style={{fontFamily:'Roboto_500Medium'}}>{e.respuesta}</Text>
            </TouchableOpacity>
          </View>
        ))
      }
      {route.params.cont == 4 ? (
        <TouchableOpacity onPress={() => navigation.navigate('CategoryTest')} style={styles.buttonBack}>
          <Text style={styles.textFont}>Volver</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('Preguntas', { data: route.params.data, cont: route.params.cont + 1 })} >
          <Text style={styles.textFont}>Siguiente</Text>
        </TouchableOpacity>
      )}

    </Layaut>
  )
}

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal:20,
    padding:10
  },
  buttonNext:{
    padding:10,
    margin:10,
    backgroundColor:'green',
    borderRadius:5,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonBack:{
    padding:10,
    margin:10,
    backgroundColor:'red',
    borderRadius:5,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonRespuesta:{
    padding:15,
    margin:10,
    backgroundColor:'white',
    borderRadius:5,
    alignItems:'center',
    marginHorizontal:20
    // alignSelf:'center',
    // justifyContent:'center'
  }
})

export default Preguntas