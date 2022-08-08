import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'

const ResultsAptitudStudent = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params.data))
    const [result, setResult] = useState([])

    useEffect(() => {
        getResults()
    }, [])
    const getResults = async () => {
        // await axios.get(`${PORT_URL}test-aptitudes-students-results/${route.params.data.student_id}`)
        await axios.post(`${PORT_URL}test-aptitudes-students-results`,{student_id:route.params.data.student_id,event_id:route.params.data.event_id})
            .then(resp => {
                // console.log(resp.data)
                setResult(resp.data)
            })
            .catch(err => console.log(err))
    }
    const array = []
    for (var i = 0; i < result.length; i++) {
        var sum = parseInt(result[i].pregunta1) + parseInt(result[i].pregunta2) + parseInt(result[i].pregunta3) + parseInt(result[i].pregunta4) + parseInt(result[i].pregunta5)
        array.push({
            totalSeccion: sum,
            name: result[0].student_first_name,
            lastNameFather: result[0].student_last_father_name,
            lastNameMother: result[0].student_last_mother_name,
            nameSeccion: result[i].seccion
        })
    }
    var sumTotal=0;
    // for(var j=0;j<array.length;j++){
    //     // sumTotal=array[j].totalSeccion
    //     for(var k=j+1;k<array.length;k++){
    //         if(array[k].totalSeccion>=array[j].totalSeccion){
    //             sumTotal=array[k].totalSeccion
    //         }else{
    //             sumTotal=array[j].totalSeccion
    //         }
    //     }
    // }
    for(var j=0;j<array.length;j++){
        if(j+1===array.length) break
        if(array[j].totalSeccion>=array[j+1].totalSeccion){
            // console.log(sumTotal)
            sumTotal=array[j].totalSeccion
        }
    }
    // console.log(array)
    return (
        <Layaut>
            {array.length > 0 ? (
                <>
                    <Text style={{ color: 'white' }}>{array[0].name} {array[0].lastNameFather} {array[0].lastNameMother}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>AREA</Text>
                        <Text style={{color:'white'}}>PD</Text>
                        <Text style={{color:'white'}}>CLAVE</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>VERBAL</Text>
                        <Text style={{color:'white'}}>{array[0].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.A.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>ARTISTICO</Text>
                        <Text style={{color:'white'}}>{array[1].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.D.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>CIENTIFICA</Text>
                        <Text style={{color:'white'}}>{array[2].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.F.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>D. MANUAL</Text>
                        <Text style={{color:'white'}}>{array[3].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.H.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>EJECUTIVA</Text>
                        <Text style={{color:'white'}}>{array[4].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.J.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>MECANICA</Text>
                        <Text style={{color:'white'}}>{array[5].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.C.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>MUSICAL</Text>
                        <Text style={{color:'white'}}>{array[6].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.E.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>NUMERICA</Text>
                        <Text style={{color:'white'}}>{array[7].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.B.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>OFICINA</Text>
                        <Text style={{color:'white'}}>{array[8].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.K.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>PRACTICA</Text>
                        <Text style={{color:'white'}}>{array[9].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.I.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>SOCIAL</Text>
                        <Text style={{color:'white'}}>{array[10].totalSeccion}</Text>
                        <Text style={{color:'white'}}>T.G.</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#12151C', padding:5,margin:5}}>
                        <Text style={{color:'white'}}>TOTAL</Text>
                        <Text style={{color:'white'}}>{sumTotal}</Text>
                        <Text style={{color:'white'}}>M</Text>
                    </View>
                </>
            ) : (null)}

        </Layaut>
    )
}

export default ResultsAptitudStudent