import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Navbar from '../Components/Navbar';
import { globalColor } from '../GlobalStyles';
import PersonDisplayer from '../Components/Directory/PersonDisplayer';

// 'https://cuceimobile.space/directorio.html'
// <WebView source={{uri: 'https://cuceimobile.space/directorio.html'}} style={{width: 350, backgroundColor: globalColor.background}}>
// </WebView>
//Testing        


export default function Directorio() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])

  // fetch('https://apicucei.onrender.com/directorio')
  
 async function loadDirectory(){
    try{
      const response = await fetch('https://apicucei.onrender.com/directorio');
      const data = await response.json();
      return data;
    }
    catch (error){
      console.error('Error fetching Directory: ', error)
      return [];
    }
  }

    useEffect(() => {
      loadDirectory().then(dataReceived => {
        setData(dataReceived);
        setIsLoading(false);
      })
    }, [])


    function loading()
    {
      return (<View style={styles.MainContainer}>
            <ActivityIndicator size={'large'}/>
          </View>)
    }

    function component()
    {

    return (
      <View style={styles.MainContainer}>
        <View style={styles.body}>
        <Text style={styles.title}> Directorio </Text>
        <View style={{marginBottom: 60}}>
          <FlatList data={data} 
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PersonDisplayer photoUri={item.image_url} name={item.name} 
          position={item.position} phone={item.phone} email={item.email} header={item.header}/>}
          keyExtractor={(item, index) => `${item.name}-${index}`}/>
        </View>
        </View>
        <Navbar />
      </View>
    );
  }

  if (isLoading) {
    return loading()
  }
  else{
    return component()
  }
}



const styles = StyleSheet.create({
  MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: globalColor.text,
  },

  body:{
    flex: 9,
    marginTop: 60,
    width: '100%',
    backgroundColor: globalColor.background,
    alignItems: 'center',
  },

  imageHomeButton: {
    width: 50,
    height: 50,

  }
 
})