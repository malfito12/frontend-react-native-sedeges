import { Alert,View, Text,TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import Layaut from '../../../../Atoms/StyleLayaut/Layaut'

// const hasUnsavedChanges = Boolean(true);
const StudentScreem = ({navigation}) => {
    // useEffect(
    //     () => navigation.addListener('beforeRemove', e => {
    //         const action = e.data.action
    //         if (!hasUnsavedChanges) {
    //             return
    //         }
    //         e.preventDefault()
    //         Alert.alert(
    //             'Estas Seguro de Salir de la APP',
    //             [
    //                 { text: 'Cancel', onPress: () => { }, style: 'cancel' },
    //                 { text: "OK", onPress: () => navigation.dispatch(action) }
    //             ]
    //         )
    //     }), [hasUnsavedChanges.navigation])
    return (
        <Layaut>
            <View>
                <Text style={{color:'white'}}>Lista de Estudiantes</Text>
            </View>
        </Layaut>
    )
}

export default StudentScreem