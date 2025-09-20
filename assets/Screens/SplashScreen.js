import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

export default function SplashScreen() {
    
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(fadeAnim, 
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }
        ).start((result) => handleEndAnimation());

    }, [fadeAnim])


    function handleEndAnimation(result)
    {
        navigation.replace('inicio')
    }
  
    return (
    
    <View style={styles.mainContainer}>
        <View style={styles.animationWrapper}>
      <LottieView source={require('../Animations/STUDENT.json')} autoPlay={true} style={styles.mainAnimation} />
        </View>
        <Animated.Text style={[styles.title, {opacity: fadeAnim}]}>CAMPUS CUCEI</Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 100,
    },

    animationWrapper: {
        borderRadius: 178, 
        backgroundColor: '#fff', 
        overflow: 'hidden',
    },

    mainAnimation: {
        width: 356, 
        height: 356, 
    },

    title: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#2900f7',
        textAlign: 'center',
    }



})