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
        reception_localidad: '',
    })

    //------------POST RECEPTIONS-----------------
    const postReception = async (e) => {
        e.preventDefault()
        const data={...changeData,user_id:idUser}
        setProgress(true)
        await axios.post(`${PORT_URL}post-reception`,data)
        .then(resp=>{
            setProgress(false)
            setMessage(resp.data.message)
            openModalAlert()
            setChangeData({reception_name: '',reception_municipio: '',reception_localidad: '',})
        })
        .catch(err=>{
            setProgress(false)
            if(err.response){
                setMessage(err.response.data.message)
                openModalAlertError()
            }
        })
    }
    //--------------------HANDLE CHANGE-------------------
    const handleChange=(name,value)=>{
        setChangeData({
            ...changeData,
            [name]:value
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
                        onChangeText={text=>handleChange('reception_name',text)}

                    />
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Municipio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='max 25 caracteres'
                        maxLength={25}
                        placeholderTextColor='#b0bec5'
                        value={changeData.reception_municipio}
                        onChangeText={text=>handleChange('reception_municipio',text)}

                    />
                    <Text style={{ color: 'white', paddingBottom: 10 }}>Localidad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='max 25 caracteres'
                        maxLength={25}
                        placeholderTextColor='#b0bec5'
                        value={changeData.reception_localidad}
                        onChangeText={text=>handleChange('reception_localidad',text)}

                    />
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
})
export default RegisterReception