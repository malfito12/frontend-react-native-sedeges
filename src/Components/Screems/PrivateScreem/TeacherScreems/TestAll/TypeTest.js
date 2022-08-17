import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const TypeTest = ({ navigation, route }) => {
    const [resultAptitudes, setResultAptitudes] = useState([])
    const [resultIntereses, setResultIntereses] = useState([])
    const [isVisible, setIsVisible] = useState(true);
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            // getResultsAptitudes()
            getResultsIntereses()
            return () => {isActive = false }
        }, [])
    )
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsVisible(false);
    //     });
    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, []);

    const getResultsAptitudes = async () => {
        await axios.get(`${PORT_URL}get-result-type-test-aptitudes?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
            .then(resp => {
                setResultAptitudes(resp.data.message)
            })
            .catch(err => console.log(err))
    }
    const getResultsIntereses = async () => {
        await axios.get(`${PORT_URL}get-result-type-test-intereses?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
            .then(resp => {
                setResultIntereses(resp.data.message)
            })
            .catch(err => console.log(err))
    }
    // console.log(resultAptitudes)
    // console.log('---------------------')
    // console.log(resultIntereses)
    return (
        <Layaut>

            <TouchableOpacity onPress={() => navigation.push('CategoryTest', { student_id: route.params.student_id })} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>CUESTIONARIO MADUREZ MENTAL</Text>
            </TouchableOpacity>
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