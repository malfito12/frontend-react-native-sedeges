import { View, Text, FlatList,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTasks } from '../Apis/tasksApi'
import Layaut from '../components/Layaut'

const HomeScreem = () => {

    // const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     loadTasks()
    // }, [])

    // //------GET TASKS----------------
    // const loadTasks = async () => {
    //     const data = await getTasks()
    //     setTasks(data)
    // }
    // console.log(props)
    return (
        <Layaut>
            {/* <FlatList
                data={tasks}
                style={{width:'100%'}}
                renderItem={(p, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{p.item.title}</Text>
                        <Text style={styles.itemTitle}>{p.item.description}</Text>
                    </View>
                )}
            /> */}
        </Layaut>
    )
}

const styles=StyleSheet.create({
    itemContainer:{
        backgroundColor:'#333333',
        padding:20,
        marginVertical:8,
        borderRadius:5,
    },
    itemTitle:{
        color:'#ffffff'
    }
})

export default HomeScreem