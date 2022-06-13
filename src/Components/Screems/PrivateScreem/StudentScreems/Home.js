import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentScreem from './Students/StudentScreem'
import { Foundation, Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons'
import TestHomeScreem from './Test/TestHomeScreem'
import ResultsHomeScreem from './Results/ResultsHomeScreem'
import OtrosHomeScreem from './Otros/OtrosHomeScreem'


const Tab = createBottomTabNavigator()

const Home = ({ navigation }) => {
    const perfil = (
        <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('UsersScreem')}>
                <Feather name='user' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )

    return (
        <Tab.Navigator
            initialRouteName='StudentScreem'
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    if (route.name === 'StudentScreem') {
                        return (<Ionicons name='school-outline' size={24} color='white' />)
                    } else if (route.name === 'TestHomeScreem') {
                        return (<Ionicons name='library-outline' size={24} color='white' />)
                    } else if (route.name === 'ResultsHomeScreem') {
                        return (<Foundation name='results' size={24} color='white' />)
                    } else if (route.name === 'OtrosHomeScreem') {
                        return (<SimpleLineIcons name='layers' size={24} color='white' />)
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#12151C',
                    borderBottomColor: '#10ac84',
                    borderTopColor: '#10ac84',
                    // height:'8%',
                    // // paddingBottom:10,
                    // // paddingTop:10,
                    padding: 10,
                    marginBottom: 20,
                    // position:'relative'
                    position: 'absolute',

                },

                tabBarActiveTintColor: 'green',
                // tabBarInactiveTintColor:'white'

                // tabBarIcon
                // tabBarShowLabel:false
                // indicatorStyle:{backgroundColor:'red'}

            })}>
            <Tab.Screen name="StudentScreem" component={StudentScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Estudiantes',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} />
            <Tab.Screen name="TestHomeScreem" component={TestHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Test',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} />
            <Tab.Screen name="ResultsHomeScreem" component={ResultsHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Resultados',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} />
            <Tab.Screen name="OtrosHomeScreem" component={OtrosHomeScreem} options={{
                headerLeft: () => (perfil),
                headerTitle: '',
                title: 'Otros',
                headerStyle: { backgroundColor: '#000010' },
                headerTintColor: 'white',
            }} />
        </Tab.Navigator>
    )
}

export default Home


