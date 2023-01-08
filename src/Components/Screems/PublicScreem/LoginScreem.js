import { View, Text, StyleSheet, TextInput, Image, Modal, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import Layaut from '../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import sedeges from '../../../images/sedeges-logo.png'
import { AuthContext } from '../../Atoms/Context/AuthContext'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { SuccesAlert } from '../../Molecules/Alertas/Alerts';
import { useModalAlert } from '../../Molecules/Hooks/useModalAlert';

const LoginScreem = ({ navigation }) => {
    // console.log(props)
    const { isLoading, login, openModal, closeModal, message, cambioFondo } = useContext(AuthContext)
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
    //-------------CAMBIAR FONDO------------------
    const [fondo, setFondo] = useState(false)

    const openModalFondo = () => {
        setFondo(true)
    }
    const closeModalFondo = () => {
        setFondo(false)
    }


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
    const mess = () => {
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
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_700Bold' }}>Iniciar Sesión</Text>
                        </View>
                        <LinearGradient style={{ borderRadius: 3, padding: 5, width: '50%' }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#780206', '#061161']}>
                            <TouchableOpacity onPress={openModalFondo} style={{ width: '100%' }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_700Bold' }}>Fondos</Text>
                            </TouchableOpacity>
                        </LinearGradient>
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
                            <TouchableOpacity style={{ width: '100%', padding: 10, alignItems: 'center' }} onPress={() => { login(changeData) }} >
                                {/* <TouchableOpacity style={{ width: '100%', padding: 10, alignItems: 'center' }}  onPress={openModalAlert}> */}
                                <Text style={{ color: 'white', fontFamily: 'Roboto_900Black_Italic' }}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-end', fontFamily: 'Roboto_300Light_Italic' }}>¿Olvidaste tu Contraseña?</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={openModalFondo} style={{ marginTop: 10, padding: 10, backgroundColor: 'red' }}>
                        <Text>cambiar</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </Layaut>
            {/* ----------------------------------------------------------------- */}
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
                    <TouchableOpacity onPress={closeModal} >
                        <FontAwesome name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>}
                style={{ backgroundColor: 'white' }}
            >
                <>
                    <Text style={{ marginTop: -16, marginBottom: 30, fontFamily: 'Roboto_500Medium' }}>{message}</Text>
                    {/* <TouchableOpacity onPress={closeModal} style={{backgroundColor:'red',padding:5,borderRadius:3,margin:10}}>
                    <Text style={{color:'white',fontFamily:'Roboto_500Medium'}}>Aceptar</Text>
                </TouchableOpacity> */}
                </>
            </FancyAlert>
            {/* ---------------------MODAL FONDOS-------------------------------- */}
            <Modal
                visible={fondo}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredViewFondo}>
                    <View style={{ ...styles.modalView, backgroundColor: 'white', marginHorizontal: 15, paddingBottom: 15 }}>
                        <ScrollView style={{ width: '100%' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalFondo}>
                                <FontAwesome name="window-close" size={30} color="#424242" />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto_500Medium', paddingBottom: 10 }}>SELECCIONE FONDO DE PANTALLA</Text>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <LinearGradient style={{ padding: 2, borderRadius: 3 }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#000010', '#010822', '#000010']}>
                                        <TouchableOpacity onPress={() => { cambioFondo('0'), closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                            <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Normal</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/naruto.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('1'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Naruto</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/cuarto-hokage.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('2'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Naruto Shippuden</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/bts1.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('3'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>BTS I</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/bts2.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('4'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>BTS II</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/chicos-rosas.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('5'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Boys Over Flowers</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/corea.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('6'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Barrio</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/free-fire-1.png')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('7'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Free Fire I</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/free-fire-2.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />

                                    <TouchableOpacity onPress={() => { cambioFondo('8'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Free Fire II</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%', marginBottom: 5 }}>
                                    <ImageBackground source={require('../../../images/ImagesFondo2/goku.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <TouchableOpacity onPress={() => { cambioFondo('9'),closeModalFondo() }} style={{ width: '100%', paddingTop: 30, paddingBottom: 30 }}  >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Dragon Ball Z</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    modalView: {
        borderRadius: 3,
        padding: 5,
        alignItems: 'center',
    },
    centeredViewFondo: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    ImageView: {
        // opacity: 0.5,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})

export default LoginScreem