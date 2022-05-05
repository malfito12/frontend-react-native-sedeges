import { View, TouchableOpacity, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../components/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../Apis/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const UsersScreem = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [refresing, setRefresing] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, [])
  //------GET USERS-------------
  const getAllUsers = async () => {
    await axios.get(`${PORT_URL}users`)
      .then(resp => {
        setUsers(resp.data)
      })
      .catch(err => console.log(err))
    // const result = await getUsers()
    // setUsers(result)
  }
  //---------REFRESH------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getAllUsers()
    setRefresing(false)
  })
  const cerrarSesion=async()=>{
    await AsyncStorageLib.removeItem('token')
    navigation.navigate('LoginScreem')
  }
  // console.log(users)
  return (
    <Layaut>
      <FlatList
        data={users}
        style={{ width: '100%' }}
        keyExtractor={item => item.id_usuario}
        renderItem={(p) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.itemTitle}>{p.index + 1}</Text>
              <Text style={styles.itemTitle}>{p.item.nombre}</Text>
              <Text style={styles.itemTitle}>{p.item.email}</Text>
              {/* <Text style={styles.itemTitle}>{p.item.repeat_password}</Text> */}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => console.log(p.item.id_usuario)}
                style={styles.itemButtonUpdate}>
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log(p.item.id_usuario)}
                style={styles.itemButtonDelete}>
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={<RefreshControl
          colors={['#78e08f']}
          onRefresh={onRefresh}
          refreshing={refresing}
        />}
      />
      <TouchableOpacity
        onPress={cerrarSesion}
        style={styles.itemButtonDelete}>
        <Text style={{ color: 'white' }}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </Layaut>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#333333',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    color: '#ffffff'
  },
  itemButtonUpdate: {
    margin: 5,
    padding: 5,
    backgroundColor: 'lawngreen',
    alignItems: 'center',
    borderRadius: 5,
  },
  itemButtonDelete: {
    margin: 5,
    padding: 5,
    backgroundColor: 'crimson',
    alignItems: 'center',
    borderRadius: 5,
  }
})

export default UsersScreem