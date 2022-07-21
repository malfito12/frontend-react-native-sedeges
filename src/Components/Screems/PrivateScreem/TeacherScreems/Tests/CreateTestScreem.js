import { View, Text, Modal, TouchableOpacity, TextInput, RefreshControl, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { AuthContext } from '../../../../Atoms/Context/AuthContext'
import axios from 'axios';
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { CancelButton, DeleteButton, SuccessButton, UdpateButton } from '../../../../Molecules/Buttons/Buttons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const CreateTestScreem = ({ navigation }) => {
    var fecha = new Date
    var anio = fecha.getFullYear()
    var mes = fecha.getMonth() + 1
    var dia = fecha.getDate()
    var todo;
    if (mes < 10) { todo = anio + '-' + '0' + mes + '-' + dia } else todo = anio + '-' + mes + '-' + dia

    // const { user } = useContext(AuthContext)
    const [idUser, setIdUser] = useState([])
    AsyncStorageLib.getItem('user').then(resp =>setIdUser(JSON.parse(resp)))
    const [modalAddTest, setModalAddTest] = useState(false)
    const [modalEditTest, setModalEditTest] = useState(false)
    const [estado, setEstado] = useState(false)
    const [tests, setTests] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [progress, setProgress] = useState('none')
    const [exist, setExist] = useState('none')
    const [changeData, setChangeData] = useState({
        test_name: '',
        test_description: '',
        test_register_date: todo,
        test_status: false,
        user_id: '',
    })

    useEffect(() => {
        getTests()
    }, [])

    const getTests = async () => {
        setProgress('flex')
        await axios.get(`${PORT_URL}tests`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgress('none')
                // document.getElementById('nose').display='none'
                setTests(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //-------------POEST TEST-------------------
    const openModalAddTest = () => {
        setModalAddTest(true)
    }
    const closeModalAddTest = () => {
        setModalAddTest(false)
        setChangeData({
            test_name: '',
            test_description: '',
            test_register_date: todo,
            test_status: false,
            user_id: '',
        })
    }
    const postTest = async (e) => {
        e.preventDefault()
        if (changeData.test_name === '' || changeData.test_description === '') {
            return alert('Llene los datos')
        }
        await axios.post(`${PORT_URL}test`, changeData)
            .then(resp => {
                console.log(resp.data)
                getTests()
                closeModalAddTest()
                setChangeData({
                    test_name: '',
                    test_description: '',
                    test_register_date: todo,
                    test_status: false,
                    user_id: '',
                })
            })
            .catch(err => {
                console.log(err)
            })
        // await axios.post(`${PORT_URL}test-aptitudes`,changeData)

    }
    //--------------EDIT TEST---------------------------
    const openModalEditTest = (e) => {
        setChangeData(e)
        setModalEditTest(true)
    }
    const closeModalEditTest = () => {
        setModalEditTest(false)
        setChangeData({
            test_name: '',
            test_description: '',
            test_register_date: todo,
            test_status: false,
            user_id: '',
        })
    }
    const openStatus = () => {
        setEstado(true)
    }
    const closeStatus = (e) => {
        setChangeData({
            ...changeData,
            test_status: e,
        })
        setEstado(false)
    }
    const editTests = async (e) => {
        e.preventDefault()
        const id = changeData.test_id
        await axios.put(`${PORT_URL}test/${id}`, changeData)
            .then(resp => {
                getTests()
                closeModalEditTest()
            })
            .catch(err => {
                console.log(err)
            })
        // console.log(changeData)

    }
    //--------------DETELE TEST---------------------------
    const deleteTest = async (e) => {
        // e.preventDefault()
        await axios.delete(`${PORT_URL}test/${e}`)
            .then(resp => {
                getTests()
            })
            .catch(err => console.log(err))
    }
    //--------------HANDLE CHANGE---------------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            user_id:idUser,
            [name]: value
        })
    }
    //---------REFRESH------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getTests()
        setRefresing(false)
    })
    return (
        <>
            <Layaut>
                <LinearGradient style={styles.buttonRegister} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                    <TouchableOpacity style={styles.buttonSuccess} onPress={openModalAddTest} >
                        <Text style={{ color: 'white' }}>Nuevo Test</Text>
                        <AntDesign name="addfile" size={20} color="white" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </LinearGradient>
                <ScrollView
                    style={{ marginBottom: 50 }}
                    refreshControl={<RefreshControl
                        colors={['#78e08f']}
                        onRefresh={onRefresh}
                        refreshing={refresing}
                    />}>
                    {tests.length > 0 ? (
                        tests.map((e, index) => (
                            // <View key={index} style={styles.testView}>
                            <View key={index} style={{ marginBottom: 10, marginHorizontal: 15 }}>
                                <ImageBackground source={require('../../../../../images/ImagesFondo/test-image3.jpg')} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                <View style={styles.marginText}>
                                    <View>
                                        <Text style={{ color: 'white' }}>{e.test_name}</Text>
                                        <Text style={{ color: 'white' }}>{e.test_description}</Text>
                                        <Text style={{ color: 'white' }}>{e.test_register_date}</Text>
                                        {/* <Text>{e.test_status.toString()}</Text> */}
                                    </View>
                                    {e.test_status === true ? (<AntDesign name="checkcircle" size={40} color="#76ff03" />) : (<AntDesign name="closecircle" size={40} color="#ff1744" />)}
                                </View>
                                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingBottom: 10 }}>
                                    <TouchableOpacity onPress={() => openModalEditTest(e)}>
                                        <SuccessButton name={'Actualizar'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteTest(e.test_id)}>
                                        <CancelButton name={'Eliminar'} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() =>navigation.navigate('RealizeTestScreem') }>
                                        <CancelButton name={'ir'} />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
                            <View style={{ display: progress }}>
                                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                            </View>
                        </>

                    )
                    }
                </ScrollView>
            </Layaut>

            {/* ------------------REGISTER TEST----------------------------------------- */}
            <Modal
                visible={modalAddTest}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <LinearGradient style={{ marginHorizontal: 15, borderRadius: 5, padding: 5 }} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} colors={['#335469', '#587c92', '#335469']}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ margin: 10, color: 'white' }}>CREAR NUEVO EVENTO</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Nombre Test'
                                onChangeText={text => handleChange('test_name', text)}
                                value={changeData.test_name}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Descripción'
                                onChangeText={text => handleChange('test_description', text)}
                                value={changeData.test_description}
                            />
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity onPress={postTest}>
                                    <SuccessButton name={'Aceptar'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeModalAddTest}>
                                    <CancelButton name={'Cancel'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
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
                                onChangeText={text => handleChange('test_name', text)}
                                value={changeData.test_name}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Descripción'
                                onChangeText={text => handleChange('test_description', text)}
                                value={changeData.test_description}
                            />
                            {changeData.test_status === true ? (
                                <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus, backgroundColor: 'green', width: '90%', alignItems: 'center' }}>
                                    <Text>Vigente</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus, backgroundColor: 'red', width: '90%', alignItems: 'center' }}>
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
        </>
    )
}
const styles = StyleSheet.create({
    buttonRegister: {
        padding: 7,
        marginBottom: 5,
        borderRadius: 5,
        marginHorizontal: 15,
    },
    buttonSuccess: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonStatus: {
        // backgroundColor: 'red',
        padding: 10,
        marginBottom: 5,
        borderRadius: 3,
        marginHorizontal: 6
    },
    centeredViewProgress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: '#3C425A',
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    modalView2: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        marginBottom: 10,
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 35,
        padding: 5,

    },
    ImageView: {
        opacity: 0.5,
        width: '100%',
        height: '100%',
        position: 'absolute',
        // marginHorizontal:15
    },
    marginText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
})

export default CreateTestScreem