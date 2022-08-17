import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const SearchStudent = ({navigation,route}) => {
    const [searchStudent, setSearchStudent] = useState([])
    const [changeData, setChangeData] = useState({ ci: '' })
    //-------------SEARCH STUDENT------------
    const findStudent = async () => {
        const ci = changeData.ci
        await axios.get(`${PORT_URL}student/${ci}`)
            .then(resp => {
                // console.log(resp.data)
                setSearchStudent(resp.data)
                AsyncStorageLib.setItem('student_ci', JSON.stringify(resp.data[0].student_ci))
                setChangeData({ ci: '' })
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
            <Text style={{ color: 'white' }}>Introduca N° Cedula de Indentidad</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput
                    style={styles.input}
                    placeholder='C.I.'
                    placeholderTextColor='#b0bec5'
                    onChangeText={text => handleChange('ci', text)}
                    value={changeData.ci}
                />
                <TouchableOpacity onPress={findStudent} style={{ backgroundColor: 'green', padding: 5, borderRadius: 3 }}>
                    <Text style={{ color: 'white' }}>Buscar</Text>
                </TouchableOpacity>
            </View>
            {searchStudent ? (
                searchStudent.map((e, index) => (
                    <View key={index} style={{ padding: 10 }}>
                        {/* <Text style={{ color: 'white' }}>id: {e.student_id}</Text> */}
                        <Text style={{ color: 'white' }}>Nombres: {e.student_first_name}</Text>
                        <Text style={{ color: 'white' }}>Apellidos: {e.student_last_name}</Text>
                        <Text style={{ color: 'white' }}>Sexo: {e.student_sex}</Text>
                        <Text style={{ color: 'white' }}>Edad: {e.student_age}</Text>
                        <Text style={{ color: 'white' }}>Ocupación: {e.student_ocupation}</Text>
                    </View>
                ))
            ) : (null)}
            {searchStudent.length > 0 ? (
                <>
                    <TouchableOpacity onPress={() => navigation.push('TypeTest', { student_id: searchStudent[0].student_id,event_id:route.params.event_id })} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>COMENZAR</Text>
                    </TouchableOpacity>
                </>
            ) : (<Text style={{ alignSelf: 'center', color: 'white' }}>No se Encontró al Estudiante</Text>)}
        </Layaut>
    )
}
const styles = StyleSheet.create({
    input: {
        fontFamily: 'Roboto_500Medium',
        width: '80%',
        marginBottom: 10,
        borderWidth: 1,
        color: 'white',
        borderRadius: 3,
        height: 40,
        padding: 10,
        borderColor: '#10ac84',
        marginTop: 10
    },
})
export default SearchStudent