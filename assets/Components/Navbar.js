import { StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { globalColor } from '../GlobalStyles';
import IconAnimatedNavbar from './IconAnimatedNavbar';
import IconStaticNavbar from './IconStaticNavbar';

export default function Navbar() {
  
    const navigation = useNavigation();
    const route = useRoute()
    const showAnim = useRef(new Animated.Value(0.2)).current


    const homeIcon = require('../navbar/home.png')
    
    const iconList = {
      profileIcon: require('../navbar/user.png'),
      notificationIcon: require('../navbar/bell.png')

    }

  useFocusEffect(
    useCallback(() => {
      Animated.spring(showAnim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }).start()


      return () => {
        showAnim.setValue(0);
      }

    }, [showAnim])
  );



    function handleHomeIcon()
    {
        navigation.navigate('inicio')
    }

    function handleProfileButton()
    {
        navigation.navigate('perfil')
    }
  
    function handleNotificationButton()
    {
      navigation.navigate('notificacion')
    }



    return (
    <View style={styles.navbar}>


        <TouchableOpacity onPress={handleHomeIcon}> 
        {
          route.name === 'inicio' ? (
            <IconAnimatedNavbar actualRoute={route.name} 
            routeName={'inicio'} icon={homeIcon} refValue={showAnim}
            command={handleHomeIcon}/>)
     :  <IconStaticNavbar actualRoute={route.name} routeName={'inicio'} icon={homeIcon}/>}
        
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleNotificationButton}>
        {
          route.name === 'extra' ?( 
          <IconAnimatedNavbar actualRoute={route.name} routeName={'extra'}
          refValue={showAnim} icon={iconList.profileIcon}/>) :
          (<IconStaticNavbar actualRoute={route.name} routeName={'extra'} icon={iconList.notificationIcon}/>) 

        }        
        </TouchableOpacity>
  


        <TouchableOpacity onPress={handleProfileButton}>
        {
          route.name === 'perfil' ?( 
          <IconAnimatedNavbar actualRoute={route.name} routeName={'perfil'}
          refValue={showAnim} icon={iconList.profileIcon}/>) :
          (<IconStaticNavbar actualRoute={route.name} routeName={'perfil'} icon={iconList.profileIcon}/>) 

        }        
        </TouchableOpacity>
    
    
    </View>
  )
}

const styles = StyleSheet.create({
    navbar: {
        flex: 0.8,
        backgroundColor: globalColor.background,
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 50,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 2,
        borderRadius: 120,
      },
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
      },
      
})