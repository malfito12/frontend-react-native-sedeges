import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const Instructions = ({ navigation, route }) => {
    var newArray = []
    for (var i = 0; i < route.params.contenido.preguntas.length; i++) {
        newArray.push(route.params.contenido.preguntas[i])
    }
    var preguntas = []
    if (route.params.factor === 'CONCEPTOS VERBALES') {
        for (var i = 0; i < 10; i++) {
            var rand = Math.floor(Math.random() * newArray.length)// conbierte la posicion del array en numero entero
            var rValue = newArray[rand]//obtiene el dato del array por el numero
            const aa = newArray.splice(rand, 1)
            preguntas.push(rValue)
        }
    } else {
        for (var i = 0; i < 5; i++) {
            var rand = Math.floor(Math.random() * newArray.length)// conbierte la posicion del array en numero entero
            var rValue = newArray[rand]//obtiene el dato del array por el numero
            const aa = newArray.splice(rand, 1)
            preguntas.push(rValue)
        }

    }
    // console.log(preguntas)
    // console.log(route.params.title)


    return (
        <Layaut>
            {route.params.factor === 'RELACIONES ESPACIALES' ? (
                <>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    {route.params.id == 1 ? (
                        <View style={{ margin: 10 }}>
                            <Image style={{ borderRadius: 75, width: 150, height: 150, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp.respuesta} />
                        </View>
                    ) : route.params.id == 2 ? (
                        <>
                            <View style={{ margin: 10 }}>
                                <Image style={{ borderRadius: 5, width: 100, height: 100, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[0].respuesta} />
                            </View>
                            <Text style={{ ...styles.textFont, alignSelf: 'center' }}>Opciones</Text>
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[1].respuesta} />
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[2].respuesta} />
                            </View>
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[3].respuesta} />
                                <Image style={{ borderRadius: 5, borderColor: 'red', borderWidth: 2, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[4].respuesta} />
                            </View>
                        </>
                        // <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        //     {route.params.contenido.ejm.resp.map((e, index) => (
                        //         <View key={index} style={{ margin: 4 }}>
                        //             <Image style={{  width:60, height: 40, marginBottom: 10, alignSelf: 'center' }} source={e.respuesta} />
                        //         </View>
                        //     ))}
                        // </View>
                    ) : (null)}
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('PreguntaTestGrafico', { data: preguntas, cont: 0, id: route.params.id, student_id: route.params.student_id, factor: route.params.factor, title: route.params.title })}>
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </>
            ) : route.params.factor === 'RAZONAMIENTO LOGICO' ? (
                <>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    {route.params.id === 3 ? (
                        <>
                            <View style={{ margin: 10 }}>
                                <Image style={{ borderRadius: 5, width: 200, height: 120, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[0].respuesta} />
                            </View>
                            <Text style={{ ...styles.textFont, alignSelf: 'center' }}>Opciones</Text>
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[1].respuesta} />
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[2].respuesta} />
                            </View>
                            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Image style={{ borderRadius: 5, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[3].respuesta} />
                                <Image style={{ borderRadius: 5, borderColor: 'red', borderWidth: 2, width: 110, height: 80, marginBottom: 10, alignSelf: 'center' }} source={route.params.contenido.ejm.resp[4].respuesta} />
                            </View>
                        </>
                    ) : route.params.id === 4 ? (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>Ejemplo</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>{route.params.contenido.ejm.preguntas.a}</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>{route.params.contenido.ejm.preguntas.b}</Text>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[0].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[1].respuesta}</Text>
                            </View>
                            <View style={{ ...styles.buttonRespuesta, borderWidth: 2, borderColor: 'red' }}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[2].respuesta}</Text>
                            </View>
                        </View>
                    ) : (null)}
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Preguntas', { data: preguntas, cont: 0, id: route.params.id, student_id: route.params.student_id, factor: route.params.factor, title: route.params.title })}>
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </>
            ) : route.params.factor === 'RAZONAMIENTO NUMERICO' ? (
                <View>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    {route.params.id === 5 ? (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 20 }}>Ejemplo</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5, alignSelf: 'center', fontSize: 25 }}>{route.params.contenido.ejm.preguntas}</Text>
                            <Text style={{ margin: 15, padding: 15, backgroundColor: 'white', alignSelf: 'center', borderRadius: 3 }}>{route.params.contenido.ejm.resp}</Text>
                        </View>
                    ) : route.params.id == 6 ? (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>Ejemplo</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5, alignSelf: 'center', fontSize: 20 }}>{route.params.contenido.ejm.preguntas.a}</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>{route.params.contenido.ejm.preguntas.b}</Text>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[0].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[1].respuesta}</Text>
                            </View>
                            <View style={{ ...styles.buttonRespuesta, borderWidth: 2, borderColor: 'red' }}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[2].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[3].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[4].respuesta}</Text>
                            </View>
                        </View>
                    ) : route.params.id == 7 ? (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>Ejemplo</Text>
                            <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5, alignSelf: 'center', fontSize: 16 }}>{route.params.contenido.ejm.preguntas}</Text>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[0].respuesta}</Text>
                            </View>
                            <View style={{ ...styles.buttonRespuesta, borderWidth: 2, borderColor: 'red' }}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[1].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[2].respuesta}</Text>
                            </View>
                            <View style={styles.buttonRespuesta}>
                                <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[3].respuesta}</Text>
                            </View>
                        </View>
                    ) : (null)}
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('RazonamientoNumerico', { data: preguntas, cont: 0, id: route.params.id, student_id: route.params.student_id, factor: route.params.factor, title: route.params.title })} >
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </View>
            ) : route.params.factor === 'CONCEPTOS VERBALES' ? (
                <View>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5 }}>Ejemplo</Text>
                        <Text style={{ fontFamily: 'Roboto_500Medium', color: 'white', marginBottom: 5, alignSelf: 'center', fontSize: 16 }}>{route.params.contenido.ejm.preguntas}</Text>
                        <View style={styles.buttonRespuesta}>
                            <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[0].respuesta}</Text>
                        </View>
                        <View style={styles.buttonRespuesta }>
                            <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[1].respuesta}</Text>
                        </View>
                        <View style={{...styles.buttonRespuesta,borderWidth: 2, borderColor: 'red'}}>
                            <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[2].respuesta}</Text>
                        </View>
                        <View style={styles.buttonRespuesta}>
                            <Text style={{ fontFamily: 'Roboto_500Medium' }}>{route.params.contenido.ejm.resp[3].respuesta}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('ConceptosVerbales', { data: preguntas, cont: 0, id: route.params.id, student_id: route.params.student_id, factor: route.params.factor, title: route.params.title })}>
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </View>
            ) : (null)}
            {/* <TouchableOpacity onPress={() => navigation.push('PruebaTest', { data: info })} style={{ backgroundColor: 'red', alignSelf: 'center', padding: 5 }}>
        <Text>prueba</Text>
      </TouchableOpacity> */}
        </Layaut>
    )
}
const styles = StyleSheet.create({
    buttonStart: {
        padding: 10,
        margin: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFont: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        fontSize: 14
    },
    buttonRespuesta: {
        padding: 13,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20
    },
})

export default Instructions