import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const PreguntaTestGrafico = ({ route, navigation }) => {
    var sum=7
    const enviar=async()=>{
        await AsyncStorageLib.setItem('prueba',JSON.stringify(sum))
        // navigation.navigate('CategoryTest')
        navigation.push('CategoryTest')
    }
    return (
        <Layaut>
            <Text style={styles.textFont}>Preguntas</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.c}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {route.params.data[route.params.cont].pregunta.resp.map((e, index) => (
                    <TouchableOpacity key={index} style={{ margin: 10 }}>
                        <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={e.respuesta} />
                    </TouchableOpacity>
                ))}
            </View>
            {route.params.cont == 4 ? (
                <TouchableOpacity onPress={() => navigation.navigate('CategoryTest')} style={styles.buttonBack}>
                {/* <TouchableOpacity onPress={() => enviar()} style={styles.buttonBack}> */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('InicioTest',{ categoria: 'TEST GRAFICO', id_cartegory: 'test-grafico' })} style={styles.buttonBack}> */}
                    <Text style={styles.textFont}>Volver</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('PreguntaTestGrafico', { data: route.params.data, cont: route.params.cont + 1 })} >
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
        marginHorizontal: 20,
        padding: 10
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
    buttonBack: {
        padding: 10,
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRespuesta: {
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20
        // alignSelf:'center',
        // justifyContent:'center'
    }
})

export default PreguntaTestGrafico