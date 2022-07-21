import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CreateTestScreem from './CreateTestScreem'
import RealizeTestScreem from './RealizeTestScreem'
import RealizeTestVocational from '../TestsVocational/RealizeTestVocational'

const Nob = createMaterialTopTabNavigator()

const HomeAdminTestScreem = () => {
    return (
        <Nob.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#12151C' },
            tabBarActiveTintColor: '#76ff03',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'Roboto_700Bold' },
            tabBarIndicatorStyle: { backgroundColor: '#76ff03' },
        }}>
            <Nob.Screen name='CreateTestScreem' component={CreateTestScreem} options={{ tabBarLabel: 'Nuevo' }} />
            <Nob.Screen name='RealizeTestScreem' component={RealizeTestScreem} options={{ tabBarLabel: 'Test' }} />
            <Nob.Screen name='RealizeTestVocational' component={RealizeTestVocational} options={{ tabBarLabel: 'Test Orientacion Vocacional' }} />
        </Nob.Navigator>
    )
}

export default HomeAdminTestScreem