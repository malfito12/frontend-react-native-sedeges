import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import fondoImage from '../../../../../images/ImagesFondo/test-analitico.jpg'

const TestsList = ({ navigation }) => {
    const [tests, setTests] = useState([])
    const [refresing, setRefresing] = useState(false)
    // let isRendered=useRef(false)
    useEffect(() => {
        let isRendered = true
        axios.get(`${PORT_URL}testsStatus`)
            .then(resp => {
                if (isRendered) {
                    setTests(resp.data)
                }
                return null
            })
            .catch(err => console.log(err))
        // getTests()
        return () => {
            isRendered = false
        }
    }, [])

    const getTests = async () => {
        await axios.get(`${PORT_URL}testsStatus`)
            .then(resp => {
                setTests(resp.data)
            })
            .catch(err => console.log(err))
    }
    // // console.log(tests)
    //---------REFRESH------
    const onRefresh = useCallback(async () => {
        setRefresing(true)
        await getTests()
        setRefresing(false)
    })
    // -----------------------------------------
    const prueba = async (e) => {
        await AsyncStorageLib.setItem('test', JSON.stringify(e))
        // await navigation.navigate('InicioTestEst')
        await navigation.navigate('CategoryTest')
    }
    return (
        <Layaut>
            <FlatList
                data={tests}
                // data={tests}
                style={{ width: '100%' }}
                keyExtractor={item => item.test_id}
                renderItem={p => (
                    <View style={styles.testView}>
                        <ImageBackground source={fondoImage} resizeMode="cover">
                            <View>
                                <Text>{p.item.test_name}</Text>
                                <Text>{p.item.test_description}</Text>
                            </View>
                            <TouchableOpacity onPress={() => prueba(p.item)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 25 }}>
                                <Text style={{ color: 'white' }}>go</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
                refreshControl={<RefreshControl
                    colors={['#78e08f']}
                    onRefresh={onRefresh}
                    refreshing={refresing}
                />}
            />
        </Layaut>
    )
}
const styles = StyleSheet.create({
    testView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 7,
        borderRadius: 3,
        justifyContent: 'space-between',
        alignItems: 'center',

    }
})

export default TestsList