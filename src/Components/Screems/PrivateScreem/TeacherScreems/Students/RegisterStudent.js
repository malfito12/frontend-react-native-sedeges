import { View, Text, TextInput, Platform, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const RegisterStudent = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [textData, setTextData] = useState('')
    const [changeData, setChangeData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        age: '',
        sex: '',
        ocupation: '',
        ci: ''
    })

    const onChange = (e, select) => {
        // const currenDate = select || date
        // setOpen(Platform.OS === 'android')
        // setDate(currenDate)
        // new Date(currenDate)
    }
    const openModal = (e) => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleConfirm = (e) => {
        var fDate = e.getDate() + '-' + (e.getMonth() + 1) + '-' + e.getFullYear()
        // console.log(`A date has been picked:`,fDate);
        setChangeData({
            ...changeData,
            birthDate: fDate
        })
        setTextData(fDate)
        closeModal();
    };

    //-----------POST STUDENT---------------
    const postStudent = async (e) => {
        e.preventDefault()
        if (changeData.firstName == '' || changeData.lastName == '' || changeData.birthDate == '' || changeData.age == '' || changeData.sex == '' || changeData.ocupation == '' || changeData.ci == '') {
            return alert('Llene todos los datos')
        }
        await axios.post(`${PORT_URL}student`, changeData)
            .then(resp => {
                alert(resp.data.message)
                navigation.popToTop('StudentsAdminScreem')
            })
            .catch(err => console.log(err))
        // console.log(changeData)
    }
    //--------------CHANGE DATA--------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <Layaut>
            <ScrollView>
                <View style={{ marginBottom: 10, padding: 5, borderRadius: 4 }}>
                    <Text style={{color:'white',marginBottom:10, alignSelf: 'center', fontFamily: 'Roboto_500Medium' }}>Datos Personales</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre Completo'
                        placeholderTextColor='#b0bec5'
                        onChangeText={text => handleChange('firstName', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Apellidos'
                        placeholderTextColor='#b0bec5'
                        onChangeText={text => handleChange('lastName', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Edad'
                        keyboardType='numeric'
                        placeholderTextColor='#b0bec5'
                        onChangeText={text => handleChange('age', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Sexo'
                        placeholderTextColor='#b0bec5'
                        maxLength={1}
                        onChangeText={text => handleChange('sex', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Cedula de Identidad'
                        placeholderTextColor='#b0bec5'
                        onChangeText={text => handleChange('ci', text)}
                    />
                    <View style={styles.inputDate}>
                        <TextInput
                            style={{color:'white'}}
                            placeholder='Fecha de Nacimiento'
                            placeholderTextColor='#b0bec5'
                            value={textData}
                            onChangeText={text => handleChange('birthDate', text)}
                        />
                        <TouchableOpacity onPress={openModal} style={{ backgroundColor: 'green', padding: 5, margin: 5, borderRadius: 3, }}>
                            <Text style={{ color: 'white' }}>Fecha</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={open}
                            // mode="date"
                            mode={new Date()}
                            onConfirm={(date) => handleConfirm(date)}
                            onCancel={closeModal}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Ocupacion'
                        placeholderTextColor='#b0bec5'
                        onChangeText={text => handleChange('ocupation', text)}
                    />
                    {/* <TextInput
                    style={styles.styleInput}
                    placeholder='Centro de Acogida'
                    placeholderTextColor='#b0bec5'
                /> */}
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
        justifyContent:'space-between'
    },
})

export default RegisterStudent