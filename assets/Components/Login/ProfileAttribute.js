import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalColor } from '../../GlobalStyles';

export default function ProfileAttribute({attributeName, data}) {
  return (
    <View>
        <View>
        <Text style={[styles.attributeName]}>{attributeName}</Text>
        </View>
        <Text style={[styles.title, styles.informationContainer]}>
            {data}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: globalColor.text,
    justifyContent: "flex-start",
  },

  attributeName: 
  {
    fontSize: 20,
    fontWeight: '300',
    color: 'rgb(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },

  informationContainer: {
    fontSize: 25,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(126, 142, 246, 0.3)",
  },
});