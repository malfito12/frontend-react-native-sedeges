import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Atoms/Context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons, Feather,} from '@expo/vector-icons'
import ListViewEvents from './Eventos/ListViewEvents'
import ListViewReceptions from './Receptions/ListViewReceptions'
import ListViewMaterial from './Materiales/ListViewMaterial'
import ListViewUsers from '../AdminScreems/Users/ListViewUsers'


const Tab = createBottomTabNavigator()

const TeacherHomeScreem = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  // const perfil = (
  //   <View style={{ marginHorizontal: 20 }}>
  //     <TouchableOpacity onPress={() => navigation.navigate('PerfilUserScreem')}>
  //       <FontAwesome5 name='chalkboard-teacher' size={25} color='white' />
  //     </TouchableOpacity>
  //   </View>
  // )

  return (
    <>

      <Tab.Navigator
        initialRouteName='ListViewReceptions'
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
        {/* --------------------------USUARIOS----------------------------- */}
        {/* <Tab.Screen name="ListViewUsers" component={ListViewUsers} options={{
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
              <TouchableOpacity onPress={() => navigation.navigate('RegisterUserScreem')}>
                <Ionicons name="person-add-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} /> */}
        {/* -----------------------------RECEPCIONES----------------------------------------- */}
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
              <TouchableOpacity onPress={() => navigation.navigate('RegisterReception')}>
                <MaterialIcons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} />

        {/* -----------------------------EVENTOS----------------------------------------- */}
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
        {/* -----------------------------MATERIALES DE APOYO---------------------------------------- */}
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