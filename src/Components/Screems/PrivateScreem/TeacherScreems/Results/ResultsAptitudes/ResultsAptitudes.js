import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../../PortUrl/PortUrl'
import { useFocusEffect } from '@react-navigation/native'

const ResultsAptitudes = ({ navigation, route }) => {
    // console.log(route.params.data)
    const [students, setStudents] = useState([])

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            getStudents()
            return () => { isActive = false }
        }, [])
    )
    
    //-----------GET STUDNETS------------------
    const getStudents = async () => {
        await axios.get(`${PORT_URL}test-aptitudes-students/${route.params.data.event_id}`)
        .then(resp=>{
            setStudents(resp.data)
        })
        .catch(err=>console.log(err))
    }
    //-----------------------------------------
    const resultStudent=(e)=>{
        // alert(JSON.stringify(e))
        navigation.push('ResultsAptitudStudent',{data:e})
    }
    // console.log(students)
    return (
        <Layaut>
            <Text style={{color:'white',alignSelf:'center',marginBottom:10}}>Lista de Estudiantes</Text>
            <ScrollView>
                {students?(
                    students.map((e,index)=>(
                        <View key={index} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#12151C', borderRadius:2, padding:5,margin:4}}>
                            <Text style={{color:'white'}}>{e.student_first_name} {e.student_last_father_name} {e.student_last_mother_name}</Text>
                            <TouchableOpacity onPress={()=>resultStudent(e)} style={{backgroundColor:'green', borderRadius:2,padding:5,margin:5}}>
                                <Text style={{color:'white'}}> Ver Resultados</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ):(
                    <View>
                        <Text style={{color:'white', alignSelf:'center'}}>No existe informacion</Text>
                    </View>
                )}
            </ScrollView>
        </Layaut>
    )
}

export default ResultsAptitudes