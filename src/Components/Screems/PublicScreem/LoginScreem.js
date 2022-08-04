import { View, Text, StyleSheet, TextInput, Image, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import Layaut from '../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo,FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import sedeges from '../../../images/sedeges-logo.png'
import { AuthContext } from '../../Atoms/Context/AuthContext'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { SuccesAlert } from '../../Molecules/Alertas/Alerts';
import { useModalAlert } from '../../Molecules/Hooks/useModalAlert';

const LoginScreem = ({ navigation }) => {
    const { isLoading, login,openModal,closeModal,message } = useContext(AuthContext)
    // const [openModal,openModalAlert,closeModalAlert]=useModalAlert(false)
    // const [openModalAlert]=useModalAlert(false)
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
    //-----------message-----------------
    const mess=()=>{
        setVisible(true)
    }
    // const toggleAlert = useCallback(() => {
    //     setVisible(!visible);
    // }, [visible]);
    // console.log(changeData)
    return (
        <>
            <Layaut>
                <ScrollView style={{ marginHorizontal: 5 }}>
                    <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={sedeges} />
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto_700Bold' }}>Iniciar Sesión</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Usuario'
                            maxLength={16}
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
                        <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                            <TouchableOpacity style={{ width: '100%', padding: 10, alignItems: 'center' }} onPress={() => { login(changeData)}} >
                                {/* <TouchableOpacity style={{ width: '100%', padding: 10, alignItems: 'center' }}  onPress={openModalAlert}> */}
                                <Text style={{ color: 'white', fontFamily: 'Roboto_900Black_Italic' }}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-end', fontFamily: 'Roboto_300Light_Italic' }}>¿Olvidaste tu Contraseña?</Text>
                    </TouchableOpacity>
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

            {/* <SuccesAlert isOpen={openModal} closeModal={closeModalAlert}/> */}
            {/* <SuccesAlert isOpen={openModal} /> */}
            <FancyAlert
                visible={openModal}
                icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    borderRadius: 50,
                    width: '100%',
                }}>
                    <FontAwesome name="close" size={24} color="white" />
                </View>}
                style={{ backgroundColor: 'white' }}
            >
                <>
                <Text style={{ marginTop: -16, marginBottom: 10}}>{message}</Text>
                <TouchableOpacity onPress={closeModal} style={{backgroundColor:'red',padding:5,borderRadius:3,margin:10}}>
                    <Text style={{color:'white',fontFamily:'Roboto_500Medium'}}>Aceptar</Text>
                </TouchableOpacity>
                </>
            </FancyAlert>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        borderColor: '#10ac84'
    },
    passwordInput: {
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#10ac84',
        flexDirection: 'row',
        alignItems: 'center'
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