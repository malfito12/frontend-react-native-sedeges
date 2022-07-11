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
    }, [])
    const getTest = async () => {
        await AsyncStorageLib.getItem('test').then(resp => {
            setTest(JSON.parse(resp))
        })
    }
    //-----------------------------------

    // const lala2=lala
    // const lala2=data
    
    // console.log(lala2)

    const newArray=[]
    // for (var i = 0; i < lala2.length; i++) {
    //     var num=i+1
    //     var nuevo
    //     if(num==1){
    //         nuevo=route.params.avance1
    //     }else if(num==2){
    //         nuevo=route.params.avance2
    //     }else if(num==3){
    //         nuevo=route.params.avance3
    //     }
    //     if (route.params.id_cartegory === lala2[i].categoria) {
    //         if(nuevo===0){
    //             newArray.push(lala2[i])
    //         }
    //     }
    //     // console.log('llena')
    // }
    //----------------------------------------------
    // const go=(e)=>{
    //     // console.log(newArray)
    //     for(var i =0;i<newArray.length;i++){
    //         if(e===newArray[i].id){
    //             navigation.navigate('Instructions', { title: newArray[i].title, id: newArray[i].id, contenido: newArray[i].contenido, categoria:newArray[i].categoria, })
    //             break
    //         }
    //     }
    // }
    //----------------------------------------------
    for(var i=0;i<data.length;i++){
        if(route.params.id_cartegory===data[i].categoria){
            newArray.push(data[i])
        }
    }
    // const go=(e)=>{
    //     navigation.navigate('Instructions', { title: newArray[i].title, id: newArray[i].id, contenido: newArray[i].contenido, categoria:newArray[i].categoria, })
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
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Instructions', { title: p.item.title, id: p.item.id, contenido: p.item.contenido, categoria:p.item.categoria })} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}> */}
                        <TouchableOpacity onPress={() => navigation.navigate('Instructions', { title: p.item.title, id: p.item.id, contenido: p.item.contenido, categoria:p.item.categoria })} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 3 }}>
                        {/* <TouchableOpacity onPress={() => go(p.item.id)} style={{ backgroundColor: '#78e08f', padding: 10, borderRadius: 25 }}> */}
                            <Text style={{ color: 'white' }}>Iniciar Test</Text>
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