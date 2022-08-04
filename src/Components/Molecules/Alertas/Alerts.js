import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState,useCallback} from 'react'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Entypo,FontAwesome } from '@expo/vector-icons';

// export const SuccesAlert = ({isOpen,closeModal}) => {
export const SuccesAlert = ({isOpen}) => {
    // console.log(closeModal)
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
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Hello there</Text>
                {/* <TouchableOpacity onPress={closeModal} style={{ backgroundColor: 'green' }}>
                    <Text>OK</Text>
                </TouchableOpacity> */}
            </>
        </FancyAlert>
    )
}

