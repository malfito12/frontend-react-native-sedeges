import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../../../Atoms/Context/AuthContext'
import axios from 'axios';
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const CreateTestScreem = () => {
    var fecha = new Date
    var anio = fecha.getFullYear()
    var mes = fecha.getMonth() + 1
    var dia = fecha.getDate()
    var todo;
    if (mes < 10) { todo = anio + '-' + '0' + mes + '-' + dia } else todo = anio + '-' + mes + '-' + dia

    const { user } = useContext(AuthContext)
    const [modalAddTest, setModalAddTest] = useState(false)
    const [modalEditTest, setModalEditTest] = useState(false)
    const [estado, setEstado] = useState(false)
    const [tests, setTests] = useState([])
    const [changeData, setChangeData] = useState({
        test_name: '',
        test_description: '',
        test_register_date: todo,
        test_status: false,
        user_id: user.user,
    })

    useEffect(() => {
        getTests()
    }, [])

    const getTests = async () => {
        await axios.get(`${PORT_URL}tests`)
            .then(resp => {
                setTests(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //-------------POEST TEST-------------------
    const openCloseModalAddTest = () => {
        setModalAddTest(!modalAddTest)
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
                openCloseModalAddTest()
                setChangeData({
                    test_name: '',
                    test_description: '',
                    test_register_date: todo,
                    test_status: false,
                    user_id: user.user,
                })
            })
            .catch(err => {
                console.log(err)
            })

    }
    //--------------EDIT TEST---------------------------
    const openModalEditTest = (e) => {
        setChangeData(e)
        setModalEditTest(true)
    }
    const closeModalEditTest = () => {
        setModalEditTest(false)
    }
    const openStatus = () => {
        setEstado(true)
    }
    const closeStatus=(e)=>{
        setChangeData({
            ...changeData,
            test_status: e
        })
        setEstado(false)
    }
    const editTests=async(e)=>{
        e.preventDefault()
        const id=changeData.test_id
        await axios.put(`${PORT_URL}test/${id}`,changeData)
        .then(resp=>{
            getTests()
            closeModalEditTest()
        })
        .catch(err=>{
            console.log(err)
        })
        // console.log(changeData)

    }
    //--------------HANDLE CHANGE---------------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <>
            <Layaut>
                <TouchableOpacity onPress={openCloseModalAddTest} style={styles.buttonRegister}>
                    <Text>Nuevo Test</Text>
                </TouchableOpacity>
                <ScrollView style={{ marginBottom: 50 }}>
                    {tests.length > 0 ? (
                        tests.map((e, index) => (
                            <View key={index} style={styles.testView}>
                                <View>
                                    <Text>{e.test_name}</Text>
                                    <Text>{e.test_description}</Text>
                                    <Text>{e.test_register_date}</Text>
                                    {/* <Text>{e.test_status.toString()}</Text> */}
                                </View>
                                {e.test_status === true ? (
                                    <TouchableOpacity onPress={() => openModalEditTest(e)} style={{ backgroundColor: 'green', padding: 10 }}>
                                        <Text style={{ color: 'white' }}>Vigente</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => openModalEditTest(e)} style={{ backgroundColor: 'red', padding: 10 }}>
                                        <Text style={{ color: 'white' }}>Cerrado</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: 'white', alignSelf: 'center', padding: 20 }}>No Existen registros</Text>
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
                    <View style={styles.modalView}>
                        <Text>CREAR NUEVO EVENTO</Text>
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
                        <TouchableOpacity onPress={postTest} style={styles.buttonRegister}>
                            <Text>aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCloseModalAddTest} style={styles.buttonRegister}>
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* ------------------------EDIT EVENTO------------------------------ */}
            <Modal
                visible={modalEditTest}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{color:'white'}}>EDITAR EVENTO</Text>
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
                            <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus,backgroundColor:'green', width: '90%', alignItems: 'center' }}>
                                <Text>Vigente</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={openStatus} style={{ ...styles.buttonStatus,backgroundColor:'red', width: '90%', alignItems: 'center' }}>
                                <Text>Cerrado</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={editTests} style={styles.buttonRegister}>
                            <Text>aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeModalEditTest} style={styles.buttonRegister}>
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'red',
        padding: 10,
        marginBottom: 5,
        borderRadius: 3,
        marginHorizontal: 6
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
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 35,
        padding: 5,

    },
    testView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 7,
        borderRadius: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default CreateTestScreem