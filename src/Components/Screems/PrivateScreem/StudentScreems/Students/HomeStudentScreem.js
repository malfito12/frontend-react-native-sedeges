import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Layaut from '../../../Atoms/StyleLayaut/Layaut'

const HomeStudentScreem = ({ navigation }) => {
    return (
        <Layaut>
            <View>
                <Text>HomeStudentScreem</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>ir a login</Text>
                </TouchableOpacity>
            </View>
        </Layaut>
    )
}

export default HomeStudentScreem