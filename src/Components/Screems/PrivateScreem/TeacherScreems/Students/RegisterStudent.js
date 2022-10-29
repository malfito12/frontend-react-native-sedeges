import { View, Text, TextInput, Platform, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Progress from 'react-native-progress'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { Picker } from '@react-native-picker/picker';
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const RegisterStudent = ({ navigation }) => {
    const [idUser, setIdUser] = useState([])
    AsyncStorageLib.getItem('user').then(resp => setIdUser(JSON.parse(resp)))
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)
    const [textData, setTextData] = useState('')
    const [reception, setReception] = useState([])
    const [changeData, setChangeData] = useState({
        firstName: '',
        lastNameFather: '',
        lastNameMother: '',
        birthDate: '',
        age: '',
        sex: '',
        ocupation: '',
        ci: '',
        reception_id: '',
        grado: ''
        // nameInstitution: '',
    })

    useEffect(() => {
        getReceptions()
    }, [])
    //------GET RECEPTIONS-------------------
    const getReceptions = async () => {
        await axios.get(`${PORT_URL}get-receptions`)
            .then(resp => {
                setReception(resp.data)
            })
            .catch(err => console.log(err))
    }


    const openModalDate = (e) => {
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
            birthDate: fDate,
        })
        setTextData(fDate)
        closeModal();
    };

    //-----------POST STUDENT---------------
    const postStudent = async (e) => {
        e.preventDefault()
        if (
            changeData.firstName == '' ||
            changeData.lastNameFather == '' ||
            changeData.lastNameMother == '' ||
            changeData.birthDate == '' ||
            changeData.age == '' ||
            changeData.sex == '' ||
            changeData.ocupation == '' ||
            changeData.reception_id == '' ||
            changeData.ci == '',
            changeData.grado=='') {
            setMessage('Llene todos los datos')
            openModalAlertError()
            return
        }
        // console.log(changeData)
        const data = ({
            firstName: changeData.firstName.trim().replace(/\s\s+/g, ' '),
            lastNameFather: changeData.lastNameFather.trim().replace(/\s\s+/g, ' '),
            lastNameMother: changeData.lastNameMother.trim().replace(/\s\s+/g, ' '),
            birthDate: changeData.birthDate.trim().replace(/\s\s+/g, ' '),
            age: changeData.age.trim().replace(/\s\s+/g, ' '),
            sex: changeData.sex.trim().replace(/\s\s+/g, ' '),
            ocupation: changeData.ocupation.trim().replace(/\s\s+/g, ' '),
            ci: changeData.ci.trim().replace(/\s\s+/g, ' '),
            user_id: idUser,
            grado: changeData.grado,
            reception_id: changeData.reception_id
        })
        // console.log(data)
        setProgress(true)
        await axios.post(`${PORT_URL}student`, data)
            .then(resp => {
                setMessage(resp.data.message)
                setProgress(false)
                openModalAlert()
                setChangeData({
                    firstName: '',
                    lastNameFather: '',
                    lastNameMother: '',
                    birthDate: '',
                    age: '',
                    sex: '',
                    ocupation: '',
                    ci: '',
                    nameInstitution: '',
                    reception_id: '',
                    grado:''
                })
                // navigation.popToTop('StudentsAdminScreem')
            })
            .catch(err => {
                setProgress(false)
                if (err.response) {
                    setMessage(err.response.data.message)
                    openModalAlertError()
                }
                console.log(err)
            })
        // console.log(changeData)
    }
    //--------------CHANGE DATA--------------------
    const handleChange = (name, value) => {
        // console.log(value)
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <>
            <Layaut>
                <ScrollView>
                    {/* <Text style={{ color: 'white', marginBottom: 10, alignSelf: 'center', fontFamily: 'Roboto_500Medium' }}>Datos Personales</Text> */}
                    <View style={{ marginBottom: 10, padding: 5, borderRadius: 4 }}>
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Nombre Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ejm: José Maria'
                            placeholderTextColor='#b0bec5'
                            value={changeData.firstName}
                            onChangeText={text => handleChange('firstName', text)}
                        />
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Apellido Paterno</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ejm: Martinez'
                            placeholderTextColor='#b0bec5'
                            value={changeData.lastNameFather}
                            onChangeText={text => handleChange('lastNameFather', text)}
                        />
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Apellido Materno</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ejm: Llanos'
                            placeholderTextColor='#b0bec5'
                            value={changeData.lastNameMother}
                            onChangeText={text => handleChange('lastNameMother', text)}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '38%' }}>
                                <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Edad</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Ejm: 22'
                                    keyboardType='numeric'
                                    placeholderTextColor='#b0bec5'
                                    value={changeData.age}
                                    onChangeText={text => handleChange('age', text)}
                                />
                            </View>
                            <View style={{ width: '60%' }}>
                                <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Cedula de Identidad</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Ejm: 8548569'
                                    placeholderTextColor='#b0bec5'
                                    value={changeData.ci}
                                    onChangeText={text => handleChange('ci', text)}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '60%' }}>
                                <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Fecha de Nacimiento</Text>
                                <View style={styles.inputDate}>
                                    <TextInput
                                        style={{ color: 'white' }}
                                        placeholder='Ejm: dd/mm/aaaa'
                                        placeholderTextColor='#b0bec5'
                                        // value={textData}
                                        defaultValue={textData}
                                        onChangeText={text => handleChange('birthDate', text)}
                                    />
                                    <TouchableOpacity onPress={openModalDate} style={{ backgroundColor: 'green', padding: 5, margin: 5, borderRadius: 3, }}>
                                        <Text style={{ color: 'white' }}>Fecha</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={open}
                                        // mode="date"
                                        mode={new Date()}
                                        onConfirm={(date) => handleConfirm(date)}
                                        onCancel={closeModalDate}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '38%' }}>
                                <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Sexo</Text>
                                <View style={{ borderRadius: 3, borderColor: '#10ac84', borderWidth: 1, marginBottom: 10 }}>
                                    <Picker
                                        style={{ color: 'white', height: 40 }}
                                        selectedValue={changeData.sex}
                                        onValueChange={(itemValue, itemIndex) => {
                                            handleChange('sex', itemValue)
                                        }}>
                                        <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
                                        <Picker.Item label="Masculino" style={{ fontSize: 14 }} value="M" />
                                        <Picker.Item label="Femenino" style={{ fontSize: 14 }} value="F" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Ocupación</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ocupacion'
                            placeholderTextColor='#b0bec5'
                            value={changeData.ocupation}
                            onChangeText={text => handleChange('ocupation', text)}
                        />
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Grado del Estudiante</Text>
                        <View style={{ borderRadius: 3, borderColor: '#10ac84', borderWidth: 1, marginBottom: 10 }}>
                            <Picker
                                style={{ color: 'white', height: 40 }}
                                selectedValue={changeData.grado}
                                onValueChange={(itemValue, itemIndex) => {
                                    handleChange('grado', itemValue)
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
                        <Text style={{ color: 'white', marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Centro de Acogida</Text>
                        <View style={{ borderRadius: 3, borderColor: '#10ac84', borderWidth: 1, marginBottom: 10 }}>
                            <Picker
                                style={{ color: 'white', height: 40 }}
                                itemStyle={{ color: 'red' }}
                                // selectedValue={selectedLanguage.tipo}
                                selectedValue={changeData.reception_id}
                                onValueChange={(itemValue, itemIndex) =>
                                    handleChange('reception_id', itemValue)
                                }>

                                <Picker.Item label='Selecciones...' value='' style={{ fontSize: 14 }} />
                                {reception.length > 0 ? reception.map((e, index) => (
                                    <Picker.Item key={e.reception_id} label={e.reception_name} value={e.reception_id} style={{ fontSize: 14 }} />

                                )) : (null)}
                            </Picker>
                        </View>
                        <LinearGradient style={{ borderRadius: 2 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                            <TouchableOpacity onPress={postStudent} style={{ padding: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Guardar Información</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    {/* <LinearGradient style={{ borderRadius: 2 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.popToTop('StudentsAdminScreem')}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>INICIAR EVALUACION</Text>
                    </TouchableOpacity>
                </LinearGradient> */}
                </ScrollView>
            </Layaut>
            {/* ---------------------ALERTS STUDENTS------------------------ */}
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
    inputDate: {
        fontFamily: 'Roboto_500Medium',
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        paddingLeft: 10,
        borderColor: '#10ac84',
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

export default RegisterStudent