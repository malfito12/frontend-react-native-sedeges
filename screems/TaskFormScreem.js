import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import Layaut from '../components/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const TaskFormScreem = ({navigation}) => {

  useEffect(()=>{
    prueba()
  },[])

  const prueba=async()=>{
    const result=await AsyncStorageLib.getItem('token')
    alert(result)
  }
  const remove=async()=>{
    await AsyncStorageLib.removeItem('token')
    navigation.navigate('LoginScreem')
  }
  return (
    <Layaut>
      <Text>TaskFormScreem</Text>
      <TouchableOpacity style={styles.button} onPress={remove}>
        <Text>remove</Text>
      </TouchableOpacity>
    </Layaut>
  )
}
const styles=StyleSheet.create({
  button:{
    backgroundColor:'#78e08f'
  }
})

export default TaskFormScreem