import { View, TouchableOpacity, ScrollView, TextInput, Text, FlatList, StyleSheet, RefreshControl, Modal } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { PORT_URL } from '../../../../PortUrl/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
// import EditUser from '../../../src/Modals/EditUser'
import Layaut from '../../../Atoms/StyleLayaut/Layaut'
import * as Progress from 'react-native-progress'
import { AuthContext } from '../../../Atoms/Context/AuthContext'

const UsersScreem = ({ navigation }) => {
  const { logout, isLoading, user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [refresing, setRefresing] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [changeData, setChangeData] = useState({
    user_id: '',
    user_email: '',
    user_name: '',
  })
  useEffect(() => {
    getToken()
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
    // await axios.get(`${PORT_URL}user/${id}`)
    await axios.get(`${PORT_URL}user/${e}`)
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
  //---------DELETE USER------------------
  const openModalDeleteUser = (e) => {
    setChangeData(e)
    setOpenModalDelete(true)
  }
  const closeModalDeleteUser = () => {
    setOpenModalDelete(false)
  }
  const deleteUser = async () => {
    const id = changeData.user_id
    // await axios.delete(`${PORT_URL}users/${id}`)
    //   .then(resp => {
    //     console.log(resp.data)
    //     getAllUsers()
        closeModalDeleteUser()
    //   })
    //   .catch(err => console.log(err))
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
  // console.log(users)
  // console.log(changeData)
  return (
    <>
      <Layaut>
        <FlatList
          data={users}
          style={{ width: '100%' }}
          keyExtractor={item => item.user_id}
          renderItem={(p) => (
            <View style={styles.itemContainer}>
              <View>
                {/* <Text style={styles.itemTitle}>{p.index + 1}</Text> */}
                <Text style={styles.itemTitle}>{p.item.user_name}</Text>
                <Text style={styles.itemTitle}>{p.item.user_email}</Text>
                {/* <Text style={styles.itemTitle}>{p.item.repeat_password}</Text> */}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => openModalEditUser(p.item)}
                  // onPress={() => console.log(p.item.id_usuario)}
                  style={styles.itemButtonUpdate}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openModalDeleteUser(p.item)}
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
          // onPress={cerrarSesion}
          onPress={logout}
          style={styles.itemButtonDelete}>
          <Text style={{ color: 'white' }}>Cerrar Sesion</Text>
        </TouchableOpacity>
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
            <Text style={styles.titleEdit}>USUARIO</Text>
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
            <View style={styles.ViewButtonsModal}>
              <TouchableOpacity onPress={editUser} style={{ backgroundColor: '#0277bd', ...styles.buttonAceptCancel }}>
                <Text style={{ color: 'white' }}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModalEditUser} style={{ backgroundColor: '#dd2c00', ...styles.buttonAceptCancel }}>
                <Text style={{ color: 'white' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* ----------------MODAL DELETE------------------------------------ */}
      <Modal
        visible={openModalDelete}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ padding: 10, fontWeight: 'bold' }}>Estas de Seguro de eliminar a {changeData.user_name}</Text>
            <View style={styles.ViewButtonsModal}>
              <TouchableOpacity onPress={deleteUser} style={{ backgroundColor: '#0277bd', ...styles.buttonAceptCancel }}>
                <Text style={{ color: 'white' }}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModalDeleteUser} style={{ backgroundColor: '#dd2c00', ...styles.buttonAceptCancel }}>
                <Text style={{ color: 'white' }}>Cancelar</Text>
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
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    color: '#ffffff',
    fontFamily:'Roboto_700Bold'
  },
  titleEdit: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 8
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
  },
  ViewButtonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10
  },
  buttonAceptCancel: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  centeredViewProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})

export default UsersScreem