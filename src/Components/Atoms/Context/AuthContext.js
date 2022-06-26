import AsyncStorageLib from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useState } from 'react'
import { PORT_URL } from '../../../PortUrl/PortUrl';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState({ token: undefined })
    const [user, setUser] = useState({ user: undefined, rol: undefined })
    // const [rol, setRol] = useState({ rol: undefined })

    const login = async (e) => {
        var user_name = e.user_name.trim().replace(/\s\s+/g, ' ')
        var user_password = e.user_password.trim().replace(/\s\s+/g, ' ')
        setIsLoading(true)
        await axios.post(`${PORT_URL}login`, { user_name, user_password })
            .then((async (resp) => {
                let data = resp.data
                // setUser({ user: data.user, rol: data.rol })
                // setToken({ token: data.token })
                AsyncStorageLib.setItem('token', JSON.stringify(data.token))
                AsyncStorageLib.setItem('user', JSON.stringify(data.user))
                AsyncStorageLib.setItem('rol', JSON.stringify(data.rol))
                setIsLoading(false)
            }))
            .catch(err => {
                alert('error contraseña incorrecta')
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
        <AuthContext.Provider value={{ isLoading, token, user, login, logout }}>{children}</AuthContext.Provider>
    )
}