import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Progress from 'react-native-progress'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'

const SearchStudent = ({ navigation, route }) => {
    const [searchStudent, setSearchStudent] = useState([])
    const [changeData, setChangeData] = useState({ ci: '' })
    const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
    const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState('none')
    const [exist, setExist] = useState('none')
    const [progressRequest, setProgressRequest] = useState(false)
    //-------------SEARCH STUDENT------------
    const findStudent = async () => {
        const ci = changeData.ci
        setProgress('flex')
        await axios.get(`${PORT_URL}student/${ci}`)
            .then(resp => {
                // console.log(resp.data)
                if (resp.data.length === 0) {
                    setExist('flex')
                    setProgress('none')
                }
                setSearchStudent(resp.data)
                AsyncStorageLib.setItem('student_ci', JSON.stringify(resp.data[0].student_ci))
                setChangeData({ ci: '' })
                setProgress('none')
            })
            .catch(err => console.log(err))
    }
    //-------------HANLDE CHANGE----------------------
    const handleChange = (name, value) => {
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <Layaut>
            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Introduca N° Cedula de Indentidad</Text>
            <TextInput
                style={styles.input}
                placeholder='C.I.'
                placeholderTextColor='#b0bec5'
                onChangeText={text => handleChange('ci', text)}
                value={changeData.ci}
            />
            <LinearGradient style={{ borderRadius: 2 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={findStudent} style={{ padding: 10 }}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Buscar</Text>
                </TouchableOpacity>
            </LinearGradient>
            {searchStudent.length > 0 ? (
                <View style={styles.viewCard}>
                    <Text style={{...styles.testStyle,alignSelf:'center',padding:10}}>INFORMACION DEL ESTUDIANTE</Text>
                    <Text style={styles.testStyle}>Nombres: {searchStudent[0].student_first_name}</Text>
                    <Text style={styles.testStyle}>Apellidos: {searchStudent[0].student_last_father_name} {searchStudent[0].student_last_mother_name}</Text>
                    <Text style={styles.testStyle}>Sexo: {searchStudent[0].student_sex}</Text>
                    <Text style={styles.testStyle}>Edad: {searchStudent[0].student_age}</Text>
                    <Text style={styles.testStyle}>Cedula de Identidad: {searchStudent[0].student_ci}</Text>
                    <Text style={styles.testStyle}>Ocupación: {searchStudent[0].student_ocupation}</Text>
                    <LinearGradient style={styles.linearButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
                        <TouchableOpacity onPress={() => navigation.push('TypeTest', { student_id: searchStudent[0].student_id, event_id: route.params.event_id })} style={{ padding: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>COMENZAR</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            ) : (
                <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No se Encontró al Estudiante</Text>
            )}
            {/* -----------------PROGRES DE BUSQUEDA------------------------ */}
            <View style={{ display: progress, marginTop: 20 }}>
                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
            </View>
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
        borderColor: '#10ac84',
        marginTop: 10
    },
    viewCard: {
        padding: 10,
        backgroundColor: '#12151C',
        marginTop: 20,
        borderRadius: 3,
    },
    linearButton:{
        borderRadius: 2, 
        marginBottom: 10,
        width:'70%',
        alignSelf:'center',
        marginTop:15,
    },
    testStyle:{
        fontFamily: 'Roboto_500Medium',
        fontSize:16,
        color:'white',
        marginHorizontal:20
    }
})
export default SearchStudent