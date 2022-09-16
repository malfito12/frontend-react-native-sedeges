import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const Instructions = ({ navigation, route }) => {
    var newArray = []
    for (var i = 0; i < route.params.contenido.preguntas.length; i++) {
        newArray.push(route.params.contenido.preguntas[i])
    }
    var preguntas = []
    for (var i = 0; i < 5; i++) {
        var rand = Math.floor(Math.random() * newArray.length)// conbierte la posicion del array en numero entero
        var rValue = newArray[rand]//obtiene el dato del array por el numero
        const aa = newArray.splice(rand, 1)
        preguntas.push(rValue)
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
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {route.params.contenido.ejm.resp.map((e, index) => (
                            <View key={index} style={{ margin: 10 }}>
                                <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={e.respuesta} />
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('PreguntaTestGrafico', { data: preguntas, cont: 0, })}>
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </>
            ) : route.params.factor === 'RAZONAMIENTO LOGICO' ? (
                <>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Preguntas', { data: preguntas, cont: 0, description: route.params.description })}>
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </>
            ) : route.params.factor === 'RAZONAMIENTO NUMERICO' ? (
                <View>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    <TouchableOpacity style={styles.buttonStart} >
                        <Text style={styles.textFont}>Vamos!!</Text>
                    </TouchableOpacity>
                </View>
            ) : route.params.factor === 'CONCEPTOS VERVALES' ? (
                <View>
                    <Text style={styles.textFont}>Instructions</Text>
                    <Text style={styles.textFont}>{route.params.title}</Text>
                    <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
                    <TouchableOpacity style={styles.buttonStart} >
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
    }
})

export default Instructions