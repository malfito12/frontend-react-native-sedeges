import { View, TouchableOpacity, ScrollView, TextInput, Text, FlatList, StyleSheet, RefreshControl, Modal } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
// import EditUser from '../../../src/Modals/EditUser'
import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { AuthContext } from '../../../../Atoms/Context/AuthContext'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts'
import * as Animatable from 'react-native-animatable'


const ListViewUsers = ({ navigation }) => {
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
  const [message, setMessage] = useState(null)
  const [progress, setProgress] = useState(false)
  const { isLoading } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [refresing, setRefresing] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalEditEmail, setOpenModalEditEmail] = useState(false)
  const [openModalEditData, setOpenModalEditData] = useState(false)
  const [openModalEditPassword, setOpenModalEditPassword] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [dataUser, setDataUser] = useState({ user_id: '', user_name: '', user_rol: '' })
  const [changeData, setChangeData] = useState({
    user_id: '',
    user_email: '',
    user_name: '',
  })
  // useEffect(() => {
  //   // getToken()
  //   getAllUsersRefresh()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getAllUsers()
      return () => { isActive = false }
    }, [])
  )
  const cleanUp = { user_id: '', user_name: '', user_rol: '' }
  //------GET USERS-------------
  const getAllUsers = async (e) => {
    // const id = user.user
    await axios.get(`${PORT_URL}users`)
      .then(resp => {
        setUsers(resp.data)
      })
      .catch(err => { console.log(err) })
  }
  //--------MODAL EDIT USER------------------------
  const openModalEditUser = (e) => {
    setDataUser(e)
    setOpenModalEdit(true)
  }
  const closeModalEditUser = () => {
    setOpenModalEdit(false)
  }

  //------------EDIT USER EMAIL----------------
  const [newEmail, setNewEmail] = useState({ user_id: '', user_email: '',actual_email:'' })
  const openModalEditEmailUser = (e) => {
    setNewEmail({ user_id: e.user_id,user_email:e.user_email,actual_email:e.user_email })
    setOpenModalEditEmail(true)
  }
  const closeModalEditEmailUser = () => {
    setOpenModalEditEmail(false)
  }
  const handleChangeNewEmail = (name, value) => {
    setNewEmail({
      ...newEmail,
      [name]: value
    })
  }
  const postNewEmail = async () => {
    // console.log(newEmail)
    const email = /(\W|^)[\w.\-]{3,25}@(yahoo|hotmail|gmail)\.com(?!\s)(\W|$)/g
    if (newEmail.user_email === '') {
      setMessage('LLene los datos')
      openModalAlertError()
      return
    } else if (!email.test(newEmail.user_email)) {
      setMessage('Caracteres invalidos de Correo Electronico')
      openModalAlertError()
      return
    }
    setProgress(true)
    await axios.put(`${PORT_URL}user-update-email/${newEmail.user_id}`, newEmail)
      .then(resp => {
        setMessage(resp.data.message)
        openModalAlert()
        closeModalEditEmailUser()
        closeModalEditUser()
        getAllUsers()
        setProgress(false)
      })
      .catch(err => {
        setProgress(false)
        if (err.response) {
          // console.log(err.response.data.message)
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })
  }
  //-------------------EDIT DATA USER-ROL--------------------------------

  const openModalEditDataUser = (e) => {
    setChangeData({user_id:e.user_id,user_name:e.user_name,user_rol:e.user_rol})
    setOpenModalEditData(true)
  }
  const closeModalEditDataUser = () => {
    setChangeData(cleanUp)
    setOpenModalEditData(false)
  }
  const editDataUser = async () => {
    const user = /(\W|^)[\w.\-]{3,16}(?!&|%|!|"|#|@)(?!\s)(\W|$)/g
    const id = changeData.user_id
    if (changeData.user_name === '' || changeData.user_rol === '') {
      setProgress(false)
      setMessage('Por favor, llene todos los datos')
      openModalAlertError()
      return
      // } else if (!(validator.isEmail(changeData.user_email))) {
    } else if (!user.test(changeData.user_name)) {
      setProgress(false)
      setMessage('Usuario no valido, Evite usar caracteres especiales o espacios')
      openModalAlertError()
      return
    }
    setProgress(true)
    await axios.put(`${PORT_URL}user/${id}`, changeData)
      .then(resp => {
        setMessage(resp.data.message)
        openModalAlert()
        closeModalEditDataUser()
        closeModalEditUser()
        getAllUsers()
        setProgress(false)
      })
      .catch(err=>{
        setProgress(false)
        if(err.response){
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })
  }
  const handleChange = (name, value) => {
    setChangeData({
      ...changeData,
      [name]: value
    })
  }
  //---------CHANGE NEW PASSWORD USER--------------------------
  const [newPassword, setNewPassword] = useState({ user_id: '', user_previous_password: '', user_new_password: '', user_repeat_password: '' })
  const [hidePass, setHidePass] = useState({
    iconPreviousPassword: 'eye-with-line',
    viewPreviousPassword: true,
    iconNewPassword: 'eye-with-line',
    viewNewPassword: true,
    iconRepeatPassword: 'eye-with-line',
    viewRepeatPassword: true,
  })
  const openModalEditPassUser = (e) => {
    setNewPassword({ ...newPassword, user_id: e })
    setOpenModalEditPassword(true)
  }
  const closeModalEditPassUser = () => {
    setNewPassword({
      user_id: '', user_previous_password: '', user_new_password: '', user_repeat_password: ''
    })
    setOpenModalEditPassword(false)
  }
  const handleChangeNewPassword = (name, value) => {
    setNewPassword({
      ...newPassword,
      [name]: value
    })
  }
  const verPass = (e) => {
    if (e === 'user_previous_password') {
      var iconName = hidePass.viewPreviousPassword ? 'eye' : 'eye-with-line'
      setHidePass({ ...hidePass, viewPreviousPassword: !hidePass.viewPreviousPassword, iconPreviousPassword: iconName })
    } else if (e === 'user_new_password') {
      var iconName = hidePass.viewNewPassword ? 'eye' : 'eye-with-line'
      setHidePass({ ...hidePass, viewNewPassword: !hidePass.viewNewPassword, iconNewPassword: iconName })
    } else if (e === 'user_repeat_password') {
      var iconName = hidePass.viewRepeatPassword ? 'eye' : 'eye-with-line'
      setHidePass({ ...hidePass, viewRepeatPassword: !hidePass.viewRepeatPassword, iconRepeatPassword: iconName })
    }
  }
  const changePasswordUser = async () => {
    // console.log(newPassword)
    const previouPass = /(\W|^)[\w.\-]{6,25}(?!\s)(\W|$)/g
    const newPass = /(\W|^)[\w.\-]{6,25}(?!\s)(\W|$)/g
    if (newPassword.user_previous_password === '' || newPassword.user_new_password === '' || newPassword.user_repeat_password === '') {
      setMessage('Por favor, llene todos los datos')
      openModalAlertError()
      return
    } else if (!previouPass.test(newPassword.user_previous_password)) {
      setMessage('La Contraseña Anterior debe tener almenos 8 caracteres sin espacios')
      openModalAlertError()
      return
    }
    else if (!newPass.test(newPassword.user_new_password)) {
      setMessage('La Nueva Contraseña debe tener almenos 8 caracteres sin espacios')
      openModalAlertError()
      return
    }
    else if (newPassword.user_new_password !== newPassword.user_repeat_password) {
      setMessage('Verifique que las contraseñas sean iguales')
      openModalAlertError()
      return
    }
    setProgress(true)
    await axios.put(`${PORT_URL}user-match-password/${newPassword.user_id}`, newPassword)
      .then(resp => {
        setProgress(false)
        setMessage(resp.data.message)
        openModalAlert()
        closeModalEditPassUser()
        closeModalEditUser()
        getAllUsers()
      })
      .catch(err => {
        setProgress(false)
        if (err.response) {
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })
  }
  //---------DELETE USER------------------------
  const openModalDeleteUser = (e) => {
    setChangeData({ user_id: e.user_id, user_name: e.user_name })
    setOpenModalDelete(true)
  }
  const closeModalDeleteUser = () => {
    setChangeData(cleanUp)
    setOpenModalDelete(false)
  }
  const deleteUser = async () => {
    // console.log(removeUser)
    if (changeData.user_rol == 'ADMINISTRADOR') {
      setMessage('Error, No Tiene Permiso para Eliminar a Este Usuario')
      return
    }
    setProgress(true)
    await axios.delete(`${PORT_URL}users/${changeData.user_id}`)
      .then(resp => {
        setMessage(resp.data.message)
        setProgress(false)
        openModalAlert()
        closeModalDeleteUser()
        closeModalEditUser()
        getAllUsers()
      })
      .catch(err => {
        setProgress(false)
        if (err.response) {
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })

  }
  //---------REFRESH--------------------------------------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getAllUsers()
    setRefresing(false)
  })

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
              <Text style={styles.itemTitle}>{p.item.user_name}</Text>
              <LinearGradient style={{ borderRadius: 3, padding: 5 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} onPress={() => openModalEditUser(p.item)}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', paddingRight: 3 }}>Opciones</Text>
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
        visible={progress}
        transparent
        animationType='fade'
      >
        <View style={styles.centeredViewProgress}>
          <Progress.Circle borderWidth={3} size={40} indeterminate={true} />
        </View>
      </Modal>
      <SuccesAlert isOpen={openModal} closeModal={closeModalAlert} text={message} />
      <ErrorAlert isOpen={openModalError} closeModal={closeModalAlertError} text={message} />
      {/* <EditUser /> */}
      {/* --------------------MODAL EDIT-------------------------------- */}
      <Modal
        visible={openModalEdit}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: 'white', marginHorizontal: 15 }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={closeModalEditUser}>
              <FontAwesome name="window-close" size={30} color="#424242" />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}>Información de Usuario</Text>
            <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 5 }}>Nombre de Usuario: {dataUser.user_name}</Text>
            <Text style={{ alignSelf: 'flex-start', marginHorizontal: 15, marginBottom: 10 }}>Correo Electronico: {dataUser.user_email}</Text>
            <View style={{ width: '100%', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={() => openModalEditDataUser(dataUser)} >
                  <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Actualizar Datos Usuario</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ width: '100%', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={() => openModalEditEmailUser(dataUser)} >
                  <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Cambiar Correo Electronico</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ width: '100%', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3, marginHorizontal: 15 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={() => openModalEditPassUser(dataUser.user_id)} >
                  <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Cambiar Contraseña</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ width: '100%', marginBottom: 5 }}>
              <TouchableOpacity style={{ backgroundColor: 'red', marginHorizontal: 15, borderRadius: 3, padding: 10 }} onPress={() => openModalDeleteUser(dataUser)} >
                <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Eliminar Usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* -------------------------------MODAL EDIT EMAIL--------------------- */}
      <Modal
        visible={openModalEditEmail}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Actual Correo Electronico</Text>
            <TextInput
              style={styles.textInput}
              value={newEmail.actual_email}
            />
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Nuevo Correo Electronico</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Min 6 Caracteres'
              onChangeText={text => handleChangeNewEmail('user_email', text)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={postNewEmail} style={{ padding: 5, width: '100%' }}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Apceptar</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={closeModalEditEmailUser} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* -------------------------------MODAL EDIT DATA USER--------------------- */}
      <Modal
        visible={openModalEditData}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Nombre de Usuario</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Min 6 Caracteres'
              defaultValue={changeData.user_name}
              onChangeText={text=>handleChange('user_name',text)}
            />
            <View style={styles.styleSelect}>
              <Picker
                style={{ color: 'black', fontFamily: 'Roboto_400Regular' }}
                selectedValue={changeData.user_rol}
                onValueChange={(itemValue, itemIndex) => {
                  handleChange('user_rol', itemValue)
                }}>
                <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
                <Picker.Item label="ADMINISTRADOR" style={{ fontSize: 14 }} value="ADMINISTRADOR" />
                <Picker.Item label="SUPERVISOR" style={{ fontSize: 14 }} value="SUPERVISOR" />
                <Picker.Item label="USUARIO" style={{ fontSize: 14 }} value="USUARIO" />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={editDataUser} style={{ padding: 5, width: '100%' }}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Apceptar</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={closeModalEditDataUser} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* -------------------------------MODAL CHANGE PASSWORD--------------------- */}
      <Modal
        visible={openModalEditPassword}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Anterior Contraseña</Text>
            <View style={{ width: '100%' }}>
              <View style={{ marginHorizontal: 15, borderRadius: 3, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <TextInput
                  style={{ padding: 8, flex: 1 }}
                  placeholder='Min 8 Caracteres'
                  secureTextEntry={hidePass.viewPreviousPassword}
                  onChangeText={text => handleChangeNewPassword('user_previous_password', text)}
                  value={newPassword.user_previous_password}
                />
                <TouchableOpacity onPress={() => verPass('user_previous_password')} style={{ marginRight: 10 }} >
                  <Entypo name={hidePass.iconPreviousPassword} size={20} color='black' />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Nueva Contraseña</Text>
            <View style={{ width: '100%' }}>
              <View style={{ marginHorizontal: 15, borderRadius: 3, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <TextInput
                  style={{ padding: 8, flex: 1 }}
                  placeholder='Min 8 Caracteres'
                  secureTextEntry={hidePass.viewNewPassword}
                  onChangeText={text => handleChangeNewPassword('user_new_password', text)}
                  value={newPassword.user_new_password}
                />
                <TouchableOpacity onPress={() => verPass('user_new_password')} style={{ marginRight: 10 }} >
                  <Entypo name={hidePass.iconNewPassword} size={20} color='black' />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginHorizontal: 15, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto_400Regular' }}>Repita Nueva Contraseña</Text>
            <View style={{ width: '100%', marginBottom: 15 }}>
              <View style={{ marginHorizontal: 15, borderRadius: 3, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <TextInput
                  style={{ padding: 8, flex: 1 }}
                  placeholder='Min 8 Caracteres'
                  secureTextEntry={hidePass.viewRepeatPassword}
                  onChangeText={text => handleChangeNewPassword('user_repeat_password', text)}
                  value={newPassword.user_repeat_password}
                />
                <TouchableOpacity onPress={() => verPass('user_repeat_password')} style={{ marginRight: 10 }} >
                  <Entypo name={hidePass.iconRepeatPassword} size={20} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={changePasswordUser} style={{ padding: 5, width: '100%' }}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={closeModalEditPassUser} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* -----------------------------------MODAL DELETE USER------------------------ */}
      <Modal
        visible={openModalDelete}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
            <Text style={{ alignSelf: 'center', fontFamily: 'Roboto_500Medium', color: 'white', padding: 15 }}>Estas Seguro de Eliminar a {changeData.user_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={deleteUser} style={{ padding: 5, width: '100%' }}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={closeModalDeleteUser} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
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
    // borderWidth: 1,
    // color: 'white',
    backgroundColor: 'white',
    borderRadius: 3,
    height: 40,
    padding: 10,
    fontFamily: 'Roboto_400Regular'
    // borderColor: '#10ac84'
    // borderColor: '#000'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    borderRadius: 3,
    padding: 5,
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#333333',
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTitle: {
    color: '#e3f2fd',
    fontFamily: 'Roboto_700Bold'
  },
  centeredViewProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styleSelect: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#10ac84',
    height: 40,
    padding: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    display: 'flex',
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'white',
  }
})

export default ListViewUsers