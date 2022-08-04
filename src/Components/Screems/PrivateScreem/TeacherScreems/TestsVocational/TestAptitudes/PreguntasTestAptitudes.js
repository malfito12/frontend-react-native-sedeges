import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'

const array = []
const PreguntasTestAptitudes = ({ navigation, route }) => {
    // const data = route.params.contenido[0].contenido.preguntas
    const data = route.params.contenido[route.params.cont].contenido.preguntas
    console.log(data)
    const [user,setUser]=useState()
    const [test,setTest]=useState()
    const [changeData, setChangeData] = useState({
        pregunta1: '1',
        pregunta2: '1',
        pregunta3: '1',
        pregunta4: '1',
        pregunta5: '1',
        
    })

    //-------------------------------------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    //-------------GUARDAR DATOS---------------------
    AsyncStorageLib.getItem('user').then(resp=>setUser(JSON.parse(resp)))
    AsyncStorageLib.getItem('test_id').then(resp=>setTest(JSON.parse(resp)))
    // var user=AsyncStorageLib.getItem('user')
    // var test=AsyncStorageLib.getItem('test_id')
    const dataSave = () => {
        var serie = route.params.cont + 1
        var name = `Serie-${serie}`
        array.push({ seccion: name, respuestas: changeData,student_id: route.params.student_id,user_id:user,test_aptitud_id:test })
        // AsyncStorageLib.setItem(`Serie-${serie}`,changeData.pregunta1+'-'+changeData.pregunta2+'-'+changeData.pregunta3+'-'+changeData.pregunta4+'-'+changeData.pregunta5)
        // AsyncStorageLib.setItem(`Serie-${serie}`,JSON.stringify([changeData.pregunta1,changeData.pregunta2,changeData.pregunta3,changeData.pregunta4,changeData.pregunta5]))
        navigation.navigate('PreguntasTestAptitudes', { contenido: route.params.contenido, cont: route.params.cont + 1, student_id: route.params.student_id })
    }
    // const respData = []
    const dataSaveAndBack = async (e) => {
        e.preventDefault()
        var serie = route.params.cont + 1
        var name = `Serie-${serie}`
        array.push({ seccion: name, respuestas: changeData,student_id: route.params.student_id,user_id:user,test_aptitud_id:test })
        // respData.push({
        //     ...array,
        //     // student_id: route.params.student_id,
        // })
        // console.log(array)
        await axios.post(`${PORT_URL}test-aptitudes`, array)
            .then(resp => {
                // console.log(resp.data)
                alert(resp.data.message)
                navigation.navigate('TestOrientationType')
            })
            .catch(err => console.log(err))
        // console.log(respData)
        // AsyncStorageLib.setItem(`Serie-${serie}`,JSON.stringify([changeData.pregunta1,changeData.pregunta2,changeData.pregunta3,changeData.pregunta4,changeData.pregunta5]))
    }
    //-------------------------------------------------
    // console.log(array)
    return (
        <Layaut>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '75%' }}>
                        {data ? data.map((e, index) => (
                            <View key={index} >
                                <Text style={{ color: 'white', marginHorizontal: 15, padding: 5 }}>{e.content}</Text>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=>select(e.indexedDB)} style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: selectButton }}>
                                <Text style={{ color: 'white', margin:10 }}>{e.a}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white',margin:10 }}>{e.b}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white',margin:10 }}>{e.c}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                            <Text style={{ color: 'white',margin:10 }}>{e.d}</Text>
                            </TouchableOpacity>
                        </View> */}
                            </View>
                        )) : null}
                    </View>
                    <View style={{ width: '25%' }}>
                        <TextInput
                            value={changeData.pregunta1}
                            onChangeText={text => handleChange('pregunta1', text)}
                            keyboardType='numeric'
                            style={{ backgroundColor: 'white', alignSelf: 'center', width: 30, padding: 5, margin: 5 }}
                        />
                        <TextInput
                            value={changeData.pregunta2}
                            onChangeText={text => handleChange('pregunta2', text)}
                            keyboardType='numeric'
                            style={{ backgroundColor: 'white', alignSelf: 'center', width: 30, padding: 5, margin: 5 }}
                        />
                        <TextInput
                            value={changeData.pregunta3}
                            onChangeText={text => handleChange('pregunta3', text)}
                            keyboardType='numeric'
                            style={{ backgroundColor: 'white', alignSelf: 'center', width: 30, padding: 5, margin: 5 }}
                        />
                        <TextInput
                            value={changeData.pregunta4}
                            onChangeText={text => handleChange('pregunta4', text)}
                            keyboardType='numeric'
                            style={{ backgroundColor: 'white', alignSelf: 'center', width: 30, padding: 5, margin: 5 }}
                        />
                        <TextInput
                            value={changeData.pregunta5}
                            onChangeText={text => handleChange('pregunta5', text)}
                            keyboardType='numeric'
                            style={{ backgroundColor: 'white', alignSelf: 'center', width: 30, padding: 5, margin: 5 }}
                        />
                    </View>
                </View>
                {route.params.cont == 10 ? (
                    <TouchableOpacity onPress={dataSaveAndBack} style={{ alignSelf: 'center', width: '30%', borderRadius: 3, backgroundColor: 'red', margin: 10, padding: 15 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Volver y Guardar</Text>
                    </TouchableOpacity>
                ) : (

                    <TouchableOpacity onPress={dataSave} style={{ alignSelf: 'center', width: '30%', borderRadius: 3, backgroundColor: '#ffa726', margin: 10, padding: 15 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Siguiente</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Layaut >
    )
}

export default PreguntasTestAptitudes