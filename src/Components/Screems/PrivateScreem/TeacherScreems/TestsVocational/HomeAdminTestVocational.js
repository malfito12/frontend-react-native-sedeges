import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ListTestVocational from './ListTestVocational'
import RealizeTestVocational from './RealizeTestVocational'


const Nob=createMaterialTopTabNavigator()
const HomeAdminTestVocational = () => {
  return (
    <Nob.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: '#12151C' },
        tabBarActiveTintColor: '#76ff03',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: { fontSize:12, fontFamily:'Roboto_700Bold' },
        tabBarIndicatorStyle: { backgroundColor: '#76ff03' },
    }}>
        <Nob.Screen name='ListTestVocational' component={ListTestVocational} options={{ tabBarLabel: 'Crear Test'}}/>
        <Nob.Screen name='RealizeTestVocational' component={RealizeTestVocational} options={{ tabBarLabel: 'Lista Test Vocacional'}}/>
    </Nob.Navigator>
  )
}

export default HomeAdminTestVocational