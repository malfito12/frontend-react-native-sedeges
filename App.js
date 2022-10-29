import React from 'react'
import Navigation from './src/Components/Molecules/Navigator/Navigation'
import { AuthProvider } from './src/Components/Atoms/Context/AuthContext'


export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       options={({ navigation })=>({
    //         title: '',
    //         headerStyle: { backgroundColor: '#545674' },
    //         headerTitleStyle: { color: '#fff' },
    //         headerTintColor: '#fff',
    //         headerRight: () => (
    //           <TouchableOpacity
    //             onPress={() => navigation.navigate('RegisterUserScreem')}
    //           >
    //             <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>Register User</Text>
    //           </TouchableOpacity>
    //         )
    //       })}
    //       name='LoginScreem'
    //       component={LoginScreem}
    //     />

    //     <Stack.Screen
    //       name='RegisterUserScreem'
    //       component={RegisterUserScreem}
    //       options={({ navigation }) => ({
    //         title: 'Registar Usuario',
    //         headerStyle: { backgroundColor: '#222f3e' },
    //         headerTitleStyle: { color: '#fff' },
    //         headerTintColor: '#fff',
    //         // headerRight:()=>(
    //         //   <TouchableOpacity
    //         //     onPress={()=>navigation.navigate('RegisterUserScreem')}
    //         //   >
    //         //     <Text style={{color:'#fff',marginRight:20,fontSize:15}}>New</Text>
    //         //   </TouchableOpacity>
    //         // )
    //       })}
    //     />
    //     <Stack.Screen
    //       name='UsersScreem'

    //       component={UsersScreem}
    //       options={({ navigation }) => ({
    //         title: 'Lista de Usuarios',
    //         headerStyle: { backgroundColor: '#222f3e' },
    //         headerTitleStyle: { color: '#fff' },
    //         gestureEnabled:false,
    //         headerLeft:()=>(
    //           <TouchableOpacity>
    //             <Text style={{display:'none'}}>atras</Text>
    //           </TouchableOpacity>
    //         )

    //         // headerRight: () => (
    //         //   <TouchableOpacity
    //         //     onPress={() => navigation.navigate('RegisterUserScreem')}
    //         //   >
    //         //     <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>New</Text>
    //         //   </TouchableOpacity>
    //         // )
    //       })}
    //     />
    //     <Stack.Screen
    //       name='HomeScreem'
    //       component={HomeScreem}
    //       options={({ navigation }) => ({
    //         title: 'Aplicacion de tareas',
    //         headerStyle: { backgroundColor: '#222f3e' },
    //         headerTitleStyle: { color: '#fff' },
    //         headerTintColor: '#fff',
    //         headerRight: () => (
    //           <TouchableOpacity
    //             onPress={() => navigation.navigate('TaskFormScreem')}
    //           >
    //             <Text style={{ color: '#fff', marginRight: 20, fontSize: 15 }}>New</Text>
    //           </TouchableOpacity>
    //         )
    //       })}
    //     />
    //     <Stack.Screen
    //       options={{
    //         title: 'Crear Nueva Tarea',
    //         headerStyle: { backgroundColor: '#222f3e' },
    //         headerTitleStyle: { color: '#fff' },
    //         headerTintColor: '#fff',
    //       }}
    //       name='TaskFormScreem'
    //       component={TaskFormScreem}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer >
  )
}
// module.exports = App