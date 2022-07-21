import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { cuestionarioAptitudes } from '../../../../../../TestData/CuestionarioAptitudes'

const InstructionTestAptitudes = ({navigation}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        getDataAptitudes()
    }, [])

    // ------------------GET DATA-------------------------
    const getDataAptitudes = async () => {
        setData(cuestionarioAptitudes)
    }
    // console.log(data)
    return (
        <Layaut>
            {data.length > 0 ? (
                <View style={{alignItems:'center'}}>
                    <Text style={{ color: 'white' }}>{data[0].contenido.instructions.guia}</Text>
                    <Text style={{ color: 'white' }}>{data[0].contenido.instructions.a}</Text>
                    <Text style={{ color: 'white' }}>{data[0].contenido.instructions.b}</Text>
                    <Text style={{ color: 'white' }}>{data[0].contenido.instructions.c}</Text>
                    <Text style={{ color: 'white' }}>{data[0].contenido.instructions.d}</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('PreguntasTestAptitudes',{contenido:data[0].contenido.cuestionario})} style={{borderRadius:3,padding:15,margin:10,backgroundColor:'green'}}>
                        <Text style={{color:'white'}}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            ) : (null)}
        </Layaut>
    )
}

export default InstructionTestAptitudes