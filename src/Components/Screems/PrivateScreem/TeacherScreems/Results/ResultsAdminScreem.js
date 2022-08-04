import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import axios from 'axios'
import { PORT_URL } from '../../../../../PortUrl/PortUrl'

const ResultsAdminScreem = ({navigation,route}) => {
  // console.log(route.params.data)
  const [student,setStudent]=useState([])

  // useEffect(()=>{
  //   getStudents()
  // },[])
  // //-----------GET STUDNETS------------------
  // const getStudents=async()=>{
  //   await axios.get(`${PORT_URL}`)
  // }
  return (
    <Layaut>
      {/* <Text style={{color:'white'}}>ResultsAdminScreem</Text> */}
      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{borderWidth:1,borderRadius:3,width:'100%', borderColor:'green', padding:20,margin:10}}>
          <Text style={{color:'white',alignSelf:'center'}}>Test Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.push('ResultsAptitudes',{data:route.params.data})} style={{borderWidth:1,borderRadius:3,width:'100%', borderColor:'green', padding:20,margin:10}}>
          <Text style={{color:'white',alignSelf:'center'}}>Test Aptitudes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1,borderRadius:3,width:'100%', borderColor:'green', padding:20,margin:10}}>
          <Text style={{color:'white',alignSelf:'center'}}>Test Intereses</Text>
        </TouchableOpacity>
      </View>
    </Layaut>
  )
}

export default ResultsAdminScreem