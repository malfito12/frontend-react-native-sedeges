import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'

const Instructions = ({ navigation, route }) => {
  var myArray = route.params.contenido.preguntas
  var preguntas=[]
  for(var i=0;i<5;i++){
    var rand = Math.floor(Math.random() * myArray.length)// conbierte la posicion del array en numero entero
    var rValue = myArray[rand]//obtiene el dato del array por el numero
    const aa=myArray.splice(rand,1)
    preguntas.push(rValue)
  }
  console.log(myArray)
  // console.log(rValue)

  const info = [
    { id: 1, data: { nombre: 'alex', apellido: 'maraza', edad: 28 } }
  ]
  return (
    <Layaut>
      <Text style={styles.textFont}>Instructions</Text>
      <Text style={styles.textFont}>{route.params.title}</Text>
      <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
      <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Preguntas', { data: preguntas,cont:0 })}>
        <Text style={styles.textFont}>Comenzar</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.push('PruebaTest', { data: info })} style={{ backgroundColor: 'red', alignSelf: 'center', padding: 5 }}>
        <Text>prueba</Text>
      </TouchableOpacity> */}
    </Layaut>
  )
}
const styles=StyleSheet.create({
  buttonStart:{
    padding:10,
    margin:10,
    backgroundColor:'green',
    borderRadius:5,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    fontSize:14
  }
})

export default Instructions