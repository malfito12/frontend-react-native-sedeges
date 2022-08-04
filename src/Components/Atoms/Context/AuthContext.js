import AsyncStorageLib from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState } from 'react'
import { PORT_URL } from '../../../PortUrl/PortUrl';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState({ token: undefined })
    const [user, setUser] = useState({ user: undefined, rol: undefined })
    const [openModal,setOpenModal] = useState(false)
    const [message,setMessage] = useState(null)
    // const [user, setUser] = useState([])
    // const [rol, setRol] = useState({ rol: undefined })

    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }
    const login = async (changeData) => {
        var user_name = changeData.user_name.trim().replace(/\s\s+/g, ' ')
        var user_password = changeData.user_password.trim().replace(/\s\s+/g, ' ')
        setIsLoading(true)
        await axios.post(`${PORT_URL}login`, { user_name, user_password })
            .then((async (resp) => {
                let data = resp.data
                // setUser(JSON.stringify(data.user))
                // setToken({ token: data.token })
                AsyncStorageLib.setItem('token', JSON.stringify(data.token))
                AsyncStorageLib.setItem('user', JSON.stringify(data.user))
                AsyncStorageLib.setItem('rol', JSON.stringify(data.rol))
                setIsLoading(false)
            }))
            .catch(err => {
                if (err.response) {
                    setOpenModal(true)
                    setMessage(err.response.data.message)
                    // alert('error contraseña incorrecta')
                    // alert(JSON.stringify(err.response.data.message))
                }
                setTimeout(() => { setOpenModal(false) }, 3000)
                setIsLoading(false)
                console.log(err)
            })

    }
    // console.log(user.rol)
    const logout = async () => {
        setIsLoading(true)
        await axios.post(`${PORT_URL}logout`, {})
            .then(resp => {
                console.log(resp.data)
                AsyncStorageLib.removeItem('token')
                AsyncStorageLib.removeItem('user')
                AsyncStorageLib.removeItem('rol')
                AsyncStorageLib.removeItem('test')
                AsyncStorageLib.removeItem('prueba')
                setIsLoading(false)
                setToken({ token: undefined })
                setUser({ user: undefined, rol: undefined })
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <AuthContext.Provider value={{ isLoading, token, user, login, logout,openModal,setOpenModal,message }}>{children}</AuthContext.Provider>
        </>
    )
}