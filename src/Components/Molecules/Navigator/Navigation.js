import { View, Text } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import React, { useContext, useState, useEffect } from 'react'
import LoginScreem from '../../Screems/PublicScreem/LoginScreem'
import RegisterUserScreem from '../../Screems/PublicScreem/RegisterUserScreem'
import Home from '../../Screems/PrivateScreem/StudentScreems/Home'
import UsersScreem from '../../Screems/PrivateScreem/Users/UsersScreem'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../../Atoms/Context/AuthContext'
import TeacherHomeScreem from '../../Screems/PrivateScreem/TeacherScreems/TeacherHomeScreem'
import InicioTestEst from '../../Screems/PrivateScreem/StudentScreems/SerieTest/InicioTestEst'
import InicioTest from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/InicioTest'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import Preguntas from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/CategoriaTests/TestAnalitico/Preguntas'
import CategoryTest from '../../Screems/PrivateScreem/TeacherScreems/Tests/CategoryTest'
import PruebaTest from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/CategoriaTests/TestAnalitico/PruebaTest'
import Instructions from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/Instructions'
import PreguntaTestGrafico from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/CategoriaTests/TestGrafico/PreguntaTestGrafico'
import PerfilUserScreem from '../../Screems/PrivateScreem/Users/PerfilUserScreem'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { token, user } = useContext(AuthContext)
    const [login, setLogin] = useState([])
    const [rol, setRol] = useState([])
    AsyncStorageLib.getItem('token').then(resp => setLogin(JSON.parse(resp)))
    AsyncStorageLib.getItem('rol').then(resp => setRol(JSON.parse(resp)))
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {login && rol === 'admin' ? (
                    <>
                        <Stack.Screen name='TeacherHomeScreem' component={TeacherHomeScreem} options={{ headerShown: false }} />
                        <Stack.Screen
                            name='RegisterUserScreem'
                            component={RegisterUserScreem}
                            options={{
                                title: '',
                                headerTitleAlign: 'center',
                                headerTitleStyle: { fontSize: 16 },
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                headerLeft: () => <></>
                            }}
                        />
                        <Stack.Screen
                            name='PerfilUserScreem'
                            component={PerfilUserScreem}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Perfil'
                            }}
                        // initialParams={{ post: () => logget() }}
                        />
                        <Stack.Screen
                            name='UsersScreem'
                            component={UsersScreem}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Usuarios'
                            }}
                        // initialParams={{ post: () => logget() }}
                        />
                        <Stack.Screen
                            name='CategoryTest'
                            component={CategoryTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Categorias'
                            }} />
                        <Stack.Screen
                            name='InicioTest'
                            component={InicioTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Tests'
                            }}
                        // initialParams={{ lala:AsyncStorageLib.getItem('test') }}
                        />
                        <Stack.Screen
                            name='Instructions'
                            component={Instructions}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Instrucciones'
                            }}
                        />
                        <Stack.Screen
                            name='Preguntas'
                            component={Preguntas}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Preguntas'
                            }}
                        />
                        <Stack.Screen
                            name='PreguntaTestGrafico'
                            component={PreguntaTestGrafico}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Test Grafico'
                            }}
                        />
                        <Stack.Screen
                            name='PruebaTest'
                            component={PruebaTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Preguntas'
                            }}
                        />
                    </>
                ) : login && rol === 'Estudiante' ? (
                    <>
                        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                        <Stack.Screen
                            name='PerfilUserScreem'
                            component={PerfilUserScreem}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Perfil'
                            }}
                        />
                        <Stack.Screen
                            name='InicioTestEst'
                            component={InicioTestEst}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Tests'
                            }}
                        />
                        <Stack.Screen
                            name='CategoryTest'
                            component={CategoryTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Categorias'
                            }} />
                        <Stack.Screen
                            name='InicioTest'
                            component={InicioTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Tests'
                            }}
                        />
                        <Stack.Screen
                            name='Instructions'
                            component={Instructions}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Instrucciones'
                            }}
                        />
                        <Stack.Screen
                            name='Preguntas'
                            component={Preguntas}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Preguntas'
                            }}
                        />
                        <Stack.Screen
                            name='PreguntaTestGrafico'
                            component={PreguntaTestGrafico}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Test Grafico'
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name='LoginScreem'
                            component={LoginScreem}
                            options={{
                                title: 'Bienvenidos a SEDEGES',
                                headerTitleAlign: 'center',
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        // initialParams={{ post: () => logget() }}
                        />
                        {/* <Stack.Screen
                            name='RegisterUserScreem'
                            component={RegisterUserScreem}
                            options={{
                                title: 'Bienvenidos a SEDEGES',
                                headerTitleAlign: 'center',
                                headerTitleStyle: { fontSize: 16 },
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                headerLeft: () => <></>
                            }}
                        /> */}
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Navigation