import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Navbar from '../Components/Navbar';
import { WebView } from 'react-native-webview';
import { globalColor } from '../GlobalStyles';
import { directoryJson, jsonParsed } from '../DirectoryParsed';
import PersonDisplayer from '../Components/Directory/PersonDisplayer';

// 'https://cuceimobile.space/directorio.html'
// <WebView source={{uri: 'https://cuceimobile.space/directorio.html'}} style={{width: 350, backgroundColor: globalColor.background}}>
// </WebView>
//Testing        


export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.body}>
        <Text style={styles.title}> Directorio </Text>
        <View style={{marginBottom: 60}}>
          <FlatList data={jsonParsed} 
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PersonDisplayer photoUri={item.image_url} name={item.name} 
          position={item.position} phone={item.phone} email={item.email}/>}
          keyExtractor={(item, index) => `${item.name}-${index.toString()}`}/>
        </View>
        </View>
        <Navbar />
      </View>
    );
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