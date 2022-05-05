import { View, Text,StyleSheet,StatusBar } from 'react-native'
import React from 'react'

const Layaut2 = ({children}) => {
  return (
    <View style={styles.container}>
        {/* icons de celular arriba */}
        <StatusBar backgroundColor='#545674'/>
      {children}
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#545674',
        padding:20,
        flex:1,
        alignItems:'center',
    }
})

export default Layaut2