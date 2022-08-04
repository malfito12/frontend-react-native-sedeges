import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { cuestionarioAptitudes } from '../../../../../../TestData/CuestionarioAptitudes'

const InstructionTestAptitudes = ({navigation,route}) => {
    // console.log(route.params.student_id)
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
                    <TouchableOpacity onPress={()=>navigation.navigate('PreguntasTestAptitudes',{contenido:data[0].contenido.cuestionario,cont:0,student_id:route.params.student_id})} style={{borderRadius:3,padding:15,margin:10,backgroundColor:'green'}}>
                        <Text style={{color:'white'}}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            ) : (null)}
        </Layaut>
    )
}

export default InstructionTestAptitudes