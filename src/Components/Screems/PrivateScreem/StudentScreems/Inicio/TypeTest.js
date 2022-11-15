import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import TestMadurez from '../../../../../images/ImagesFondo/test-madurez-mental.png'
import TestAptitudes from '../../../../../images/ImagesFondo/test-aptitudes.jpg'
import TestIntereses from '../../../../../images/ImagesFondo/test-intereses.jpg'

const TypeTest = ({ navigation, route }) => {
    const [resultAptitudes, setResultAptitudes] = useState([])
    const [resultIntereses, setResultIntereses] = useState([])
    const [resultMadurez, setResultMadurez] = useState([])
    const [progress, setProgress] = useState('flex')
    const [exist, setExist] = useState('none')
    const [isVisible, setIsVisible] = useState(true);
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getResultsAptitudes()
            return () => { isActive = false }
        }, [])
    )

    const getResultsAptitudes = async () => {
        setProgress('flex')
        setExist('none')
        await axios.get(`${PORT_URL}get-result-type-test-aptitudes?event_id=${route.params.event_id}&student_id=${route.params.student_id}`)
            .then(resp => {
                if (resp.data) {
                    setExist('flex')
                    setProgress('none')
                }
                setResultAptitudes(resp.data.resultAp)
                setResultIntereses(resp.data.resultIn)
                setResultMadurez(resp.data.resultMM)
            })
            .catch(err => console.log(err))
    }
    return (
        <Layaut>
            <ScrollView>
                {resultMadurez === true ? (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView}>
                            <ImageBackground source={TestMadurez} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View >
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium', display: exist }}>CUESTIONARIO MADUREZ MENTAL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView} onPress={() => navigation.push('CategoryTest', { student_id: route.params.student_id, event_id: route.params.event_id })}>
                            <ImageBackground source={TestMadurez} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View >
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', display: exist }}>CUESTIONARIO MADUREZ MENTAL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {resultAptitudes === true ? (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView} >
                            <ImageBackground source={TestAptitudes} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View >
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium', display: exist }}>CUESTIONARIO DE APTITUDES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView} onPress={() => navigation.push('InstructionTestAptitudes', { student_id: route.params.student_id })} >
                            <ImageBackground source={TestAptitudes} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View >
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium', display: exist }}>CUESTIONARIO DE APTITUDES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {resultIntereses === true ? (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView}>
                            <ImageBackground source={TestIntereses} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View>
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'red', fontFamily: 'Roboto_500Medium', display: exist }}>CUESTIONARIO DE INTERESES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity style={styles.testView} onPress={() => navigation.push('InstructionTestIntereses', { student_id: route.params.student_id })}>
                            <ImageBackground source={TestIntereses} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                            <View>
                                <Progress.Circle style={{ alignSelf: 'center', display: progress }} borderWidth={2} size={20} indeterminate={true} />
                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium',display: exist }}>CUESTIONARIO DE INTERESES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </Layaut>
    )
}

export default TypeTest

const styles = StyleSheet.create({
    testView: {
        borderRadius: 5,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageView: {
        opacity: 0.5,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})