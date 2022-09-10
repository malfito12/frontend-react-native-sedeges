import { View, Text, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const ListViewStudentsReception = ({ navigation, route }) => {
    const [students, setStudents] = useState([])
    const [progress, setProgress] = useState('none')
    const [exist, setExist] = useState('none')
    const [refresing, setRefresing] = useState(false)

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
    //---------REFRESH------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getStudents()
        setRefresing(false)
    })
    return (
        <Layaut>
            <ScrollView
                style={{ marginBottom: 50 }}
                refreshControl={<RefreshControl
                    colors={['#78e08f']}
                    onRefresh={onRefresh}
                    refreshing={refresing}
                />}
            >
                <Text style={{color:'white',alignSelf:'center'}}>{route.params.data.reception_name} - {route.params.data.reception_localidad}</Text>
                {students.length > 0 ? (
                    students.map((e, index) => (
                        <View key={index} style={{ backgroundColor: '#12151C', margin: 7, padding: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>{e.student_first_name} {e.student_last_name}</Text>
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
    )
}

export default ListViewStudentsReception