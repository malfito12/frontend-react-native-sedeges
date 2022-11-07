import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import * as Progress from 'react-native-progress'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { Picker } from '@react-native-picker/picker';

const RegisterReception = ({ navigation }) => {
    const [idUser, setIdUser] = useState([])
    AsyncStorageLib.getItem('user').then(resp => setIdUser(JSON.parse(resp)))
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    
    const [changeData, setChangeData] = useState({
        reception_name: '',
        reception_municipio: '',
        reception_provincia: '',
    })

    //------------POST RECEPTIONS-----------------
    const postReception = async (e) => {
        e.preventDefault()
        const data = { ...changeData, user_id: idUser }
        setProgress(true)
        await axios.post(`${PORT_URL}post-reception`, data)
            .then(resp => {
                setProgress(false)
                setMessage(resp.data.message)
                openModalAlert()
                setChangeData({ reception_name: '', reception_municipio: '', reception_provincia: '', })
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //--------------------HANDLE CHANGE-------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <>
            <Layaut>
                <ScrollView style={{ marginHorizontal: 15 }}>
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Nombre Centro de Acogida</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='max 25 caracteres'
                        maxLength={25}
                        placeholderTextColor='#b0bec5'
                        value={changeData.reception_name}
                        onChangeText={text => handleChange('reception_name', text)}

                    />
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Municipio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='max 25 caracteres'
                        maxLength={25}
                        placeholderTextColor='#b0bec5'
                        value={changeData.reception_municipio}
                        onChangeText={text => handleChange('reception_municipio', text)}

                    />
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Provincia</Text>
                    <View style={styles.styleSelect}>
                        <Picker
                            style={{ color: 'white' }}
                            selectedValue={changeData.reception_provincia}
                            onValueChange={(itemValue, itemIndex) => {
                                handleChange('reception_provincia', itemValue)
                            }}>
                            <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
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
                    <LinearGradient style={{ borderRadius: 2, marginTop: 10 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                        <TouchableOpacity onPress={postReception} style={{ padding: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Guardar Información</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ScrollView>
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
    input: {
        fontFamily: 'Roboto_500Medium',
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        borderColor: '#10ac84'
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    styleSelect: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 40,
        padding: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        display: 'flex'
    }
})
export default RegisterReception