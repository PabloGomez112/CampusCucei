import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalColor } from '../../GlobalStyles'

export default function OptionDisplay({title, description, icon, command, 
    iconBackground = globalColor.primary, title_size=32}) {
  return (
    <TouchableOpacity style={styles.container} onPress={command}> 
        <View style={styles.content}>
        <View style={[styles.iconContainer, {backgroundColor: iconBackground}]}></View>
        <Image source={icon} style={styles.icon}></Image>
        </View>
        <View style={styles.infoText}>
            <Text style={[styles.mainTitle, {fontSize: title_size}]}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.buttonArea}>
            <Image source={require('../../Icons/Main/next.png')} style={styles.nextButton}></Image>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '90%',
        backgroundColor: globalColor.backgroundSecondary,
        borderRadius: 20,
        elevation: 1,
        opacity: 0.6,
        flexDirection: 'row',
        rowGap: 0,
        marginTop: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        margin: 24,

    },
    iconContainer: {
        height: 76, 
        width: 76,
        backgroundColor: globalColor.primary,
        borderRadius: 38,
        opacity: 0.6,
        elevation: 3,

    },

    icon: {
        width: 48,
        height: 48,
        position: 'absolute',
        marginLeft: 14,
        tintColor: globalColor.text,
    },

    descriptionText: {
        fontSize: 18,
    },

    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    infoText: {
        flex: 3,
        justifyContent: 'center',
    },

    buttonArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    nextButton: {
        width: 40,
        height: 40,
        position: 'absolute',
        marginLeft: 14,
        tintColor: globalColor.text,
    }
})