import { View, Text, FlatList,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const InicioTest = ({ navigation, route }) => {
    const [test, setTest] = useState([])
    useEffect(() => {
        getTest()
    }, [])
    const getTest = async () => {
        await AsyncStorageLib.getItem('test').then(resp => {
            setTest(JSON.parse(resp))
        })
    }
    const data = [
        { title: 'test 1',id:1 },
        { title: 'test 2',id:2 },
        { title: 'test 3',id:3 },
        { title: 'test 4',id:4 },
        { title: 'test 5',id:5 },
        { title: 'test 6',id:6 },
        { title: 'test 7',id:7 },
        { title: 'test 8',id:8 },
        { title: 'test 9',id:9 },
    ]
    return (
        <Layaut>
            {/* <Text style={{ color: 'white' }}>Lee Atentamente cada grupo de oraciones escritas con letras mayusculas, asi como las 
            tres posibles respuestas, luego escoja la mas adecuada y consigne la letra de su respues</Text> */}
            <Text style={{ color: 'white',alignSelf:'center' }}>{test.test_name}</Text>
            <Text style={{ color: 'white',alignSelf:'center' }}>{test.test_description}</Text>
            <FlatList
                data={data}
                // data={tests}
                style={{ width: '100%' }}
                keyExtractor={item => item.id}
                renderItem={p => (
                    <View style={styles.testView}>
                        <View>
                            <Text>{p.item.title}</Text>
                            {/* <Text>{p.item.test_description}</Text> */}
                        </View>
                        <TouchableOpacity style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 25 }}>
                            <Text style={{ color: 'white' }}>go</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
      alignItems: 'center'
    }
  })

export default InicioTest