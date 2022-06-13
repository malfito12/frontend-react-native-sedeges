import { View, Text } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import LoginScreem from '../../Screems/PublicScreem/LoginScreem'
import RegisterUserScreem from '../../Screems/PublicScreem/RegisterUserScreem'
import Home from '../../Screems/PrivateScreem/StudentScreems/Home'
import UsersScreem from '../../Screems/PrivateScreem/Users/UsersScreem'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../../Atoms/Context/AuthContext'
import TeacherHomeScreem from '../../Screems/PrivateScreem/TeacherScreems/TeacherHomeScreem'
import InicioTest from '../../Screems/PrivateScreem/TeacherScreems/SerieTests/InicioTest'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { token, user } = useContext(AuthContext)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {token.token ? (
                    <>
                        {user.rol === 'admin' ? (
                            <>
                                <Stack.Screen name='Admin' component={TeacherHomeScreem} options={{ headerShown: false }} />
                                <Stack.Screen
                                    name='UsersScreem'
                                    component={UsersScreem}
                                    options={{
                                        headerStyle: { backgroundColor: '#000010' },
                                        headerTintColor: 'white',
                                        title: 'Perfil'
                                    }}
                                // initialParams={{ post: () => logget() }}
                                />
                                <Stack.Screen
                                    name='InicioTest'
                                    component={InicioTest}
                                    options={{
                                        headerStyle: { backgroundColor: '#000010' },
                                        headerTintColor: 'white',
                                        title: 'tests'
                                    }}
                                // initialParams={{ lala:AsyncStorageLib.getItem('test') }}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                                <Stack.Screen
                                    name='UsersScreem'
                                    component={UsersScreem}
                                    options={{
                                        headerStyle: { backgroundColor: '#000010' },
                                        headerTintColor: 'white',
                                        title: 'Perfil'
                                    }}
                                // initialParams={{ post: () => logget() }}
                                />
                            </>
                        )}
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
                        <Stack.Screen
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
                        />
                    </>
                )}




            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation