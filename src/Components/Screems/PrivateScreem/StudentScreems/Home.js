import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentScreem from './Students/StudentScreem'
import { Foundation, Ionicons, Feather, SimpleLineIcons,Entypo } from '@expo/vector-icons'
import TestHomeScreem from './Test/TestHomeScreem'
import ResultsHomeScreem from './Results/ResultsHomeScreem'
import OtrosHomeScreem from './Otros/OtrosHomeScreem'
import InicioTestEst from './SerieTest/InicioTestEst'
import RealizeTestScreem from '../TeacherScreems/Tests/RealizeTestScreem'
import RealizeTestVocational from '../TeacherScreems/TestsVocational/RealizeTestVocational'


const Tab = createBottomTabNavigator()

const Home = ({ navigation }) => {
    const perfil = (
        <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('PerfilUserScreem')}>
                <Feather name='user' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )

    return (
        <Tab.Navigator
            initialRouteName='RealizeTestScreem'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    // if (route.name === 'StudentScreem') {
                    //     return (<Ionicons name='school-outline' size={24} color='white' />)
                    // } else 
                    if (route.name === 'RealizeTestScreem') {
                        return (<Ionicons name='library-outline' size={size} color={color} />)
                    }else if (route.name === 'RealizeTestVocational') {
                        return (<Entypo name="qq" size={size} color={color} />)
                    } else if (route.name === 'ResultsHomeScreem') {
                        return (<Foundation name='results' size={size} color={color} />)
                    } else if (route.name === 'OtrosHomeScreem') {
                        return (<SimpleLineIcons name='layers' size={size} color={color} />)
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#12151C',
                    borderTopColor: '#12151C',
                    paddingBottom: 5,
                    paddingTop: 5,
                    marginBottom: 20,
                    marginHorizontal: 5,
                    borderRadius: 3,
                    position: 'absolute',
                    elevation: 0,
                    ...styles.prueba

                },

                tabBarActiveTintColor: '#76ff03',
                tabBarInactiveTintColor: 'white'

                // tabBarIcon
                // tabBarShowLabel:false
                // indicatorStyle:{backgroundColor:'red'}

            })}>
            {/* <Tab.Screen name="StudentScreem" component={StudentScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Estudiantes',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} /> */}
            {/* <Tab.Screen name="TestHomeScreem" component={TestHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Test',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} /> */}
            <Tab.Screen name="RealizeTestScreem" component={RealizeTestScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Test',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
                tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
            }} />
            <Tab.Screen name="RealizeTestVocational" component={RealizeTestVocational} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Test Vocacional',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
                tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
            }} />
            <Tab.Screen name="ResultsHomeScreem" component={ResultsHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Resultados',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
                tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
            }} />
            <Tab.Screen name="OtrosHomeScreem" component={OtrosHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Otros',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
                tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    prueba: {
        shadowColor: '#311b92',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})
export default Home


