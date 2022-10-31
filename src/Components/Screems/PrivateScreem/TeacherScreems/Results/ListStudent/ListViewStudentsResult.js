import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'
import * as Progress from 'react-native-progress'

const ListViewStudentsResult = ({ navigation, route }) => {
    const [students, setStudents] = useState([])
    const [progressName, setProgressName] = useState('none')
    const [exist, setExist] = useState('none')

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getStudents()
            return () => { isActive = false }
        }, [])
    )
    //-----------GET STUDNETS------------------
    const getStudents = async () => {
        setProgressName('flex')
        await axios.get(`${PORT_URL}list-student-event/${route.params.data.event_id}`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgressName('none')
                setStudents(resp.data)
            })
            .catch(err => console.log(err))
    }
    const resultStudent = (e) => {
        // alert(JSON.stringify(e))
        // navigation.push('ResultsAptitudStudent',{data:e})
        navigation.navigate('ResultsAdminScreem', { data: e })
    }
    return (
        <Layaut>
            <ScrollView>
                {students.length > 0 ? (
                    students.map((e, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#12151C', borderRadius: 2, padding: 5, margin: 4 }}>
                            <Text style={{ color: 'white' }}>{e.student_first_name} {e.student_last_father_name} {e.student_last_mother_name}</Text>
                            <TouchableOpacity onPress={() => resultStudent(e)} style={{ backgroundColor: 'green', borderRadius: 2, padding: 5, margin: 5 }}>
                                <Text style={{ color: 'white' }}> Ver Resultados</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <>
                        <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
                        <View style={{ display: progressName }}>
                            <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                        </View>
                    </>
                )}
            </ScrollView>
        </Layaut>
    )
}

export default ListViewStudentsResult