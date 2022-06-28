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
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: { fontSize:10 },
        tabBarIndicatorStyle: { backgroundColor: 'green' },
    }}>
        <Nob.Screen name='ListTestVocational' component={ListTestVocational} options={{ tabBarLabel: 'Crear Test'}}/>
        <Nob.Screen name='RealizeTestVocational' component={RealizeTestVocational} options={{ tabBarLabel: 'Lista Test Vocacional'}}/>
    </Nob.Navigator>
  )
}

export default HomeAdminTestVocational