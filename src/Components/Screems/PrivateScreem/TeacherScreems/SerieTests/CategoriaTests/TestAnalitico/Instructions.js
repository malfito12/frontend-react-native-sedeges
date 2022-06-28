import { View, Text, TouchableOpacity } from 'react-native'
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
      <Text style={{fontFamily:'Roboto_500Medium',color:'white'}}>Instructions</Text>
      <Text style={{fontFamily:'Roboto_500Medium',color:'white'}}>{route.params.title}</Text>
      <Text style={{fontFamily:'Roboto_500Medium',color:'white'}}>{route.params.contenido.instructions}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Preguntas', { data: preguntas,cont:0 })} style={{ backgroundColor: 'green', alignSelf: 'center', padding: 5 }}>
        <Text>comenzar</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.push('PruebaTest', { data: info })} style={{ backgroundColor: 'red', alignSelf: 'center', padding: 5 }}>
        <Text>prueba</Text>
      </TouchableOpacity> */}
    </Layaut>
  )
}

export default Instructions