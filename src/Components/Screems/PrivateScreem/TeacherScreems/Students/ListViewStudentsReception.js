import { View, Text, RefreshControl, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'

const ListViewStudentsReception = ({ navigation, route }) => {
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progressRequest, setProgressRequest] = useState(false)
    const [students, setStudents] = useState([])
    const [progress, setProgress] = useState('none')
    const [exist, setExist] = useState('none')
    const [refresing, setRefresing] = useState(false)
    const [openModalOptions, setOpenModalOptions] = useState(false)
    const [modalStudentUpdate, setModalStudentUpdate] = useState(false)
    const [modalStudentDelete, setModalStudentDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [dataStudent, setDataStudent] = useState({
        student_first_name: '',
        student_last_father_name: '',
        student_last_mother_name: '',
        student_birth_date: '',
        student_age: '',
        student_sex: '',
        student_ocupation: '',
        student_ci: '',
        student_grado: '',
        student_id: '',
    })
    const [changeData, setChangeData] = useState({
        student_first_name: '',
        student_last_father_name: '',
        student_last_mother_name: '',
        student_birth_date: '',
        student_age: '',
        student_sex: '',
        student_ocupation: '',
        student_ci: '',
        student_grado: '',
        student_id: '',
    })
    const cleanUp = {
        student_first_name: '',
        student_last_father_name: '',
        student_last_mother_name: '',
        student_birth_date: '',
        student_age: '',
        student_sex: '',
        student_ocupation: '',
        student_ci: '',
        student_grado: '',
    }
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getStudents()
            return () => { isActive = false }
        }, [])
    )

    //--------------GET STUDENTS---------------
    const getStudents = async () => {
        setProgress('flex')
        await axios.get(`${PORT_URL}get-students-reception/${route.params.data.reception_id}`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgress('none')
                setStudents(resp.data)
            })
            .catch(err => console.log(err))
    }

    //------------MODAL OPTIONS-----------------------
    const openModalOptionsStudent = (e) => {
        setDataStudent(e)
        // alert(JSON.stringify(e))
        setOpenModalOptions(true)
    }
    const closeModalOptionsStudent = () => {
        setOpenModalOptions(false)
    }
    //------------EDIT MODAL STUDENTS-----------------------
    const openModalEditStudent = () => {
        setChangeData(dataStudent)
        setModalStudentUpdate(true)
    }
    const closeModalEditStudent = () => {
        setChangeData(cleanUp)
        setModalStudentUpdate(false)
    }
    const updateStudent = async () => {
        const id = changeData.student_id
        setProgressRequest(true)
        await axios.put(`${PORT_URL}student-update/${id}`, changeData)
            .then(resp => {
                setProgressRequest(false)
                setMessage(resp.data.message)
                openModalAlert()
                closeModalEditStudent()
                closeModalOptionsStudent()
                getStudents()
            })
            .catch(err => {
                setProgressRequest(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //---------------MODAL FECHA-----------------
    const openModalDate = () => {
        setOpen(true)
    }
    const closeModalDate = () => {
        setOpen(false)
    }
    const handleConfirm = (e) => {
        var day = e.getDate()
        var month = e.getMonth() + 1
        var year = e.getFullYear()
        if (day < 10) { day = '0' + e.getDate() }
        if (month < 10) { month = '0' + (e.getMonth() + 1) }
        var fDate = day + '/' + month + '/' + year
        setChangeData({
            ...changeData,
            student_birth_date: fDate,
        })
        closeModalDate();
    };
    //--------------DELETE STUDENT--------------------
    const [removeStudent, setRemoveStudent] = useState({ student_first_name: '', student_id: '' })
    const openModalDeleteStudent = () => {
        setRemoveStudent({ student_first_name: dataStudent.student_first_name, student_id: dataStudent.student_id })
        setModalStudentDelete(true)
    }
    const closeModalDeleteStudent = () => {
        setRemoveStudent({ student_first_name: '', student_id: '' })
        setModalStudentDelete(false)
    }
    const deleteStudent = async () => {
        const id = removeStudent.student_id
        setProgressRequest(true)
        await axios.delete(`${PORT_URL}student-delete/${id}`)
            .then(resp => {
                setProgressRequest(false)
                setMessage(resp.data.message)
                openModalAlert()
                getStudents()
                closeModalDeleteStudent()
                closeModalOptionsStudent()
            })
            .catch(err => {
                setProgressRequest(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
            })
    }
    //--------------CHANGE DATA--------------------
    const handleChange = (name, value) => {
        // console.log(value)
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    //-------------------------REFRESH--------------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getStudents()
        setRefresing(false)
    })
    return (
        <>
            <Layaut>
                <ScrollView
                    style={{ marginBottom: 50 }}
                    refreshControl={<RefreshControl
                        colors={['#78e08f']}
                        onRefresh={onRefresh}
                        refreshing={refresing}
                    />}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{route.params.data.reception_name} - {route.params.data.reception_provincia}</Text>
                    {students.length > 0 ? (
                        students.map((e, index) => (
                            <View key={index} style={styles.viewCard}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>{e.student_first_name} {e.student_last_father_name} {e.student_last_father_name}</Text>
                                <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => openModalOptionsStudent(e)}>
                                        <Ionicons name="options" size={24} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        ))
                    ) : (
                        <>
                            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
                            <View style={{ display: progress }}>
                                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                            </View>
                        </>
                    )}
                </ScrollView>
            </Layaut>
            {/* --------------------MODAL EDIT-------------------------------- */}
            <Modal
                visible={openModalOptions}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: 'white', marginHorizontal: 15 }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalOptionsStudent}>
                            <FontAwesome name="window-close" size={30} color="#424242" />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>INFORMACION DEL ESTUDIANTE</Text>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>{dataStudent.student_first_name} {dataStudent.student_last_father_name} {dataStudent.student_last_mother_name}</Text>
                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={() => openModalEditStudent()} style={{ width: '100%', padding: 10 }}  >
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Actualizar Información</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={{ width: '100%', marginBottom: 5 }}>
                            <TouchableOpacity onPress={openModalDeleteStudent} style={{ backgroundColor: 'red', marginHorizontal: 15, borderRadius: 3, padding: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* --------------------ACTUALIZAR ESTUDIANTE-------------------------------- */}
            <Modal
                visible={modalStudentUpdate}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
                        <ScrollView style={{ width: '100%' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalEditStudent}>
                                <FontAwesome name="window-close" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Nombres</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Max 25  Caracteres'
                                maxLength={25}
                                defaultValue={changeData.student_first_name}
                                onChangeText={text => handleChange('student_first_name', text)}
                            />
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Apellido Paterno</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Max 25  Caracteres'
                                maxLength={25}
                                defaultValue={changeData.student_last_father_name}
                                onChangeText={text => handleChange('student_last_father_name', text)}
                            />
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Apellido Materno</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Max 25  Caracteres'
                                maxLength={25}
                                defaultValue={changeData.student_last_mother_name}
                                onChangeText={text => handleChange('student_last_mother_name', text)}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 5, }}>
                                <View style={{ width: '40%' }}>
                                    <Text style={{ marginHorizontal: 15, color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Edad</Text>
                                    <TextInput
                                        // style={styles.input}
                                        style={styles.textInput}
                                        placeholder='Ejm: 22'
                                        keyboardType='numeric'
                                        placeholderTextColor='#b0bec5'
                                        defaultValue={(changeData.student_age).toString()}
                                        onChangeText={text => handleChange('student_age', text)}
                                    />
                                </View>
                                <View style={{ width: '66%' }}>
                                    <Text style={{ marginHorizontal: 15, color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Cedula de Identidad</Text>
                                    <TextInput
                                        // style={styles.input}
                                        style={styles.textInput}
                                        placeholder='Ejm: 8548569'
                                        placeholderTextColor='#b0bec5'
                                        defaultValue={changeData.student_ci}
                                        onChangeText={text => handleChange('student_ci', text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginHorizontal: 15, width: '90%' }}>
                                    <Text style={{ color: 'white', marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Fecha de Nacimiento</Text>
                                    <View style={styles.inputDate}>
                                        <TextInput
                                            style={{ color: 'black' }}
                                            placeholder='Ejm: dd/mm/aaaa'
                                            placeholderTextColor='#b0bec5'
                                            // value={textData}
                                            // defaultValue={textData}
                                            defaultValue={changeData.student_birth_date}
                                            onChangeText={text => handleChange('student_birth_date', text)}
                                        />
                                        <TouchableOpacity onPress={() => openModalDate()} style={{ backgroundColor: 'green', padding: 5, margin: 5, borderRadius: 3, }}>
                                            <Text style={{ color: 'white' }}>Fecha</Text>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={open}
                                            // mode="date"
                                            mode={new Date()}
                                            onConfirm={(date) => handleConfirm(date)}
                                            onCancel={() => closeModalDate()}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Sexo</Text>
                            <View style={styles.styleSelect}>
                                <Picker
                                    style={{ color: 'black', height: 40 }}
                                    selectedValue={changeData.student_sex}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleChange('student_sex', itemValue)
                                    }}>
                                    <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
                                    <Picker.Item label="Masculino" style={{ fontSize: 14 }} value="M" />
                                    <Picker.Item label="Femenino" style={{ fontSize: 14 }} value="F" />
                                </Picker>
                            </View>
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Ocupacion</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Max 25 Caracteres'
                                maxLength={25}
                                defaultValue={changeData.student_ocupation}
                                onChangeText={text => handleChange('student_ocupation', text)}
                            />
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 5, fontFamily: 'Roboto_400Regular' }}>Grado del Estudiante</Text>
                            <View style={styles.styleSelect}>
                                <Picker
                                    style={{ color: 'black', height: 40 }}
                                    selectedValue={changeData.student_grado}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleChange('student_grado', itemValue)
                                    }}>
                                    <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
                                    <Picker.Item label="Primer Grado" style={{ fontSize: 14 }} value="Primer Grado" />
                                    <Picker.Item label="Segundo Grado" style={{ fontSize: 14 }} value="Segundo Grado" />
                                    <Picker.Item label="Tercer Grado" style={{ fontSize: 14 }} value="Tercer Grado" />
                                    <Picker.Item label="Cuarto Grado" style={{ fontSize: 14 }} value="Cuarto Grado" />
                                    <Picker.Item label="Quinto Grado" style={{ fontSize: 14 }} value="Quinto Grado" />
                                    <Picker.Item label="Sexto Grado" style={{ fontSize: 14 }} value="Sexto Grado" />
                                </Picker>
                            </View>
                            <View style={{ width: '100%', marginBottom: 5, marginTop: 20 }}>
                                <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                    <TouchableOpacity onPress={updateStudent} style={{ width: '100%', padding: 10 }} >
                                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Actualizar</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            {/* -----------------------------------MODAL DELETE STUDENT------------------------ */}
            <Modal
                visible={modalStudentDelete}
                animationType='fade'
                transparent
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
                        <Text style={{ alignSelf: 'center', fontFamily: 'Roboto_500Medium', color: 'white', padding: 15 }}>Estas Seguro de Eliminar a {removeStudent.student_first_name} </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                                <TouchableOpacity onPress={deleteStudent} style={{ padding: 5, width: '100%' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <TouchableOpacity onPress={closeModalDeleteStudent} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* ---------------------ALERTS ------------------------ */}
            <Modal
                visible={progressRequest}
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

export default ListViewStudentsReception

const styles = StyleSheet.create({
    viewCard: {
        backgroundColor: '#12151C',
        margin: 7,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        borderRadius: 3,
        padding: 5,
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        marginBottom: 5,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 3,
        height: 40,
        padding: 10,
        fontFamily: 'Roboto_400Regular_Italic'
    },
    styleSelect: {
        width: '90%',
        borderRadius: 3,
        borderWidth: 1,
        height: 40,
        marginHorizontal: 15,
        padding: 4,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'center',
        display: 'flex',
        borderColor: '#335469',
    },
    inputDate: {
        fontFamily: 'Roboto_500Medium',
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        paddingLeft: 10,
        borderColor: '#335469',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
})