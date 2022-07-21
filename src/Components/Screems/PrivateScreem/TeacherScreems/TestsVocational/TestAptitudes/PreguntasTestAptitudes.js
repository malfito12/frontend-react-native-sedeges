import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../../Atoms/StyleLayaut/Layaut'

const PreguntasTestAptitudes = ({ navigation, route }) => {
    const data = route.params.contenido[0].contenido.preguntas
    console.log(data)
    return (
        <Layaut>
            <ScrollView>
                {data ? data.map((e, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={{ color: 'white',alignSelf:'center' }}>{e.content}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white', margin:10 }}>{e.a}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white',margin:10 }}>{e.b}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white',margin:10 }}>{e.c}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius:3, padding: 10, margin: 10, backgroundColor: 'green' }}>
                                <Text style={{ color: 'white',margin:10 }}>{e.d}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )) : null}
                <TouchableOpacity style={{alignSelf:'center',width:'30%',borderRadius:3,backgroundColor:'#ffa726',margin:10,padding:15}}>
                    <Text style={{color:'white',alignSelf:'center'}}>Siguiente</Text>
                </TouchableOpacity>
            </ScrollView>
        </Layaut>
    )
}

export default PreguntasTestAptitudes