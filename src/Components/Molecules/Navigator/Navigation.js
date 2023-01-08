import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useContext, useState, useEffect } from 'react'
import LoginScreem from '../../Screems/PublicScreem/LoginScreem'
import Home from '../../Screems/PrivateScreem/StudentScreems/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../../Atoms/Context/AuthContext'
import TeacherHomeScreem from '../../Screems/PrivateScreem/TeacherScreems/TeacherHomeScreem'
// import InicioTestEst from '../../Screems/PrivateScreem/StudentScreems/SerieTest/InicioTestEst'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import CategoryTest from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/CategoryTest'
import InstructionTestAptitudes from '../../Screems/PrivateScreem/StudentScreems/Test/TestAptitudes/InstructionTestAptitudes'
import InstructionTestIntereses from '../../Screems/PrivateScreem/StudentScreems/Test/TestIntereses/InstructionTestIntereses'
import PreguntasTestAptitudes from '../../Screems/PrivateScreem/StudentScreems/Test/TestAptitudes/PreguntasTestAptitudes'
import RegisterStudent from '../../Screems/PrivateScreem/TeacherScreems/Students/RegisterStudent'
import ResultsAdminScreem from '../../Screems/PrivateScreem/TeacherScreems/Results/ResultsAdminScreem'
import ResultsAptitudStudent from '../../Screems/PrivateScreem/TeacherScreems/Results/ResultsTest/ResultsAptitudStudent'
import RecoverPassword from '../../Screems/PublicScreem/RecoverPassword'
import RegisterEvent from '../../Screems/PrivateScreem/TeacherScreems/Eventos/RegisterEvent'
import SearchStudent from '../../Screems/PrivateScreem/StudentScreems/Inicio/SearchStudent'
import PreguntasTestIntereses from '../../Screems/PrivateScreem/StudentScreems/Test/TestIntereses/PreguntasTestIntereses'
import RegisterReception from '../../Screems/PrivateScreem/TeacherScreems/Receptions/RegisterReception'
import ListViewStudentsReception from '../../Screems/PrivateScreem/TeacherScreems/Students/ListViewStudentsReception'
import ResultsInteresStudent from '../../Screems/PrivateScreem/TeacherScreems/Results/ResultsTest/ResultsInteresStudent'
import ListViewStudentsResult from '../../Screems/PrivateScreem/TeacherScreems/Results/ListStudent/ListViewStudentsResult'
import ResultsMadurezStudent from '../../Screems/PrivateScreem/TeacherScreems/Results/ResultsTest/ResultsMadurezStudent'
import RegisterMaterial from '../../Screems/PrivateScreem/TeacherScreems/Materiales/RegisterMaterial'
import ListViewTestStudent from '../../Screems/PrivateScreem/StudentScreems/Inicio/ListViewTestStudent'
import TypeTest from '../../Screems/PrivateScreem/StudentScreems/Inicio/TypeTest'
import InicioTestMadurez from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/InicioTestMadurez'
import InstructionTestMadurez from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/InstructionTestMadurez'
import PreguntasRelacionesEspaciales from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/RelacionesEspaciales/PreguntasRelacionesEspaciales'
import PreguntasRazonamientoLogico from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/RazonamientoLogico/PreguntasRazonamientoLogico'
import PreguntasRazonamientoNumerico from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/RazonamientoNumerico/PreguntasRazonamientoNumerico'
import PreguntasConceptosVerbales from '../../Screems/PrivateScreem/StudentScreems/Test/TestMadurez/ConceptosVerbales/PreguntasConceptosVerbales'
import RegisterUserScreem from '../../Screems/PrivateScreem/AdminScreems/Users/RegisterUserScreem'
import AdminHomeScreem from '../../Screems/PrivateScreem/AdminScreems/AdminHomeScreem'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const { logout } = useContext(AuthContext)
    const [login, setLogin] = useState([])
    const [rol, setRol] = useState([])
    AsyncStorageLib.getItem('token').then(resp => setLogin(JSON.parse(resp)))
    AsyncStorageLib.getItem('rol').then(resp => setRol(JSON.parse(resp)))
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    animation: 'fade_from_bottom'
                }}
            >
                {login && rol === 'ADMINISTRADOR' ? (
                    <>
                        <Stack.Screen name='AdminHomeScreem' component={AdminHomeScreem} options={{ headerShown: false }} />
                        {/* -------------------------------USUARIOS---------------------------- */}
                        <Stack.Screen
                            name='RegisterUserScreem'
                            component={RegisterUserScreem}
                            options={{
                                title: '',
                                headerTitleAlign: 'center',
                                headerTitleStyle: { fontSize: 16 },
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                // headerLeft: () => <></>
                            }}
                        />
                        {/* -------------------------------RECEPCIONES---------------------------- */}
                        <Stack.Screen
                            name='RegisterReception'
                            component={RegisterReception}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Recepciones',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        {/* -------------------------------ESTUDIANTES---------------------------- */}
                        <Stack.Screen
                            name='ListViewStudentsReception'
                            component={ListViewStudentsReception}
                            options={({ navigation }) => ({
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Estudiantes',
                                headerTitleStyle: { fontSize: 16 },
                                headerRight: () => (
                                    <View style={{ marginRight: 20 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('RegisterStudent')}>
                                            <MaterialIcons name="add" size={26} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name='RegisterStudent'
                            component={RegisterStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Estudiantes',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        {/* -------------------------------EVENTOS---------------------------- */}
                        <Stack.Screen
                            name='RegisterEvent'
                            component={RegisterEvent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Eventos',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />

                        {/* -------------------------------MATERIAL DE APOYO---------------------------- */}
                        <Stack.Screen
                            name='RegisterMaterial'
                            component={RegisterMaterial}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro Material',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />

                        {/* ---------------------------------RESULTADOS------------------------------- */}
                        <Stack.Screen
                            name='ListViewStudentsResult'
                            component={ListViewStudentsResult}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Estudiantes',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='ResultsAptitudStudent'
                            component={ResultsAptitudStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsInteresStudent'
                            component={ResultsInteresStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsMadurezStudent'
                            component={ResultsMadurezStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsAdminScreem'
                            component={ResultsAdminScreem}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: ''
                            }}
                        />

                    </>
                ) : login && rol === 'SUPERVISOR' ? (
                    <>
                        <Stack.Screen name='TeacherHomeScreem' component={TeacherHomeScreem} options={{ headerShown: false }} />
                        {/* -------------------------------RECEPCIONES---------------------------- */}
                        <Stack.Screen
                            name='RegisterReception'
                            component={RegisterReception}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Recepciones',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        {/* -------------------------------ESTUDIANTES---------------------------- */}
                        <Stack.Screen
                            name='ListViewStudentsReception'
                            component={ListViewStudentsReception}
                            options={({ navigation }) => ({
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Estudiantes',
                                headerTitleStyle: { fontSize: 16 },
                                headerRight: () => (
                                    <View style={{ marginRight: 20 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('RegisterStudent')}>
                                            <MaterialIcons name="add" size={26} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name='RegisterStudent'
                            component={RegisterStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Estudiantes',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        {/* -------------------------------EVENTOS---------------------------- */}
                        <Stack.Screen
                            name='RegisterEvent'
                            component={RegisterEvent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro de Eventos',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />

                        {/* -------------------------------MATERIAL DE APOYO---------------------------- */}
                        <Stack.Screen
                            name='RegisterMaterial'
                            component={RegisterMaterial}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Registro Material',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />

                        {/* ---------------------------------RESULTADOS------------------------------- */}
                        <Stack.Screen
                            name='ListViewStudentsResult'
                            component={ListViewStudentsResult}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Estudiantes',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='ResultsAptitudStudent'
                            component={ResultsAptitudStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsInteresStudent'
                            component={ResultsInteresStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsMadurezStudent'
                            component={ResultsMadurezStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Resultados'
                            }}
                        />
                        <Stack.Screen
                            name='ResultsAdminScreem'
                            component={ResultsAdminScreem}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: ''
                            }}
                        />
                    </>
                ) : login && rol === 'USUARIO' ? (
                    <>
                        {/* <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} /> */}
                        {/* ------------------------------INCIO---------------------------------- */}
                        <Stack.Screen
                            name='ListViewTestStudent'
                            component={ListViewTestStudent}
                            options={({ navigation }) => ({
                                headerStyle: { backgroundColor: '#000010' },
                                // headerTintColor: 'white',
                                title: '',
                                headerLeft: () => (
                                    <View style={{ marginHorizontal: 20 }}>
                                        <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons name="logout" size={24} color="red" />
                                            <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
                                        </TouchableOpacity>
                                    </View>
                                ),
                            })}
                        />
                        <Stack.Screen
                            name='SearchStudent'
                            component={SearchStudent}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Busqueda de Estudiante',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='TypeTest'
                            component={TypeTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Tipo de Cuestionario'
                            }}
                        />
                        {/* ----------------------------------TEST MADUREZ METAL------------------------------------ */}
                        <Stack.Screen
                            name='CategoryTest'
                            component={CategoryTest}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Categorias'
                            }} />
                        <Stack.Screen
                            name='InicioTestMadurez'
                            component={InicioTestMadurez}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Lista de Tests'
                            }}
                        />
                        <Stack.Screen
                            name='InstructionTestMadurez'
                            component={InstructionTestMadurez}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Instrucciones'
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasRelacionesEspaciales'
                            component={PreguntasRelacionesEspaciales}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Test Grafico'
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasRazonamientoLogico'
                            component={PreguntasRazonamientoLogico}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Razonamiento Logico',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasRazonamientoNumerico'
                            component={PreguntasRazonamientoNumerico}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Razonamiento Numerico',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasConceptosVerbales'
                            component={PreguntasConceptosVerbales}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Conceptos Verbales',
                            }}
                        />
                        {/* ----------------------------------TEST APTITUDES------------------------------------ */}
                        <Stack.Screen
                            name='InstructionTestAptitudes'
                            component={InstructionTestAptitudes}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Instrucciones'
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasTestAptitudes'
                            component={PreguntasTestAptitudes}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Preguntas',
                                // headerLeft: () => <></>,
                            }}
                        />
                        {/* ----------------------------------TEST INTERESES------------------------------------ */}

                        <Stack.Screen
                            name='InstructionTestIntereses'
                            component={InstructionTestIntereses}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Preguntas',
                            }}
                        />
                        <Stack.Screen
                            name='PreguntasTestIntereses'
                            component={PreguntasTestIntereses}
                            options={{
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                title: 'Razonamiento Numerico',
                            }}
                        />

                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name='LoginScreem'
                            component={LoginScreem}
                            options={{
                                title: 'Bienvenidos a SEDEGES',
                                headerTitleAlign: 'center',
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                        <Stack.Screen
                            name='RecoverPassword'
                            component={RecoverPassword}
                            options={{
                                title: 'Recuperar Contraseña',
                                headerTitleAlign: 'center',
                                headerStyle: { backgroundColor: '#000010' },
                                headerTintColor: 'white',
                                headerTitleStyle: { fontSize: 16 }
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Navigation