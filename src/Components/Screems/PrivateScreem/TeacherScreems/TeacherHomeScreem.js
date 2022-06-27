import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Atoms/Context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Foundation, Ionicons, Feather, SimpleLineIcons } from '@expo/vector-icons'
import StudentsAdminScreem from './Students/StudentsAdminScreem'
import ResultsAdminScreem from './Results/ResultsAdminScreem'
import HomeAdminTestScreem from './Tests/HomeAdminTestScreem'
import { LinearGradient } from 'expo-linear-gradient'

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
          tabBarIcon: () => {
            if (route.name === 'StudentsAdminScreem') {
              return (<Ionicons name='school-outline' size={24} color='white' />)
            } else if (route.name === 'HomeAdminTestScreem') {
              return (<Ionicons name='library-outline' size={24} color='white' />)
            } else if (route.name === 'ResultsAdminScreem') {
              return (<Foundation name='results' size={24} color='white' />)
            }
          },
          tabBarStyle: {
            backgroundColor: '#12151C',
            borderBottomColor: '#10ac84',
            // borderTopColor: '#10ac84',
            borderTopColor: '#000010',
            padding: 10,
            marginBottom: 20,
            marginHorizontal:5,
            borderRadius:3,
            position: 'absolute',
            elevation:0,
            ...styles.prueba
          },
          tabBarActiveTintColor: 'green',
        })}
      >
        <Tab.Screen name="StudentsAdminScreem" component={StudentsAdminScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          title: 'Estudiantes',
          headerStyle: { backgroundColor: '#000010', },
          headerTintColor: 'white',
          
        }} />

        <Tab.Screen name="HomeAdminTestScreem" component={HomeAdminTestScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          title: 'Test',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
        }} />
        <Tab.Screen name="ResultsAdminScreem" component={ResultsAdminScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          title: 'Resultados',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
        }} />
      </Tab.Navigator>
    </>
  )
}
const styles = StyleSheet.create({
  prueba: {
    shadowColor:'#311b92',
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
})
export default TeacherHomeScreem