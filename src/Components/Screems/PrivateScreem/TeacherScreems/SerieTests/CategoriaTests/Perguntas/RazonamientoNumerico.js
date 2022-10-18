import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useModalAlert, useModalAlertError } from '../../../../../../Molecules/Hooks/useModalAlert'

var array = []
const RazonamientoNumerico = ({ route, navigation }) => {
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

  //-------------TEST 5 PRIMERA PARTE-----------------------
  const siguiente1 = () => {
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
      navigation.navigate('RazonamientoNumerico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      alert('Escriba su respuesta')
    }
  }
  const volver1 = () => {
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
      console.log(array)
      navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
    } else {
      alert('Escriba su respuesta')
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
      navigation.navigate('RazonamientoNumerico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      alert('Marque una respuesta')
    }
  }
  const volver2 = () => {
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
      console.log(array)
      navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })
    } else {
      alert('Marque una respuesta')
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
      navigation.navigate('RazonamientoNumerico', {
        factor: route.params.factor,
        data: route.params.data,
        cont: route.params.cont + 1,
        id: route.params.id,
        student_id: route.params.student_id,
        title: route.params.title,
      })
    } else {
      alert('Marque una respuesta')
    }
  }
  const volver3 = () => {
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
      console.log(array)
      navigation.navigate('InicioTest', { student_id: route.params.student_id, factor: route.params.description })

    }else{
      alert('Marque una respuesta')
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
    <Layaut>
      <ScrollView>
        {route.params.id === 5 ? (
          <>
            <Text style={styles.textFont}>Preguntas</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas}</Text>
            <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginHorizontal: 15 }}>
              {route.params.data[route.params.cont].pregunta.resp.map((e, index) => (
                // <TouchableOpacity key={index} style={styles.button}>
                //   <Text style={{ alignSelf: 'center' }}>- {e.respuesta} -</Text>
                // </TouchableOpacity>
                <View key={index} >
                  <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium', fontSize: 17 }}>{e.respuesta} </Text>
                </View>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder='Intro. numero'
              placeholderTextColor='#b0bec5'
              keyboardType='numeric'
              value={changeData.respuesta}
              onChangeText={text => handleChange('respuesta', text)}
            />
            {route.params.cont == 4 ?
              (
                // <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('InicioTest', { factor: route.params.description })} >
                <TouchableOpacity style={styles.buttonBack} onPress={volver1} >
                  <Text style={styles.textFont}>Volver</Text>
                </TouchableOpacity>
              ) : (
                // <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('RazonamientoNumerico', { data: route.params.data, cont: route.params.cont + 1, description: route.params.description, id: route.params.id })} >
                <TouchableOpacity style={styles.buttonNext} onPress={siguiente1} >
                  <Text style={styles.textFont}>Siguiente</Text>
                </TouchableOpacity>
              )}
          </>
        ) : route.params.id === 6 ? (
          <>
            <Text style={styles.textFont}>Preguntas</Text>
            <Text style={styles.textFont}>{route.params.data[route.params.cont].pregunta.preguntas[0].a}</Text>
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
              // <TouchableOpacity onPress={() => navigation.navigate('CategoryTest', { categoria: 'TEST ANALITICO', id_cartegory: 'test-analitico' })} style={styles.buttonBack}>
              <TouchableOpacity onPress={volver2} style={styles.buttonBack}>
                <Text style={styles.textFont}>Volver</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonNext} onPress={siguiente2} >
                <Text style={styles.textFont}>Siguiente</Text>
              </TouchableOpacity>
            )}
          </>
        ) : route.params.id === 7 ? (
          <>
            <Text style={styles.textFont}>Preguntas</Text>
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
              // <TouchableOpacity onPress={() => navigation.navigate('CategoryTest', { categoria: 'TEST ANALITICO', id_cartegory: 'test-analitico' })} style={styles.buttonBack}>
              <TouchableOpacity onPress={volver3} style={styles.buttonBack}>
                <Text style={styles.textFont}>Volver</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonNext} onPress={siguiente3} >
                <Text style={styles.textFont}>Siguiente</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (null)}

      </ScrollView>
    </Layaut >
  )
}

export default RazonamientoNumerico

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Roboto_500Medium',
    color: 'white',
    marginHorizontal: 20,
    padding: 5
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
    padding: 10
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
    width: '80%',
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
})