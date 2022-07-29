import { View, TouchableOpacity, ScrollView, TextInput, Text, FlatList, StyleSheet, RefreshControl, Modal } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { PORT_URL } from '../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
// import EditUser from '../../../src/Modals/EditUser'
import Layaut from '../../../Atoms/StyleLayaut/Layaut'
import * as Progress from 'react-native-progress'
import { AuthContext } from '../../../Atoms/Context/AuthContext'
import { FontAwesome, MaterialIcons  } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const UsersScreem = ({ navigation }) => {
  const { isLoading } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [refresing, setRefresing] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [changeData, setChangeData] = useState({
    user_id: '',
    user_email: '',
    user_name: '',
  })
  useEffect(() => {
    // getToken()
    getAllUsers()
  }, [])
  const getToken = async () => {
    AsyncStorageLib.getItem('user')
      .then(resp => {
        getAllUsers(JSON.parse(resp))
      })

  }
  //------GET USERS-------------
  const getAllUsers = async (e) => {
    // const id = user.user
    await axios.get(`${PORT_URL}users`)
      .then(resp => {
        setUsers(resp.data)
      })
      .catch(err => { console.log(err) })
  }
  //---------EDIT USER------
  const openModalEditUser = (e) => {
    setChangeData(e)
    setOpenModalEdit(true)
  }
  const closeModalEditUser = () => {
    setOpenModalEdit(false)
  }
  const editUser = async () => {
    const id = changeData.user_id
    await axios.put(`${PORT_URL}users/${id}`, changeData)
      .then(resp => {
        console.log(resp.data)
        getAllUsers()
        closeModalEditUser()
      })
      .catch(err => console.log(err))
  }
  //---------REFRESH------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getAllUsers()
    setRefresing(false)
  })
  // --------------HANDLECHANGE-----------------
  const handleChange = (name, value) => {
    setChangeData({
      ...changeData,
      [name]: value
    })
  }
  //---------DELETE NEW USER-------------
  const [changeDataDelete, setChangeDataDelete] = useState({
    inputDelete: '',
  })
  const deleteNewUser = async (e) => {
    e.preventDefault()
    if(changeData.user_rol==='admin'){
      closeModalEditUser()
      alert('no se puede eliminar a un administrador')
      return
    }
    if (changeDataDelete.inputDelete === 'Eliminar') {
      const id = changeData.user_id
      await axios.delete(`${PORT_URL}users/${id}`)
        .then(resp => {
          alert(JSON.stringify(resp.data.message))
          getAllUsers()
          closeModalEditUser()
        })
        .catch(err => console.log(err))
    } else {
      alert('Error, La palabra no coincide')
    }
  }
  const handleChangeDelete = (name, value) => {
    setChangeDataDelete({
      ...changeDataDelete,
      [name]: value
    })
  }
  //-.--------------------------------------------------------------------
  // console.log(users)
  // console.log(changeData)
  return (
    <>
      <Layaut>
        <Text style={{ color: 'white', alignSelf: 'center', marginBottom: 10, fontFamily: 'Roboto_500Medium', fontSize: 15 }}>Lista de Usuarios</Text>
        <FlatList
          data={users}
          style={{ width: '100%', marginBottom: 45 }}
          keyExtractor={item => item.user_id}
          renderItem={(p) => (
            <View style={styles.itemContainer}>
              <View>
                {/* <Text style={styles.itemTitle}>{p.index + 1}</Text> */}
                <Text style={styles.itemTitle}>{p.item.user_name}</Text>
                <Text style={styles.itemTitle}>{p.item.user_email}</Text>
                {/* <Text style={styles.itemTitle}>{p.item.repeat_password}</Text> */}
              </View>
              <LinearGradient style={{borderRadius:3,padding:5}} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}   onPress={() => openModalEditUser(p.item)}>
                  <Text style={{ color: 'white',fontFamily:'Roboto_500Medium',paddingRight:3 }}>Opciones</Text>
                  <MaterialIcons name="settings" size={24} color="white" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
          refreshControl={<RefreshControl
            colors={['#78e08f']}
            onRefresh={onRefresh}
            refreshing={refresing}
          />}
        />
      </Layaut>
      {/* ----------------------MODAL PROGRESS-------------------------------- */}
      <Modal
        visible={isLoading}
        transparent
        animationType='fade'
      >
        <View style={styles.centeredViewProgress}>
          <Progress.Circle borderWidth={3} size={40} indeterminate={true} />
        </View>
      </Modal>
      {/* <EditUser /> */}
      {/* --------------------MODAL EDIT-------------------------------- */}
      <Modal
        visible={openModalEdit}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.directionButton}>
              <TouchableOpacity onPress={closeModalEditUser}>
                <FontAwesome name="window-close" size={30} color="#424242" />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleEdit}>Actualizar Usuario</Text>
            <TextInput
              defaultValue={changeData.user_name}
              style={styles.textInput}
              onChangeText={text => handleChange('user_name', text)}
            />
            <TextInput
              style={styles.textInput}
              defaultValue={changeData.user_email}
              onChangeText={text => handleChange('user_email', text)}
            />
            <View style={{ ...styles.directionButton, marginBottom: 15 }} >
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={editUser} >
                  <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', padding: 5 }}>Actualizar Usuario</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* <TouchableOpacity onPress={closeModalEditUser} style={{ backgroundColor: '#dd2c00', ...styles.buttonAceptCancel }}>
                <Text style={styles.itemTitle}>Cancelar</Text>
              </TouchableOpacity> */}

            <Text style={styles.titleEdit}>Eliminar Usuario</Text>
            <Text style={{ fontFamily: 'Roboto_400Regular_Italic' }}>Si desea eliminar al usuario, escriba la palabra "Eliminar"</Text>
            <TextInput
              placeholder='Ejm: Eliminar'
              style={styles.textInput}
              onChangeText={text => handleChangeDelete('inputDelete', text)}
            />
            <View style={{ ...styles.directionButton, marginBottom: 15 }}>
              <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 3 }} onPress={deleteNewUser}>
                <Text style={{ color: 'white', padding: 5, fontFamily: 'Roboto_400Regular_Italic' }}>Eliminar Usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    // color: 'white',
    backgroundColor: 'white',
    borderRadius: 3,
    height: 40,
    padding: 10,
    fontFamily: 'Roboto_400Regular_Italic'
    // borderColor: '#10ac84'
    // borderColor: '#000'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 15
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  itemContainer: {
    backgroundColor: '#333333',
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    color: '#e3f2fd',
    fontFamily: 'Roboto_700Bold'
  },
  titleEdit: {
    fontSize: 15,
    padding: 8,
    fontWeight: 'bold',
    fontFamily: 'Roboto_400Regular_Italic',
    alignSelf:'flex-start',
    marginHorizontal:10

  },
  ViewButtonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10
  },
  centeredViewProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  directionButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    // marginBottom:15
  },
})

export default UsersScreem