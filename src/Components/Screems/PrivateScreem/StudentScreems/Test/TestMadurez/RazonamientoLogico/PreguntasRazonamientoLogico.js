import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useModalAlert, useModalAlertError } from '../../../../../../Molecules/Hooks/useModalAlert'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../../../PortUrl/PortUrl'
import { ErrorAlert, SuccesAlert } from '../../../../../../Molecules/Alertas/Alerts'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
// import {RadioButtons}

var array = []
const PreguntasRazonamientoLogico = ({ route, navigation }) => {
  // console.log(route)
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      array = []
      return () => { isActive = false }
    }, [])
  )
  const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [message, setMessage] = useState(null)
  const [progress, setProgress] = useState(false)
  const [user, setUser] = useState()
  const [event, setEvent] = useState()

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [respuesta2, setRespuesta2] = useState(null)

  const [pregunta1, setPregunta1] = useState(false)
  const [pregunta2, setPregunta2] = useState(false)
  const [pregunta3, setPregunta3] = useState(false)
  const [respuesta1, setRespuesta1] = useState(null)

  AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
  AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))

  const [alert, setAlert] = useState(false)
  const openModalAlertSuccess = () => {
    setAlert(true)
  }
  const closeModalAlertSuccess = () => {
    setAlert(false)
    navigation.navigate('InicioTestMadurez', { student_id: route.params.student_id, factor: route.params.description })
  }


  //---------------RAZONAMIENTO LOGICO 1-------------------
  const selecImage = (e) => {
    if (e === 1) {
      setImage1(true)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setRespuesta2('1')
    } else if (e === 2) {
      setImage1(false)
      setImage2(true)
      setImage3(false)
      setImage4(false)
      setRespuesta2('2')
    } else if (e === 3) {
      setImage1(false)
      setImage2(false)
      setImage3(true)
      setImage4(false)
      setRespuesta2('3')
    } else if (e === 4) {
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(true)
      setRespuesta2('4')
    }
  }
  const siguiente2 = () => {
    if (image1 == true || image2 == true || image3 == true || image4 == true) {

      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta2,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.puntaje
      })
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setRespuesta2(null)
      navigation.navigate('PreguntasRazonamientoLogico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      setMessage('Escoja una respuesta')
      openModalAlertError()
    }
  }
  const volver2 = async () => {
    if (image1 == true || image2 == true || image3 == true || image4 == true) {

      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta2,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.puntaje
      })
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setRespuesta2(null)
      // console.log(array)
      setProgress(true)
      await axios.post(`${PORT_URL}post-result-madurez-t3`, array)
        .then(resp => {
          setProgress(false)
          openModalAlertSuccess()
        })
        .catch(err => {
          setProgress(false)
          if (err.response) {
            setMessage(err.response.data.message)
            openModalAlertError()
          }
        })
    } else {
      setMessage('Escoja una respuesta')
      openModalAlertError()
    }
  }

  //---------------RAZONAMIENTO LOGICO 2-------------------------------
  // console.log()

  const selectButton = (e, x) => {
    if (x === 1) {
      setPregunta1(true)
      setPregunta2(false)
      setPregunta3(false)
      setRespuesta1('A')
    } else if (x === 2) {
      setPregunta1(false)
      setPregunta2(true)
      setPregunta3(false)
      setRespuesta1('B')

    } else if (x === 3) {
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(true)
      setRespuesta1('C')
    }
  }
  const siguiente1 = () => {
    if (pregunta1 == true || pregunta2 == true || pregunta3 == true) {
      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta1,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(false)
      setRespuesta1(null)
      navigation.navigate('PreguntasRazonamientoLogico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      setMessage('Escoja una respuesta')
      openModalAlertError()
    }
  }
  const volver1 = async () => {
    if (pregunta1 == true || pregunta2 == true || pregunta3 == true) {
      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta1,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(false)
      setRespuesta1(null)
      // console.log(array)
      // navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
      await axios.post(`${PORT_URL}post-result-madurez-t4`, array)
        .then(resp => {
          setProgress(false)
          openModalAlertSuccess()
        })
        .catch(err => {
          setProgress(false)
          if (err.response) {
            setMessage(err.response.data.message)
            openModalAlertError()
          }
        })
    } else {
      setMessage('Escoja una respuesta')
      openModalAlertError()
    }
  }
  return (
    <>
      <Layaut>
        <ScrollView>
          {route.params.id === 3 ? (
            <>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
              <View style={{ margin: 10 }}>
                <Image style={styles.buttonImage2} source={route.params.data[route.params.cont].pregunta.resp[0].respuesta} />
              </View>
              <Text style={{ ...styles.textFont, alignSelf: 'center' }}>OPCIONES</Text>

              <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => selecImage(1)}>
                  <Image style={image1 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[1].respuesta} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selecImage(2)}>
                  <Image style={image2 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[2].respuesta} />
                </TouchableOpacity>
              </View>
              <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => selecImage(3)}>
                  <Image style={image3 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[3].respuesta} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selecImage(4)}>
                  <Image style={image4 == true ? styles.buttonImageSelect : styles.buttonImage} source={route.params.data[route.params.cont].pregunta.resp[4].respuesta} />
                </TouchableOpacity>
              </View>
              {route.params.cont == 4 ? (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={volver2} >
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Guardar</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={siguiente2}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Siguiente</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </>
          ) : route.params.id === 4 ? (
            <>
              <Text style={{ ...styles.textFont, margin: 10 }}>PREGUNTA</Text>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.a}</Text>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas.b}</Text>
              <Text style={{ ...styles.textFont, margin: 10 }}>OPCIONES</Text>
              {/* {
              route.params.data[route.params.cont].pregunta.resp.map((e, index) => (
                <View key={index}>
                <TouchableOpacity style={styles.buttonRespuesta} onPress={() => selectButton(e)}>
                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{e.respuesta}</Text>
                </TouchableOpacity>
                </View>
                ))
              } */}
              <View>
                <TouchableOpacity style={pregunta1 == true ? styles.buttonRespuestaSelect : styles.buttonRespuesta} onPress={() => selectButton(route.params.data[route.params.cont].pregunta.resp[0], 1)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[0].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta2 == true ? styles.buttonRespuestaSelect : styles.buttonRespuesta} onPress={() => selectButton(route.params.data[route.params.cont].pregunta.resp[1], 2)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[1].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta3 == true ? styles.buttonRespuestaSelect : styles.buttonRespuesta} onPress={() => selectButton(route.params.data[route.params.cont].pregunta.resp[2], 3)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[2].respuesta}</Text>
                </TouchableOpacity>
              </View>
              {route.params.cont == 4 ? (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={volver1} >
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Guardar</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={siguiente1}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Siguiente</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </>
          ) : (null)}

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
      {/* ---------------------ALERTS SUCCESS------------------------ */}
      <FancyAlert
        visible={alert}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          borderRadius: 50,
          width: '100%',
        }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 300, height: 200 }}
              source={{ uri: 'https://www.gifsanimados.org/data/media/492/fuegos-artificiales-imagen-animada-0065.gif' }} />
          </View>
          <TouchableOpacity style={{ position: 'absolute' }} onPress={closeModalAlertSuccess} >
            <FontAwesome name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>}
        style={{ backgroundColor: 'white' }}
      >
        <>
          <Text style={{ marginTop: -16, marginBottom: 15, fontFamily: 'Roboto_900Black', color: 'green', fontSize: 15 }}>Felicidades Terminaste esta Prueba</Text>
          <Text style={{ marginTop: -16, marginBottom: 15, fontFamily: 'Roboto_900Black', color: 'green', fontSize: 15 }}>Tu Progreso será Registrado</Text>
          <Text style={{ marginTop: -16, marginBottom: 15, fontFamily: 'Roboto_900Black', color: 'green', fontSize: 15 }}>Por Favor, Continue</Text>
          {/* <TouchableOpacity onPress={closeModalAlertSuccess} style={{ backgroundColor: 'green', padding: 5, margin: 5, borderRadius: 3 }}>
            <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Aceptar</Text>
          </TouchableOpacity> */}
        </>
      </FancyAlert>
    </>

  )
}

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    // marginHorizontal: 20,
    // padding: 5,
    alignSelf: 'center'
  },
  buttonNext: {
    padding: 10,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBack: {
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRespuesta: {
    padding: 15,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonRespuestaSelect: {
    padding: 15,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'red'
  },
  buttonImage: {
    borderRadius: 5,
    width: 110,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonImage2: {
    borderRadius: 5,
    width: 200,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonImageSelect: {
    borderRadius: 5,
    width: 110,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: 'red',
    borderWidth: 2
  },
  progressView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

})

export default PreguntasRazonamientoLogico