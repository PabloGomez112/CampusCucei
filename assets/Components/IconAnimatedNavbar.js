import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'
import React from 'react'

import { globalColor } from '../GlobalStyles'

export default function IconAnimatedNavbar({actualRoute, routeName, icon, refValue}) {

    return (     
        <View style={styles.container}>
        <Animated.View style={[(actualRoute != routeName ? styles.iconContainer : styles.iconContainerSelected), {transform: [{scale: refValue}]}]}>
        </Animated.View>
        <Image style={styles.icon} source={icon}></Image>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      },
          iconContainerSelected: {
            width: 56,
            height: 56,
            borderRadius: 32,
            backgroundColor: globalColor.accent,    
          },
    
          icon: {
            width: 30,
            height: 30,
            tintColor: 'white',
            position: 'absolute'
          },
})