import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextNormal } from '../../Atoms/UI/Fuente'

export const SuccessButton = (props) => {
    const name = props.name
    // alert(JSON.stringify(props.name))
    return (
        <LinearGradient style={styles.buttonSuccess} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
            {/* <Text style={{ color: 'white' }} >{name}</Text> */}
            <TextNormal name={name} />
        </LinearGradient>
    )
}
export const CancelButton = (props) => {
    const name = props.name
    return (
        <LinearGradient style={styles.buttonCancel} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#bf360c', '#e64a19', '#ff6d00']}>
            {/* <Text style={{ color: 'white' }}>{name}</Text> */}
            <TextNormal name={name} />
        </LinearGradient>
    )
}
export const UdpateButton = (props) => {
    const name = props.name
    return (
        // <LinearGradient style={styles.buttonCancel} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#f44336', '#e57373']}>
        <View style={styles.buttonUpdate}>
            <Text style={{ color: 'white' }}>{name}</Text>
        </View>
        // </LinearGradient>
    )
}
export const DeleteButton = (props) => {
    const name = props.name
    return (

        // <LinearGradient style={styles.buttonCancel} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#c62828', '#f44336', '#e57373']}>
        <View style={styles.buttonDelete}>
            <Text style={{ color: 'white' }}>{name}</Text>
        </View>
        // </LinearGradient>
    )
}


const styles = StyleSheet.create({
    buttonSuccess: {
        padding: 5,
        margin: 5,
        borderRadius: 3,
        alignItems: 'center'
    },
    buttonCancel: {
        padding: 5,
        margin: 5,
        borderRadius: 3,
        alignItems: 'center'
    },
    buttonUpdate: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor:'transparent',
        borderWidth:1,
        borderColor:'green'
    },
    buttonDelete: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor:'transparent',
        borderWidth:1,
        borderColor:'red'
    },
})

