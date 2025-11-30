import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { globalColor } from '../../GlobalStyles'
import { useFocusEffect } from '@react-navigation/native';

export default function PersonDisplayer({photoUri, name, position, phone, email, header}) {

  const [open, setOpen] = useState(false);
  const [dynamicFont, setDynamicFont] = useState(13)
  const [headerText, setHeaderText] = useState('')


  function handlePress()
  {
    setOpen(!open)
  }


  function minimalComponent()
  {
    return (
    <View style={styles.main}>
      <TouchableOpacity style={[styles.container, {height: 130}]} onPress={handlePress}>
        <View style={styles.content}>
      <Image source={{uri: photoUri}} style={styles.profileImage}></Image>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.positionText}>{position}</Text>
      </View>

      <View style={styles.buttonArea}>
      </View>

      <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.nameText, {color: 'white', 
      fontSize: dynamicFont, 
      padding: 10, 
      backgroundColor: globalColor.primary, 
      borderRadius: 12, 
      alignSelf: 'center', 
      position: 'absolute',
      textAlign: 'center',
      marginBottom: 160,
      elevation: 3,
      flexShrink: 1,
      flexWrap: 'wrap',
      width: '70%',
      }]}>{header}</Text>
      

      </TouchableOpacity>
    </View>)
  }

  function extendedComponent()
  {
    return (
    <View style={styles.main}>
      <TouchableOpacity style={[styles.container, {height: 250}]} onPress={handlePress}>
        <View style={styles.content}>
      <Image source={{uri: photoUri}} style={styles.profileImage}></Image>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.positionText}>{position}</Text>
        <Text style={[styles.contactText,  {fontWeight: 'black'}]}>{phone}</Text>
        <Text style={[styles.contactText,  {fontWeight: 'black'}]}>{email}</Text>
      </View>

      <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.nameText, {color: 'white', 
      fontSize: dynamicFont, 
      padding: 10, 
      backgroundColor: globalColor.primary, 
      borderRadius: 12, 
      alignSelf: 'center', 
      position: 'absolute',
      textAlign: 'left',
      marginBottom: -170,
      marginRight: 0,
      elevation: 3,
      flexShrink: 1,
      flexWrap: 'wrap',
      width: '96%'}]}>{header}</Text>
      </TouchableOpacity>
    </View>)
  }


  return ( open ? extendedComponent() : minimalComponent())
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom:10,
    paddingTop: 30,
  },
  container: {
    width: 400,
    height: 130,
    backgroundColor: globalColor.backgroundSecondary,
    borderRadius: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
  },
  text: {
    margin: 20,
  },

  profileImage:  {
    width: 120,
    height: 120,
    borderRadius: 300,
    position: 'absolute',
    marginLeft: 10,
  },

  content: {
    marginRight: 10,
    flex: 2.7,
    justifyContent: 'center',
  },

  infoArea: {
    marginRight: 25,
    flex: 4,
  },

  buttonArea: {
    flex: 1,
  },

  nameText: {
    marginTop: 10,
    fontSize: 18, 
    color: globalColor.text, 
    fontWeight: 'bold'}
  ,
  
  positionText: {marginLeft: 5, 
    fontSize: 19, 
    fontWeight: '100'
  },
  
    contactText: {
      fontSize: 15, 
    fontWeight: '100',
    marginTop: 10,
    },
  

})