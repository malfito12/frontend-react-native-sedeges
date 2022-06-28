import { View, Text } from 'react-native'
import React from 'react'
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

export const TextTitle = (props) => {
    let [fontsLoaded] = useFonts({ Roboto_900Black });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Text style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Roboto_900Black',
            }}>{props.name}</Text>
        )
    }
}
export const TextSubTitle = (props) => {
    let [fontsLoaded] = useFonts({ Roboto_700Bold });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Text style={{
                color: 'white',
                fontSize: 16,
                // paddingVertical,
                fontFamily: 'Roboto_700Bold',
            }}>{props.name}</Text>
        )
    }
}
export const TextNormal = (props) => {
    let [fontsLoaded] = useFonts({ Roboto_500Medium });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Text style={{
                color: 'white',
                fontSize: 14,
                // paddingVertical,
                fontFamily: 'Roboto_500Medium',
            }}>{props.name}</Text>
        )
    }
}
export const TextContent = (props) => {
    let [fontsLoaded] = useFonts({ Roboto_400Regular });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Text style={{
                color: 'white',
                fontSize: 14,
                // paddingVertical,
                fontFamily: 'Roboto_400Regular',
            }}>{props.name}</Text>
        )
    }
}
export const TextLitle = (props) => {
    let [fontsLoaded] = useFonts({ Roboto_300Light });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Text style={{
                color: 'white',
                fontSize: 14,
                // paddingVertical,
                fontFamily: 'Roboto_300Light',
            }}>{props.name}</Text>
        )
    }
}


// export default Fuente