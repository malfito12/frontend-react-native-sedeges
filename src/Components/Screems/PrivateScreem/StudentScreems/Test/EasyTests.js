import { View, Text, TouchableOpacity, ScrollView,FlatList,StyleSheet } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const EasyTests = () => {
  const data = [
    { title: 'MATEMATICAS',id:1 },
    // { title: 'PSICOLOGIA',id:2 },
    { title: 'LITERATURA',id:3 },
    { title: 'CIENCIAS NATURALES',id:4 },
    { title: 'RELIGION',id:5 },
    { title: 'CIENCIAS SOLCIALES',id:6 },
    // { title: 'FILOSOFIA',id:7 },
    // { title: 'HISTORIA',id:8 },
    // { title: 'CIVICA',id:9 },
  ]
  return (
    <Layaut>
      {/* <ScrollView>
        {data.map((e, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 30,
                borderRadius: 5,
                marginBottom: 15
              }}
            >
              <Text>{e.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView> */}
      <FlatList
      style={{marginBottom:50,paddingHorizontal:15}}
        data={data}
        keyExtractor={item=>item.id}
        renderItem={(p)=>(
          <View style={styles.itemContainer}>
            <TouchableOpacity
              // style={{
              //   backgroundColor: 'white',
              //   padding: 30,
              //   borderRadius: 5,
              //   marginBottom: 15,
              // }}
            >
              <Text>{p.item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </Layaut>
  )
}

const styles=StyleSheet.create({
  itemContainer: {
    // backgroundColor: '#333333',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})
export default EasyTests