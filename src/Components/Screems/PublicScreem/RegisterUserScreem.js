import { View, Text, Modal, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../Atoms/StyleLayaut/Layaut'
import { PORT_URL } from '../../../PortUrl/PortUrl'
import axios from 'axios'
import validator from 'validator'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import sedeges from '../../../images/sedeges-logo.png'
import { CancelButton, SuccessButton } from '../../Molecules/Buttons/Buttons'
import { useModalAlert, useModalAlertError } from '../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../Molecules/Alertas/Alerts'

const RegisterUserScreem = ({ navigation }) => {
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [hidePass, setHidePass] = useState({
        iconPassword: 'eye',
        viewPassword: true,
    })
    const [hidePass2, setHidePass2] = useState({
        iconRepeatPassword: 'eye',
        viewRepeatPassword: true
    })
    const [changeData, setChangeData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_repeat_password: '',
        user_rol: 'Estudiante'
    })
    //---------------POST USER--------------------------
    // var message=''
    const postUser = async () => {
        // console.log(changeData)
        // console.log(changeData)
        // var ss='holacomoestas'
        // var espacio=/[a-zA-Z0-9]\w+/g
        // var espacio=/([a-zA-Z0-9])\w+/g
        // console.log(changeData.nombre.match(espacio))
        // var ss=changeData.nombre.match(espacio).length
        // console.log(ss)

        // console.log(espacio.test(ss))
        const user = /(\W|^)[\w.\-]{3,16}(?!&|%|!|"|#|@)(?!\s)(\W|$)/g
        const email = /(\W|^)[\w.\-]{3,25}@(yahoo|hotmail|gmail)\.com(?!\s)(\W|$)/g
        const password = /(\W|^)[\w.\-]{8,16}(?!\s)(\W|$)/g
        setProgress(true)
        if (changeData.user_name === '' || changeData.user_email === '' || changeData.user_password === '' || changeData.user_repeat_password === '') {
            setProgress(false)
            setMessage('Por favor, llene todos los datos')
            openModalAlertError()
            return
            // } else if (!(validator.isEmail(changeData.user_email))) {
        } else if (!user.test(changeData.user_name)) {
            setProgress(false)
            setMessage('Caracteres invalidos de usuario')
            openModalAlertError()
            return
        } else if (!email.test(changeData.user_email)) {
            setProgress(false)
            setMessage('Caracteres invalidos de Correo Electronico')
            openModalAlertError()
            return
        } else if (!password.test(changeData.user_password)) {
            setProgress(false)
            setMessage('La Contraseña debe tener almenos 8 caracteres sin espacios')
            openModalAlertError()
            return
        } else if (changeData.user_password !== changeData.user_repeat_password) {
            setProgress(false)
            setMessage('Verifique que las contraseñas sean iguales')
            openModalAlertError()
            return
        }
        await axios.post(`${PORT_URL}users`, changeData)
            .then(resp => {
                setProgress(false)
                openModalAlert()
                setMessage(resp.data.message)
                setChangeData({
                    user_name: '',
                    user_email: '',
                    user_password: '',
                    user_repeat_password: '',
                    user_rol: 'Estudiante'
                })
                // alert(resp.data.message)
                // navigation.navigate('LoginScreem')
                // navigation.push('TeacherHomeScreem')
                // console.log(resp.data)
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    openModalAlertError()
                    setMessage(err.response.data.message)
                }
                console.log(err)
            })

        // const result=await postUsers(changeData)
        // console.log(result)
    }
    //-----------HANDLE CHANGE
    const handleChange = (name, value) => {
        // if (name === 'edad') {
        //     if (!/^[0-9]+$/.test(value)) {
        //         alert('introdusca solo numeros')
        //         return
        //     } else {
        //         setChangeData({
        //             ...changeData,
        //             [name]: value
        //         })
        //         return
        //     }
        // }
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    const verPass = () => {
        var iconName = hidePass.viewPassword ? 'eye-with-line' : 'eye'
        setHidePass({ viewPassword: !hidePass.viewPassword, iconPassword: iconName })
        // setHidePass(!hidePass)
    }
    const verPass2 = () => {
        var iconName = hidePass2.viewRepeatPassword ? 'eye-with-line' : 'eye'
        setHidePass2({ viewRepeatPassword: !hidePass2.viewRepeatPassword, iconRepeatPassword: iconName })
        // setHidePass(!hidePass)
    }
    return (
        <>
            <Layaut>
                <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'Roboto_900Black_Italic', fontSize: 16, marginBottom: 15 }}>Registrar Usuario</Text>
                <ScrollView>
                    {/* <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={sedeges} /> */}
                    {/* <View style={styles.containerBottom}>
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('LoginScreem')} >
                        <Text style={{ color: 'white' }}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    </View> */}
                    <View style={styles.container}>
                        <Text style={styles.textLabel}>Nombre de Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='max 16 caracteres'
                            maxLength={16}
                            placeholderTextColor='#b0bec5'
                            onChangeText={text => handleChange('user_name', text)}
                            value={changeData.user_name}
                        />
                        <Text style={styles.textLabel}>Correo Electronico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='max 25 caracteres'
                            placeholderTextColor='#b0bec5'
                            onChangeText={text => handleChange('user_email', text)}
                            value={changeData.user_email}
                        />
                        <Text style={styles.textLabel}>Contraseña</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={{ flex: 1, color: 'white' }}
                                placeholderTextColor='#b0bec5'
                                placeholder='min 8 caracteres'
                                secureTextEntry={hidePass.viewPassword}
                                onChangeText={text => handleChange('user_password', text)}
                                value={changeData.user_password}
                            />
                            <TouchableOpacity onPress={verPass}>
                                <Entypo name={hidePass.iconPassword} size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textLabel}>Repita Contraseña</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={{ flex: 1, color: 'white' }}
                                placeholderTextColor='#b0bec5'
                                placeholder='min 8 caracteres'
                                secureTextEntry={hidePass2.viewRepeatPassword}
                                onChangeText={text => handleChange('user_repeat_password', text)}
                                value={changeData.user_repeat_password}
                            />
                            <TouchableOpacity onPress={verPass2}>
                                <Entypo name={hidePass2.iconRepeatPassword} size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                        {/* <TextInput
                            keyboardType='numeric'
                            style={styles.input}
                            placeholder='Edad'
                            placeholderTextColor='#545674'
                            onChangeText={text => handleChange('edad', text)}
                        /> */}
                        <LinearGradient style={{ borderRadius: 3, width: '100%' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                            <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={postUser} >
                                {/* <TouchableOpacity style={{ width: '100%',padding:10 }} onPress={openModalAlert} > */}
                                <Text style={{ color: 'white', alignSelf: 'center' }}>Registrar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        {/* <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('TeacherHomeScreem')} >
                            <CancelButton name={'Cancelar'} />
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </Layaut>
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
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20
    },
    input: {
        width: '100%',
        // fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        // backgroundColor: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        borderColor: '#10ac84'
    },
    passwordInput: {
        width: '100%',
        // fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        // backgroundColor: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        borderColor: '#10ac84',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    buttonSave: {
        // paddingTop: 10,
        backgroundColor: '#10ac84',
        padding: 10,
        marginBottom: 10,
        borderRadius: 3,
        width: '90%',
        alignItems: 'center'

    },
    containerBottom: {
        width: '90%',
        height: '15%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonRegister: {
        backgroundColor: '#3C425A',
        padding: 8,
        borderRadius: 3,
        width: '40%',
        alignItems: 'center',

    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    textLabel: {
        color: 'white',
        marginBottom: 10,
        fontFamily: 'Roboto_400Regular_Italic',
        alignSelf: 'flex-start'
    }
})

export default RegisterUserScreem