import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { PORT_URL } from '../../../PortUrl/PortUrl'
import { useModalAlert, useModalAlertError } from '../../Molecules/Hooks/useModalAlert'
import * as Progress from 'react-native-progress'
import { ErrorAlert, SuccesAlert } from '../../Molecules/Alertas/Alerts'

const RecoverPassword = ({ navigation }) => {
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [progress, setProgress] = useState(false)
    const [message, setMessage] = useState(null)
    const [changeData, setChangeData] = useState({
        user_name: '',
        user_email: ''
    })
    //-------------ENVIAR DATOS------------------------
    const sendData = async () => {
        var user_name = changeData.user_name.trim().replace(/\s\s+/g, ' ')
        var user_email = changeData.user_email.trim().replace(/\s\s+/g, ' ')
        setProgress(true)
        await axios.post(`${PORT_URL}recover-password`, {user_name,user_email})
            .then(resp => {
                setProgress(false)
                setMessage(resp.data.message)
                openModalAlert()
                setChangeData({user_name:'',user_email:''})
                // navigation.navigate('LoginScreem')
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //------------HANLDE CHANGE-----------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <>
            <Layaut>
                <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular_Italic' }}>Nombre de Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ejm. usuario'
                        // maxLength={16}
                        placeholderTextColor='#b0bec5'
                        value={changeData.user_name}
                        onChangeText={text => handleChange('user_name', text)}
                    />
                    <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular_Italic' }}>Correo Electronico</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='email-address'
                        placeholder='Ejm. usuario@gmail.com'
                        // maxLength={16}
                        placeholderTextColor='#b0bec5'
                        value={changeData.user_email}
                        onChangeText={text => handleChange('user_email', text)}
                    />
                    <LinearGradient style={{ borderRadius: 3, marginTop: 20, marginBottom: 20 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                        <TouchableOpacity onPress={sendData} style={{ width: '100%', padding: 10, alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontFamily: 'Roboto_900Black_Italic' }}>Enviar</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_700Bold', fontSize: 14, alignSelf: 'center' }}>Tiene que coincidir tanto la cuenta como el Correo Electronico.</Text>

                </View>
            </Layaut>
            {/* --------------------ALERTAS--------------------- */}
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
        borderWidth: 1,
        borderColor: '#10ac84',
        borderRadius: 3,
        color: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})

export default RecoverPassword