import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../Components/Navbar';
import { globalColor } from '../GlobalStyles';
import OptionDisplay from '../Components/MainButtons/OptionDisplay';
import BackButton from '../Components/GeneralButtons/BackButton';

export default function Principal (){
    const navigation = useNavigation();

    const iconsList = {
      directoryIcon: require('../navbar/book-alt.png'),
      videoIcon: require('../Icons/Main/video.png'),
      mapIcon: require('../Icons/Main/map.png')
    }

    function gotoDirectory()
    {
      navigation.navigate('directorio')
    }

    function gotoVideo()
    {
      navigation.navigate('video')
    }

    function gotoMapa()
    {
      navigation.navigate('mapa')
    }


    return (
      <View style={styles.MainContainer}>
        <View style={styles.body}> 
          <Text style={styles.title}>Opciones</Text>
        
        <View style={styles.listContainer}>
          
          <OptionDisplay title={'Directorio'} 
          description={'Consulta información de los academicos.'}
          icon={iconsList.directoryIcon}
          command={gotoDirectory} />
          
          <OptionDisplay title={'Video'} 
          description={'Video de introducción del plantel.'}
          icon={iconsList.videoIcon}
          iconBackground='purple'
          command={gotoVideo}/>


            <OptionDisplay title={'Mapa'} 
          description={'Visualiza los modulos del plantel.'}
          icon={iconsList.mapIcon}
          iconBackground='green'
          command={gotoMapa}/>
        </View>
        </View>
        <Navbar />
      </View>

    );
  }

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: globalColor.text,
        justifyContent: 'flex-start',
    },

    body:{
      flex: 9,
      marginTop: 60,
      width: '100%',
      backgroundColor: globalColor.background,
      alignItems: 'center',
    },

    listContainer: {
      marginTop: 20,

    }
   
})