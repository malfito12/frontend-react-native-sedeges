import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Atoms/Context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Foundation, Ionicons, Feather, SimpleLineIcons, Entypo } from '@expo/vector-icons'
import StudentsAdminScreem from './Students/StudentsAdminScreem'
import ResultsAdminScreem from './Results/ResultsAdminScreem'
import HomeAdminTestScreem from './Tests/HomeAdminTestScreem'
import HomeAdminTestVocational from './TestsVocational/HomeAdminTestVocational'


const Tab = createBottomTabNavigator()

const TeacherHomeScreem = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  const perfil = (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('UsersScreem')}>
        <FontAwesome5 name='chalkboard-teacher' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )

  return (
    <>
      <Tab.Navigator
        initialRouteName='StudentsAdminScreem'
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#12151C',
            // borderBottomColor: '#10ac84',
            // borderTopColor: '#10ac84',
            borderTopColor: '#000010',
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
          tabBarInactiveTintColor:'white'

        })}
      >
        <Tab.Screen name="StudentsAdminScreem" component={StudentsAdminScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Estudiantes',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Ionicons name='school-outline' size={size} color={color} />),
        }} />

        <Tab.Screen name="HomeAdminTestScreem" component={HomeAdminTestScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Test',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle:{fontFamily:'Roboto_700Bold'},
          tabBarIcon: ({ size, color }) => (<Ionicons name='library-outline' size={size} color={color} />),
        }} />
        <Tab.Screen name="HomeAdminTestVocational" component={HomeAdminTestVocational} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Test Vocacional',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle:{fontFamily:'Roboto_700Bold'},
          tabBarIcon: ({ size, color }) => (<Entypo name="qq" size={size} color={color} />)
        }} />
        <Tab.Screen name="ResultsAdminScreem" component={ResultsAdminScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Resultados',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle:{fontFamily:'Roboto_700Bold'},
          tabBarIcon: ({ size, color }) => (<Foundation name='results' size={size} color={color} />)
        }} />
      </Tab.Navigator>
    </>
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
export default TeacherHomeScreem