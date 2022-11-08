import { View, Text, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Progress from 'react-native-progress'
import * as Print from 'expo-print';
import { PORT_URL } from '../../../../../PortUrl/PortUrl';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert';
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts';

const ListViewMaterial = () => {
  const [archivos, setArchivos] = useState([])
  const [refresing, setRefresing] = useState(false)
  const [progress, setProgress] = useState('none')
  const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [progressRequest, setProgressRequest] = useState(false)
  const [message, setMessage] = useState(null)
  const [exist, setExist] = useState('none')
  const [openModalDelete, setOpenModalDelete] = useState(false)

  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getArchivos()
      return () => { isActive = false }
    }, [])
  )
  const getArchivos = async () => {
    setProgress('flex')
    await axios.get(`${PORT_URL}get-archivos`)
      .then(resp => {
        if (resp.data.length === 0) {
          setExist('flex')
        }
        setProgress('none')
        setArchivos(resp.data)
        // setArchivos(`data:application/pdf;base64,${resp.data[0].archivo_contenido}`)
      })
      .catch(err => console.log(err))
  }
  const pdfGenerate = async (e) => {

    const my_uri = `data:application/pdf;base64,${e.archivo_contenido}`
    await Print.printAsync({ uri: my_uri });
    // await WebBrowser.openBrowserAsync('https://www.africau.edu/images/default/sample.pdf');
    // console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
  }
  //---------DELETE ARCHIVO-------------------------------
  const [removeArchivo, setRemoveArchivo] = useState({ archivo_nombre:'',archivo_grado:'',archivo_id:''})
  const openModalDeleteArchivo = (e) => {
    setRemoveArchivo({ archivo_nombre:e.archivo_nombre,archivo_grado:e.archivo_grado,archivo_id:e.archivo_id })
    setOpenModalDelete(true)
  }
  const closeModalDeleteArchivo = () => {
    setOpenModalDelete(false)
  }
  const deleteArchivo = async () => {
    const id = removeArchivo.archivo_id
    setProgressRequest(true)
    await axios.delete(`${PORT_URL}delete-archivo/${id}`)
      .then(resp => {
        setProgressRequest(false)
        setMessage(resp.data.message)
        openModalAlert()
        getArchivos()
        closeModalDeleteArchivo()
      })
      .catch(err => {
        setProgress(false)
        if (err.response) {
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })
  }
  //---------REFRESH------

  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getArchivos()
    setRefresing(false)
  })
  return (
    <>
      <Layaut>
        <ScrollView
          style={{ marginBottom: 50 }}
          refreshControl={<RefreshControl
            colors={['#78e08f']}
            onRefresh={onRefresh}
            refreshing={refresing}
          />}
        >
          {archivos.length > 0 ? (
            archivos.map((e, index) => (
              <View key={index} style={styles.viewCard}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', }}>{e.archivo_nombre} - {e.archivo_grado}</Text>
                <View style={{ flexDirection: 'row', width: 75, justifyContent: 'space-between' }}>
                  <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => pdfGenerate(e)}>
                      <Entypo name="download" size={24} color="white" />
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => openModalDeleteArchivo(e)}>
                      <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {/* <TouchableOpacity onPress={() => pdfGenerate(e)} style={{ margin: 10, padding: 10, backgroundColor: 'red' }}>
                  <Text style={{ color: 'white' }}>descargar</Text>
                </TouchableOpacity> */}
              </View>
            ))

          ) : (
            <>
              <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
              <View style={{ display: progress }}>
                <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
              </View>
            </>
          )}

        </ScrollView>
      </Layaut>

      {/* -----------------------------------MODAL DELETE USER------------------------ */}
      <Modal
        visible={openModalDelete}
        animationType='fade'
        transparent
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: '#335469', marginHorizontal: 20 }}>
            <Text style={{alignSelf:'center',fontFamily: 'Roboto_500Medium',color:'white',padding:15}}>Estas Seguro de Eliminar a {removeArchivo.archivo_nombre} - {removeArchivo.archivo_grado}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <LinearGradient style={{ borderRadius: 3 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                <TouchableOpacity onPress={deleteArchivo} style={{ padding: 5, width: '100%' }}>
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Aceptar</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity onPress={closeModalDeleteArchivo} style={{ backgroundColor: 'red', marginLeft: 20, borderRadius: 3, padding: 5 }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* ---------------------ALERTS ------------------------ */}
      <Modal
        visible={progressRequest}
        transparent
        animationType='fade'
      >
        <View style={styles.progressView}>
          <Progress.Circle borderWidth={3} size={40} indeterminate={true} />
        </View>
      </Modal>
      <SuccesAlert isOpen={openModal} closeModal={closeModalAlert} text={message} />
      <ErrorAlert isOpen={openModalError} closeModal={closeModalAlertError} text={message} />

    </>
  )
}

export default ListViewMaterial

const styles = StyleSheet.create({
  viewCard: {
    backgroundColor: '#12151C',
    margin: 7,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
})