import { View, TouchableOpacity, Text, FlatList, RefreshControl, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import fondoImage from '../../../../../images/ImagesFondo/test-analitico.jpg'
import { LinearGradient } from 'expo-linear-gradient'
const image = { uri: "https://reactjs.org/logo-og.png" };

const RealizeTestScreem = ({ navigation }) => {
  const [tests, setTests] = useState([])
  const [refresing, setRefresing] = useState(false)

  useEffect(() => {
    getTestsStatus()
  }, [])

  const getTestsStatus = async () => {
    await axios.get(`${PORT_URL}testsStatus`)
      .then(resp => {
        setTests(resp.data)
      })
      .catch(err => { console.log(err) })
  }
  //---------REFRESH------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getTestsStatus()
    setRefresing(false)
  })
  const data = [{ test_id: 1, test_name: 'No existe informacion' }]

  const prueba = async (e) => {
    await AsyncStorageLib.setItem('test', JSON.stringify(e))
    await navigation.navigate('DataPersonScreem')
  }
  return (
    <Layaut>
      {/* <FlatList
        data={tests}
        style={{ width: '100%' }}
        keyExtractor={item => item.test_id}
        renderItem={p => (
          <View style={styles.testView}>
            <View>
              <Text>{p.item.test_name}</Text>
              <Text>{p.item.test_description}</Text>
            </View>
            <TouchableOpacity onPress={() => prueba(p.item)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 25 }}>
              <Text style={{ color: 'white' }}>go</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={<RefreshControl
          colors={['#78e08f']}
          onRefresh={onRefresh}
          refreshing={refresing}
        />}
      /> */}
      <ScrollView
        style={{ marginBottom: 50 }}
        refreshControl={<RefreshControl
          colors={['#78e08f']}
          onRefresh={onRefresh}
          refreshing={refresing}
        />}
      >
        {tests.length > 0 ? (
          tests.map((e, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <ImageBackground source={fondoImage} resizeMode="cover" style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={styles.testView}>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={{fontSize:16,...styles.textStyles}}>{e.test_name}</Text>
                  {/* <Text style={styles.textStyles}>{e.test_description}</Text> */}
                </View>
                <LinearGradient style={{width: '50%',borderRadius: 5,}} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
                  <TouchableOpacity onPress={() => prueba(e)} style={styles.buttonGoTest}>
                    <Text style={styles.textStyles}>Iniciar Testssss</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text style={{ alignSelf: 'center', color: 'white' }}>No Existe Informacion</Text>
          </View>
        )}

      </ScrollView>
    </Layaut>
  )
}

const styles = StyleSheet.create({
  testView: {
    flex: 1,
    padding: 10,
    margin: 7,
    // marginHorizontal: 15,
    // backgroundColor:'red',
  },
  ImageView: {
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonGoTest: {
    width:'100%',
    padding: 10,
    alignItems: 'center',
  },
  textStyles: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
  }
})

export default RealizeTestScreem