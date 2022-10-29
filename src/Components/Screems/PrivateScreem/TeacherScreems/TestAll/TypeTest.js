import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const TypeTest = ({ navigation, route }) => {
    const [resultAptitudes, setResultAptitudes] = useState([])
    const [resultIntereses, setResultIntereses] = useState([])
    const [resultMadurez, setResultMadurez] = useState([])
    const [isVisible, setIsVisible] = useState(true);
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getResultsAptitudes()
            return () => { isActive = false }
        }, [])
    )

    const getResultsAptitudes = async () => {
        await axios.get(`${PORT_URL}get-result-type-test-aptitudes?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
            .then(resp => {
                setResultAptitudes(resp.data.resultAp)
                setResultIntereses(resp.data.resultIn)
                setResultMadurez(resp.data.resultMM)
            })
            .catch(err => console.log(err))
    }
    return (
        <Layaut>
            {resultMadurez === true ? (
                <TouchableOpacity  style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>CUESTIONARIO MADUREZ MENTAL</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.push('CategoryTest', { student_id: route.params.student_id, event_id: route.params.event_id })} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>CUESTIONARIO MADUREZ MENTAL</Text>
                </TouchableOpacity>
            )}
            {resultAptitudes === true ? (
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>CUESTIONARIO DE APTITUDES</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.push('InstructionTestAptitudes', { student_id: route.params.student_id })} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>CUESTIONARIO DE APTITUDES</Text>
                </TouchableOpacity>
            )}
            {resultIntereses === true ? (
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>CUESTIONARIO DE INTERESES</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.push('InstructionTestIntereses', { student_id: route.params.student_id })} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>CUESTIONARIO DE INTERESES</Text>
                </TouchableOpacity>
            )}
        </Layaut>
    )
}

export default TypeTest