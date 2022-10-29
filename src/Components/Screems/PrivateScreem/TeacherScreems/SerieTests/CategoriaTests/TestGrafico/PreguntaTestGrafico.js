import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../../../PortUrl/PortUrl'
import { useModalAlert, useModalAlertError } from '../../../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../../../Molecules/Alertas/Alerts'

var array = []
const PreguntaTestGrafico = ({ route, navigation }) => {
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            array = []
            return () => { isActive = false }
        }, [])
    )
    // console.log(route.params)
    const [user, setUser] = useState()
    const [event, setEvent] = useState()
    const [option1, setOption1] = useState(false)
    const [option2, setOption2] = useState(false)
    const [respuesta1, setRespuesta1] = useState(null)

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)
    const [respuesta2, setRespuesta2] = useState(null)

    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)

    AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
    AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))

    //---------------RELACIONES ESPECIFICAS 1-------------------
    const selectButton = (e) => {
        if (e === 1) {
            setOption1(true)
            setOption2(false)
            setRespuesta1('I')

        } else if (e === 2) {
            setOption1(false)
            setOption2(true)
            setRespuesta1('D')
        }
    }
    const siguiente1 = () => {
        if (option1 == true || option2 == true) {

            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta1,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.resp.puntaje
            })
            setOption1(false)
            setOption2(false)
            setRespuesta1(null)
            navigation.navigate('PreguntaTestGrafico', {
                factor: route.params.factor,
                data: route.params.data,
                cont: route.params.cont + 1,
                id: route.params.id,
                student_id: route.params.student_id,
                title: route.params.title,
            })
        } else {
            alert('Escoja un respuesta')
        }
    }
    const volver1 = async () => {
        if (option1 == true || option2 == true) {

            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta1,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.resp.puntaje
            })
            setOption1(false)
            setOption2(false)
            setRespuesta1(null)
            // console.log(array)
            setProgress(true)
            await axios.post(`${PORT_URL}post-result-madurez-t1`, array)
                .then(resp => {
                    setMessage(resp.data.message)
                    setProgress(false)
                    openModalAlert()
                    // navigation.navigate('CategoryTest', { student_id: route.params.student_id })
                    navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
                })
                .catch(err => {
                    setProgress(false)
                    if (err.response) {
                        setMessage(err.response.data.message)
                        openModalAlertError()
                    }
                })
        } else {
            alert('Escoja un respuesta')
        }
    }
    //---------------RELACIONES ESPECIFICAS 2-------------------
    const selecImage = (e) => {
        if (e === 1) {
            setImage1(true)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            setRespuesta2('1')
        } else if (e === 2) {
            setImage1(false)
            setImage2(true)
            setImage3(false)
            setImage4(false)
            setRespuesta2('2')
        } else if (e === 3) {
            setImage1(false)
            setImage2(false)
            setImage3(true)
            setImage4(false)
            setRespuesta2('3')
        } else if (e === 4) {
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(true)
            setRespuesta2('4')
        }
    }
    const siguiente2 = () => {
        if (image1 == true || image2 == true || image3 == true || image4 == true) {

            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta2,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.puntaje
            })
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            setRespuesta2(null)
            navigation.navigate('PreguntaTestGrafico', {
                factor: route.params.factor,
                data: route.params.data,
                cont: route.params.cont + 1,
                id: route.params.id,
                student_id: route.params.student_id,
                title: route.params.title,
            })
        } else {
            alert('Escoja una respuesta')
        }
    }
    const volver2 = async () => {
        if (image1 == true || image2 == true || image3 == true || image4 == true) {

            var namePre = `Pregunta ${route.params.cont + 1}`
            array.push({
                title: route.params.title,
                factor: route.params.factor,
                pregunta: namePre,
                respuesta: respuesta2,
                user_id: user,
                student_id: route.params.student_id,
                event_id: event,
                respCorrecta: route.params.data[route.params.cont].pregunta.puntaje
            })
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            setRespuesta2(null)
            // console.log(array)
            setProgress(true)
            await axios.post(`${PORT_URL}post-result-madurez-t2`, array)
                .then(resp => {
                    setMessage(resp.data.message)
                    setProgress(false)
                    openModalAlert()
                    // navigation.navigate('CategoryTest', { student_id: route.params.student_id })
                    navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
                })
                .catch(err => {
                    setProgress(false)
                    if (err.response) {
                        setMessage(err.response.data.message)
                        openModalAlertError()
                    }
                })
        } else {
            alert('Escoja una respuesta')
        }
    }
    var sum = 7
    const enviar = async () => {
        await AsyncStorageLib.setItem('prueba', JSON.stringify(sum))
        // navigation.navigate('CategoryTest')
        navigation.push('CategoryTest')
    }
    return (
        <>
            <Layaut>
                {route.params.id == 1 ? (
                    <>
                        <Text style={styles.textFont}>Preguntas</Text>
                        <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
                        <View style={{ margin: 10 }}>
                            <Image style={{ borderRadius: 75, width: 150, height: 150, marginBottom: 10, alignSelf: 'center' }} source={route.params.data[route.params.cont].pregunta.resp.respuesta} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => selectButton(1)} style={option1 === true ? styles.desSelect : styles.buttonIzqDer}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>Izquierda</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectButton(2)} style={option2 === true ? styles.desSelect : styles.buttonIzqDer} >
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>Derecha</Text>
                            </TouchableOpacity>
                        </View>
                        {route.params.cont == 4 ? (
                            <TouchableOpacity onPress={volver1} style={styles.buttonBack}>
                                {/* <TouchableOpacity onPress={() => enviar()} style={styles.buttonBack}> */}
                                {/* <TouchableOpacity onPress={() => navigation.navigate('InicioTest',{ categoria: 'TEST GRAFICO', id_cartegory: 'test-grafico' })} style={styles.buttonBack}> */}
                                <Text style={styles.textFont}>Volver</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttonNext} onPress={siguiente1} >
                                <Text style={styles.textFont}>Siguiente</Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : route.params.id == 2 ? (
                    <>
                        <Text style={styles.textFont}>Preguntas</Text>
                        <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
                        <View style={{ margin: 10 }}>
                            <Image style={styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[0].respuesta} />
                        </View>
                        <Text style={{ ...styles.textFont, alignSelf: 'center' }}>Opciones</Text>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => selecImage(1)}>
                                <Image style={image1 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[1].respuesta} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selecImage(2)}>
                                <Image style={image2 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[2].respuesta} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => selecImage(3)}>
                                <Image style={image3 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[3].respuesta} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selecImage(4)}>
                                <Image style={image4 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[4].respuesta} />
                            </TouchableOpacity>
                        </View>
                        {route.params.cont == 4 ? (
                            <TouchableOpacity onPress={volver2} style={styles.buttonBack}>
                                <Text style={styles.textFont}>Volver</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttonNext} onPress={siguiente2}>
                                <Text style={styles.textFont}>Siguiente</Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : (null)}
            </Layaut>
            {/* ---------------------ALERTS ------------------------ */}
            <Modal
                visible={progress}
                transparent
                animationType='fade'
            >
                <View style={styles.progressView}>
                    <Progress.Circle borderWidth={3} size={40} indeterminate={true} />
                </View>
            </Modal>
            <SuccesAlert isOpen={openModal} closeModal={closeModalAlert} text={message} />
            <ErrorAlert isOpen={openModalError} closeModal={closeModalAlertError} text={message} />

        </>
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
    },
    buttonIzqDer: {
        backgroundColor: '#ffab40',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    desSelect: {
        backgroundColor: '#ff5722',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1
    },
    buttonImage: {
        borderRadius: 5,
        width: 110,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center',
    },
    buttonImageSelect: {
        borderRadius: 5,
        width: 110,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 2
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})

export default PreguntaTestGrafico