import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
// import { data } from '../../../../../TestData/TestData'

const Instructions = ({ navigation, route }) => {
  const data = [
    {
        title: 'test 1',
        id: 1,
        categoria: 'test-grafico',
        contenido: {
            instructions: 'A continuacion hay varias figuras; unas corresponden a la derecha y otros a la izquierda: Lo que usted tiene que hacer es decidir en cada caso si es derecha(D) o izquierda(I).',
            ejm: {
                preguntas: {
                    a: null,
                    b: null
                },
                resp: [
                    { respuesta: require('../../../../../images/sedeges-logo.png') },
                    { respuesta: require('../../../../../images/pantalla.png') },
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 0,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 2',
        id: 2,
        categoria: 'test-grafico',
        contenido: {
            instructions: 'En cada una de series de figura que siguen, usted deberá encontrar la que sea igual a la primera aunque esté en otra posicion.',
            ejm: {
                preguntas: {
                    a: null,
                    b: null
                },
                resp: [
                    { respuesta: require('../../../../../images/sedeges-logo.png') },
                    { respuesta: require('../../../../../images/pantalla.png') },
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 0,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 3',
        id: 3,
        categoria: 'test-grafico',
        contenido: {
            instructions: 'A continuacion hay varias figuras; unas corresponden a la derecha y otros a la izquierda: Lo que usted tiene que hacer es decidir en cada caso si es derecha(D) o izquierda(I).',
            ejm: {
                preguntas: {
                    a: null,
                    b: null
                },
                resp: [
                    { respuesta: require('../../../../../images/sedeges-logo.png') },
                    { respuesta: require('../../../../../images/pantalla.png') },
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 0,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: null,
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: require('../../../../../images/sedeges-logo.png'), puntaje: 5 },
                            { respuesta: require('../../../../../images/pantalla.png'), puntaje: 10 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 4',
        id: 4,
        categoria: 'test-analitico',
        contenido: {
            instructions: 'Lee antentamente cada grupo de oraciones escritas con letras mayusculas, asi como las tres posibles respuestas; luego escoja la mas adecuada.',
            ejm: {
                preguntas: {
                    a: 'TODOS LOS SERES QUE TIENE CUATRO PATARS SON ANIMALES',
                    b: 'TODOS LOS CABALLEROS TIENE CUATRO PATAS',
                },
                resp: [
                    { respuesta: 'Otros seres como los caballeros pueden caminar' },
                    { respuesta: 'Todos los caballeros peden caminar' },
                    { respuesta: 'Todos los caballeros son animales' }
                ]
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
                        resp: [
                            { respuesta: 'Los aviadores son buenos jefes de scouts', puntaje: 5 },
                            { respuesta: 'Un aviador puede ser jefe de scouts', puntaje: 10 },
                            { respuesta: 'Los jefes de scouts son buenos aviadores', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Luis', puntaje: 5 },
                            { respuesta: 'Enrique', puntaje: 10 },
                            { respuesta: 'Fancisco', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'La vida de ningun ser humano esta asegurada', puntaje: 5 },
                            { respuesta: 'Los chóferes de vehiculos no estan libres de cometer accidentes', puntaje: 10 },
                            { respuesta: 'Pocos chóferes conducen con seguridad sus vehiculos', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'El debe permanecer con sus amigos', puntaje: 5 },
                            { respuesta: 'El debe hacerse el fuerte para dejar a sus amigos', puntaje: 10 },
                            { respuesta: 'El sufrirá un perjuicio', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Es un circulo', puntaje: 5 },
                            { respuesta: 'No es un cuadrado', puntaje: 10 },
                            { respuesta: 'Es un triangulo', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Es nacionalizada', puntaje: 5 },
                            { respuesta: 'Es natural de pais', puntaje: 10 },
                            { respuesta: 'Es un turista', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'La calle "S" esta al este de "D"', puntaje: 5 },
                            { respuesta: 'La calle "C" cruza a "S"', puntaje: 10 },
                            { respuesta: 'La calle "S" es paralera "C"', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Su hermnao es menos inteligente que Ud.', puntaje: 5 },
                            { respuesta: 'Su hermano es tan inteligente como Ud.', puntaje: 10 },
                            { respuesta: 'Su hermando es mas inteligente que Ud.', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Eduardo', puntaje: 5 },
                            { respuesta: 'Guillermo', puntaje: 10 },
                            { respuesta: 'Jaime', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: '"B" pesa menos que "C"', puntaje: 5 },
                            { respuesta: '"A" pesa igual que "B"', puntaje: 10 },
                            { respuesta: '"A" pesa menos que "C"', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'Contiene diamantes', puntaje: 5 },
                            { respuesta: 'Contiene oro o diamantes', puntaje: 10 },
                            { respuesta: 'No se sabe que contiene', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'El no debe formar parte de equipo', puntaje: 5 },
                            { respuesta: 'El puede perder el apoyo de sus compañeros', puntaje: 10 },
                            { respuesta: 'El puede presentar razonablmente una queja', puntaje: 15 },
                        ]

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
                        resp: [
                            { respuesta: 'El rechazo de la queja es justificable', puntaje: 5 },
                            { respuesta: 'El rechazo se discute sin reserva', puntaje: 10 },
                            { respuesta: 'El reacho de la queja es desatinado, o es imperdonable', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: 'La casa "A" queda cerca de la casa de "C"', puntaje: 5 },
                            { respuesta: 'La casa "C" está más cercana a la casa "A" que a la casa "B"', puntaje: 10 },
                            { respuesta: 'La casa "A" queda al nor-este de la casa "C"', puntaje: 15 },
                        ]
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
                        resp: [
                            { respuesta: '"W" no está entre "Y" y "Z"', puntaje: 5 },
                            { respuesta: '"W" está entre "X" y "Z"', puntaje: 10 },
                            { respuesta: '"W" está más cerca de "X" que "Z"', puntaje: 15 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 5',
        id: 5,
        categoria: 'test-matematico',
        contenido: {
            instructions: 'En cada serie de nuemros, hay uno que es incorrecto. Busque ese número',
            ejm: {
                preguntas: {
                    a: '2 4 6 8 9 10 12 14',
                    b: null,
                },
                resp: {
                    a: null,
                    b: null,
                    c: null
                }
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '14', puntaje: 2 },
                            { respuesta: '12', puntaje: 4 },
                            { respuesta: '10', puntaje: 6 },
                            { respuesta: '8', puntaje: 8 },
                            { respuesta: '7', puntaje: 10 },
                            { respuesta: '6', puntaje: 12 },
                            { respuesta: '4', puntaje: 14 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '19', puntaje: 2 },
                            { respuesta: '16', puntaje: 4 },
                            { respuesta: '13', puntaje: 6 },
                            { respuesta: '11', puntaje: 8 },
                            { respuesta: '10', puntaje: 10 },
                            { respuesta: '7', puntaje: 12 },
                            { respuesta: '4', puntaje: 14 },

                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '1', puntaje: 2 },
                            { respuesta: '5', puntaje: 4 },
                            { respuesta: '9', puntaje: 6 },
                            { respuesta: '13', puntaje: 8 },
                            { respuesta: '15', puntaje: 10 },
                            { respuesta: '17', puntaje: 12 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '4', puntaje: 2 },
                            { respuesta: '5', puntaje: 4 },
                            { respuesta: '7', puntaje: 6 },
                            { respuesta: '8', puntaje: 8 },
                            { respuesta: '10', puntaje: 10 },
                            { respuesta: '11', puntaje: 12 },
                            { respuesta: '12', puntaje: 14 },
                            { respuesta: '13', puntaje: 16 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '2', puntaje: 2 },
                            { respuesta: '4', puntaje: 4 },
                            { respuesta: '5', puntaje: 6 },
                            { respuesta: '7', puntaje: 8 },
                            { respuesta: '8', puntaje: 10 },
                            { respuesta: '9', puntaje: 12 },
                            { respuesta: '10', puntaje: 14 },
                            { respuesta: '11', puntaje: 16 },
                            { respuesta: '13', puntaje: 18 },
                            { respuesta: '14', puntaje: 20 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '0', puntaje: 2 },
                            { respuesta: '7', puntaje: 4 },
                            { respuesta: '14', puntaje: 6 },
                            { respuesta: '19', puntaje: 8 },
                            { respuesta: '24', puntaje: 10 },
                            { respuesta: '27', puntaje: 12 },
                            { respuesta: '29', puntaje: 14 },
                            { respuesta: '30', puntaje: 16 },
                            { respuesta: '31', puntaje: 18 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 7,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '20', puntaje: 2 },
                            { respuesta: '17', puntaje: 4 },
                            { respuesta: '15', puntaje: 6 },
                            { respuesta: '14', puntaje: 8 },
                            { respuesta: '11', puntaje: 10 },
                            { respuesta: '9', puntaje: 12 },
                            { respuesta: '8', puntaje: 14 },
                            { respuesta: '7', puntaje: 16 },
                            { respuesta: '5', puntaje: 18 },
                            { respuesta: '3', puntaje: 20 },
                            { respuesta: '2', puntaje: 22 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 8,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '21', puntaje: 2 },
                            { respuesta: '10', puntaje: 4 },
                            { respuesta: '18', puntaje: 6 },
                            { respuesta: '15', puntaje: 8 },
                            { respuesta: '14', puntaje: 10 },
                            { respuesta: '12', puntaje: 12 },
                            { respuesta: '10', puntaje: 14 },
                            { respuesta: '9', puntaje: 16 },
                            { respuesta: '8', puntaje: 18 },
                            { respuesta: '6', puntaje: 20 },
                            { respuesta: '3', puntaje: 22 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 9,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '2', puntaje: 2 },
                            { respuesta: '3', puntaje: 4 },
                            { respuesta: '5', puntaje: 6 },
                            { respuesta: '8', puntaje: 8 },
                            { respuesta: '12', puntaje: 10 },
                            { respuesta: '17', puntaje: 12 },
                            { respuesta: '22', puntaje: 14 },
                            { respuesta: '23', puntaje: 16 },
                            { respuesta: '30', puntaje: 18 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 10,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: [
                            { respuesta: '20', puntaje: 2 },
                            { respuesta: '18', puntaje: 4 },
                            { respuesta: '19', puntaje: 6 },
                            { respuesta: '17', puntaje: 8 },
                            { respuesta: '18', puntaje: 10 },
                            { respuesta: '16', puntaje: 12 },
                            { respuesta: '17', puntaje: 14 },
                            { respuesta: '14', puntaje: 16 },
                            { respuesta: '15', puntaje: 18 },
                            { respuesta: '16', puntaje: 20 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 6',
        id: 6,
        categoria: 'test-matematico',
        contenido: {
            instructions: 'Aqui hay varias series de numeros que aumentan o disminuyen. A las series les falta algunos nuemros para estar completas. Escoja entre las respuestas, el gtupo que contiene todos los nueros que falta.',
            ejm: {
                preguntas: {
                    a: '12  _   14  15  _   _   18',
                    b: 'Escoja el grupo correcto',
                },
                resp: [
                    { respuesta: '13,15,16' },
                    { respuesta: '13,15,17' },
                    { respuesta: '13,16,17' },
                    { respuesta: '14,16,17' },
                    { respuesta: '15,16,18' },
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: '1   4   _   10  _   _   19',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: [
                            { respuesta: '5,11,18', puntaje: 2 },
                            { respuesta: '7,13,16', puntaje: 4 },
                            { respuesta: '5,13,16', puntaje: 6 },
                            { respuesta: '7,11,18', puntaje: 8 },
                            { respuesta: '5,16,18', puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: '2   _   8   _   32  _',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: [
                            { respuesta: '7,13,33', puntaje: 2 },
                            { respuesta: '4,16,37', puntaje: 4 },
                            { respuesta: '3,15,48', puntaje: 6 },
                            { respuesta: '4,16,64', puntaje: 8 },
                            { respuesta: '6,24,64', puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: '44  37  _   _   16  _   2',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: [
                            { respuesta: '30,22,8', puntaje: 2 },
                            { respuesta: '31,22,9', puntaje: 4 },
                            { respuesta: '30,23,9', puntaje: 6 },
                            { respuesta: '30,21,9', puntaje: 8 },
                            { respuesta: '31,23,8', puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: '6   _   28  _   50  _   72',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: [
                            { respuesta: '16,38,60', puntaje: 2 },
                            { respuesta: '16,39,61', puntaje: 4 },
                            { respuesta: '17,38,60', puntaje: 6 },
                            { respuesta: '11,39,61', puntaje: 8 },
                            { respuesta: '17,39,61', puntaje: 10 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: '83  70  _   44  _   _   5',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: [
                            { respuesta: '57,31,18', puntaje: 2 },
                            { respuesta: '53,33,23', puntaje: 4 },
                            { respuesta: '57,33,19', puntaje: 6 },
                            { respuesta: '53,31,18', puntaje: 8 },
                            { respuesta: '57,33,19', puntaje: 10 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 7',
        id: 7,
        categoria: 'test-matematico',
        contenido: {
            instructions: 'A continuacion hay varios problemas y frente a cada uno, de ellos cuatro respuestas posibles precedidas por letras. Busque cual es la respuesta correcta.',
            ejm: {
                preguntas: {
                    a: 'Si tu tienes 5 Bs. y gastas 3 Bs. ¿ cuantos Bs. te quedan ?',
                    b: null,
                },
                resp: [
                    { respuesta: '1,00 Bs.'},
                    { respuesta: '2,00 Bs.'},
                    { respuesta: '3,00 Bs.'},
                    { respuesta: '5,00 Bs.'},
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 0,
                        preguntas: {
                            a: 'Un tren de carga viaja a una velocidad de 20 kilometros por hora.',
                            b: '¿Cunatos kilometros recorrerá en 4 horas?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '5', puntaje: 2 },
                            { respuesta: '24', puntaje: 4 },
                            { respuesta: '80', puntaje: 6 },
                            { respuesta: '60', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: '¿Cuantos metros de tela se podrá comprar con 150 Bs. a razón de 4 metros por 50 Bs.?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '9', puntaje: 2 },
                            { respuesta: '12', puntaje: 4 },
                            { respuesta: '15', puntaje: 6 },
                            { respuesta: '60', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: 'En un mapa cada media pulgada representa 20 millas.',
                            b: '¿Cuantas millas estaran representadas en 5 pulgadas?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '10', puntaje: 2 },
                            { respuesta: '20', puntaje: 4 },
                            { respuesta: '100', puntaje: 6 },
                            { respuesta: '200', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: 'Una Galleta cuesta 3 centavos, pero puede obtenerse una docena por 30 centavos.',
                            b: 'Cuantos economizaré si compro una docena',
                            c: null,
                        },
                        resp: [
                            { respuesta: '10 ctvs.', puntaje: 2 },
                            { respuesta: '6 ctvs.', puntaje: 4 },
                            { respuesta: '2 1/2 ctvs.', puntaje: 6 },
                            { respuesta: '9 ctvs.', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: '¿Cuantos centimetros cubicos tendra una caja que mide 5 centimetros de largo, 4 centimetros de ancho y 3 centimetros de alto?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '12', puntaje: 2 },
                            { respuesta: '32', puntaje: 4 },
                            { respuesta: '60', puntaje: 6 },
                            { respuesta: '100', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: 'A un escolar le dicen 20 palabras de ortografia dudosa, pero solo ha escrito correctamente el 90% de ellas.',
                            b: '¿Cuantas palabras ha escrito correctamente?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '1', puntaje: 2 },
                            { respuesta: '11', puntaje: 4 },
                            { respuesta: '18', puntaje: 6 },
                            { respuesta: '19', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: '¿Cuantas estampillas de 1.50 Bs. podrán cambiarse por 30 estampillas de 0.5 Bs ?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '10', puntaje: 2 },
                            { respuesta: '15', puntaje: 4 },
                            { respuesta: '18', puntaje: 6 },
                            { respuesta: '19', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 7,
                        preguntas: {
                            a: 'Un equipo de futbol ha jugago 25 partidos y ganó 7 partidos más que los perdidos.',
                            b: '¿Cuantos partidos ha ganado?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '7', puntaje: 2 },
                            { respuesta: '9', puntaje: 4 },
                            { respuesta: '16', puntaje: 6 },
                            { respuesta: '18', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 8,
                        preguntas: {
                            a: '¿ Cuantas hojas de papel de 7x10 cm. se podrá obtener en un pliego grande de papel que mide 21x30 cm. ?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '3', puntaje: 2 },
                            { respuesta: '6', puntaje: 4 },
                            { respuesta: '9', puntaje: 6 },
                            { respuesta: '34', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 9,
                        preguntas: {
                            a: 'Si un metro de papel cuesta 10 ctvs.',
                            b: '¿Cuantos se tendra que gastar para cubrir el techo de un cuarto de 15 metros?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '3.10', puntaje: 2 },
                            { respuesta: '6.20', puntaje: 4 },
                            { respuesta: '31.00', puntaje: 6 },
                            { respuesta: '24.00', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 10,
                        preguntas: {
                            a: '¿Cual es el número que 2.5 veces es igual a 40?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '16', puntaje: 2 },
                            { respuesta: '8', puntaje: 4 },
                            { respuesta: '15', puntaje: 6 },
                            { respuesta: '17', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 11,
                        preguntas: {
                            a: 'Si un cubo de hielo de 5 pulgadas pesa 4.25 de onzas.',
                            b: '¿Cunatas onzas pesará un cubo de 10 pulgadas?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '212.5', puntaje: 2 },
                            { respuesta: '8.5', puntaje: 4 },
                            { respuesta: '34', puntaje: 6 },
                            { respuesta: '50', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 12,
                        preguntas: {
                            a: '¿Cual es el número que multiplicado por 2, es 4 unidades nemos que 3 veces 6?',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: '6', puntaje: 2 },
                            { respuesta: '7', puntaje: 4 },
                            { respuesta: '14', puntaje: 6 },
                            { respuesta: '8', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 13,
                        preguntas: {
                            a: 'Juan tiene una edad que equivale a 1/4 de la edad de su tio. Las edades de ambos reunidas dan un total de 40 años.',
                            b: '¿Cuantos años de diferencia hay entre la edad de Juan y la edad de su tio?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '10', puntaje: 2 },
                            { respuesta: '20', puntaje: 4 },
                            { respuesta: '24', puntaje: 6 },
                            { respuesta: '30', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 14,
                        preguntas: {
                            a: 'Un tanque de agua es alimento por 3 cañerias, una de las cuales puede llevarlo en 2 horas, y la otra en 3 horas. Una tercera cañeria puede desocuparlo en 1 hora.',
                            b: 'Si el tanque esta lleno, y las tres cañerias abiertas, ¿en cuantas horas estará vacio el tanque?',
                            c: null,
                        },
                        resp: [
                            { respuesta: '2', puntaje: 2 },
                            { respuesta: '4', puntaje: 4 },
                            { respuesta: '5', puntaje: 6 },
                            { respuesta: '6', puntaje: 8 },
                        ]
                    }
                },
            ]
        }
    },
    {
        title: 'test 8',
        id: 8,
        categoria: 'test-matematico',
        contenido: {
            instructions: 'Lo que usted tiene que hacer es decidir, cual de las cuatro palabras escritas con la letras minusculas posee un significado igual o semejante a la palabra escrita con mayúscula.',
            ejm: {
                preguntas: {
                    a: 'CAMINAR',
                    b: null,
                },
                resp: [
                    { respuesta: 'Jugar'},
                    { respuesta: 'Luchar'},
                    { respuesta: 'Andar'},
                    { respuesta: 'Viajar'},
                ]
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 0,
                        preguntas: {
                            a: 'EXTRAJERO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Nativo', puntaje: 2 },
                            { respuesta: 'Forastero', puntaje: 4 },
                            { respuesta: 'Raro', puntaje: 6 },
                            { respuesta: 'Desconocido', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: 'CONTESTACIÓN',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Respuesta', puntaje: 2 },
                            { respuesta: 'Conversación', puntaje: 4 },
                            { respuesta: 'Dictamen', puntaje: 6 },
                            { respuesta: 'Negación', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: 'ASISTIR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Consentir', puntaje: 2 },
                            { respuesta: 'Agregar', puntaje: 4 },
                            { respuesta: 'Concurrir', puntaje: 6 },
                            { respuesta: 'Vigilar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: 'ADMIRADO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Admitido', puntaje: 2 },
                            { respuesta: 'Protegido', puntaje: 4 },
                            { respuesta: 'Asustado', puntaje: 6 },
                            { respuesta: 'Asombrado', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: 'FINALIZAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Limitar', puntaje: 2 },
                            { respuesta: 'Concluir', puntaje: 4 },
                            { respuesta: 'Fijar', puntaje: 6 },
                            { respuesta: 'Llegar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: 'ESTIMAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Apreciar', puntaje: 2 },
                            { respuesta: 'Respetar', puntaje: 4 },
                            { respuesta: 'Estimular', puntaje: 6 },
                            { respuesta: 'Despreciar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: 'ADQUIRIR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Conducir', puntaje: 2 },
                            { respuesta: 'Consentir', puntaje: 4 },
                            { respuesta: 'Obtener', puntaje: 6 },
                            { respuesta: 'Aceptar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 7,
                        preguntas: {
                            a: 'AMPLIO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Concurrido', puntaje: 2 },
                            { respuesta: 'Espacioso', puntaje: 4 },
                            { respuesta: 'Generoso', puntaje: 6 },
                            { respuesta: 'Vacio', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 8,
                        preguntas: {
                            a: 'ASOMBRO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Sorpresa', puntaje: 2 },
                            { respuesta: 'Verguenza', puntaje: 4 },
                            { respuesta: 'Contrariedad', puntaje: 6 },
                            { respuesta: 'Peligro', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 9,
                        preguntas: {
                            a: 'OPRIMIDO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Necesitado', puntaje: 2 },
                            { respuesta: 'Molesto', puntaje: 4 },
                            { respuesta: 'Arbitrario', puntaje: 6 },
                            { respuesta: 'Sometido', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 10,
                        preguntas: {
                            a: 'SAQUEAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Recoger', puntaje: 2 },
                            { respuesta: 'Despojar', puntaje: 4 },
                            { respuesta: 'Pelear', puntaje: 6 },
                            { respuesta: 'Vestir', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 11,
                        preguntas: {
                            a: 'OBSTINACION',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Obediencia', puntaje: 2 },
                            { respuesta: 'Terquedad', puntaje: 4 },
                            { respuesta: 'Rebeldia', puntaje: 6 },
                            { respuesta: 'Tino', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 12,
                        preguntas: {
                            a: 'ETERNO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Breve', puntaje: 2 },
                            { respuesta: 'Sagrado', puntaje: 4 },
                            { respuesta: 'Perpetuo', puntaje: 6 },
                            { respuesta: 'Durable', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 13,
                        preguntas: {
                            a: 'FUGAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Engañar', puntaje: 2 },
                            { respuesta: 'Liberar', puntaje: 4 },
                            { respuesta: 'Raptar', puntaje: 6 },
                            { respuesta: 'Escapar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 14,
                        preguntas: {
                            a: 'NOTABLE',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Severo', puntaje: 2 },
                            { respuesta: 'Terrible', puntaje: 4 },
                            { respuesta: 'Anotado', puntaje: 6 },
                            { respuesta: 'Famoso', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 15,
                        preguntas: {
                            a: 'IMPLORAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Pensar', puntaje: 2 },
                            { respuesta: 'Suplicar', puntaje: 4 },
                            { respuesta: 'Reparar', puntaje: 6 },
                            { respuesta: 'Protestar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 16,
                        preguntas: {
                            a: 'MENGUAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Disimular', puntaje: 2 },
                            { respuesta: 'Repetir', puntaje: 4 },
                            { respuesta: 'Reducir', puntaje: 6 },
                            { respuesta: 'Aumentar', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 17,
                        preguntas: {
                            a: 'PROFECIA',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Segestion', puntaje: 2 },
                            { respuesta: 'Predicción', puntaje: 4 },
                            { respuesta: 'Herejía', puntaje: 6 },
                            { respuesta: 'Profesión', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 18,
                        preguntas: {
                            a: 'CORROER',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Carcomer', puntaje: 2 },
                            { respuesta: 'Perseguir', puntaje: 4 },
                            { respuesta: 'Comerciar', puntaje: 6 },
                            { respuesta: 'Corregir', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 19,
                        preguntas: {
                            a: 'PERSISTENTE',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Probable', puntaje: 2 },
                            { respuesta: 'Raro', puntaje: 4 },
                            { respuesta: 'Variable', puntaje: 6 },
                            { respuesta: 'Constante', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 20,
                        preguntas: {
                            a: 'INDAGAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Hallar', puntaje: 2 },
                            { respuesta: 'Remover', puntaje: 4 },
                            { respuesta: 'Averiguar', puntaje: 6 },
                            { respuesta: 'Detener', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 21,
                        preguntas: {
                            a: 'IDONEIDAD',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Suficiencia', puntaje: 2 },
                            { respuesta: 'Prudencia', puntaje: 4 },
                            { respuesta: 'Sabiduria', puntaje: 6 },
                            { respuesta: 'Donación', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 22,
                        preguntas: {
                            a: 'DIAFANO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Luminoso', puntaje: 2 },
                            { respuesta: 'Limpido', puntaje: 4 },
                            { respuesta: 'Frágil', puntaje: 6 },
                            { respuesta: 'Delicado', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 23,
                        preguntas: {
                            a: 'AMBIGUO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Ambicioso', puntaje: 2 },
                            { respuesta: 'Hipócrita', puntaje: 4 },
                            { respuesta: 'Cuidadoso', puntaje: 6 },
                            { respuesta: 'Dudoso', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 24,
                        preguntas: {
                            a: 'DILAPIDAR',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Malgastar', puntaje: 2 },
                            { respuesta: 'Usar', puntaje: 4 },
                            { respuesta: 'Distraer', puntaje: 6 },
                            { respuesta: 'Idéntico', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 25,
                        preguntas: {
                            a: 'AFLIGIDO',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Destruido', puntaje: 2 },
                            { respuesta: 'Apenado', puntaje: 4 },
                            { respuesta: 'Pesado', puntaje: 6 },
                            { respuesta: 'Derrotado', puntaje: 8 },
                        ]
                    }
                },
                {
                    pregunta: {
                        pre_id: 26,
                        preguntas: {
                            a: 'DESTREZA',
                            b: null,
                            c: null,
                        },
                        resp: [
                            { respuesta: 'Ventaja', puntaje: 2 },
                            { respuesta: 'Destrozo', puntaje: 4 },
                            { respuesta: 'Trenzado', puntaje: 6 },
                            { respuesta: 'Habilidad', puntaje: 8 },
                        ]
                    }
                },
            ]
        }
    }
]
  const newArray=[]
  for(var i=0;i<data.length;i++){
    if(route.params.id===data[i].id){
      newArray.push(data[i])
      break;
    }
  }
  // console.log(newArray)
  // var myArray = route.params.contenido.preguntas
  // var categoria = route.params.categoria
  // var imagePre = route.params.contenido.ejm.resp
  var myArray = newArray[0].contenido.preguntas
  var categoria = newArray[0].categoria
  var imagePre = newArray[0].contenido.ejm.resp
  var preguntas = []
  for (var i = 0; i < 5; i++) {
    var rand = Math.floor(Math.random() * myArray.length)// conbierte la posicion del array en numero entero
    var rValue = myArray[rand]//obtiene el dato del array por el numero
    const aa = myArray.splice(rand, 1)
    preguntas.push(rValue)
  }
  // console.log(route.params)
  // console.log(myArray)
  // console.log(categoria)
  // console.log(rValue)

  const info = [
    { id: 1, data: { nombre: 'alex', apellido: 'maraza', edad: 28 } }
  ]
  return (
    <Layaut>
      {categoria === 'test-grafico' ? (
        <>
          <Text style={styles.textFont}>Instructions</Text>
          <Text style={styles.textFont}>{route.params.title}</Text>
          <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            {imagePre.map((e, index) => (
              <View key={index} style={{ margin: 10 }}>
                <Image style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }} source={e.respuesta} />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('PreguntaTestGrafico', { data: preguntas, cont: 0, })}>
            <Text style={styles.textFont}>Vamos!!</Text>
          </TouchableOpacity>
        </>
      ) : categoria === 'test-analitico' ? (
        <>
          <Text style={styles.textFont}>Instructions</Text>
          <Text style={styles.textFont}>{route.params.title}</Text>
          <Text style={styles.textFont}>{route.params.contenido.instructions}</Text>
          <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Preguntas', { data: preguntas, cont: 0 })}>
            <Text style={styles.textFont}>Vamos!!</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View></View>
      )}
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