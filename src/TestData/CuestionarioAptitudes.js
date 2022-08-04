export const cuestionarioAptitudes = [
    {
        id_test_aptitudes:2,
        contenido: {
            instructions: {
                guia: 'EN LA LISTA DE ACTIVIDADES DEBES PONER QUE TAN APTO TE CONSIDERAS PARA CADA UNA DE ELLAS GUIANDOTE POR LO SIGUIENTE:',
                a: '1 = si te consideras incompetente',
                b: '2 = si te consideras medianamente competente',
                c: '3 = si te consideras campetente',
                d: '4 = si te consideraras muy competente',
            },
            cuestionario: [
                {
                    id_aptitudes: 1,
                    title: 'Sección A',
                    contenido: {
                        id: 0,
                        preguntas: [
                            { content: 'Para expresarte con facilidad en clase o al conversar con tus amigos?', a: 1, b: 2, c: 3, d: 4, indexedDB:'p1-1' },
                            { content: 'Para redactar composiciones o artículos periodísticos? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p1-2' },
                            { content: 'Para componer versos serios o jocosos?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p1-3'},
                            { content: 'Para escribir cuentos, narraciones o historietas?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p1-4' },
                            { content: 'Para saber distinguir y apreciar la buena literatura?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p1-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 2,
                    title: 'Sección B',
                    contenido: {
                        id: 1,
                        preguntas: [
                            { content: 'Para ejecutar con exactitud y rapidez operaciones aritméticas?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p2-1' },
                            { content: 'Para hacer cálculos mentales? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p2-2' },
                            { content: 'Para calcular costos en una fiesta?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p2-3' },
                            { content: 'Para comprender formulas matemáticas?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p2-4' },
                            { content: 'Para distribuir el dinero de la escuela en varias actividades?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p2-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 3,
                    title: 'Sección C',
                    contenido: {
                        id: 2,
                        preguntas: [
                            { content: 'Para asimilar el contenido de textos sobre radio, TV u otros similares?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p3-1' },
                            { content: 'Para hacer trabajos con instrumentos de medición precisa, tales como balanzas, compases, pinzas especiales?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p3-2' },
                            { content: 'Para entender el funcionamiento de algún aparato mediante la simple observación o con explicaciones ligeras?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p3-3' },
                            { content: 'Para armar y desarmar juguetes mecánicos, o instrumentos algo complicados?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p3-4' },
                            { content: 'Para localizar desperfectos y realizar arreglos en equipos o instrumentos domésticos, como planchas, lavadoras, licuadoras, o circuitos eléctricos?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p3-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 4,
                    title: 'Sección D',
                    contenido: {
                        id: 3,
                        preguntas: [
                            { content: 'Para cantar, bailar o declamar?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p4-1' },
                            { content: 'Para conocer la calidad de una pintura, de una pieza musical o de un poema? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p4-2' },
                            { content: 'Para realizar pinturas, dibujos, grabados, modelado en barro o plastilina?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p4-3' },
                            { content: 'Para efectuar modificaciones de tu voz, tu figura, o tus movimientos?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p4-4'},
                            { content: 'Para ejecutar algún instrumento, componer versos, melodías, realizar escenografías o decoraciones?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p4-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 5,
                    title: 'Sección E',
                    contenido: {
                        id: 4,
                        preguntas: [
                            { content: 'Para cantar en un grupo coral?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p5-1' },
                            { content: 'Para aprender a tocar un instrumento musical?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p5-2'},
                            { content: 'Para distinguir cuando se desentona en las canciones o piezas musicales?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p5-3' },
                            { content: 'Para aprender a entonar correctamente las canciones de moda?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p5-4' },
                            { content: 'Para saber distinguir y apreciar la buena música?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p5-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 6,
                    title: 'Sección F',
                    contenido: {
                        id: 5,
                        preguntas: [
                            { content: 'Para entender principios y experimentos de biología?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p6-1' },
                            { content: 'Para entender principios y experimentos de física?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p6-2' },
                            { content: 'Para entender principios y experimentos de química?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p6-3'},
                            { content: 'Para entender principios y hechos económicos y sociales?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p6-4' },
                            { content: 'Para entender las causas que determinan los acontecimientos sociales? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p6-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 7,
                    title: 'Sección G',
                    contenido: {
                        id: 6,
                        preguntas: [
                            { content: 'Para tratar y hablar con tacto y tino a las personas?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p7-1' },
                            { content: 'Para ser miembro activo y útil en un club o sociedad?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p7-2' },
                            { content: 'Para colaborar con otros para bien de ellos y de ti mismo? ', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p7-3'},
                            { content: 'Para saber escuchar a otros con paciencia y comprender sus puntos de vista?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p7-4' },
                            { content: 'Para conversar en las reuniones y fiestas, con acierto y naturalidad? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p7-5' },
                        ]
                    }
                },
                {
                    id_aptitudes: 8,
                    title: 'Sección H',
                    contenido: {
                        id: 7,
                        preguntas: [
                            { content: 'Para actividades que requieren destreza manual, como cortar, tejer, coser?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p8-1'},
                            { content: 'Para manejar con habilidad herramientas de carpintería, como cepillo, martillo, serrucho, berbiquí, etc.?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p8-2'},
                            { content: 'Para manejar con facilidad herramientas mecánicas, como pinzas, llaves de tuercas, destornilladores, etc.? ', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p8-3'},
                            { content: 'Para manejar con habilidad pequeñas piezas y herramientas como agujas, manecillas, joyas, piezas de relojería, etc.?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p8-4'},
                            { content: 'Para diseñar con facilidad trazos geométricos con la ayuda de las escuadras, la regla y el compás?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p8-5'},
                        ]
                    }
                },
                {
                    id_aptitudes: 9,
                    title: 'Sección I',
                    contenido: {
                        id: 8,
                        preguntas: [
                            { content: 'Para participar en actividades que requieren valor, audacia, decisión como trepar, dar saltos arriesgados, tomar parte en juegos peligrosos?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p9-1' },
                            { content: 'Para dominarte en situaciones peligrosas o comprometidas, sin perder la serenidad ni el control de la situación?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p9-2' },
                            { content: 'Para dominar tus nervios y continuar con lo que estés haciendo en un momento en que, por algún peligro, todos quieren huir? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p9-3' },
                            { content: 'Para recuperar pronto la tranquilidad y presencia de animo después de un susto?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p9-4'},
                            { content: 'Para no contagiarte del miedo o pánico de los demás, e infundirles animo con tu ejemplo? ', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p9-5'},
                        ]
                    }
                },
                {
                    id_aptitudes: 10,
                    title: 'Sección J',
                    contenido: {
                        id: 9,
                        preguntas: [
                            { content: 'Para ser jefe competente de un grupo, equipo o sociedad de muchachos?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p10-1'},
                            { content: 'Para organizar y dirigir festivales, encuentros deportivos, excursiones o campañas sociales?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p10-2' },
                            { content: 'Para convencer a otros a que hagan lo que crees que deben hacer?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p10-3' },
                            { content: 'Para dar ordenes a otros, con seguridad y naturalidad?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p10-4'},
                            { content: 'Para dirigir un grupo o equipo en situaciones difíciles o peligrosas?', a: 1, b: 2, c: 3, d: 4 ,indexedDB:'p10-5'},
                        ]
                    }
                },
                {
                    id_aptitudes: 11,
                    title: 'Sección K',
                    contenido: {
                        id: 10,
                        preguntas: [
                            { content: 'Para llevar en forma correcta y ordenada los apuntes de las clases?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p11-1' },
                            { content: 'Para ordenar y clasificar debidamente documentos y correspondencia de una oficina? ', a: 1, b: 2, c: 3, d: 4,indexedDB:'p11-2' },
                            { content: 'Para aprender a contestar y redactar correctamente cartas y oficios?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p11-3' },
                            { content: 'Para anotar y manejar con exactitud y rapidez nombres, números y otros datos de oficina?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p11-4' },
                            { content: 'Para encargarte de recibir, anotar, y dar recados, sin olvidar los detalles importantes?', a: 1, b: 2, c: 3, d: 4,indexedDB:'p11-5' },
                        ]
                    }
                },
            ]
        }

    }

]