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
        pregunta1: '1',
        pregunta2: '1',
        pregunta3: '1',
        pregunta4: '1',
        pregunta5: '1',
        pregunta6: '1',
    })
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
    const closeModalResp = (num) => {
        if (pre === 'pregunta1') {
            setChangeData({ ...changeData, pregunta1: num })
        } else if (pre === 'pregunta2') {
            setChangeData({ ...changeData, pregunta2: num })
        } else if (pre === 'pregunta3') {
            setChangeData({ ...changeData, pregunta3: num })
        } else if (pre === 'pregunta4') {
            setChangeData({ ...changeData, pregunta4: num })
        } else if (pre === 'pregunta5') {
            setChangeData({ ...changeData, pregunta5: num })
        } else if (pre === 'pregunta6') {
            setChangeData({ ...changeData, pregunta6: num })
        }
        setModalResp(false)
    }
    //-------------GUARDAR DATOS---------------------
    AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
    AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))
    const dataSave = () => {
        var serie = route.params.cont + 1
        var name = `Serie-${serie}`
        array.push({ seccion: name, respuestas: changeData, student_id: route.params.student_id, user_id: user, event_id: event })
        navigation.navigate('PreguntasTestIntereses', { contenido: route.params.contenido, cont: route.params.cont + 1, student_id: route.params.student_id })
        setChangeData({
            pregunta1: '1',
            pregunta2: '1',
            pregunta3: '1',
            pregunta4: '1',
            pregunta5: '1',
            pregunta6: '1',
        })
    }
    const dataSaveAndBack = async (e) => {
        e.preventDefault()
        var serie = route.params.cont + 1
        var name = `Serie-${serie}`
        array.push({ seccion: name, respuestas: changeData, student_id: route.params.student_id, user_id: user, event_id: event })
        setProgress(true)
        await axios.post(`${PORT_URL}test-intereses`, array)
            .then(resp => {
                array = []
                setProgress(false)
                openModalAlertSuccess()
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
    }
    return (
        <>
            <Layaut>
                <ScrollView>

                    <View style={{ flexDirection: 'row' }}>
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
                    </View>
                    {route.params.cont == 9 ? (
                        <TouchableOpacity onPress={dataSaveAndBack} style={{ alignSelf: 'center', width: '30%', borderRadius: 3, backgroundColor: 'red', margin: 10, padding: 15 }}>
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Guardar</Text>
                        </TouchableOpacity>
                    ) : (

                        <TouchableOpacity onPress={dataSave} style={{ alignSelf: 'center', width: '30%', borderRadius: 3, backgroundColor: '#ffa726', margin: 10, padding: 15 }}>
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Siguiente</Text>
                        </TouchableOpacity>
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
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '70%', alignItems: 'center' }}>
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
                        </View>
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
        padding: 5,
        alignItems: 'center',
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