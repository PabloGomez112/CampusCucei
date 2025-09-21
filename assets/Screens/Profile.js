import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColor } from '../GlobalStyles'
import Navbar from '../Components/Navbar'

export default function Profile() {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.body}>
      <Text style={styles.title}>Perfil</Text>
      </View>
      <View> 
      </View>
      <Navbar/>   
    </View>
    
  )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.background,
    },
    body:{
        flex: 9,
        marginTop: 60,
        width: '100%',
        backgroundColor: globalColor.background,
        alignItems: 'center',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: globalColor.text,
        justifyContent: 'flex-start',
    },
})