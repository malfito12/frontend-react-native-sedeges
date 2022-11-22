import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useModalAlert, useModalAlertError } from '../../../../../../Molecules/Hooks/useModalAlert'
import axios from 'axios'
import { PORT_URL } from '../../../../../../../PortUrl/PortUrl'
import { ErrorAlert, SuccesAlert } from '../../../../../../Molecules/Alertas/Alerts'
import { FontAwesome } from '@expo/vector-icons';
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { LinearGradient } from 'expo-linear-gradient'


var array = []
const PreguntasRazonamientoNumerico = ({ route, navigation }) => {
  const [gif, setGif] = useState('none')
  const [changeData, setChangeData] = useState({ respuesta: '' })
  const [user, setUser] = useState()
  const [event, setEvent] = useState()
  const [openModal, openModalAlert, closeModalAlert] = useModalAlert(false)
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [message, setMessage] = useState(null)
  const [progress, setProgress] = useState(false)

  const [pregunta1, setPregunta1] = useState(false)
  const [pregunta2, setPregunta2] = useState(false)
  const [pregunta3, setPregunta3] = useState(false)
  const [pregunta4, setPregunta4] = useState(false)
  const [pregunta5, setPregunta5] = useState(false)
  const [respuesta1, setRespuesta1] = useState(null)

  const [segundaPregunta1, setSegundaPregunta1] = useState(false)
  const [segundaPregunta2, setSegundaPregunta2] = useState(false)
  const [segundaPregunta3, setSegundaPregunta3] = useState(false)
  const [segundaPregunta4, setSegundaPregunta4] = useState(false)
  const [respuesta2, setRespuesta2] = useState(null)


  AsyncStorageLib.getItem('user').then(resp => setUser(JSON.parse(resp)))
  AsyncStorageLib.getItem('event_id').then(resp => setEvent(JSON.parse(resp)))



  useFocusEffect(
    useCallback(() => {
      let isActive = true
      array = []
      return () => { isActive = false }
    }, [])
  )

  const [alert, setAlert] = useState(false)
  const openModalAlertSuccess = () => {
    setAlert(true)
  }
  const closeModalAlertSuccess = () => {
    setAlert(false)
    navigation.navigate('InicioTestMadurez', { student_id: route.params.student_id, factor: route.params.description })
  }
  //-------------TEST 5 PRIMERA PARTE-----------------------
  const siguiente1 = () => {
    const numero = /^([0-9])*$/g
    if (!numero.test(changeData.respuesta)) {
      alert('caracteres invalidos')
      return
    }
    var namePre = `Pregunta ${route.params.cont + 1}`
    if (changeData.respuesta !== '') {
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: changeData.respuesta,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setChangeData({ respuesta: '' })
      navigation.navigate('PreguntasRazonamientoNumerico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      setMessage('Coloque un número en el espacio')
      openModalAlertError()
    }
  }
  const volver1 = async () => {
    var namePre = `Pregunta ${route.params.cont + 1}`
    if (changeData.respuesta !== '') {
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: changeData.respuesta,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setChangeData({ respuesta: '' })
      setProgress(true)
      await axios.post(`${PORT_URL}post-result-madurez-t5-parte1`, array)
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
      // console.log(array)
    } else {
      setMessage('Coloque un Número en el espacio')
      openModalAlertError()
    }
  }
  //-------------TEST 5 SEGUNDA PARTE-----------------------
  const selectButton = (x) => {
    if (x === 1) {
      setPregunta1(true)
      setPregunta2(false)
      setPregunta3(false)
      setPregunta4(false)
      setPregunta5(false)
      setRespuesta1('A')
    } else if (x === 2) {
      setPregunta1(false)
      setPregunta2(true)
      setPregunta3(false)
      setPregunta4(false)
      setPregunta5(false)
      setRespuesta1('B')

    } else if (x === 3) {
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(true)
      setPregunta4(false)
      setPregunta5(false)
      setRespuesta1('C')

    } else if (x === 4) {
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(false)
      setPregunta4(true)
      setPregunta5(false)
      setRespuesta1('D')

    } else if (x === 5) {
      setPregunta1(false)
      setPregunta2(false)
      setPregunta3(false)
      setPregunta4(false)
      setPregunta5(true)
      setRespuesta1('E')
    }
  }
  const siguiente2 = () => {
    if (pregunta1 == true || pregunta2 == true || pregunta3 == true || pregunta4 == true || pregunta5 == true) {
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
      setPregunta4(false)
      setPregunta5(false)
      setRespuesta1(null)
      navigation.navigate('PreguntasRazonamientoNumerico', {
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
    if (pregunta1 == true || pregunta2 == true || pregunta3 == true || pregunta4 == true || pregunta5 == true) {
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
      setPregunta4(false)
      setPregunta5(false)
      setRespuesta1(null)
      setProgress(true)
      await axios.post(`${PORT_URL}post-result-madurez-t5-parte2`, array)
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
  //-------------TEST 6 -----------------------
  const selectButton2 = (x) => {
    if (x === 1) {
      setSegundaPregunta1(true)
      setSegundaPregunta2(false)
      setSegundaPregunta3(false)
      setSegundaPregunta4(false)
      setRespuesta2('A')
    } else if (x === 2) {
      setSegundaPregunta1(false)
      setSegundaPregunta2(true)
      setSegundaPregunta3(false)
      setSegundaPregunta4(false)
      setRespuesta2('B')

    } else if (x === 3) {
      setSegundaPregunta1(false)
      setSegundaPregunta2(false)
      setSegundaPregunta3(true)
      setSegundaPregunta4(false)
      setRespuesta2('C')

    } else if (x === 4) {
      setSegundaPregunta1(false)
      setSegundaPregunta2(false)
      setSegundaPregunta3(false)
      setSegundaPregunta4(true)
      setRespuesta2('D')

    }
  }
  const siguiente3 = () => {
    if (segundaPregunta1 == true || segundaPregunta2 == true || segundaPregunta3 == true || segundaPregunta4 == true) {
      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta2,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setSegundaPregunta1(false)
      setSegundaPregunta2(false)
      setSegundaPregunta3(false)
      setSegundaPregunta4(false)
      setRespuesta2(null)
      navigation.navigate('PreguntasRazonamientoNumerico', {
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
  const volver3 = async () => {
    if (segundaPregunta1 == true || segundaPregunta2 == true || segundaPregunta3 == true || segundaPregunta4 == true) {
      var namePre = `Pregunta ${route.params.cont + 1}`
      array.push({
        title: route.params.title,
        factor: route.params.factor,
        pregunta: namePre,
        respuesta: respuesta2,
        user_id: user,
        student_id: route.params.student_id,
        event_id: event,
        respCorrecta: route.params.data[route.params.cont].pregunta.respCorrecta
      })
      setSegundaPregunta1(false)
      setSegundaPregunta2(false)
      setSegundaPregunta3(false)
      setSegundaPregunta4(false)
      setRespuesta2(null)
      setProgress(true)
      await axios.post(`${PORT_URL}post-result-madurez-t6`, array)
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
      // console.log(array)
      // navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })

    } else {
      setMessage('Escoja una respuesta')
      openModalAlertError()
    }
  }
  //-------------HANDLE CHANGE-----------------------
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
          {route.params.id === 5 ? (
            <>
              <Text style={{ ...styles.textFont, fontSize: 15 }}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
              <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginHorizontal: 15 }}>
                {route.params.data[route.params.cont].pregunta.resp.map((e, index) => (
                  // <TouchableOpacity key={index} style={styles.button}>
                  //   <Text style={{ alignSelf: 'center' }}>- {e.respuesta} -</Text>
                  // </TouchableOpacity>
                  <View key={index} style={{ backgroundColor: '#ef6c00', justifyContent: 'center', alignItems: 'center', borderRadius: 20, width: 30, height: 30 }}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 17 }}>{e.respuesta} </Text>
                  </View>
                ))}
              </View>
              <Text style={{ color: 'white', alignSelf: 'center' }}>Introdusca solo Números</Text>
              <TextInput
                style={styles.input}
                maxLength={2}
                placeholder='Intro. numero'
                placeholderTextColor='#b0bec5'
                keyboardType='numeric'
                value={changeData.respuesta}
                onChangeText={text => handleChange('respuesta', text)}
              />
              {route.params.cont == 4 ?
                (
                  <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                    <TouchableOpacity style={{ padding: 12 }} onPress={volver1} >
                      <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Guardar</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <>
                    <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                      <TouchableOpacity style={{ padding: 12 }} onPress={siguiente1}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Siguiente</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </>
                )}
            </>
          ) : route.params.id === 6 ? (
            <>
              <Text style={styles.textFont}>SERIE</Text>
              <View style={{ backgroundColor: '#ef6c00', width: '60%', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}>
                <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas[0].a}</Text>
              </View>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas[1].b}</Text>
              <View>
                <TouchableOpacity style={pregunta1 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(1)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[0].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta2 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(2)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[1].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta3 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(3)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[2].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta4 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(4)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[3].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pregunta5 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton(5)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[4].respuesta}</Text>
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
          ) : route.params.id === 7 ? (
            <>
              <Text style={styles.textFont}>PREGUNTA</Text>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas[0].a}</Text>
              <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas[1].b}</Text>
              <View>
                <TouchableOpacity style={segundaPregunta1 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton2(1)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[0].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={segundaPregunta2 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton2(2)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[1].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={segundaPregunta3 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton2(3)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[2].respuesta}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={segundaPregunta4 == true ? styles.buttonSelected : styles.button} onPress={() => selectButton2(4)}>
                  <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.data[route.params.cont].pregunta.resp[3].respuesta}</Text>
                </TouchableOpacity>
              </View>
              {route.params.cont == 4 ? (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#d32f2f', '#f44336']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={volver3} >
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Guardar</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <LinearGradient style={{ borderRadius: 2, marginTop: 20, width: '87%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                  <TouchableOpacity style={{ padding: 12 }} onPress={siguiente3}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', alignSelf: 'center' }}>Siguiente</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </>
          ) : (null)}
        </ScrollView>
      </Layaut >

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
        icon={
          <View style={{
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
          </View>
        }
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
      {/* ---------------------GIF ------------------------ */}

    </>
  )
}

export default PreguntasRazonamientoNumerico

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal: 20,
    padding: 5,

  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 3,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonSelected: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 3,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red'
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
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal: 20,
    padding: 10,
    alignSelf: 'center'
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
  input: {
    fontFamily: 'Roboto_500Medium',
    width: '33%',
    marginBottom: 10,
    borderWidth: 1,
    color: 'white',
    borderRadius: 3,
    height: 40,
    padding: 10,
    borderColor: '#10ac84',
    margin: 15,
    alignSelf: 'center'
  },
  progressView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})