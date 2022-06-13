import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

const DificultTests = () => {
  const data = [
    { id: '1', title: 'test1' },
    { id: '2', title: 'test2' },
    { id: '3', title: 'test3' },
    { id: '4', title: 'test4' },
    { id: '5', title: 'test5' },
    { id: '6', title: 'test6' },
    { id: '7', title: 'test7' },
  ]
  return (
    <Layaut>
      <ScrollView style={{ marginBottom: 50 }}>
        {data.map((e, index) => (
          <View style={styles.viewTest} key={index}>
            <Text>{e.title}</Text>
            <TouchableOpacity>
              <Text>go</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Layaut>
  )
}

const styles = StyleSheet.create({
  viewTest: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection:'row',
    justifyContent:'space-between'
  }
})

export default DificultTests