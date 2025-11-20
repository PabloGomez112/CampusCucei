import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { globalColor } from '../GlobalStyles'
import WebView from 'react-native-webview'
import { supabase } from '../API/SupabaseClient'

export default function Video() {
  const [videoUri, setVideoUri] = useState('');
  
  useEffect(() => {
    const fetchVideo = async () =>{
    try {
      const {data: source, error} = await supabase.from('sources').select('*').eq('name', 'video_institucional').single();

      if (error) {
        throw error;
      }
      
      setVideoUri(source.videoUri);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  fetchVideo();
  }, [])

  function loadingScreen()
  {
    return (<View style={styles.MainContainer}>
      <ActivityIndicator size={'large'}/>
    </View>)
  }

    return (
      <View style={styles.MainContainer}>
        <View style={styles.body}>
          <View style={{height: 260}}>
          <WebView 
          
          startInLoadingState={true} 
          renderLoading={loadingScreen} 
          source={{uri: videoUri, headers: {'Referrer-Policy': 'strict-origin-when-cross-origin'}}} 
          style={{width: 350, backgroundColor: globalColor.background}}> 
          </WebView>
          </View>
        </View>
      <Navbar></Navbar>
      </View>)
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
          height: 200,
          width: '100%',
          backgroundColor: globalColor.background,
          alignItems: 'center',
        },
    
        listContainer: {
          marginTop: 20,  
        }
})