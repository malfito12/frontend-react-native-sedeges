import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { FontAwesome } from '@expo/vector-icons';
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { useModalAlert, useModalAlertError } from '../../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../../Molecules/Alertas/Alerts'
import { LinearGradient } from 'expo-linear-gradient'

var array = []
const PreguntasTestIntereses = ({ navigation, route }) => {
    const data = route.params.contenido[route.params.cont].contenido.preguntas
    // console.log(data)
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [user, setUser] = useState()
    const [event, setEvent] = useState()
    const [modalResp, setModalResp] = useState(false)
    const [changeData, setChangeData] = useState({
        pregunta1: '0',
        pregunta2: '0',
        pregunta3: '0',
        pregunta4: '0',
        pregunta5: '0',
        pregunta6: '0',
        textPregunta1: 'sin respuesta',
        textPregunta2: 'sin respuesta',
        textPregunta3: 'sin respuesta',
        textPregunta4: 'sin respuesta',
        textPregunta5: 'sin respuesta',
        textPregunta6: 'sin respuesta',
    })
    const cleanUp = {
        pregunta1: '0',
        pregunta2: '0',
        pregunta3: '0',
        pregunta4: '0',
        pregunta5: '0',
        pregunta6: '0',
        textPregunta1: 'sin respuesta',
        textPregunta2: 'sin respuesta',
        textPregunta3: 'sin respuesta',
        textPregunta4: 'sin respuesta',
        textPregunta5: 'sin respuesta',
        textPregunta6: 'sin respuesta',
    }
    const [pre, setPre] = useState(null)
    const [alert, setAlert] = useState(false)
    const openModalAlertSuccess = () => {
        setAlert(true)
    }
    const closeModalAlertSuccess = () => {
        setAlert(false)
        navigation.navigate('TypeTest', { student_id: route.params.student_id })
    }
    //-------------------------------------------------
    const openModalResp = (pregunta) => {
        setPre(pregunta)
        setModalResp(true)
    }
    const closeModalResp = (num, text) => {
        if (pre === 'pregunta1') {
            setChangeData({ ...changeData, pregunta1: num, textPregunta1: text })
        } else if (pre === 'pregunta2') {
            setChangeData({ ...changeData, pregunta2: num, textPregunta2: text })
        } else if (pre === 'pregunta3') {
            setChangeData({ ...changeData, pregunta3: num, textPregunta3: text })
        } else if (pre === 'pregunta4') {
            setChangeData({ ...changeData, pregunta4: num, textPregunta4: text })
        } else if (pre === 'pregunta5') {
            setChangeData({ ...changeData, pregunta5: num, textPregunta5: text })
        } else if (pre === 'pregunta6') {
            setChangeData({ ...changeData, pregunta6: num, textPregunta6: text })
        }
        setModalResp(false)
    }
    //-------------GUARDAR DATOS---------------------
    AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
    AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))
    const dataSave = () => {
        if (changeData.pregunta1 != '0' && changeData.pregunta2 != '0' && changeData.pregunta3 != '0' && changeData.pregunta5 != '0' && changeData.pregunta6 != '0') {
            var serie = route.params.cont + 1
            var name = `Serie-${serie}`
            array.push({ seccion: name, respuestas: changeData, student_id: route.params.student_id, user_id: user, event_id: event })
            navigation.navigate('PreguntasTestIntereses', { contenido: route.params.contenido, cont: route.params.cont + 1, student_id: route.params.student_id })
            setChangeData(cleanUp)
        } else {
            setMessage('Asegurese de responder todas las preguntas')
            openModalAlertError()
        }
    }
    const dataSaveAndBack = async (e) => {
        e.preventDefault()
        if (changeData.pregunta1 != '0' && changeData.pregunta2 != '0' && changeData.pregunta3 != '0' && changeData.pregunta5 != '0' && changeData.pregunta6 != '0') {
            var serie = route.params.cont + 1
            var name = `Serie-${serie}`
            array.push({ seccion: name, respuestas: changeData, student_id: route.params.student_id, user_id: user, event_id: event })
            setProgress(true)
            await axios.post(`${PORT_URL}test-intereses`, array)
                .then(resp => {
                    array = []
                    setProgress(false)
                    openModalAlertSuccess()
                    setChangeData(cleanUp)
                    // alert(resp.data.message)
                    // navigation.navigate('TypeTest', { student_id: route.params.student_id })
                })
                .catch(err => {
                    setProgress(false)
                    if (err.response) {
                        setMessage(err.response.data.message)
                        openModalAlertError()
                    }
                })
        } else {
            setMessage('Asegurese de responder todas las preguntas')
            openModalAlertError()
        }
    }
    return (
        <>
            <Layaut>
                <ScrollView>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[0].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta1 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta1')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta1}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[1].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta2 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta2')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta2}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[2].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta3 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta3')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta3}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[3].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta4 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta4')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta4}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[4].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta5 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta5')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta5}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginHorizontal: 15 }}>{data[5].content}</Text>
                            <LinearGradient style={{ borderRadius: 25, marginTop: 10, width: '80%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={changeData.pregunta6 != '0' ? ['#ef6c00', '#f57c00', '#fb8c00'] : ['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity style={{ padding: 12 }} onPress={() => openModalResp('pregunta6')}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>{changeData.textPregunta6}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '75%' }}>
                            <ScrollView>
                                {data ? data.map((e, index) => (
                                    <View key={index} style={{ height: 71 }}>
                                        <Text style={{ color: 'white', marginHorizontal: 15, marginBottom: 5 }}>{e.content}</Text>
                                    </View>
                                )) : null}
                            </ScrollView>
                        </View>
                        <View style={{ width: '25%' }}>
                            <ScrollView>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta1')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta1}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta2')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta2}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta3')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta3}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta4')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta4}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta5')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta5}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 70 }}>
                                    <TouchableOpacity onPress={() => openModalResp('pregunta6')} style={styles.styleButtonSelect}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 15 }}>{changeData.pregunta6}</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View> */}
                    {route.params.cont == 9 ? (
                        <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                            <TouchableOpacity style={{ padding: 12 }} onPress={dataSaveAndBack} >
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Guardar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    ) : (
                        <LinearGradient style={{ borderRadius: 2, marginTop: 10, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                            <TouchableOpacity style={{ padding: 12 }} onPress={dataSave} >
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Siguiente</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                </ScrollView>
            </Layaut >
            {/* -------------------------------------MODAL------------------ */}
            <Modal
                visible={modalResp}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: 15, marginTop: 10 }} onPress={() => setModalResp(false)}>
                            <FontAwesome name="window-close" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', marginBottom: 10 }}>ESCOJA UNA RESPUESTA</Text>
                        <LinearGradient style={{ borderRadius: 20, marginBottom: 10, width: '80%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                            <TouchableOpacity onPress={() => closeModalResp(1, 'Me desagrada mucho')} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Me desagrada mucho</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient style={{ borderRadius: 20, marginBottom: 10, width: '80%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                            <TouchableOpacity onPress={() => closeModalResp(2, 'Me desagrada algo')} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Me desagrada algo</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient style={{ borderRadius: 20, marginBottom: 10, width: '80%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                            <TouchableOpacity onPress={() => closeModalResp(3, 'Me es indiferente')} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Me es indiferente</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient style={{ borderRadius: 20, marginBottom: 10, width: '80%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                            <TouchableOpacity onPress={() => closeModalResp(4, 'Me gusta algo')} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Me gusta algo</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient style={{ borderRadius: 20, marginBottom: 10, width: '80%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                            <TouchableOpacity onPress={() => closeModalResp(5, 'Me gusta mucho')} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic' }}>Me gusta mucho</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '70%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => closeModalResp(1)} style={styles.buttonNum}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 20 }}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => closeModalResp(2)} style={styles.buttonNum}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 20 }}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => closeModalResp(3)} style={styles.buttonNum}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 20 }}>3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => closeModalResp(4)} style={styles.buttonNum}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 20 }}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => closeModalResp(5)} style={styles.buttonNum}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 20 }}>5</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </Modal>
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

            {/* ---------------------ALERTS SUCCESS------------------------ */}
            <FancyAlert
                visible={alert}
                icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    borderRadius: 50,
                    width: '100%',
                }}>
                    <FontAwesome name="check" size={24} color="white" />
                </View>}
                style={{ backgroundColor: 'white' }}
            >
                <>
                    <Text style={{ marginTop: -16, marginBottom: 10 }}>Informacion Registrada</Text>
                    <TouchableOpacity onPress={closeModalAlertSuccess} style={{ backgroundColor: 'green', padding: 5, margin: 5, borderRadius: 3 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Aceptar</Text>
                    </TouchableOpacity>
                </>
            </FancyAlert>
        </>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        borderRadius: 3,
        // paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#335469',
        marginHorizontal: 30
    },
    buttonNum: {
        backgroundColor: 'red',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        borderRadius: 2
    },
    styleButtonSelect: {
        backgroundColor: 'green',
        padding: 10,
        margin: 5,
        borderRadius: 2,
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})
export default PreguntasTestIntereses