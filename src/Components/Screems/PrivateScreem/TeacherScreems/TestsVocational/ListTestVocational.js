import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { TextNormal, TextSubTitle } from '../../../../Atoms/UI/Fuente'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { CancelButton, SuccessButton } from '../../../../Molecules/Buttons/Buttons'

const ListTestVocational = () => {
  const [refresing, setRefresing] = useState(false)
  const [modalAddTestVocational, setMoldalAddTestVocational] = useState(false)
  const [changeData, setChangeData] = useState({
    test_vocational_name: '',
    test_vocational_description: '',
    test_vocational_registerDate: ''
  })
  //---------POST TEST VOCATIONAL------
  const openModalAddTestVocational = () => {
    setMoldalAddTestVocational(true)
  }
  const closeModalAddTestVocational = () => {
    setMoldalAddTestVocational(false)
  }
  const postTestVocational = async (e) => {
    e.preventDefault()
    // await axios.post(`${PORT_URL}`)
  }
  //---------REFRESH------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    // await getTests()
    setRefresing(false)
  })
  const data = [
    { name: 'Primer Test de Orientacion Vocacional', description: 'La primera vez fue en casa agena xD', registerDate: new Date() }
  ]
  return (
    <>
      <Layaut>
        <TouchableOpacity onPress={openModalAddTestVocational} style={{ marginHorizontal: 10 }}>
          <SuccessButton name={'Crear Test'} />
        </TouchableOpacity>
        <ScrollView
          style={{ marginBottom: 50 }}
          refreshControl={<RefreshControl
            colors={['#78e08f']}
            onRefresh={onRefresh}
            refreshing={refresing}
          />}
        >
          {data ? (
            data.map((e, index) => (
              <View style={styles.cardViewTest} key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.styleFontText}>{e.name}</Text>
                    <Text style={styles.styleFontText}>{e.description}</Text>
                    <Text style={styles.styleFontText}>{e.registerDate.toDateString()}</Text>
                  </View>
                  <View>
                    <Text>Icono</Text>
                  </View>
                </View>
                <View style={{ margin: 5 }}>
                  <TouchableOpacity style={{ marginBottom: 5, backgroundColor: 'transparent', borderColor: 'green', borderWidth: 2, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_500Medium' }}>Actualizar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginBottom: 5, backgroundColor: 'transparent', borderColor: 'red', borderWidth: 2, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_500Medium' }}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (

            <Text style={{ color: 'white', alignSelf: 'center' }}>No Existe Informacion</Text>
          )}
        </ScrollView>
      </Layaut>
      {/* --------------------------MODAL ADD TEST VOCATIONAL---------------------------------------------- */}
      <Modal
        visible={modalAddTestVocational}
        animationType='fade'
        transparent
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.viewModalAdd}>
            <Text>hola que ashe</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity onPress={closeModalAddTestVocational}>
                <SuccessButton name={'Registrar'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModalAddTestVocational}>
                <CancelButton name={'Cancelar'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  buttonCreate: {
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 5
  },
  cardViewTest: {
    padding: 5,
    margin: 5,
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  styleFontText: {
    fontFamily: 'Roboto_500Medium'
  },
  viewModalAdd: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 15,
    borderRadius: 3
  },
})

export default ListTestVocational