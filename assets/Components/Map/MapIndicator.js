import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function MapIndicator({leftPadding, rightPadding, bottomPadding, upPadding}) {
    const location_icon = require('../../Icons/Map/location.png')

    return (
    <TouchableOpacity style={[styles.buttonStyle, {transform: [{scale: 0.12}]} ,{left: leftPadding, right: rightPadding, top: upPadding, bottom: bottomPadding}]}>
      <Image source={location_icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        zIndex: 99
    }
})