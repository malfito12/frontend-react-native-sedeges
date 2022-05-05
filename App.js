import React,{useEffect,useState} from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreem from './screems/HomeScreem'
import TaskFormScreem from './screems/TaskFormScreem'
import { Text, TouchableOpacity } from 'react-native'
import UsersScreem from './screems/PublicScreems/Users/UsersScreem'
import RegisterUserScreem from './screems/PublicScreems/Users/RegisterUserScreem'
import LoginScreem from './screems/PublicScreems/Login/LoginScreem'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export default function App() {
  // const [logged,setLogged]=useState(null)
  // useEffect(()=>{
  //   token()
  // },[])
  // const token=async()=>{
  //   const result= await AsyncStorageLib.getItem('token')
  //   setLogged(result)
  // }  
  // console.log(logged)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation })=>({
            title: '',
            headerStyle: { backgroundColor: '#545674' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterUserScreem')}
              >
                <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>Register User</Text>
              </TouchableOpacity>
            )
          })}
          name='LoginScreem'
          component={LoginScreem}
        />

        <Stack.Screen
          name='RegisterUserScreem'
          component={RegisterUserScreem}
          options={({ navigation }) => ({
            title: 'Registar Usuario',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
            // headerRight:()=>(
            //   <TouchableOpacity
            //     onPress={()=>navigation.navigate('RegisterUserScreem')}
            //   >
            //     <Text style={{color:'#fff',marginRight:20,fontSize:15}}>New</Text>
            //   </TouchableOpacity>
            // )
          })}
        />
        <Stack.Screen
          name='UsersScreem'
          
          component={UsersScreem}
          options={({ navigation }) => ({
            title: 'Lista de Usuarios',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#fff' },
            gestureEnabled:false,
            headerLeft:()=>(
              <TouchableOpacity>
                <Text style={{display:'none'}}>atras</Text>
              </TouchableOpacity>
            )
            
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate('RegisterUserScreem')}
            //   >
            //     <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>New</Text>
            //   </TouchableOpacity>
            // )
          })}
        />
        <Stack.Screen
          name='HomeScreem'
          component={HomeScreem}
          options={({ navigation }) => ({
            title: 'Aplicacion de tareas',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('TaskFormScreem')}
              >
                <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>New</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          options={{
            title: 'Crear Nueva Tarea',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
          name='TaskFormScreem'
          component={TaskFormScreem}
        />
      </Stack.Navigator>
    </NavigationContainer >
  )
}
// module.exports = App