import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { globalColor } from '../GlobalStyles'
import MapIndicator from '../Components/Map/MapIndicator'


export default function Map() {
    const imagen_mapa = require('../Images/mapa_2024.png')
    
    
    
  
    return (
    <View style={styles.mainContainer}>
        <MapIndicator leftPadding={425}></MapIndicator>
      <Image source={imagen_mapa}/>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.background,
        transform: [{rotate: '90deg'}, {scale: 0.5}]
    }
})