import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import * as Progress from 'react-native-progress'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'
import { useFocusEffect } from '@react-navigation/native'
import { BarChart, LineChart } from 'react-native-chart-kit'

const ResultsAptitudStudent = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params.data))
    const [result, setResult] = useState([])
    const [progressName, setProgressName] = useState('none')
    const [exist, setExist] = useState('none')

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getResults()
            return () => { isActive = false }
        }, [])
    )
    const getResults = async () => {
        setProgressName('flex')
        // await axios.get(`${PORT_URL}test-aptitudes-students-results/${route.params.data.student_id}`)
        await axios.post(`${PORT_URL}test-aptitudes-students-results`, { student_id: route.params.data.student_id, event_id: route.params.data.event_id })
            .then(resp => {
                // console.log(resp.data)
                if (resp.data.length === 0) {
                    setExist('flex')
                }
                setProgressName('none')
                setResult(resp.data)
            })
            .catch(err => console.log(err))
    }
    const array = []
    const data2 = []
    for (var i = 0; i < result.length; i++) {
        var sum = parseInt(result[i].pregunta1) + parseInt(result[i].pregunta2) + parseInt(result[i].pregunta3) + parseInt(result[i].pregunta4) + parseInt(result[i].pregunta5)
        array.push({
            totalSeccion: sum,
            name: result[0].student_first_name,
            lastNameFather: result[0].student_last_father_name,
            lastNameMother: result[0].student_last_mother_name,
            nameSeccion: result[i].seccion
        })
        data2.push(parseInt(sum))
    }

    var sumTotal = 0
    if (array.length > 0) {
        sumTotal = array[0].totalSeccion;
        for (var j = 0; j < array.length; j++) {
            if (j + 1 === array.length) break
            if (sumTotal < array[j].totalSeccion) {
                sumTotal = array[j].totalSeccion
            }
        }
    }
    const data = {
        labels: ["T.A.", "T.D.", "T.F.", "T.H.", "T.J.", "T.C.", "T.E.", "T.B.", "T.K.", "T.I.", "T.G."],
        datasets: [{ data: data2 }],
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        color: (opacity = 1) => `rgba(200, 255, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForHorizontalLabels: { fontSize: "16", x: "60" },
    };
    return (
        <Layaut>
            <ScrollView>
                {array.length > 0 ? (
                    <>
                        <Text style={{ color: 'white' }}>{array[0].name} {array[0].lastNameFather} {array[0].lastNameMother}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>AREA</Text>
                            <Text style={{ color: 'white' }}>PD</Text>
                            <Text style={{ color: 'white' }}>CLAVE</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>VERBAL</Text>
                            <Text style={{ color: 'white' }}>{array[0].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.A.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>ARTISTICO</Text>
                            <Text style={{ color: 'white' }}>{array[1].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.D.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>CIENTIFICA</Text>
                            <Text style={{ color: 'white' }}>{array[2].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.F.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>D. MANUAL</Text>
                            <Text style={{ color: 'white' }}>{array[3].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.H.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>EJECUTIVA</Text>
                            <Text style={{ color: 'white' }}>{array[4].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.J.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>MECANICA</Text>
                            <Text style={{ color: 'white' }}>{array[5].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.C.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>MUSICAL</Text>
                            <Text style={{ color: 'white' }}>{array[6].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.E.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>NUMERICA</Text>
                            <Text style={{ color: 'white' }}>{array[7].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.B.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>OFICINA</Text>
                            <Text style={{ color: 'white' }}>{array[8].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.K.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>PRACTICA</Text>
                            <Text style={{ color: 'white' }}>{array[9].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.I.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>SOCIAL</Text>
                            <Text style={{ color: 'white' }}>{array[10].totalSeccion}</Text>
                            <Text style={{ color: 'white' }}>T.G.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#12151C', padding: 5, margin: 5 }}>
                            <Text style={{ color: 'white' }}>TOTAL</Text>
                            <Text style={{ color: 'white' }}>{sumTotal}</Text>
                            <Text style={{ color: 'white' }}>M</Text>
                        </View>
                        <Text style={{ marginTop: 40, alignSelf: 'center', color: 'white', fontFamily: 'Roboto_900Black', fontSize: 16 }}>GRAFICAS</Text>
                        <BarChart
                            data={data}
                            width={(Dimensions.get('window').width) - 50}
                            height={320}
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            fromZero
                        />
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

export default ResultsAptitudStudent