import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

import { globalColor } from '../GlobalStyles'

export default function IconStaticNavbar({ actualRoute, routeName, icon}) {
  return (
            <View style={[(actualRoute != routeName ? styles.iconContainer : styles.iconContainerSelected)]}>
            <Image style={styles.icon} source={icon}></Image>
            </View>
)
}

const styles = StyleSheet.create({
    iconContainer: {
            width: 56,
            height: 56,
            borderRadius: 32,
            backgroundColor: globalColor.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          },
    
          iconContainerSelected: {
            width: 56,
            height: 56,
            borderRadius: 32,
            backgroundColor: globalColor.accent,
            justifyContent: 'center',
            alignItems: 'center',      
          },
    
          icon: {
            margin: 20,
            width: 30,
            height: 30,
            tintColor: 'white'
          }
})