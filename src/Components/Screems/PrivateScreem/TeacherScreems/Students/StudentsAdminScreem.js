import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import * as Progress from 'react-native-progress'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const StudentsAdminScreem = ({navigation,route}) => {
  const [students, setStudents] = useState([])
  const [progress, setProgress] = useState('none')
  const [exist, setExist] = useState('none')
  const [refresing, setRefresing] = useState(false)
  

  useEffect(() => {
    getStudents()
  }, [])
  //--------------GET STUDENTS---------------
  // console.log(route.params)
  // if(route.params){
  //   console.log('hola')
  //   getStudents()
  // }
  const getStudents = async () => {
    setProgress('flex')
    await axios.get(`${PORT_URL}students`)
      .then(resp => {
        if (resp.data.length === 0) {
          setExist('flex')
        }
        setProgress('none')
        setStudents(resp.data)
      })
      .catch(err => console.log(err))
  }
  //---------REFRESH------
  const onRefresh = useCallback(async () => {
    setRefresing(true)
    await getStudents()
    setRefresing(false)
  })
  console.log(students)
  return (
    <Layaut>
      <ScrollView
        style={{ marginBottom: 50 }}
        refreshControl={<RefreshControl
          colors={['#78e08f']}
          onRefresh={onRefresh}
          refreshing={refresing}
        />}
      >
        {students.length > 0 ? (
          students.map((e, index) => (
            <View key={index}>
              <Text style={{color:'white',fontFamily: 'Roboto_500Medium',}}>{e.student_first_name} {e.student_last_name}</Text>
            </View>
          ))
        ) : (
          <>
            <Text style={{ color: 'white', alignSelf: 'center', padding: 20, display: exist }}>No Existen Registros</Text>
            <View style={{ display: progress }}>
              <Progress.Circle style={{ alignSelf: 'center' }} borderWidth={2} size={20} indeterminate={true} />
            </View>
          </>
        )}
      </ScrollView>
    </Layaut>
  )
}

export default StudentsAdminScreem