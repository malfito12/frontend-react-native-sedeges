import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { data } from '../../../../../TestData/TestData'

var lala1=0
const InicioTest = ({ navigation, route }) => {
    const [test, setTest] = useState([])
    useEffect(() => {
        getTest()
        lala1=require('../../../../../TestData/TestData').data
    }, [])
    const getTest = async () => {
        await AsyncStorageLib.getItem('test').then(resp => {
            setTest(JSON.parse(resp))
        })
    }
    //-----------------------------------
    const lala=[
        {
            title: 'test 4',
            id: 4,
            categoria:'test-analitico',
            contenido: {
                instructions: 'Lee antentamente cada grupo de oraciones escritas con letras mayusculas, asi como las tres posibles respuestas; luego escoja la mas adecuada.',
                ejm: {
                    preguntas: {
                        a: 'TODOS LOS SERES QUE TIENE CUATRO PATARS SON ANIMALES',
                        b: 'TODOS LOS CABALLEROS TIENE CUATRO PATAS',
                    },
                    resp: {
                        a: 'Otros seres como los caballeros pueden caminar',
                        b: 'Todos los caballeros peden caminar',
                        c: 'Todos los caballeros son animales'
                    }
                },
                preguntas: [
                    {
                        pregunta: {
                            pre_id: 0,
                            preguntas: {
                                a: 'EL SEÑOR "X" ES UN AVIADOR',
                                b: 'EL SEÑOR "X" ES UN JEFE DE SCOUTS',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'Los aviadores son buenos jefes de scouts',
                                b: 'Un aviador puede ser jefe de scouts',
                                c: 'Los jefes de scouts son buenos aviadores'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 1,
                            preguntas: {
                                a: 'TRES MUCHACHOS ESTAN ESCALANDO UN CERRO, LUIS SE ENCUENTRA MAS ARRIBA QUE ENRIQUE, FRANCISCO SE ENCUENTRA MAS ARRIBA QUE LUIS.',
                                b: null,
                                c: '¿Cual de los muchados se encuentra en el segundo lugar?',
                            },
                            resp: {
                                a: 'Luis',
                                b: 'Enrique',
                                c: 'Fancisco',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 2,
                            preguntas: {
                                a: 'NINGUN SER HOMANO ESTA LIBRE DE ACCIONES',
                                b: 'LOS CHOFERES SON SERES HUMANOS',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'La vida de nungun ser humano esta asegurada',
                                b: 'Los choferes de vehiculos no estas libres de cometer accdentes',
                                c: 'Pocos choferes coducen con seguridad sus vehiculos',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 3,
                            preguntas: {
                                a: 'SI EL PERMANECE CON SUS AMIGOS SUFRIRÁ UN PERJUICIO, Y SI EL DIJA A SUS AMIGOS TAMBIEN SUFRIRÁ UN PERJUICIO, PERO EL DEBE PERMANECER CON SUS AMIGOS O DEJARLOS',
                                b: null,
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'El debe permanecer con usus amigos',
                                b: 'El debe hacerse el fuerte para dejar a sus amigos',
                                c: 'El sufrirá un perjuicio',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 4,
                            preguntas: {
                                a: 'TODOS LOS CUADRADOS TIENEN CUATRO LADOS IGUALES.',
                                b: 'ESTA FIGURA NO TIENE CUATRO LADOS IGUALES',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'Es un circulo',
                                b: 'No es un cuadrado',
                                c: 'Es un triangulo',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 5,
                            preguntas: {
                                a: 'UNA PERSONA PUEDE SER EXTRANJERA, O NATURAL DEL PAIS',
                                b: 'ESTA PERSONAL NO ES EXTRANJERA',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'Es nacionalizada',
                                b: 'Es natural de pais',
                                c: 'Es un turista',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 6,
                            preguntas: {
                                a: 'LA CALLE "S" ES PARALELA A LA CALLE "D"',
                                b: 'LA CALLE "D" ES PARALELA A LA CALLE "C"',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'La calle "S" esta al este de "D"',
                                b: 'La calle "C" cruza a "S"',
                                c: 'La calle "S" es paralera "C"'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 7,
                            preguntas: {
                                a: 'SUS HERMANOS PUEDE SER MAS INTELIGENTES QUE UD., TAN INTELIGENTE COMO UD. O MENOS INTELIGENTE QUE UD., PERO ESTE HERMANO NO ES MAS INTELIGENTE QUE UD., NU TAMPOCO ES MENOS INTELIGENTE QUE UD.',
                                b: null,
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'Su hermnao es menos inteligente que Ud.',
                                b: 'Su hermano es tan inteligente como Ud.',
                                c: 'Su hermando es mas inteligente que Ud.',
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 8,
                            preguntas: {
                                a: 'EDUARDO ES MEJOR JUGADOR DE FUTBOL QUE JAIME, JAIME ES TAN JUGADOR COMO GUILLERMO',
                                b: null,
                                c: '¿Quien es el mejor jugador de futbol?',
                            },
                            resp: {
                                a: 'Eduardo',
                                b: 'Guillermo',
                                c: 'Jaime'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 9,
                            preguntas: {
                                a: '"A" PESA MENOS QUE "B"',
                                b: '"B" PESA MENOS QUE "C"',
                                c: 'Luego:',
                            },
                            resp: {
                                a: '"B" pesa menos que "C"',
                                b: '"A" pesa igual que "B"',
                                c: '"A" pesa menos que "C"'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 10,
                            preguntas: {
                                a: 'UNA CAJA PUEDE CONTENER ORO, PLATA O DIAMANTE',
                                b: 'ESTA CAJA NO CONTIENE PLATA',
                                c: 'Luego esta caja',
                            },
                            resp: {
                                a: 'Contiene diamantes',
                                b: 'Contiene oro o diamantes',
                                c: 'No se sabe que contiene'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 11,
                            preguntas: {
                                a: 'SI ÉL FORMA PARTE DEL EQUIPO DEBE EVITAR REÑIR CON EL CAPITAN Y CON EL ENTRENADOR PERO AUNQUE NO LO QUIERA, NO PODRÁ EVITAR LAS RIÑAS CON EL CAPITAN Y CON EL ENTRENADOR',
                                b: null,
                                c: 'Por consiguiente:',
                            },
                            resp: {
                                a: 'El no debe formar parte de equipo',
                                b: 'El puede perder el apoyo de sus compañeros',
                                c: 'El puede presentar razonablmente una queja'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 12,
                            preguntas: {
                                a: 'CUANDO UNA QUEJA ES INJUSTA RESULTA DESATINADO RECHAZAR SU DISCUSION POR LA JUNTA DE PROFESORES, SI LA QUEJA ES IN JUSTA SU RECHAZO ES IMPERSONABLE, PERO UNA QUEJA PUEDE SER JUSTA O INJUSTA',
                                b: null,
                                c: 'Entonces:',
                            },
                            resp: {
                                a: 'El rechazo de la queja es justificable',
                                b: 'El rechazo se discute sin reserva',
                                c: 'El reacho de la queja es desatinado, o es imperdonable'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 13,
                            preguntas: {
                                a: 'LA CASA "A" ESTA SITUADA AL NOR-ESTE DE LA CASA "B"',
                                b: 'LA CASA "B" ESTA SITUADA AL NOR-ESTE DE LA CASA "C"',
                                c: 'Luego:',
                            },
                            resp: {
                                a: 'La casa "A" queda cerca de la casa de "C"',
                                b: 'La casa "C" está más cercana a la casa "A" que a la casa "B"',
                                c: 'La casa "A" queda al nor-este de la casa "C"'
                            }
                        }
                    },
                    {
                        pregunta: {
                            pre_id: 14,
                            preguntas: {
                                a: '"W" ESTÁ ENTRE "X" y "Y"',
                                b: '"X" ESTÁ ENTRE "Y" y "Z"',
                                c: 'Luego:',
                            },
                            resp: {
                                a: '"W" no está entre "Y" y "Z"',
                                b: '"W" está entre "X" y "Z"',
                                c: '"W" está más cerca de "X" que "Z"'
                            }
                        }
                    },
                ]
            }
        },
    ]
    
    // const lala2=lala1
    // const lala2=lala
    const lala2=data
    
    // console.log(lala2)

    const newArray=[]
    for (var i = 0; i < lala2.length; i++) {
        if (route.params.id_cartegory === lala2[i].categoria) {
            newArray.push(lala2[i])
        }
        // console.log('llena')
    }
    //----------------------------------------------
    const go=(e)=>{
        // console.log(newArray)
        for(var i =0;i<newArray.length;i++){
            if(e===newArray[i].id){
                navigation.navigate('Instructions', { title: newArray[i].title, id: newArray[i].id, contenido: newArray[i].contenido })
                break
            }
        }
    }
    // for(var j=0;j<newArray.length;j++){

    // }
    // console.log(newArray)
    // console.log(newData)

    return (
        <Layaut>
            {/* <Text style={{ color: 'white' }}>Lee Atentamente cada grupo de oraciones escritas con letras mayusculas, asi como las 
            tres posibles respuestas, luego escoja la mas adecuada y consigne la letra de su respues</Text> */}
            <Text style={{ color: 'white', alignSelf: 'center' }}>{test.test_name}</Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}>{test.test_description}</Text>
            <Text style={{ color: 'white', alignSelf: 'center' }}>{route.params.categoria}</Text>
            <FlatList
                data={newArray}
                // data={tests}
                style={{ width: '100%' }}
                keyExtractor={item => item.id}
                renderItem={p => (
                    <View style={styles.testView}>
                        <View>
                            <Text style={{fontFamily:'Roboto_500Medium'}}>{p.item.title}</Text>
                            {/* <Text>{p.item.test_description}</Text> */}
                        </View>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Instructions', { title: p.item.title, id: p.item.id, contenido: p.item.contenido })} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 25 }}> */}
                        <TouchableOpacity onPress={() => go(p.item.id)} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 25 }}>
                            <Text style={{ color: 'white' }}>go</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </Layaut>
    )
}
const styles = StyleSheet.create({
    testView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 7,
        borderRadius: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default InicioTest