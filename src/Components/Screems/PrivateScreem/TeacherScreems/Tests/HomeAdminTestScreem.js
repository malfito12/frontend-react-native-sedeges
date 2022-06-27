import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CreateTestScreem from './CreateTestScreem'
import RealizeTestScreem from './RealizeTestScreem'

const Nob = createMaterialTopTabNavigator()
const HomeAdminTestScreem = () => {
    return (
        <Nob.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#12151C' },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIndicatorStyle: { backgroundColor: 'green' },
        }}>
            <Nob.Screen name='CreateTestScreem' component={CreateTestScreem} options={{ tabBarLabel: 'Nuevo'}} />
            <Nob.Screen name='RealizeTestScreem' component={RealizeTestScreem} options={{ tabBarLabel: 'Test' }} />
        </Nob.Navigator>
    )
}

export default HomeAdminTestScreem