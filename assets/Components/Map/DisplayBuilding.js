import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { globalColor } from '../../GlobalStyles'




export default function DisplayBuilding({imgUri, title, description, hideCallback}) {
  const closeIcon = require('../../Icons/Map/closeButton.png')
  const valueAppear = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(valueAppear, {toValue: 1, useNativeDriver: true}).start()
  }, [])


  function hideDisplayer()
  {
    Animated.spring(valueAppear, { toValue: 0, useNativeDriver: true, speed: 10, bounciness: 0}).start(
      ({finished}) => {
        if (finished)
        { 
          hideCallback()
        }
      } 
    )
  }



  return (
    <View>
    <Animated.View style={[styles.container, {transform: [{scale: valueAppear}]}]}>
      
    <View>
      <TouchableOpacity onPress={hideDisplayer} style={{position: 'absolute', zIndex: 101, paddingBottom: 200}}>
            <Image source={closeIcon} style={{overflow: 'hidden', width:250, height: 200, left: '820%', bottom: '50%'}} width={100} height={100}></Image>
      </TouchableOpacity>
      </View>
      
      <View>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <Image style={{alignSelf: 'center', borderRadius: 15, elevation: 4}} source={{uri: imgUri}} width={800} height={450}></Image> 
        
      </View>

      
    </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {marginTop: 50,fontSize: 50, alignSelf: 'center', fontFamily: 'bold'},
  container: {width: 900, height: 760,
    marginTop: 50,
    paddingTop: 20,
    alignSelf: 'center', 
    position: 'relative',
    backgroundColor: globalColor.backgroundSecondary, 
    zIndex: 100,
    position:'absolute',
    borderRadius: 40,
    elevation: 4
    },
  descriptionText: {
    fontSize: 35,
    padding: 30,
    alignSelf: 'center'
  }
})