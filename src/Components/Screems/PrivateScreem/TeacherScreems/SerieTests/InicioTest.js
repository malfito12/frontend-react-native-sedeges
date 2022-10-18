import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { data } from '../../../../../TestData/TestData'
import { useFocusEffect } from '@react-navigation/native'

var lala1 = 0
const InicioTest = ({ navigation, route }) => {
    const [test, setTest] = useState([])
    const [result, setResult] = useState([])

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
            setResult(resp.relacionesEspaciales)
        } else if (route.params.factor === 'RAZONAMIENTO LOGICO') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            setResult(resp.razonamientoLogico)
        } else if (route.params.factor === 'RAZONAMIENTO NUMERICO') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            setResult(resp.razonamientoNumerico)
        } else if (route.params.factor === 'CONCEPTOS VERBALES') {
            var resp = require('../../../../../TestData/DataMadurezMental')
            setResult(resp.conceptosVerBales)
        }
    }
    // console.log(result)

    return (
        <Layaut>
            {result.length > 0 ? (
                <>
                    {/* <Text style={{ color: 'white', alignSelf: 'center' }}>{test.event_name}</Text>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{test.event_description}</Text> */}
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{result[0].factor}</Text>
                    <FlatList
                        data={result}
                        // data={tests}
                        style={{ width: '100%' }}
                        keyExtractor={item => item.id}
                        renderItem={p => (
                            <View style={styles.testView}>
                                <View>
                                    <Text style={{ fontFamily: 'Roboto_500Medium' }}>{p.item.title}</Text>
                                    {/* <Text>{p.item.test_description}</Text> */}
                                </View>
                                {/* <TouchableOpacity onPress={() => navigation.navigate('Instructions', { title: p.item.title, id: p.item.id, contenido: p.item.contenido, categoria:p.item.categoria })} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}> */}
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
                                    {/* <TouchableOpacity onPress={() => go(p.item.id)} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 25 }}> */}
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Comenzar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
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