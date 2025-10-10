import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'



export default function MapIndicator({leftPadding, rightPadding, bottomPadding, upPadding, onPressCallback}) {
    const location_icon = require('../../Icons/Map/location.png')
    const appearValue = useRef(new Animated.Value(0)).current;
    const MAX_SCALE_VALUE = 0.07
  

    useEffect(() => {
      Animated.spring(appearValue, {toValue: MAX_SCALE_VALUE, speed: 0.7, useNativeDriver: true}).start()
    }, [])


    return (
    <TouchableOpacity onPress={onPressCallback} style={[styles.buttonStyle, {transform: [{scale: appearValue}]} ,{left: leftPadding, right: rightPadding, top: upPadding, bottom: bottomPadding}]}>
      <Animated.Image  source={location_icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        zIndex: 99,
        opacity: 0.8
    }
})