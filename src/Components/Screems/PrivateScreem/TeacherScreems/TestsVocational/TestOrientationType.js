import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const TestOrientationType = ({navigation}) => {
  return (
    <Layaut>
        <TouchableOpacity onPress={()=>navigation.push('InstructionTestAptitudes')} style={{borderWidth:1,borderColor:'blue', padding:20,marginBottom:10,alignItems:'center'}}>
            <Text style={{color:'white'}}>CUESTIONARIO DE APTITUDES</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.push('InstructionTestIntereses')} style={{borderWidth:1,borderColor:'blue',padding:20,marginBottom:10,alignItems:'center'}}>
            <Text style={{color:'white'}}>CUESTIONARIO DE INTERESES</Text>
        </TouchableOpacity>
      <Text>TestOrientationType</Text>
    </Layaut>
  )
}

export default TestOrientationType