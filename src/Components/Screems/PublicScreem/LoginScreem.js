import { View, Text, StyleSheet, TextInput, Image, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import Layaut from '../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import sedeges from '../../../images/sedeges-logo.png'
import { AuthContext } from '../../Atoms/Context/AuthContext'

const LoginScreem = ({ navigation }) => {
    const { isLoading, login } = useContext(AuthContext)
    const [hidePass, setHidePass] = useState({
        iconPassword: 'eye',
        viewPassword: true,
    })
    const [changeData, setChangeData] = useState({
        user_name: '',
        user_password: ''
    })

    //-----------HANDLE CHANGE----------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    //-----------------------------------
    const verPass = () => {
        var iconName = hidePass.viewPassword ? 'eye-with-line' : 'eye'
        setHidePass({ viewPassword: !hidePass.viewPassword, iconPassword: iconName })
        // setHidePass(!hidePass)
    }
    // console.log(changeData)
    return (
        <>
            <Layaut>
                <ScrollView >
                    <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={sedeges} />
                    <View style={styles.containerBottom}>
                        <Text style={{ color: 'white',fontFamily:'Roboto_700Bold' }}>Iniciar Sesión</Text>
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('RegisterUserScreem')} >
                            <Text style={{ color: 'white',fontFamily:'Roboto_700Bold' }}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder='Usuario'
                            placeholderTextColor='#b0bec5'
                            value={changeData.user_name}
                            onChangeText={text => handleChange('user_name', text)}
                        />
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={{ flex: 1, color: 'white' }}
                                placeholderTextColor='#b0bec5'
                                placeholder='Contraseña'
                                secureTextEntry={hidePass.viewPassword}
                                value={changeData.user_password}
                                onChangeText={text => handleChange('user_password', text)}
                            />
                            <TouchableOpacity onPress={verPass}>
                                <Entypo name={hidePass.iconPassword} size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                        <LinearGradient style={styles.buttonSubmit} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                            <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => { login(changeData) }} >
                                <Text style={{ color: 'white',fontFamily:'Roboto_900Black_Italic' }}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </ScrollView>
            </Layaut>

            <Modal
                // visible={openModal}
                visible={isLoading}
                transparent
                animationType='fade'
            >
                <View style={styles.centeredView}>
                    <Progress.Circle borderWidth={3} size={40} indeterminate={true} />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    input: {
        width: '90%',
        fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        borderColor: '#10ac84'
    },
    passwordInput: {
        width: '90%',
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
    buttonSubmit: {
        // backgroundColor: '#10ac84',
        padding: 10,
        borderRadius: 3,
        width: '90%',
        alignItems: 'center',
        marginBottom: 40

    },
    buttonRegister: {
        backgroundColor: '#3C425A',
        padding: 8,
        borderRadius: 3,
        width: '40%',
        alignItems: 'center',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})

export default LoginScreem