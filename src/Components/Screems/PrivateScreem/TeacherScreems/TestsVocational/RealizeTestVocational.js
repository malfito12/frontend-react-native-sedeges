import { View, Text, ScrollView,StyleSheet,ImageBackground, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'
import fondoImage from '../../../../../images/ImagesFondo/test-analitico.jpg'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const RealizeTestVocational = ({navigation}) => {
  const [tests, setTests] = useState([])
  const [refresing, setRefresing] = useState(false)

  useEffect(() => {
    // let isRendered = true
    //     axios.get(`${PORT_URL}testsAptitudesStatus`)
    //         .then(resp => {
    //             if (isRendered) {
    //                 setTests(resp.data)
    //             }
    //             return null
    //         })
    //         .catch(err => console.log(err))
    //     // getTests()
    //     return () => {
    //         isRendered = false
    //     }
    getTestsStatus()
  }, [])

  const getTestsStatus = async () => {
    await axios.get(`${PORT_URL}testsAptitudesStatus`)
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
  //-------------------------------------------
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
        {tests.length > 0 ? (
          tests.map((e, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <ImageBackground source={fondoImage} resizeMode="cover" style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <View style={styles.testView}>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={{ fontSize: 16, ...styles.textStyles }}>{e.test_aptitud_name}</Text>
                  {/* <Text style={styles.textStyles}>{e.test_description}</Text> */}
                </View>
                <LinearGradient style={{ width: '50%', borderRadius: 5, }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
                  <TouchableOpacity onPress={() => navigation.navigate('TestOrientationType')} style={styles.buttonGoTest}>
                    <Text style={styles.textStyles}>Iniciar Test</Text>
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
      <Text style={{ alignSelf: 'center', color: 'white' }}>No existe informacionss</Text>
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

export default RealizeTestVocational