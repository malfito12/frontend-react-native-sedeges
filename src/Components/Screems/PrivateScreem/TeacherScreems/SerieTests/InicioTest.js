import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { data } from '../../../../../TestData/TestData'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

var lala1 = 0
const InicioTest = ({ navigation, route }) => {
    const [test, setTest] = useState([])
    const [result, setResult] = useState([])
    const [carriedOut, setCarriedOut] = useState([])

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getInformacion()
            return () => { isActive = false }
        }, [])
    )

    //--------------OBTENER INFORMACION DE PREGUNTAS-------------------
    const getInformacion = async () => {
        await AsyncStorageLib.getItem('event_id').then(resp => {
            setTest(JSON.parse(resp))
        })
        if (route.params.factor === 'RELACIONES ESPACIALES') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            await axios.get(`${PORT_URL}get-carried-out-madurez-RE?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
                .then(resp => {
                    setCarriedOut(resp.data)
                })
                .catch(err => console.log(err))
            setResult(resp.relacionesEspaciales)

        } else if (route.params.factor === 'RAZONAMIENTO LOGICO') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            await axios.get(`${PORT_URL}get-carried-out-madurez-RL?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
                .then(resp => {
                    setCarriedOut(resp.data)
                })
                .catch(err => console.log(err))
            setResult(resp.razonamientoLogico)
        } else if (route.params.factor === 'RAZONAMIENTO NUMERICO') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            await axios.get(`${PORT_URL}get-carried-out-madurez-RN?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
                .then(resp => {
                    setCarriedOut(resp.data)
                })
                .catch(err => console.log(err))
            setResult(resp.razonamientoNumerico)
        } else if (route.params.factor === 'CONCEPTOS VERBALES') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            await axios.get(`${PORT_URL}get-carried-out-madurez-CV?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
                .then(resp => {
                    setCarriedOut(resp.data)
                })
                .catch(err => console.log(err))
            setResult(resp.conceptosVerBales)
        }
    }
    // console.log(result)
    return (
        <Layaut>
            {result.length > 0 ? (
                <>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{result[0].factor}</Text>
                    {/* <FlatList
                        data={result}
                        // data={tests}
                        style={{ width: '100%' }}
                        keyExtractor={item => item.id}
                        renderItem={p => (
                            <View style={styles.testView}>
                                <View>
                                    <Text style={{ fontFamily: 'Roboto_500Medium' }}>{p.item.title}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Instructions', {
                                        title: p.item.title,
                                        id: p.item.id,
                                        contenido: p.item.contenido,
                                        factor: p.item.factor,
                                        description: p.item.description,
                                        student_id: route.params.student_id
                                    })}
                                    style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    /> */}
                    <ScrollView>
                        {result[0].factor === 'RELACIONES ESPACIALES' ? (
                            <>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[0].title}</Text>
                                    </View>
                                    {carriedOut.result_test1==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[0].title,
                                            id: result[0].id,
                                            contenido:result[0].contenido,
                                            factor: result[0].factor,
                                            description: result[0].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[1].title}</Text>
                                    </View>
                                    {carriedOut.result_test2==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[1].title,
                                            id: result[1].id,
                                            contenido:result[1].contenido,
                                            factor: result[1].factor,
                                            description: result[1].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                            </>

                        ) : result[0].factor === 'RAZONAMIENTO LOGICO' ? (
                            <>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[0].title}</Text>
                                    </View>
                                    {carriedOut.result_test3==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[0].title,
                                            id: result[0].id,
                                            contenido:result[0].contenido,
                                            factor: result[0].factor,
                                            description: result[0].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[1].title}</Text>
                                    </View>
                                    {carriedOut.result_test4==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[1].title,
                                            id: result[1].id,
                                            contenido:result[1].contenido,
                                            factor: result[1].factor,
                                            description: result[1].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                            </>
                        ) : result[0].factor === 'RAZONAMIENTO NUMERICO' ? (
                            <>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[0].title}</Text>
                                    </View>
                                    {carriedOut.result_test5_parte1==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[0].title,
                                            id: result[0].id,
                                            contenido:result[0].contenido,
                                            factor: result[0].factor,
                                            description: result[0].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[1].title}</Text>
                                    </View>
                                    {carriedOut.result_test5_parte2==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[1].title,
                                            id: result[1].id,
                                            contenido:result[1].contenido,
                                            factor: result[1].factor,
                                            description: result[1].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[2].title}</Text>
                                    </View>
                                    {carriedOut.result_test6==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[2].title,
                                            id: result[2].id,
                                            contenido:result[2].contenido,
                                            factor: result[2].factor,
                                            description: result[2].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                            </>
                        ) : result[0].factor === 'CONCEPTOS VERBALES' ? (
                            <>
                                <View style={styles.testView}>
                                    <View>
                                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{result[0].title}</Text>
                                    </View>
                                    {carriedOut.result_test7==true?(
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'red', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>
                                    ):(
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Instructions', {
                                            title: result[0].title,
                                            id: result[0].id,
                                            contenido:result[0].contenido,
                                            factor: result[0].factor,
                                            description: result[0].description,
                                            student_id: route.params.student_id
                                        })}
                                        style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                    </TouchableOpacity>

                                    )}
                                </View>
                            </>
                        ) : (null)}
                    </ScrollView>
                </>
            ) : (null)}
        </Layaut>
    )
}
const styles = StyleSheet.create({
    testView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 7,
        borderRadius: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})



export default InicioTest