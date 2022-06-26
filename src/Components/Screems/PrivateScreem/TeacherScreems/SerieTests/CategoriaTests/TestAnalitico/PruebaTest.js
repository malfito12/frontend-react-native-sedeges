import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const PruebaTest = ({ route, navigation }) => {
    const { nombre }=route.params.data[0].data
    var sum=sum+nombre

    return (
        <View>
            <Text>PruebaTest</Text>
            <Text>{nombre}</Text>
            <Text>{sum}</Text>
            <TouchableOpacity onPress={()=>navigation.push('PruebaTest',{data:[{data:{nombre:sum}}]})} style={{backgroundColor:'red'}}>
                <Text>siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('PruebaTest',{data:[{data:{nombre:sum}}]})} style={{backgroundColor:'red',marginTop:5}}>
                <Text>siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('CategoryTest')} style={{backgroundColor:'green',marginTop:5}}>
                <Text>volver</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PruebaTest