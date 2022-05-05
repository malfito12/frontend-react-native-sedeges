import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Layaut from '../../../components/Layaut'
import { PORT_URL } from '../../../Apis/PortUrl'
import axios from 'axios'
import validator from 'validator'

const RegisterUserScreem = ({ navigation }) => {
    const [changeData, setChangeData] = useState({
        nombre: '',
        email: '',
        password: '',
        repeat_password: ''
    })
    //---------------POST USER--------------------------
    const postUser = async () => {
        // console.log(changeData)
        if (!(validator.isEmail(changeData.email))) {
            alert('Email incorrecto')
            return
        }
        if (changeData.password !== changeData.repeat_password) {
            alert('verifique que las contraseñas sean iguales')
            return
        }
        await axios.post(`${PORT_URL}users`, changeData)
            .then(resp => {
                alert(resp.data.message)
                navigation.navigate('LoginScreem')
                // console.log(resp.data)
            })

        // const result=await postUsers(changeData)
        // console.log(result)
    }
    //-----------HANDLE CHANGE
    const handleChange = (name, value) => {
        // if (name === 'edad') {
        //     if (!/^[0-9]+$/.test(value)) {
        //         alert('introdusca solo numeros')
        //         return
        //     } else {
        //         setChangeData({
        //             ...changeData,
        //             [name]: value
        //         })
        //         return
        //     }
        // }
        setChangeData({
            ...changeData,
            [name]: value
        })
    }
    return (
        <Layaut>
            <TextInput
                style={styles.input}
                placeholder='Nombre de Usuario'
                placeholderTextColor='#545674'
                onChangeText={text => handleChange('nombre', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Correo Electronico'
                placeholderTextColor='#545674'
                onChangeText={text => handleChange('email', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry
                placeholderTextColor='#545674'
                onChangeText={text => handleChange('password', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Repita Contraseña'
                secureTextEntry
                placeholderTextColor='#545674'
                onChangeText={text => handleChange('repeat_password', text)}
            />
            {/* <TextInput
                keyboardType='numeric'
                style={styles.input}
                placeholder='Edad'
                placeholderTextColor='#545674'
                onChangeText={text => handleChange('edad', text)}
            /> */}
            <TouchableOpacity style={styles.buttonSave} onPress={postUser}>
                <Text style={{ color: 'white' }}>Enviar</Text>
            </TouchableOpacity>
        </Layaut>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '90%',
        fontSize: 14,
        marginBottom: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        padding: 10,
        borderColor: '#10ac84'
    },
    buttonSave: {
        paddingTop: 10,
        backgroundColor: '#10ac84',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center'

    }
})

export default RegisterUserScreem