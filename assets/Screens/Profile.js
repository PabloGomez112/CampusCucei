import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { globalColor } from '../GlobalStyles'
import Navbar from '../Components/Navbar'
import { Button } from '@react-navigation/elements'

export default function Profile() {
    function profileScreen()
    {
      return (
          <View style={styles.MainContainer}>
            <View style={styles.body}>
            <Text style={styles.title}>Perfil</Text>
            </View>
            <View>
                  <TextInput style={styles.textInput}></TextInput>
            </View>
            <Navbar/>   
          </View>
        )
    }
  
  function loginScreen()
  {
    return (
        <View style={styles.MainContainer}>
          <View style={styles.body}>
          <Text style={styles.title}>Perfil</Text>
            <View style={{flex: 1, justifyContent: 'center'}}>

                    <Text style={[styles.title, {marginBottom: 20}]}>Iniciar sesión</Text>
                    
                    <View style={{gap: 20}}>
                    <TextInput placeholder='Usuario' style={[styles.textInput, {paddingLeft: 10}]} />
                    <TextInput placeholder='Contraseña' style={[styles.textInput, {paddingLeft: 10}]} />
                    </View>
                    
                    <View style={{marginTop: 20}}>
                    <Button>Iniciar Sesion</Button>
                    </View>  
            </View>
          </View>
          
          <Navbar/>   
        </View>
      )
  }
  

  
    return (loginScreen())
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

    textInput: {
        width: 300,
        height: 50,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: globalColor.text,
        justifyContent: 'center',
        alignItems: 'center',
    },

})