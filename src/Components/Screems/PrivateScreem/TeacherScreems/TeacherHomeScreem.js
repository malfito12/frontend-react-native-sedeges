import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Atoms/Context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, Foundation, Ionicons, MaterialIcons, Feather, SimpleLineIcons, Entypo } from '@expo/vector-icons'
import StudentsAdminScreem from './Students/StudentsAdminScreem'
import ResultsAdminScreem from './Results/ResultsAdminScreem'
import HomeAdminTestScreem from './Tests/HomeAdminTestScreem'
import HomeAdminTestVocational from './TestsVocational/HomeAdminTestVocational'
import UsersScreem from '../Users/UsersScreem'
import ListViewEvents from './Eventos/ListViewEvents'
import RealizeTestVocational from './TestsVocational/RealizeTestVocational'
import ListViewReceptions from './Receptions/ListViewReceptions'
import ListViewMaterial from './Materiales/ListViewMaterial'


const Tab = createBottomTabNavigator()

const TeacherHomeScreem = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  const perfil = (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('PerfilUserScreem')}>
        <FontAwesome5 name='chalkboard-teacher' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )

  return (
    <>
      <Tab.Navigator
        initialRouteName='UsersScreem'
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
          tabBarInactiveTintColor: 'white',

        })}
      >

        <Tab.Screen name="UsersScreem" component={UsersScreem} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Usuarios',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Feather name="users" size={size} color={color} />),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity onPress={() => navigation.push('RegisterUserScreem')}>
                <Ionicons name="person-add-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />
        <Tab.Screen name="ListViewReceptions" component={ListViewReceptions} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Recepciones',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<FontAwesome5 name="school" size={size} color={color} />),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity onPress={() => navigation.push('RegisterReception')}>
                <MaterialIcons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />

        <Tab.Screen name="StudentsAdminScreem" component={StudentsAdminScreem} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Estudiantes',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Ionicons name='school-outline' size={size} color={color} />),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterStudent')}>
                <MaterialIcons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />
        
        {/* <Tab.Screen name="HomeAdminTestScreem" component={HomeAdminTestScreem} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Test',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Ionicons name='library-outline' size={size} color={color} />),
        }} /> */}
        <Tab.Screen name="ListViewEvents" component={ListViewEvents} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Eventos',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<MaterialIcons name="event" size={size} color={color} />),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterEvent')}>
                <MaterialIcons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />
        <Tab.Screen name="ListViewMaterial" component={ListViewMaterial} options={{
          // headerLeft: () => (perfil),
          headerLeft: () => (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          tabBarLabel: 'Material A.',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Ionicons name='library-outline' size={size} color={color} />),
          headerRight: () => (
            <View style={{ marginRight: 30 }}>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterMaterial')}>
                <MaterialIcons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />



        {/* <Tab.Screen name="RealizeTestVocational" component={RealizeTestVocational} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          title: 'R.Test',
          headerStyle: { backgroundColor: '#000010' },
          headerTintColor: 'white',
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
        }} /> */}


        {/* <Tab.Screen name="HomeAdminTestVocational" component={HomeAdminTestVocational} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Test Vocacional',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Entypo name="qq" size={size} color={color} />)
        }} /> */}
        {/* <Tab.Screen name="ResultsAdminScreem" component={ResultsAdminScreem} options={{
          headerLeft: () => (perfil),
          headerTitle: '',
          tabBarLabel: 'Resultados',
          headerStyle: { backgroundColor: '#000010' },
          tabBarLabelStyle: { fontFamily: 'Roboto_700Bold' },
          tabBarIcon: ({ size, color }) => (<Foundation name='results' size={size} color={color} />)
        }} /> */}
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