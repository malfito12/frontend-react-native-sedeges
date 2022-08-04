import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState,useCallback} from 'react'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Entypo,FontAwesome } from '@expo/vector-icons';

// export const SuccesAlert = ({isOpen,closeModal}) => {
export const SuccesAlert = ({isOpen,closeModal,text}) => {
    // console.log(closeModal)
    // const navigation
    return (
        <FancyAlert
            visible={isOpen}
            icon={<View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                borderRadius: 50,
                width: '100%',
            }}>
                <FontAwesome name="check" size={24} color="white" />
            </View>}
            style={{ backgroundColor: 'white' }}
        >
            <>
                <Text style={{ marginTop: -16, marginBottom: 10 }}>{text}</Text>
                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: 'green',padding:5,margin:5,borderRadius:3  }}>
                    <Text style={{color:'white',fontFamily:'Roboto_500Medium',alignSelf:'center'}}>Aceptar</Text>
                </TouchableOpacity>
            </>
        </FancyAlert>
    )
}
export const ErrorAlert = ({isOpen,closeModal,text}) => {
    // console.log(closeModal)
    return (
        <FancyAlert
            visible={isOpen}
            icon={<View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 50,
                width: '100%',
            }}>
                <FontAwesome name="close" size={24} color="white" />
            </View>}
            style={{ backgroundColor: 'white' }}
        >
            <>
                <Text style={{ marginTop: -16, marginBottom: 10 }}>{text}</Text>
                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: 'red',padding:5,margin:5,borderRadius:3 }}>
                    <Text style={{color:'white',fontFamily:'Roboto_500Medium'}}>Aceptar</Text>
                </TouchableOpacity>
            </>
        </FancyAlert>
    )
}

