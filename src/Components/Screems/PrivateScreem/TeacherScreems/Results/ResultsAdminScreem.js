import { View, Text, TouchableOpacity, Dimensions, ScrollView, TouchableNativeFeedback, Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
// import { printToFileAsync } from 'expo-print'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing'
import { useFocusEffect } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import TestMadurez from '../../../../../images/ImagesFondo/test-madurez-mental.png'
import TestAptitudes from '../../../../../images/ImagesFondo/test-aptitudes.jpg'
import TestIntereses from '../../../../../images/ImagesFondo/test-intereses.jpg'
import { descriptionResultsIntereses, descriptionResultsAptitudes } from '../../../../../TestData/DescriptionResults'
import { LinearGradient } from 'expo-linear-gradient'
import { useModalAlertError } from '../../../../Molecules/Hooks/useModalAlert'
import { ErrorAlert } from '../../../../Molecules/Alertas/Alerts'

const ResultsAdminScreem = ({ navigation, route }) => {
  // console.log(route.params.data)
  const [openModalError, openModalAlertError, closeModalAlertError] = useModalAlertError(false)
  const [message, setMessage] = useState(null)
  const [resultIntereses, setResultIntereses] = useState([])
  const [resultAptitudes, setResultAptitudes] = useState([])
  const [resultMadurez, setResultMadurez] = useState([])
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getResultsIntereses()
      getResultsAptitudes()
      getResults()
      return () => { isActive = false }
    }, [])
  )
  //-------------INTERESES----------------
  const getResults = async () => {
    await axios.get(`${PORT_URL}get-result-madurez-student?event_id=${route.params.data.event_id}&student_id=${route.params.data.student_id}`)
      .then(resp => {
        setResultMadurez(resp.data)
        // alert(JSON.stringify(resp.data))
      })
      .catch(err => console.log(err))
  }
  //-------------INTERESES----------------
  const dataIntereses = ['AIRE LIBRE', 'ARTISTICO', 'CIENTIFICO', 'CALCULO', 'OFICINA', 'LITERARIO', 'MECANICO', 'MUSICAL', 'PERSUASIVO', 'SE. SOCIAL']
  const getResultsIntereses = async () => {
    await axios.post(`${PORT_URL}test-intereses-students-results`, { student_id: route.params.data.student_id, event_id: route.params.data.event_id })
      .then(resp => {
        // console.log(resp.data)
        setResultIntereses(resp.data)
      })
      .catch(err => console.log(err))
  }
  const arrayIntereses = []
  for (var i = 0; i < resultIntereses.length; i++) {
    var sum = parseInt(resultIntereses[i].pregunta1) + parseInt(resultIntereses[i].pregunta2) + parseInt(resultIntereses[i].pregunta3) + parseInt(resultIntereses[i].pregunta4) + parseInt(resultIntereses[i].pregunta5) + parseInt(resultIntereses[i].pregunta6)
    var porcentaje = parseInt((sum / 35) * 100)
    var cadena = porcentaje.toString() + '%'
    arrayIntereses.push({
      totalSeccion: sum,
      name: resultIntereses[0].student_first_name,
      lastNameFather: resultIntereses[0].student_last_father_name,
      lastNameMother: resultIntereses[0].student_last_mother_name,
      nameSeccion: resultIntereses[i].seccion,
      edad: resultIntereses[0].student_age,
      fechaNacimiento: resultIntereses[0].student_birth_date,
      porcentaje: cadena
    })
  }

  // console.log(descriptionResultsIntereses)

  //-----------APTITUDES--------------------------
  const dataAptitud = ['VERVAL', 'ARTISTICO', 'CIENTIFICA', 'DESTREZA MANUAL', 'EJECUTIVA', 'MECANICA', 'MUSICAL', 'NUMERICA', 'OFICINA', 'PRACTICA', 'SOCIAL']
  const getResultsAptitudes = async () => {
    await axios.post(`${PORT_URL}test-aptitudes-students-results`, { student_id: route.params.data.student_id, event_id: route.params.data.event_id })
      .then(resp => {
        setResultAptitudes(resp.data)
      })
      .catch(err => console.log(err))
  }
  const arrayAptitudes = []
  for (var i = 0; i < resultAptitudes.length; i++) {
    var sum = parseInt(resultAptitudes[i].pregunta1) + parseInt(resultAptitudes[i].pregunta2) + parseInt(resultAptitudes[i].pregunta3) + parseInt(resultAptitudes[i].pregunta4) + parseInt(resultAptitudes[i].pregunta5)
    var porcentaje = parseInt((sum / 30) * 100)
    var cadena = porcentaje.toString() + '%'
    arrayAptitudes.push({
      totalSeccion: sum,
      name: resultAptitudes[0].student_first_name,
      lastNameFather: resultAptitudes[0].student_last_father_name,
      lastNameMother: resultAptitudes[0].student_last_mother_name,
      nameSeccion: resultAptitudes[i].seccion,
      porcentaje: cadena
    })
  }
  //-------------------------------------------------
  var sumTotalInteres = 0
  var sumTotalAptitud = 0
  var nameIteres = ''
  var nameApitud = ''
  var interes = ''
  var aptitudes = ''
  var carreraInteres = ''
  var carreraApitudes = ''
  var html = ''
  var html2 = `<br/>`
  if (arrayIntereses.length > 0 && arrayAptitudes.length > 0 && resultMadurez.length > 0) {
    //--------------INTERES-------------
    sumTotalInteres = arrayIntereses[0].totalSeccion;
    for (var j = 0; j < arrayIntereses.length; j++) {
      if (j + 1 === arrayIntereses.length) break
      if (sumTotalInteres < arrayIntereses[j].totalSeccion) {
        sumTotalInteres = arrayIntereses[j].totalSeccion
      }
    }
    const auxInteres = []
    for (var a = 0; a < arrayIntereses.length; a++) {
      if (arrayIntereses[a].totalSeccion == sumTotalInteres) {
        auxInteres.push(dataIntereses[a])
        nameIteres = nameIteres + dataIntereses[a] + ', '
      }
    }
    for (var b = 0; b < auxInteres.length; b++) {
      for (var c = 0; c < descriptionResultsIntereses.length; c++) {
        if (auxInteres[b] === descriptionResultsIntereses[c].intereses) {
          interes = interes + descriptionResultsIntereses[c].explicacion + html2
          carreraInteres = carreraInteres + descriptionResultsIntereses[c].profesion + html2
        }
      }
    }
    //-----------APTITUD-----------------
    sumTotalAptitud = arrayAptitudes[0].totalSeccion;
    for (var j = 0; j < arrayAptitudes.length; j++) {
      if (j + 1 === arrayAptitudes.length) break
      if (sumTotalAptitud < arrayAptitudes[j].totalSeccion) {
        sumTotalAptitud = arrayAptitudes[j].totalSeccion
      }
    }
    const auxAptitud = []
    for (var a = 0; a < arrayAptitudes.length; a++) {
      if (arrayAptitudes[a].totalSeccion == sumTotalAptitud) {
        auxAptitud.push(dataAptitud[a])
        nameApitud = nameApitud + dataAptitud[a] + ', '
      }
    }
    for (var b = 0; b < auxAptitud.length; b++) {
      for (var c = 0; c < descriptionResultsAptitudes.length; c++) {
        if (auxAptitud[b] === descriptionResultsAptitudes[c].aptitudes) {
          aptitudes = aptitudes + descriptionResultsAptitudes[c].explicacion + html2
          carreraApitudes = carreraApitudes + descriptionResultsAptitudes[c].profesion + html2
        }
      }
    }
    //---------------------------------------
    var dataMadurez = [
      { area: 'Test I', pd: resultMadurez[0].datos_test.test1, pc: '', nivel: '' },
      { area: 'Test II', pd: resultMadurez[0].datos_test.test2, pc: '', nivel: '' },
      { area: 'Test III', pd: resultMadurez[0].datos_test.test3, pc: '', nivel: '' },
      { area: 'Test IV', pd: resultMadurez[0].datos_test.test4, pc: '', nivel: '' },
      { area: 'Test V', pd: resultMadurez[0].datos_test.test5, pc: '', nivel: '' },
      { area: 'Test VI', pd: resultMadurez[0].datos_test.test6, pc: '', nivel: '' },
      { area: 'Test VII', pd: resultMadurez[0].datos_test.test7, pc: '', nivel: '' },
      { area: 'RELACIONES ESPACIALES', pd: resultMadurez[0].datos_test.relaciones_espaciales, pc: resultMadurez[0].datos_pc_nivel.pc_re, nivel: resultMadurez[0].datos_pc_nivel.nivel_re },
      { area: 'RAZONAMIENTO LOGICO', pd: resultMadurez[0].datos_test.razonamiento_logico, pc: resultMadurez[0].datos_pc_nivel.pc_rl, nivel: resultMadurez[0].datos_pc_nivel.nivel_rl },
      { area: 'RAZONAMIENTO NUMERICO', pd: resultMadurez[0].datos_test.razonamiento_numerico, pc: resultMadurez[0].datos_pc_nivel.pc_rn, nivel: resultMadurez[0].datos_pc_nivel.nivel_rn },
      { area: 'CONCEPTOS VERBALES', pd: resultMadurez[0].datos_test.conceptos_verbales, pc: resultMadurez[0].datos_pc_nivel.pc_cv, nivel: resultMadurez[0].datos_pc_nivel.nivel_cv },
      { area: 'TOTAL', pd: resultMadurez[0].datos_test.total, pc: '', nivel: '' },
    ]
    html = `
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico de barrasL</title>

    <style>
        .style-table{
          margin-top:10px;
        }
        .chart-wrap {
            --chart-width: 420px;
            --grid-color: #aaa;
            --bar-color: #64b5f6;
            --bar-thickness: 30px;
            --bar-rounded: 3px;
            --bar-spacing: 10px;
            /* background-color: red; */
            font-family: sans-serif;
            width: var(--chart-width);
        }

        /* cuando definimos el gráfico en horizontal, lo giramos 90 grados */
        .chart-wrap.horizontal .grid {
            transform: rotate(-90deg);
        }

        .chart-wrap.horizontal .bar::after {
            /* giramos las letras para horizontal*/
            /* transform: rotate(90deg); */
            padding-top: 0px;
            display: block;
        }

        .chart-wrap .grid {
            /* background-color: aqua; */
            width: 100%;
            margin-left: 150px;
            height: 200px;
        }

        /* posicionamos el % del gráfico*/
        .chart-wrap .grid::before {
            font-size: 0.8em;
            font-weight: bold;
            content: '0%';
            position: absolute;
            left: -0.5em;
            top: -1.5em;
        }

        .chart-wrap .grid::after {
            font-size: 0.8em;
            font-weight: bold;
            content: '100%';
            position: absolute;
            right: -1.5em;
            top: -1.5em;
        }

        /* giramos las valores de 0% y 100% para horizontal */
        .chart-wrap.horizontal .grid::before,
        .chart-wrap.horizontal .grid::after {
            transform: rotate(90deg);
        }

        .chart-wrap .bar {
            width: var(--bar-value);
            /* height: var(--bar-thickness); */
            height: 20px;
            /* margin:var(--bar-spacing) 0; */
            margin: 1px;
            background-color: var(--bar-color);
            border-radius: 0 var(--bar-rounded) var(--bar-rounded) 0;
        }

        .chart-wrap .bar:hover {
            opacity: 0.7;
        }

        .chart-wrap .bar::after {
            content: attr(data-name);
            margin-left: 100%;
            font-size: small;
            padding: 5px;
            display: inline-block;
            white-space: nowrap;
        }
    </style>
</head>

<body>

    <h5 align="center">INFORME DE RESULTADOS</h5>
    <h5>NOMBRE: ${arrayIntereses[0].name} ${arrayAptitudes[0].lastNameFather} ${arrayAptitudes[0].lastNameMother}</h5>
    <h5>FECHA DE NACIMIENTO : ${arrayIntereses[0].fechaNacimiento}</h5>
    <h5>EDAD: ${arrayIntereses[0].edad}</h5>
    <h5 align="center">MADUREZ METAL</h5>
    <div align='center'>
      <table border='1'>
      <thead>
          <tr>
            <th>AREA</th>
            <th>PD</th>
            <th>PC</th>
            <th>NIVEL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${dataMadurez[0].area}</td>
            <td>${dataMadurez[0].pd}</td>
            <td colspan='2'>${dataMadurez[0].pc}</td>
            
          </tr>
          <tr>
            <td>${dataMadurez[1].area}</td>
            <td>${dataMadurez[1].pd}</td>
            <td colspan='2'>${dataMadurez[1].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[2].area}</td>
            <td>${dataMadurez[2].pd}</td>
            <td colspan='2'>${dataMadurez[2].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[3].area}</td>
            <td>${dataMadurez[3].pd}</td>
            <td colspan='2'>${dataMadurez[3].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[4].area}</td>
            <td>${dataMadurez[4].pd}</td>
            <td colspan='2'>${dataMadurez[4].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[5].area}</td>
            <td>${dataMadurez[5].pd}</td>
            <td colspan='2'>${dataMadurez[5].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[6].area}</td>
            <td>${dataMadurez[6].pd}</td>
            <td colspan='2'>${dataMadurez[6].pc}</td>
          </tr>
          <tr>
            <td>${dataMadurez[7].area}</td>
            <td>${dataMadurez[7].pd}</td>
            <td>${dataMadurez[7].pc}</td>
            <td>${dataMadurez[7].nivel}</td>
          </tr>
          <tr>
            <td>${dataMadurez[8].area}</td>
            <td>${dataMadurez[8].pd}</td>
            <td>${dataMadurez[8].pc}</td>
            <td>${dataMadurez[8].nivel}</td>
          </tr>
          <tr>
            <td>${dataMadurez[9].area}</td>
            <td>${dataMadurez[9].pd}</td>
            <td>${dataMadurez[9].pc}</td>
            <td>${dataMadurez[9].nivel}</td>
          </tr>
          <tr>
            <td>${dataMadurez[10].area}</td>
            <td>${dataMadurez[10].pd}</td>
            <td>${dataMadurez[10].pc}</td>
            <td>${dataMadurez[10].nivel}</td>
          </tr>
          <tr>
            <td>${dataMadurez[11].area}</td>
            <td>${dataMadurez[11].pd}</td>
            <td>${dataMadurez[11].pc}</td>
            <td>${dataMadurez[11].nivel}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>EDAD CRONOLOGICA</h5>
    <p>Edad Cronologica obteniddo a partir de la fecha de nacimiento y la fecha en el que realizo el test calculado en meses</p>
    <p align='center'>Fecha de Nacimiento = ${resultMadurez[0].datos_opcionales.edad_nacimiento_est}</p>
    <p align='center'>Fecha Registro de Test = ${resultMadurez[0].datos_opcionales.edad_register_test_est}</p>
    <p align='center'>Cantidad de meses optenido = ${resultMadurez[0].datos_opcionales.edad_nacimiento_meses_est}</p>
    <h5>EDAD MENTAL</h5>
    <p>Edad Mental obtenido de la tabla normas de edad mental, a partir de la suma total de los resultados en los diferentes test, </p>
    <p align='center'>Suma Total = ${resultMadurez[0].datos_opcionales.edad_mental_sum}</p>
    <p align='center'>Resultado de la tabla = ${resultMadurez[0].datos_opcionales.edad_mental_sum} = ${resultMadurez[0].datos_test.edad_mental}</p>
    <h5>COEFICIENTE INTELECTUAL</h5>
    <p>Coeficiente Intelectual obtenido con la siguinte operación de calculo</p>
    <p align='center'>CI = (edad mental / edad cronologica) * 100</p>
    <p align='center'>CI = ( ${resultMadurez[0].datos_test.edad_mental} / ${resultMadurez[0].datos_test.edad_cronologica}) * 100 = ${resultMadurez[0].datos_test.coeficiente_intelectual}</p>
    <div align='center'>
      <table class="style-table">
        <thead></thead>
        <tbody>
            <tr>
              <td>EDAD CRONOLOGICA</td>
              <td>${resultMadurez[0].datos_test.edad_cronologica}</td>
            </tr>
            <tr>
              <td>EDAD MENTAL</td>
              <td>${resultMadurez[0].datos_test.edad_mental}</td>
            </tr>
              <td>COEFICIENTE INTELECTUAL</td>
              <td>${resultMadurez[0].datos_test.coeficiente_intelectual}</td>
            </tr>
        </tbody>
      </table>
    </div>
    <h5 align="center">INTERESES</h5>
    <div class="chart-wrap ">
        <!-- quitar el estilo "horizontal" para visualizar verticalmente -->

        <div class="grid">
            <div class="bar" style="--bar-value:${arrayIntereses[0].porcentaje};" data-name="Aire Libre ${arrayIntereses[0].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[1].porcentaje};" data-name="Artistico ${arrayIntereses[1].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[2].porcentaje};" data-name="Cientifico ${arrayIntereses[2].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[3].porcentaje};" data-name="De Calculo ${arrayIntereses[3].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[4].porcentaje};" data-name="De Oficina ${arrayIntereses[4].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[5].porcentaje};" data-name="Literario ${arrayIntereses[5].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[6].porcentaje};" data-name="Mecanico ${arrayIntereses[6].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[7].porcentaje};" data-name="Musical ${arrayIntereses[7].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[8].porcentaje};" data-name="Persuasivo ${arrayIntereses[8].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayIntereses[9].porcentaje};" data-name="Se Social ${arrayIntereses[9].totalSeccion}"></div>
        </div>
    </div>
    <h5 style="margin-top:40">AREAS SOBRESALIENTES INTERESES : </h5>
    <h5>INTERESES: ${nameIteres}</h5>
    <p>${interes}</p>
    <h5 align="center">APTITUDES</h5>
    <div class="chart-wrap ">
        <!-- quitar el estilo "horizontal" para visualizar verticalmente -->

        <div class="grid">
            <div class="bar" style="--bar-value:${arrayAptitudes[0].porcentaje};" data-name="Verval ${arrayAptitudes[0].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[1].porcentaje};" data-name="Artistico ${arrayAptitudes[1].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[2].porcentaje};" data-name="Cientifica ${arrayAptitudes[2].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[3].porcentaje};" data-name="De Manual ${arrayAptitudes[3].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[4].porcentaje};" data-name="Ejecutivo ${arrayAptitudes[4].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[5].porcentaje};" data-name="Mecanica ${arrayAptitudes[5].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[6].porcentaje};" data-name="Musical ${arrayAptitudes[6].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[7].porcentaje};" data-name="Numerica ${arrayAptitudes[7].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[8].porcentaje};" data-name="Oficina ${arrayAptitudes[8].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[9].porcentaje};" data-name="Practica ${arrayAptitudes[9].totalSeccion}"></div>
            <div class="bar" style="--bar-value:${arrayAptitudes[10].porcentaje};" data-name="Social ${arrayAptitudes[10].totalSeccion}"></div>
        </div>
    </div>
    <h5 style="margin-top:40">AREAS SOBRESALIENTES APTITUDES : </h5>
    <h5>APTITUDES: ${nameApitud}</h5>
    <p>${aptitudes}</p>
    <h5>CARRERAS QUE SE RECOMIENDAN</h5>
    <p>${carreraInteres}</p>
    <p>${carreraApitudes}</p>
    <h5></h5>
</body>
  </html>
  `;
  } else {
    html = `<p>Informacion incompleta</p>`
  }
  const pdfGenerate = async () => {
    if (resultMadurez.length > 0 && resultAptitudes.length > 0 && resultIntereses.length > 0) {
      // const file = await printToFileAsync({
      //   html: html,
      //   base64: false
      // })
      // await shareAsync(file.uri)
      await Print.printAsync({
        html,
      });
    } else {
      setMessage('Falta Informacion para elaborar reportes')
      openModalAlertError()
    }
  }
  return (
    <Layaut>
      <>
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.testView} onPress={() => navigation.navigate('ResultsMadurezStudent', { data: route.params.data })} >
              <ImageBackground source={TestMadurez} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>TEST MADUREZ MENTAL</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.testView} onPress={() => navigation.navigate('ResultsAptitudStudent', { data: route.params.data })} >
              <ImageBackground source={TestAptitudes} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>TEST APTITUDES</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.testView} onPress={() => navigation.navigate('ResultsInteresStudent', { data: route.params.data })}  >
              <ImageBackground source={TestIntereses} resizeMode='cover' style={styles.ImageView} imageStyle={{ borderRadius: 5, }} />
              <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto_500Medium' }}>TEST INTERESES</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textStyles}>REPORTE RESULTADOS</Text>
          <LinearGradient style={{ borderRadius: 2, marginBottom: 10, width: '70%', alignSelf: 'center' }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#ef6c00', '#f57c00', '#fb8c00']}>
            <TouchableOpacity onPress={pdfGenerate} style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto_500Medium' }}>Imprimir Resultados</Text>
                <Entypo name="print" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </LinearGradient>

        </ScrollView>
        {/* ---------------------ALERTS ------------------------ */}
        <ErrorAlert isOpen={openModalError} closeModal={closeModalAlertError} text={message} />
      </>
    </Layaut>
  )
}

export default ResultsAdminScreem

const styles = StyleSheet.create({
  testView: {
    borderRadius: 5,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageView: {
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textStyles: {
    fontFamily: 'Roboto_500Medium',
    marginBottom: 10,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20
  },
})