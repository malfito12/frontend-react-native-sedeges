import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'

const RegisterEvent = () => {
    const [idUser, setIdUser] = useState([])
    AsyncStorageLib.getItem('user').then(resp => setIdUser(JSON.parse(resp)))
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [changeData, setChangeData] = useState({
        event_name: '',
        event_description: '',
        event_status:false
    })

    //-----------------POST EVENT---------------------------
    const postEnvent = async (e) => {
        e.preventDefault()
        if (changeData.event_name == '' || changeData.event_description == '') {
            setMessage('Llene todos los Datos')
            openModalAlertError()
            return
        }
        setProgress(true)
        const event_name = changeData.event_name.trim().replace(/\s\s+/g, ' ')
        const data = {
            event_name: event_name,
            event_description: changeData.event_description,
            event_status:changeData.event_status,
            user_id: idUser
        }
        await axios.post(`${PORT_URL}post-event`, data)
            .then(resp => {
                setProgress(false)
                setMessage(resp.data.message)
                openModalAlert()
                setChangeData({ event_name: '', event_description: '' })
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }

    //-------------------HANDLE CHANGE-----------------
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
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Nombre de Evento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='max 16 caracteres'
                        placeholderTextColor='#b0bec5'
                        maxLength={16}
                        value={changeData.event_name}
                        onChangeText={text => handleChange('event_name', text)}
                    />
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Descripción de Evento</Text>
                    <TextInput
                        style={{ ...styles.input, height: 100, textAlignVertical: 'top' }}
                        placeholder='max 100 caracteres'
                        placeholderTextColor='#b0bec5'
                        multiline={true}
                        numberOfLines={4}
                        maxLength={100}
                        value={changeData.event_description}
                        onChangeText={text => handleChange('event_description', text)}
                    />
                    <LinearGradient style={{ borderRadius: 2, marginTop: 10 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                        <TouchableOpacity onPress={postEnvent} style={{ padding: 10 }}>
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
})
export default RegisterEvent