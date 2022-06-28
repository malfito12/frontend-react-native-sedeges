import { View, TouchableOpacity,Text,FlatList,StyleSheet } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const CategoryTest = ({navigation}) => {
    
    const categoryDat=[
        {id:1,title:'TEST GRAFICO', direction:()=>navigation.navigate('InicioTest',{categoria:'TEST GRAFICO',id_cartegory:'test-grafico'})},
        {id:2,title:'TEST ANALITICO',direction:()=>navigation.navigate('InicioTest',{categoria:'TEST ANALITICO',id_cartegory:'test-analitico'})},
        {id:3,title:'TEST MATEMATICO',direction:()=>navigation.navigate('InicioTest',{categoria:'TEST MATEMATICO',id_cartegory:'test-matematico'})},
    ]
  return (
    <Layaut>
      <FlatList 
      data={categoryDat}
      style={{width:'100%'}}
      keyExtractor={item=>item.id}
      renderItem={c=>(
          <View>
              <TouchableOpacity onPress={c.item.direction}  style={styles.testView}>
                  <Text style={{alignSelf:'center',fontFamily:'Roboto_500Medium'}}>{c.item.title}</Text>
              </TouchableOpacity>
          </View>
      )}
      />
    </Layaut>
  )
}

const styles = StyleSheet.create({
    testView: {
      backgroundColor: 'white',
      padding: 20,
      margin: 10,
      borderRadius: 3,
    }
  })

export default CategoryTest