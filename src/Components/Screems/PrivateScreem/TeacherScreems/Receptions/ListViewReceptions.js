import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import * as Progress from 'react-native-progress'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'
import { Picker } from '@react-native-picker/picker';

const ListViewReceptions = ({ navigation }) => {
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [reception, setReception] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [progress2, setProgress2] = useState('none')
    const [exist, setExist] = useState('none')
    const [openModalOptions, setOpenModalOptions] = useState(false)
    const [modalReceptionUpdate, setModalReceptionUpdate] = useState(false)
    const [modalReceptionDelete, setModalReceptionDelete] = useState(false)
    const [data, setData] = useState([])
    const [changeData, setChangeData] = useState({
        reception_name: '',
        reception_municipio: '',
        reception_provincia: '',
        reception_id: ''
    })

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getReceptions()
            return () => { isActive = false }
        }, [])
    )
    //----------------GET RECEPTIONS-------------------
    const getReceptions = async () => {
        setProgress2('flex')
        await axios.get(`${PORT_URL}get-receptions`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgress2('none')
                setReception(resp.data)
            })
            .catch(err => console.log(err))
    }
    //------------MODAL OPTIONS-----------------------
    const openModalOptionsReception = (e) => {
        setData(e)
        setChangeData(e)
        // console.log(e)
        setOpenModalOptions(true)
    }
    const closeModalOptionsReception = () => {
        setOpenModalOptions(false)
    }
    //-----------------GO SCREEM STUDENT--------------------------
    const goScreemStudent = () => {
        closeModalOptionsReception()
        navigation.navigate('ListViewStudentsReception', { data: data })
    }

    //---------UPDARE RECEPTION----------------------------
    const openModalReception = () => {
        setModalReceptionUpdate(true)
    }
    const closeModalReception = () => {
        setModalReceptionUpdate(false)
    }
    const updateReception = async () => {
        // console.log(changeData)
        setProgress(true)
        await axios.put(`${PORT_URL}update-reception/${changeData.reception_id}`, changeData)
            .then(resp => {
                setMessage(resp.data.message)
                openModalAlert()
                closeModalReception()
                closeModalOptionsReception()
                setProgress(false)
                getReceptions()
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    // -------------------DELETE reception----------------------
    const openModalReceptionDelete = () => {
        setModalReceptionDelete(true)
    }
    const closeModalReceptionDelete = () => {
        setModalReceptionDelete(false)
    }
    const deleteReception = async () => {
        // console.log(changeData)
        setProgress(true)
        await axios.delete(`${PORT_URL}delete-reception/${changeData.reception_id}`)
            .then(resp => {
                setMessage(resp.data.message)
                setProgress(false)
                openModalAlert()
                getReceptions()
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //---------HANDLE CHANGE------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    //---------REFRESH------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getReceptions()
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
                    />}
                >
                    {reception.length > 0 ? (
                        reception.map((e, index) => (
                            <View key={index} style={styles.viewCard}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>{e.reception_name} - {e.reception_provincia}</Text>
                                <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => openModalOptionsReception(e)}>
                                        <Ionicons name="options" size={24} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
                            <View style={{ display: progress2 }}>
                                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                            </View>
                        </>
                    )}
                </ScrollView>
            </Layaut>
            {/* --------------------MODAL EDIT-------------------------------- */}
            <Modal
                visible={openModalOptions}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: 'white', marginHorizontal: 15 }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalOptionsReception}>
                            <FontAwesome name="window-close" size={30} color="#424242" />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>Centro de Acogida</Text>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>{data.reception_name} - {changeData.reception_provincia}</Text>
                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={goScreemStudent} style={{ width: '100%', padding: 10 }} >
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Estudiantes</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={() => openModalReception()} style={{ width: '100%', padding: 10 }}  >
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Actualizar Información</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <TouchableOpacity onPress={openModalReceptionDelete} style={{ backgroundColor: 'red', marginHorizontal: 15, borderRadius: 3, padding: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* --------------------ACTUALIZAR RECEPSION-------------------------------- */}
            <Modal
                visible={modalReceptionUpdate}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalReception}>
                            <FontAwesome name="window-close" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Nombre</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Max 25  Caracteres'
                            maxLength={25}
                            defaultValue={changeData.reception_name}
                            onChangeText={text => handleChange('reception_name', text)}
                        />
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Municipio</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Max 25 Caracteres'
                            maxLength={25}
                            defaultValue={changeData.reception_municipio}
                            onChangeText={text => handleChange('reception_municipio', text)}
                        />
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Localidad</Text>
                        <View style={styles.styleSelect}>
                            <Picker
                                style={{ color: 'black' }}
                                selectedValue={changeData.reception_provincia}
                                onValueChange={(itemValue, itemIndex) => {
                                    handleChange('reception_provincia', itemValue)
                                }}>
                                <Picker.Item enabled={false} label={changeData.reception_provincia} style={{ fontSize: 14 }} value={changeData.reception_municipio} />
                                <Picker.Item label="Alonso de Ibáñez" style={{ fontSize: 14 }} value="Alonso de Ibáñez" />
                                <Picker.Item label="Antonio Quijarro" style={{ fontSize: 14 }} value="Antonio Quijarro" />
                                <Picker.Item label="Bernardino Bilbao" style={{ fontSize: 14 }} value="Bernardino Bilbao" />
                                <Picker.Item label="Charcas" style={{ fontSize: 14 }} value="Charcas" />
                                <Picker.Item label="Chayanta" style={{ fontSize: 14 }} value="Chayanta" />
                                <Picker.Item label="Cornelio Saavedra" style={{ fontSize: 14 }} value="Cornelio Saavedra" />
                                <Picker.Item label="Daniel Campos" style={{ fontSize: 14 }} value="Daniel Campos" />
                                <Picker.Item label="Enrique Baldivieso" style={{ fontSize: 14 }} value="Enrique Baldivieso" />
                                <Picker.Item label="José María Linares" style={{ fontSize: 14 }} value="José María Linares" />
                                <Picker.Item label="Modesto Omiste" style={{ fontSize: 14 }} value="Modesto Omiste" />
                                <Picker.Item label="Nor Chichas" style={{ fontSize: 14 }} value="Nor Chichas" />
                                <Picker.Item label="Nor Lípez" style={{ fontSize: 14 }} value="Nor Lípez" />
                                <Picker.Item label="Rafael Bustillo" style={{ fontSize: 14 }} value="Rafael Bustillo" />
                                <Picker.Item label="Sud Chichas" style={{ fontSize: 14 }} value="Sud Chichas" />
                                <Picker.Item label="Sud Lípez" style={{ fontSize: 14 }} value="Sud Lípez" />
                                <Picker.Item label="Tomás Frías" style={{ fontSize: 14 }} value="Tomás Frías" />
                            </Picker>
                        </View>
                        <View style={{ width: '100%', marginBottom: 5, marginTop: 10 }}>
                            <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={updateReception} style={{ width: '100%', padding: 10 }} >
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Actualizar</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* --------------------ELIMINAR RECEPSION-------------------------------- */}
            <Modal
                visible={modalReceptionDelete}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, margin: 10, fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Eliminar a la recepsion {changeData.reception_name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={deleteReception} style={{ padding: 5, width: '100%' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <TouchableOpacity onPress={closeModalReceptionDelete} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
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
    viewCard: {
        backgroundColor: '#12151C',
        margin: 7,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        borderRadius: 3,
        padding: 5,
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        fontFamily: 'Roboto_400Regular_Italic'

    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    styleSelect: {
        width: '90%',
        borderRadius: 3,
        borderWidth: 1,
        height: 40,
        padding: 4,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'center',
        display: 'flex'
    }
})
export default ListViewReceptions