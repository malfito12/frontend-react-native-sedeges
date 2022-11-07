import { View, Text, ScrollView, RefreshControl, StyleSheet, ImageBackground, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { CancelButton, SuccessButton } from '../../../../Molecules/Buttons/Buttons'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'

const ListViewEvents = ({ navigation }) => {
    const [idUser, setIdUser] = useState([])
    AsyncStorageLib.getItem('user').then(resp => setIdUser(JSON.parse(resp)))
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [event, setEvent] = useState([])
    const [progress, setProgress] = useState(false)
    const [progressName, setProgressName] = useState('none')
    const [exist, setExist] = useState('none')
    const [refresing, setRefresing] = useState(false)
    const [modalEditTest, setModalEditTest] = useState(false)
    const [estado, setEstado] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [changeData, setChangeData] = useState({
        event_name: '',
        event_description: '',
        event_status: '',
        event_id: '',
        user_id: '',
    })
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getEvents()
            return () => { isActive = false }
        }, [])
    )
    const getEvents = async () => {
        setProgressName('flex')
        await axios.get(`${PORT_URL}get-events`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgressName('none')
                setEvent(resp.data)
            })
            .catch(err => console.log(err))
    }
    //--------------EDIT TEST---------------------------
    const openModalEditTest = (e) => {
        setChangeData(e)
        setModalEditTest(true)
    }
    const closeModalEditTest = () => {
        setModalEditTest(false)
        setChangeData({
            event_name: '',
            event_description: '',
            event_status: '',
            event_id: '',
            user_id: '',
        })
    }
    const openStatus = () => {
        setEstado(true)
    }
    const closeStatus = (e) => {
        setChangeData({
            ...changeData,
            event_status: e,
        })
        setEstado(false)
    }
    const editTests = async (e) => {
        e.preventDefault()
        setProgress(true)
        const id = changeData.event_id
        await axios.put(`${PORT_URL}update-event/${id}`, changeData)
            .then(resp => {
                setProgress(false)
                setMessage(resp.data.message)
                openModalAlert()
                getEvents()
                closeModalEditTest()
            })
            .catch(err => {
                console.log(err)
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
        // console.log(changeData)

    }
    //--------------DELETE EVENT---------------------------
    const [removeEvent, setRemoveEvent] = useState({ event_name: '', event_id: '' })

    const openModalDeleteEvent = (e) => {
        setRemoveEvent({ event_name: e.event_name, event_id: e.event_id })
        setOpenModalDelete(true)
    }
    const closeModalDeleteEvent = () => {
        setOpenModalDelete(false)
    }
    const deleteEvent = async (e) => {
        const id = removeEvent.event_id
        setProgress(true)
        await axios.delete(`${PORT_URL}event/${id}`)
            .then(resp => {
                setProgress(false)
                setMessage(resp.data.message)
                openModalAlert()
                getEvents()
                closeModalDeleteEvent()
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //--------------HANDLE CHANGE---------------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            user_id: idUser,
            [name]: value
        })
    }
    //---------REFRESH------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getEvents()
        setRefresing(false)
    })
    return (
        <>
            <Layaut>
                <ScrollView
                    style={{ marginBottom: 50 }}
                    refreshControl={<RefreshControl
                        colors={['#78e08f']}
                        onRefresh={onRefresh}
                        refreshing={refresing}
                    />}>
                    {event.length > 0 ? (
                        event.map((e, index) => (
                            // <View key={index} style={styles.testView}>
                            <View key={index} style={{ marginBottom: 10, marginHorizontal: 15 }}>
                                <ImageBackground source={require('../../../../../images/ImagesFondo/test-image3.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                <View style={styles.marginText}>
                                    <View>
                                        <Text style={{ color: 'white' }}>{e.event_name}</Text>
                                    </View>
                                    {e.event_status === true ? (<AntDesign name="checkcircle" size={30} color="#76ff03" />) : (<AntDesign name="closecircle" size={30} color="#ff1744" />)}
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 15, paddingBottom: 10 }}>
                                    <TouchableOpacity onPress={() => openModalEditTest(e)}>
                                        {/* <TouchableOpacity > */}
                                        <SuccessButton name={'Actualizar'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openModalDeleteEvent(e)}>
                                        {/* <TouchableOpacity > */}
                                        <CancelButton name={'Eliminar'} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => navigation.navigate('ResultsAdminScreem', { data: e })} style={{ alignSelf: 'center', borderRadius: 3, backgroundColor: '#ffa726', margin: 5, padding: 4 }}> */}
                                    <TouchableOpacity onPress={() => navigation.navigate('ListViewStudentsResult', { data: e })} style={{ alignSelf: 'center', borderRadius: 3, backgroundColor: '#ffa726', margin: 5, padding: 4 }}>
                                        {/* <TouchableOpacity style={{ alignSelf: 'center', borderRadius: 3, backgroundColor: '#ffa726', margin: 5, padding: 4 }}> */}
                                        <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', alignSelf: 'center' }}>Resultados</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
                            <View style={{ display: progressName }}>
                                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                            </View>
                        </>

                    )}
                </ScrollView>
            </Layaut>
            {/* ------------------------EDIT EVENTO------------------------------ */}
            <Modal
                visible={modalEditTest}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <LinearGradient style={{ marginHorizontal: 15, borderRadius: 5, padding: 5 }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#335469', '#587c92', '#335469']}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', padding: 10 }}>ACTUALIZAR TEST</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Nombre Test'
                                onChangeText={text => handleChange('event_name', text)}
                                value={changeData.event_name}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Descripción'
                                onChangeText={text => handleChange('event_description', text)}
                                value={changeData.event_description}
                            />
                            {changeData.event_status === true ? (
                                <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus, backgroundColor: 'green', width: '90%', alignItems: 'center' }}>
                                    {/* <TouchableOpacity  style={{ ...styles.buttonStatus, backgroundColor: 'green', width: '90%', alignItems: 'center' }}> */}
                                    <Text>Vigente</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus, backgroundColor: 'red', width: '90%', alignItems: 'center' }}>
                                    {/* <TouchableOpacity  style={{ ...styles.buttonStatus, backgroundColor: 'red', width: '90%', alignItems: 'center' }}> */}
                                    <Text>Cerrado</Text>
                                </TouchableOpacity>
                            )}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                                <TouchableOpacity onPress={editTests}>
                                    <SuccessButton name={'Actualizar'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeModalEditTest}>
                                    <CancelButton name={'Cancel'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
            {/* ------------------------ESTADO------------------------- */}
            <Modal
                visible={estado}
                animationType='slide'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView2}>
                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, margin: 5 }} onPress={() => closeStatus(true)}>
                            <Text>Vigente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, margin: 5 }} onPress={() => closeStatus(false)}>
                            <Text>Cerrado</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* -----------------------------------MODAL DELETE EVENT------------------------ */}
            <Modal
                visible={openModalDelete}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Roboto_500Medium', color: 'white', padding: 15 }}>Estas Seguro de Eliminar a {removeEvent.event_name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={deleteEvent} style={{ padding: 5, width: '100%' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <TouchableOpacity onPress={closeModalDeleteEvent} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
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
        </>
    )
}

const styles = StyleSheet.create({
    marginText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    ImageView: {
        opacity: 0.5,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 35,
        padding: 5,
    },
    buttonStatus: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 3,
        marginHorizontal: 6
    },
    modalView2: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
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
})
export default ListViewEvents