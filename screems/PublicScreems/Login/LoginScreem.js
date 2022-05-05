import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Layaut2 from '../../../components/Layaut2'
import axios from 'axios'
import { PORT_URL } from '../../../Apis/PortUrl'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const LoginScreem = ({ navigation }) => {
    const [changeData,setChangeData]=useState({
        nombre:'',
        password:''
    })

    useEffect(()=>{
        removeToken()
    },[])
    //-------REMIVE TOKEN-------------
    const removeToken=async()=>{
        await AsyncStorageLib.removeItem('token')
    }
    //---------LOGIN-----------------
    const login=async()=>{
        // console.log(changeData)
        await axios.post(`${PORT_URL}login`,changeData)
        .then((async(resp)=>{
            // console.log(resp.data.token)
            await AsyncStorageLib.setItem('token',resp.data.token)
            navigation.navigate('UsersScreem')
            setChangeData({nombre:'',password:''})
            
        }))
        .catch(err=>console.log(err))
    }
    //-----------HANDLE CHANGE----------------
    const handleChange=(name,value)=>{
        setChangeData({
            ...changeData,
            [name]:value
        })
    }
    return (
        <Layaut2>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder='Usuario'
                placeholderTextColor='#545674'
                value={changeData.nombre}
                onChangeText={text => handleChange('nombre', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                placeholderTextColor='#545674'
                secureTextEntry
                value={changeData.password}
                onChangeText={text => handleChange('password', text)}
            />
            <TouchableOpacity style={styles.buttonSubmit} onPress={login} >
                <Text style={{ color: 'white' }}>Accept</Text>
            </TouchableOpacity>
        </Layaut2>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        color: 'white',
        marginBottom: 40
    },
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
    buttonSubmit: {
        paddingTop: 10,
        backgroundColor: '#10ac84',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center'

    }
})

export default LoginScreem