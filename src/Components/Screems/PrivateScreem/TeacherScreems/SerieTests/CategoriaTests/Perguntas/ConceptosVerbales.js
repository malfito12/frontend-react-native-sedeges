import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import { useModalAlert, useModalAlertError } from '../../../../../../Molecules/Hooks/useModalAlert'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

var array = []
const ConceptosVerbales = ({ route, navigation }) => {
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            array = []
            return () => { isActive = false }
        }, [])
    )
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [user, setUser] = useState()
    const [event, setEvent] = useState()

    AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
    AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))

    const [pregunta1, setPregunta1] = useState(false)
    const [pregunta2, setPregunta2] = useState(false)
    const [pregunta3, setPregunta3] = useState(false)
    const [pregunta4, setPregunta4] = useState(false)
    const [respuesta1, setRespuesta1] = useState(null)

    //-------------CONCEPTOS VERVALES---------------

    const selectButton = (x) => {
        if (x === 1) {
            setPregunta1(true)
            setPregunta2(false)
            setPregunta3(false)
            setPregunta4(false)
            setRespuesta1('1')
        } else if (x === 2) {
            setPregunta1(false)
            setPregunta2(true)
            setPregunta3(false)
            setPregunta4(false)
            setRespuesta1('2')

        } else if (x === 3) {
            setPregunta1(false)
            setPregunta2(false)
            setPregunta3(true)
            setPregunta4(false)
            setRespuesta1('3')
        } else if (x === 4) {
            setPregunta1(false)
            setPregunta2(false)
            setPregunta3(false)
            setPregunta4(true)
            setRespuesta1('4')
        }
    }
    const siguiente = () => {
        if (pregunta1 == true || pregunta2 == true || pregunta3 == true || pregunta4 == true) {
            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta1,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
            })
            setPregunta1(false)
            setPregunta2(false)
            setPregunta3(false)
            setPregunta4(false)
            setRespuesta1(null)
            navigation.navigate('ConceptosVerbales', {
                factor: route.params.factor,
                data: route.params.data,
                cont: route.params.cont + 1,
                id: route.params.id,
                student_id: route.params.student_id,
                title: route.params.title,
            })
        } else {
            alert('Marque una respuesta')
        }
    }
    const volver = () => {
        if (pregunta1 == true || pregunta2 == true || pregunta3 == true || pregunta4 == true) {
            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta1,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
            })
            setPregunta1(false)
            setPregunta2(false)
            setPregunta3(false)
            setPregunta4(false)
            setRespuesta1(null)
            console.log(array)
            navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
        } else {
            alert('Marque una respuesta')
        }
    }
    return (
        <Layaut>
            <ScrollView>
                <Text style={styles.textFont}>Preguntas</Text>
                <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
                <View>
                    <TouchableOpacity style={pregunta1 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(1)}>
                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[0].respuesta}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={pregunta2 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(2)}>
                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[1].respuesta}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={pregunta3 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(3)}>
                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[2].respuesta}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={pregunta4 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(4)}>
                        <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[3].respuesta}</Text>
                    </TouchableOpacity>
                </View>
                {route.params.cont == 9 ? (
                    // <TouchableOpacity onPress={() => navigation.navigate('CategoryTest')} style={styles.buttonBack}>
                    <TouchableOpacity onPress={volver} style={styles.buttonBack}>
                        <Text style={styles.textFont}>Volver</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.buttonNext} onPress={siguiente} >
                        <Text style={styles.textFont}>Siguiente</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Layaut>
    )
}

export default ConceptosVerbales
const styles = StyleSheet.create({
    textFont: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        marginHorizontal: 20,
        padding: 5
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 3,
        width: '50%',
        alignSelf: 'center',
        alignItems:'center'
    },
    buttonSelected: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 3,
        width: '50%',
        alignSelf: 'center',
        borderWidth:2,
        borderColor:'red',
        alignItems:'center'
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
    textFont: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        marginHorizontal: 20,
        padding: 10
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
})