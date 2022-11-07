import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Share, ScrollView, TextInput, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from 'axios';
import { PORT_URL } from '../../../../../PortUrl/PortUrl';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import PDFReader from "rn-pdf-reader-js";
import * as Print from 'expo-print';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress'
import { useModalAlert, useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert';
import { ErrorAlert, SuccesAlert } from '../../../../Molecules/Alertas/Alerts';

const RegisterMaterial = () => {
  
  const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [message, setMessage] = useState(null)
  const [progress, setProgress] = useState(false)
  const [changeData, setChangeData] = useState({
    archivo_nombre: '',
    archivo_grado: '',
    archivo_contenido: '',
    archivo_description: ''
  })

  const cleanUp = {
    archivo_nombre: '',
    archivo_grado: '',
    archivo_contenido: '',
    archivo_description: ''
  }

  const [namePdf, setNamePdf] = useState(null)
  const openDocumentFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      // alert(result.uri);
      let fileBase64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
      setNamePdf(result.name)
      // console.log(result);
      setChangeData({
        ...changeData,
        archivo_contenido: fileBase64
      })
      // console.log(fileBase64);
    } catch (error) {
      throw error
    }
  }

  
  // console.log(archivo)


  //-----------------------------------------------------
  const postArchivos = async (e) => {
    e.preventDefault()
    if (changeData.archivo_nombre == '' || changeData.archivo_grado == '' || changeData.archivo_contenido == '' || changeData.archivo_description == '') {
      setMessage('Llene todos los Datos Requeridos')
      openModalAlertError()
      return
    }
    setProgress(true)
    const archivo_nombre = changeData.archivo_nombre.trim().replace(/\s\s+/g, ' ')
    setChangeData({ ...changeData, archivo_nombre: archivo_nombre })
    await axios.post(`${PORT_URL}post-archivos`, changeData)
      .then(resp => {
        setProgress(false)
        setMessage(resp.data.message)
        openModalAlert()
        setChangeData(cleanUp)
        // alert(JSON.stringify(resp.data.message))
        // console.log(resp.data)
      })
      .catch(err => {
        setProgress(false)
        if (err.response) {
          setMessage(err.response.data.message)
          openModalAlertError()
        }
      })
  }
  //-----------------------------------------------------
  //-----------------------------------------------------

  

  //-------------------HANDLE CHANGE-----------------
  const handleChange = (name, value) => {
    setChangeData({
      ...changeData,
      [name]: value
    })
  }
  return (
    <>
      <Layaut>
        <ScrollView>
          <Text style={styles.textStyles}>Nombre de Archivo</Text>
          <TextInput
            style={styles.input}
            placeholder='max 16 caracteres'
            placeholderTextColor='#b0bec5'
            maxLength={16}
            value={changeData.archivo_nombre}
            onChangeText={text => handleChange('archivo_nombre', text)}
          />
          <Text style={styles.textStyles}>Grado de Estudio</Text>
          <View style={{ borderRadius: 3, borderColor: '#10ac84', borderWidth: 1, marginBottom: 10 }}>
            <Picker
              style={{ color: 'white', height: 40 }}
              selectedValue={changeData.archivo_grado}
              onValueChange={(itemValue, itemIndex) => {
                handleChange('archivo_grado', itemValue)
              }}>
              <Picker.Item label="Seleccione ..." style={{ fontSize: 14 }} value="" />
              <Picker.Item label="Primer Grado" style={{ fontSize: 14 }} value="Primer Grado" />
              <Picker.Item label="Segundo Grado" style={{ fontSize: 14 }} value="Segundo Grado" />
              <Picker.Item label="Tercer Grado" style={{ fontSize: 14 }} value="Tercer Grado" />
              <Picker.Item label="Cuarto Grado" style={{ fontSize: 14 }} value="Cuarto Grado" />
              <Picker.Item label="Quinto Grado" style={{ fontSize: 14 }} value="Quinto Grado" />
              <Picker.Item label="Sexto Grado" style={{ fontSize: 14 }} value="Sexto Grado" />
            </Picker>
          </View>
          <Text style={styles.textStyles}>Subir archivo PDF</Text>
          <LinearGradient style={{ borderRadius: 2, marginBottom: 10 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
            <TouchableOpacity onPress={openDocumentFile} style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'flex-start' }}> {changeData.archivo_contenido ? (`Cargado : ${namePdf}`) : (' Cargar PDF ......')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.textStyles}>Descripción del Archivo</Text>
          <TextInput
            style={{ ...styles.input, height: 100, textAlignVertical: 'top' }}
            placeholder='max 100 caracteres'
            placeholderTextColor='#b0bec5'
            multiline={true}
            numberOfLines={4}
            maxLength={100}
            value={changeData.archivo_description}
            onChangeText={text => handleChange('archivo_description', text)}
          />

          <LinearGradient style={{ borderRadius: 2, marginTop: 10 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
            <TouchableOpacity onPress={postArchivos} style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Guardar Información</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* {archivo.length > 0 ? (
          <>
          <PDFReader
          useWebKit={true}
          originWhitelist={['*']}
          scrollEnabled={true}
          mediaPlaybackRequiresUserAction={true}
          source={{
            base64: archivo,
              }}
              style={styles.pdf}
              />
              </>
              
        ) : (null)} */}
          {/* {archivo.length > 0 ? (
          <>
            <Text style={{ color: 'white' }}>hola</Text>
            <WebView
            source={{ uri: 'https://expo.dev' }}

            // source={{ uri: 'https://www.africau.edu/images/default/sample.pdf' }}
            />
            </>

            ) : (
          <Text style={{ color: 'white' }}>nada</Text>
        )} */}
        </ScrollView>
      </Layaut>
      {/* ---------------------ALERTS ------------------------ */}
      <Modal
        visible={progress}
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

export default RegisterMaterial

const styles = StyleSheet.create({
  textStyles: {
    fontFamily: 'Roboto_500Medium',
    width: '100%',
    marginBottom: 10,
    color: 'white'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'red'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    fontFamily: 'Roboto_500Medium',
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    color: 'white',
    borderRadius: 3,
    height: 40,
    padding: 10,
    borderColor: '#10ac84'
  },
  progressView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});