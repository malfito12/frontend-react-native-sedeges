import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'
import { LinearGradient } from 'expo-linear-gradient'

const DataPersonScreem = ({navigation}) => {
    return (
        <Layaut>
            <View style={{ backgroundColor: 'white', marginBottom: 10, padding: 5, borderRadius: 4 }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Roboto_500Medium' }}>Datos Personales</Text>
                <TextInput
                    style={styles.styleInput}
                    placeholder='Nombre Completo'
                    placeholderTextColor='#b0bec5'
                />
                <TextInput
                    style={styles.styleInput}
                    placeholder='Apellido Paterno'
                    placeholderTextColor='#b0bec5'
                />
                <TextInput
                    style={styles.styleInput}
                    placeholder='Apellido Materno'
                    placeholderTextColor='#b0bec5'
                />
                <TextInput
                    style={styles.styleInput}
                    placeholder='Edad'
                    placeholderTextColor='#b0bec5'
                />
                <TextInput
                    style={styles.styleInput}
                    placeholder='Sexo'
                    placeholderTextColor='#b0bec5'
                />
                <TextInput
                    style={styles.styleInput}
                    placeholder='Centro de Acogida'
                    placeholderTextColor='#b0bec5'
                />
                <LinearGradient style={{ borderRadius: 2 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#00c853', '#64dd17', '#aeea00']}>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>Guardar Información</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <LinearGradient style={{ borderRadius: 2 }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#e65100', '#fb8c00', '#ffa726']}>
                <TouchableOpacity style={{ padding: 10 }} onPress={()=>navigation.navigate('CategoryTest')}>
                    <Text style={{ color: 'white', fontFamily: 'Roboto_400Regular_Italic', alignSelf: 'center' }}>INICIAR EVALUACION</Text>
                </TouchableOpacity>
            </LinearGradient>

        </Layaut>
    )
}
const styles = StyleSheet.create({
    styleInput: {
        fontFamily: 'Roboto_500Medium',
        padding: 10,
        margin: 5,
        marginHorizontal: 15,
        // borderWidth:1,
        borderRadius: 3
    },
})


export default DataPersonScreem