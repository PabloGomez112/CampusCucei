import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColor } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@react-navigation/elements'

export default function BackButton() {
  
    const navigation = useNavigation()
    return (
    <View style={styles.background}>
    <Button>Volver</Button>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        width: 200,
        backgroundColor: globalColor.backgroundSecondary,
        elevation: 2
    },

})