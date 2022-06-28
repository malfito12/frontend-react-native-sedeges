import { View, TouchableOpacity, Text, FlatList, RefreshControl, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

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
    await navigation.navigate('CategoryTest')
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
            <View key={index} style={styles.testView}>
              <View>
                <Text style={{fontFamily:'Roboto_500Medium'}}>{e.test_name}</Text>
                <Text style={{fontFamily:'Roboto_500Medium'}}>{e.test_description}</Text>
              </View>
              <TouchableOpacity onPress={() => prueba(e)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 25 }}>
                <Text style={{ color: 'white',fontFamily:'Roboto_500Medium' }}>go</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    margin: 7,
    borderRadius: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default RealizeTestScreem