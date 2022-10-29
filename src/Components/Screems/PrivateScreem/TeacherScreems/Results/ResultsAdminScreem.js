import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'
import { descriptionResultsIntereses, descriptionResultsAptitudes } from '../../../../../TestData/DescriptionResults'

const ResultsAdminScreem = ({ navigation, route }) => {
  // console.log(route.params.data)
  const [resultIntereses, setResultIntereses] = useState([])
  const [resultAptitudes, setResultAptitudes] = useState([])
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      getResultsIntereses()
      getResultsAptitudes()
      return () => { isActive = false }
    }, [])
  )
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
  if (arrayIntereses.length > 0 && arrayAptitudes.length > 0) {
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
    html = `
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico de barrasL</title>

    <style>
        .chart-wrap {
            --chart-width: 420px;
            --grid-color: #aaa;
            --bar-color: #F16335;
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

    <h5 align="center">INFORME DE INTERESES Y APTITUDES</h5>
    <h5>ESCUELA : </h5>
    <h5>NOMBRE: ${arrayIntereses[0].name} ${arrayAptitudes[0].lastNameFather} ${arrayAptitudes[0].lastNameMother}</h5>
    <h5>FECHA DE NACIMIENTO : ${arrayIntereses[0].fechaNacimiento}</h5>
    <h5>EDAD: ${arrayIntereses[0].edad}</h5>
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
    <h5 style="margin-top:50">AREAS SOBRESALIENTES : </h5>
    <h5>INTERESES: ${nameIteres}</h5>
    <p>${interes}</p>
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
    // alert('Prueba Incompleta')
  }
  const pdfGenerate = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    })
    await shareAsync(file.uri)
  }
  return (
    <Layaut>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ResultsMadurezStudent', { data: route.params.data })} style={{ borderWidth: 1, borderRadius: 3, width: '100%', borderColor: 'green', padding: 20, margin: 10 }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Test Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ResultsAptitudStudent', { data: route.params.data })} style={{ borderWidth: 1, borderRadius: 3, width: '100%', borderColor: 'green', padding: 20, margin: 10 }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Test Aptitudes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ResultsInteresStudent', { data: route.params.data })} style={{ borderWidth: 1, borderRadius: 3, width: '100%', borderColor: 'green', padding: 20, margin: 10 }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Test Intereses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pdfGenerate} style={{ borderWidth: 1, borderColor: 'blue', padding: 20, marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Reporte de Resultados</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </Layaut>
  )
}

export default ResultsAdminScreem