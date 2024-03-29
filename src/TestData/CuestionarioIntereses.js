export const cuetionarioIntereses = [
    {
        id_test_intereses:3,
        contenido: {
            instructions: {
                guia: 'Este cuestionario tiene como objetivo ayudarte a conocer tus verdaderos intereses ocupacionales. Para que puedas dar mejores resultados es necesario que contestes con veracidad y exactitud. A medida  que leas cada idea, piensa ¿qué tanto me gusta hacer esto?; debes de responder las preguntas de cada sección de acuerdo a la siguiente graduación de agrado o desagrado.',
                a: '1  Me desagrada mucho o Totalmente',
                b: '2  Me desagrada algo o en parte',
                c: '3  Me es indiferente',
                d: '4  Me gusta algo o en parte',
                e: '5  Me gusta mucho',
            },
            cuestionario: [
                {
                    id_itereses: 1,
                    title: 'Seccion A',
                    contenido: {
                        id: 0,
                        preguntas: [
                            { content: 'Salir de excursión al campo', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-1' },
                            { content: 'Participar en club de exploradores', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-2' },
                            { content: 'Vivir al aire libre, fuera de la ciudad', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-3' },
                            { content: 'Sembrar y plantar en una casa de campo durante las vacaciones', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-4' },
                            { content: 'Ser técnico agrícola en una región algodonera', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-5' },
                            { content: 'Criar animales', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p1-6' },
                        ]
                    }
                },
                {
                    id_itereses: 2,
                    title: 'Seccion B',
                    contenido: {
                        id: 1,
                        preguntas: [
                            { content: 'Armar y desarmar objetos mecánicos', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-1' },
                            { content: 'Manejar herramientas y maquinarias', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-2' },
                            { content: 'Construir objetos y muebles de madera', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-3' },
                            { content: 'Reparar las instalaciones eléctricas de tu casa', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-4' },
                            { content: 'Proyectar y dirigir la construcción de un pozo', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-5' },
                            { content: 'Ser experto mecánico de un gran taller', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p2-6' },
                        ]
                    }
                },
                {
                    id_itereses: 3,
                    title: 'Seccion C',
                    contenido: {
                        id: 2,
                        preguntas: [
                            { content: 'Resolver operaciones numéricas', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-1' },
                            { content: 'Resolver problemas de aritmética', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-2' },
                            { content: 'Ser tesorero y llevar las cuentas del aula', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-3' },
                            { content: 'Explicar a otros como resolver problemas de aritmética', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-4' },
                            { content: 'Participar en concursos de matemáticas', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-5' },
                            { content: 'Ser experto contador de una fabrica', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p3-6' },
                        ]
                    }
                },
                {
                    id_itereses: 4,
                    title: 'Seccion D',
                    contenido: {
                        id: 3,
                        preguntas: [
                            { content: 'Conocer la estructura de plantas y animales', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-1' },
                            { content: 'Hacer experimentos de biología, física y química', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-2' },
                            { content: 'Investigar el origen de las costumbres de los pueblos', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-3' },
                            { content: 'Hacer trabajos de investigación sobre las causas del comportamiento humano', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-4' },
                            { content: 'Leer revistas y libros científicos', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-5' },
                            { content: 'Ser investigador de un laboratorio de biología, física y química', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p4-6' },
                        ]
                    }
                },
                {
                    id_itereses: 5,
                    title: 'Seccion E',
                    contenido: {
                        id: 4,
                        preguntas: [
                            { content: 'Discutir un tema en clase', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-1' },
                            { content: 'Ser jefe de un club escolar', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-2' },
                            { content: 'Hacer propaganda para la venta de diccionarios', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-3' },
                            { content: 'Leer biografías de políticos eminentes', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-4' },
                            { content: 'Convencer a los compañeros para que hagan lo correcto', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-5' },
                            { content: 'Ser agente de ventas de una empresa comercial', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p5-6' },
                        ]
                    }
                },
                {
                    id_itereses: 6,
                    title: 'Seccion F',
                    contenido: {
                        id: 5,
                        preguntas: [
                            { content: 'Dibujar y pintar a lápiz y a colores', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-1' },
                            { content: 'Modelar en barro o en arcilla', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-2' },
                            { content: 'Encargarte del decorado en una actuación', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-3'},
                            { content: 'Idear y diseñar el escudo de un club', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-4' },
                            { content: 'Diseñar ropa o vestuario para una función teatral', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-5' },
                            { content: 'Ser experto dibujante de una empresa industrial', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p6-6' },
                        ]
                    }
                },
                {
                    id_itereses: 7,
                    title: 'Seccion G',
                    contenido: {
                        id: 6,
                        preguntas: [
                            { content: 'Escribir cuentos, artículos o crónicas para un periódico', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-1'},
                            { content: 'Leer obras literarias', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-2'},
                            { content: 'Escribir versos para el periódico mural', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-3'},
                            { content: 'Representar un papel en una obra teatral', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-4'},
                            { content: 'Participar en un concurso de literatura peruana', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-5'},
                            { content: 'Ser periodista redactor de un periódico de la ciudad', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p7-6'},
                        ]
                    }
                },
                {
                    id_itereses: 8,
                    title: 'Seccion H',
                    contenido: {
                        id: 7,
                        preguntas: [
                            { content: 'Cantar en un grupo coral', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-1' },
                            { content: 'Escuchar música clásica', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-2' },
                            { content: 'Aprender a tocar un instrumento musical', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-3' },
                            { content: 'Ser miembro de un grupo o asociación cultural', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-4' },
                            { content: 'Ser cantante y participar en las actuaciones escolares', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-5' },
                            { content: 'Componer canciones, crearlas y ponerles música', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p8-6' },
                        ]
                    }
                },
                {
                    id_itereses: 9,
                    title: 'Seccion I',
                    contenido: {
                        id: 8,
                        preguntas: [
                            { content: 'Atender a los enfermos y cuidar de ellos', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-1' },
                            { content: 'Proteger a los muchachos menores del grupo', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-2' },
                            { content: 'Ser miembro de un club asistencial para ayudar a la comunidad', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-3' },
                            { content: 'Enseñar a leer a los analfabetos', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-4' },
                            { content: 'Ayudar a los compañeros en su dificultades y preocupaciones', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-5' },
                            { content: 'Trabajar en la comunidad para ayudar al progreso de las clase humildes', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p9-6' },
                        ]
                    }
                },
                {
                    id_itereses: 10,
                    title: 'Seccion J',
                    contenido: {
                        id: 9,
                        preguntas: [
                            { content: 'Llevar en orden los libros, cuadernos y apuntes de clase', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p10-1' },
                            { content: 'Ordenar y clasificar libros de una biblioteca', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p10-2' },
                            { content: 'Aprender a escribir a maquina y aprender taquigrafía', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p10-3' },
                            { content: 'Aprender a redactar correctamente cartas y oficios ', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p10-4' },
                            { content: 'Ayudar en el archivo de documentos en un club', a: 1, b: 2, c: 3, d: 4, e: 5,indexedDB:'p10-5' },
                            { content: 'Ser experto secretario en una gran empresa', a: 1, b: 2, c: 3, d: 4, e: 5 ,indexedDB:'p10-6'},
                        ]
                    }
                },
            ]
        }
    }

]