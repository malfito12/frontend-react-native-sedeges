import { Alert, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import EasyTests from './EasyTests'
import NormalTests from './NormalTests'
import DificultTests from './DificultTests'

const Nob = createMaterialTopTabNavigator()
const TestHomeScreem = ({ navigation }) => {
    return (
        <Nob.Navigator screenOptions={{
            tabBarStyle:{backgroundColor:'#000015'},
            tabBarActiveTintColor:'green',
            tabBarInactiveTintColor:'white',
            tabBarLabelStyle:{fontSize:12},
            tabBarIndicatorStyle:{backgroundColor:'green'},
        }}>
            <Nob.Screen name='EasyTests' component={EasyTests} options={{ tabBarLabel: 'Facil' }}/>
            <Nob.Screen name='NormalTests' component={NormalTests} options={{ tabBarLabel: 'Normal' }}/>
            <Nob.Screen name='DificultTests' component={DificultTests} options={{ tabBarLabel: 'Avanzado' }}/>
        </Nob.Navigator>
    )
}

export default TestHomeScreem