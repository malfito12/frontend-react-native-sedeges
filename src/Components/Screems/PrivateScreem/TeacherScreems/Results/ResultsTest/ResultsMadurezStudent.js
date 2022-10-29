import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'
import { Table, Row, Rows } from 'react-native-table-component';

const ResultsMadurezStudent = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params.data))
  const [progressName, setProgressName] = useState('none')
  const [exist, setExist] = useState('none')
  const [result, setResult] = useState([])
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getResults()
      return () => { isActive = false }
    }, [])
  )
  const getResults = async () => {
    setProgressName('flex')
    await axios.get(`${PORT_URL}get-result-madurez-student?event_id=${route.params.data.event_id}&student_id=${route.params.data.student_id}`)
      .then(resp => {
        if (resp.data.length === 0) {
          setExist('flex')
        }
        setProgressName('none')
        setResult(resp.data)
        // alert(JSON.stringify(resp.data))
      })
      .catch(err => console.log(err))
  }
  //------------------------------------------------------
  const tableHead = ['AREA', 'PD', 'PC', 'NIVEL']
  const widthArr = [130, 60, 60, 60]
  // const tableData = [
  //   { uno: '1', dos: '2', tres: '3', cuatro: '4' },
  //   { uno: 'a', dos: 'b', tres: 'c', cuatro: 'd' },
  //   { uno: '1', dos: '2', tres: '3', cuatro: '456\n789' },
  //   { uno: 'a', dos: 'b', tres: 'c', cuatro: 'd' }
  // ]
  var data = []
  if (result.length > 0) {
    data = [
      ['Test I', result[0].datos_test.test1, '', ''],
      ['Test II', result[0].datos_test.test2, '', ''],
      ['Test III', result[0].datos_test.test3, '', ''],
      ['Test IV', result[0].datos_test.test4, '', ''],
      ['Test V', result[0].datos_test.test5, '', ''],
      ['Test VI', result[0].datos_test.test6, '', ''],
      ['Test VII', result[0].datos_test.test7, '', ''],
      ['RELACIONES ESPACIALES', result[0].datos_test.relaciones_espaciales, result[0].datos_pc_nivel.pc_re, result[0].datos_pc_nivel.nivel_re],
      ['RAZONAMIENTO LOGICO', result[0].datos_test.razonamiento_logico, result[0].datos_pc_nivel.pc_rl, result[0].datos_pc_nivel.nivel_rl],
      ['RAZONAMIENTO NUMERICO', result[0].datos_test.razonamiento_numerico, result[0].datos_pc_nivel.pc_rn, result[0].datos_pc_nivel.nivel_rn],
      ['CONCEPTOS VERBALES', result[0].datos_test.conceptos_verbales, result[0].datos_pc_nivel.pc_cv, result[0].datos_pc_nivel.nivel_cv],
      ['TOTAL', result[0].datos_test.total, '', ''],
    ]

  }
  // alert(JSON.stringify(result))
  return (
    <Layaut>
      <ScrollView>
        {result.length > 0 ? (
          <>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: 'white' }}>Nombre : {result[0].datos_estudiante.nombre} {result[0].datos_estudiante.apellidoP} {result[0].datos_estudiante.apellidoM}</Text>
              <Text style={{ color: 'white' }}>Edad : {result[0].datos_estudiante.edad}</Text>
              <Text style={{ color: 'white' }}>Fecha de Nacimiento : {result[0].datos_estudiante.fecha_nacimiento}</Text>
            </View>

            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={tableHead} style={styles.head} textStyle={{ color: 'black' }} />
              <Rows data={data} textStyle={styles.text} />
            </Table>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: 'white', backgroundColor: '#12151C', borderRadius: 2, padding: 5, margin: 4 }}>EDAD CRONOLOGICA : {result[0].datos_test.edad_cronologica} </Text>
              <Text style={{ color: 'white', backgroundColor: '#12151C', borderRadius: 2, padding: 5, margin: 4 }}>EDAD MENTAL : {result[0].datos_test.edad_mental} </Text>
              <Text style={{ color: 'white', backgroundColor: '#12151C', borderRadius: 2, padding: 5, margin: 4 }}>COEFICIENTE INTELECTUAL : {result[0].datos_test.coeficiente_intelectual} </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
            <View style={{ display: progressName }}>
              <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
            </View>
          </>
        )}
      </ScrollView>
    </Layaut>
  )
}

export default ResultsMadurezStudent

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'white' }
});