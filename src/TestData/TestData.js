export const data = [
    { title: 'test 1', id: 1, categoria:'test-grafico' },
    { title: 'test 2', id: 2 ,categoria:'test-grafico'},
    { title: 'test 3', id: 3 ,categoria:'test-grafico'},
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
    {
        title: 'test 5',
        id: 5,
        categoria:'test-matematico',
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
                        resp: {
                            a: '14',
                            b: '12',
                            c: '10',
                            d: '8',
                            e: '7',
                            f: '6',
                            g: '4',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '19',
                            b: '16',
                            c: '13',
                            d: '11',
                            e: '10',
                            f: '7',
                            g: '4',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '1',
                            b: '5',
                            c: '9',
                            d: '13',
                            e: '15',
                            f: '17',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '4',
                            b: '5',
                            c: '7',
                            d: '8',
                            e: '10',
                            f: '11',
                            g: '12',
                            h: '13',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '2',
                            b: '4',
                            c: '5',
                            d: '7',
                            e: '8',
                            f: '9',
                            g: '10',
                            h: '11',
                            i: '13',
                            j: '14',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 6,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '0',
                            b: '7',
                            c: '14',
                            d: '19',
                            e: '24',
                            f: '27',
                            g: '29',
                            h: '30',
                            i: '31',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 7,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '20',
                            b: '17',
                            c: '15',
                            d: '14',
                            e: '11',
                            f: '9',
                            g: '8',
                            h: '7',
                            i: '5',
                            j: '3',
                            k: '2',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 8,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '21',
                            b: '20',
                            c: '18',
                            d: '15',
                            e: '14',
                            f: '12',
                            g: '10',
                            h: '9',
                            i: '8',
                            j: '6',
                            k: '3',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 9,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '2',
                            b: '3',
                            c: '5',
                            d: '8',
                            e: '12',
                            f: '17',
                            g: '22',
                            h: '23',
                            i: '30',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 10,
                        preguntas: {
                            a: 'Escoja el numnero incorrecto',
                            b: null,
                        },
                        resp: {
                            a: '20',
                            b: '18',
                            c: '19',
                            d: '17',
                            e: '18',
                            f: '16',
                            g: '17',
                            h: '14',
                            i: '15',
                            j: '16',
                        }
                    }
                },
            ]
        }
    },
    {
        title: 'test 6',
        id: 6,
        categoria:'test-matematico',
        contenido: {
            instructions: 'Aqui hay varias series de numeros que aumentan o disminuyen. A las series les falta algunos nuemros para estar completas. Escoja entre las respuestas, el gtupo que contiene todos los nueros que falta.',
            ejm: {
                preguntas: {
                    a: '12  _   14  15  _   _   18',
                    b: 'Escoja el grupo correcto',
                },
                resp: {
                    a: '13,15,16',
                    b: '13,15,17',
                    c: '13,16,17',
                    d: '14,16,17',
                    e: '15,16,18',
                }
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 1,
                        preguntas: {
                            a: '1   4   _   10  _   _   19',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: {
                            a: '5,11,18',
                            b: '7,13,16',
                            c: '5,13,16',
                            d: '7,11,18',
                            e: '5,16,18',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 2,
                        preguntas: {
                            a: '2   _   8   _   32  _',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: {
                            a: '7,13,33',
                            b: '4,16,37',
                            c: '3,15,48',
                            d: '4,16,64',
                            e: '6,24,64',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 3,
                        preguntas: {
                            a: '44  37  _   _   16  _   2',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: {
                            a: '30,22,8',
                            b: '31,22,9',
                            c: '30,23,9',
                            d: '30,21,9',
                            e: '31,23,8',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 4,
                        preguntas: {
                            a: '6   _   28  _   50  _   72',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: {
                            a: '16,38,60',
                            b: '16,39,61',
                            c: '17,38,60',
                            d: '11,39,61',
                            e: '17,39,61',
                        }
                    }
                },
                {
                    pregunta: {
                        pre_id: 5,
                        preguntas: {
                            a: '83  70  _   44  _   _   5',
                            b: 'Escoja el grupo correcto',
                        },
                        resp: {
                            a: '57,31,18',
                            b: '53,33,23',
                            c: '57,33,19',
                            d: '53,31,18',
                            e: '57,33,19',
                        }
                    }
                },
            ]
        }
    },
    {
        title: 'test 7',
        id: 7,
        categoria:'test-matematico',
        contenido: {
            instructions: 'A continuacion hay varios problemas y frente a cada uno, de ellos cuatro respuestas posibles precedidas por letras. Busque cual es la respuesta correcta.',
            ejm: {
                preguntas: {
                    a: 'Si tu tienes 5 Bs. y gastas 3 Bs. ¿ cuantos Bs. te quedan ?',
                    b: null,
                },
                resp: {
                    a: '1,00 Bs.',
                    b: '2,00 Bs.',
                    c: '3,00 Bs.',
                    c: '5,00 Bs.'
                }
            },
            preguntas: [
                {
                    pregunta: {
                        pre_id: 1,
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
            ]
        }
    },
]