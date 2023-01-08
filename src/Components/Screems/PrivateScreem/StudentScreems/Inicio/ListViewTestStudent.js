import { View, Text, RefreshControl, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import axios from 'axios'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import fondoImage from '../../../../../images/ImagesFondo/test-analitico.jpg'
import * as Progress from 'react-native-progress'
import * as Animatable from 'react-native-animatable'

const ListViewTestStudent = ({ navigation }) => {
    const [event, setEvent] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [progress, setProgress] = useState('none')
    const [exist, setExist] = useState('none')
    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getEvent()
            return () => { isActive = false }
        }, [])
    )

    //-------------GET EVENTOS------------------------------
    const getEvent = async () => {
        setProgress('flex')
        await axios.get(`${PORT_URL}get-event-status`)
            .then(resp => {
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgress('none')
                setEvent(resp.data)
            })
            .catch(err => console.log(err))
    }

    //---------REFRESH-----------------------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getEvent()
        setRefresing(false)
    })
    //-------------------------------------------
    const realizeTest = (e) => {
        AsyncStorageLib.setItem('event_id', JSON.stringify(e))
        // navigation.navigate('TestOrientationType')
        navigation.navigate('SearchStudent', { event_id: e })
    }
    return (
        <>
            <Layaut>
                <ScrollView
                    // style={{ marginBottom: 50 }}
                    refreshControl={<RefreshControl
                        colors={['#78e08f']}
                        onRefresh={onRefresh}
                        refreshing={refresing}
                    />}
                >
                    <View style={{ padding: 5 }}>
                        {event.length > 0 ? (
                            event.map((e, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <ImageBackground source={fondoImage} resizeMode="cover" style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
                                    <View style={styles.testView}>
                                        <View style={{ paddingBottom: 10 }}>
                                            <Text style={{ fontSize: 16, ...styles.textStyles }}>{e.event_name}</Text>
                                            {/* <Text style={styles.textStyles}>{e.test_description}</Text> */}
                                        </View>
                                        <LinearGradient style={{ width: '50%', borderRadius: 5, }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
                                            <TouchableOpacity onPress={() => realizeTest(e.event_id)} style={styles.buttonGoTest}>
                                                <Text style={styles.textStyles}>Iniciar Test</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <>
                                <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>Eventos Inhabilitados</Text>
                                <View style={{ display: progress }}>
                                    <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </Layaut>
        </>
    )
}

export default ListViewTestStudent

const styles = StyleSheet.create({
    testView: {
        flex: 1,
        padding: 10,
        margin: 7,
        // marginHorizontal: 15,
        // backgroundColor:'red',
    },
    ImageView: {
        opacity: 0.9,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    buttonGoTest: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    textStyles: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
    }
})