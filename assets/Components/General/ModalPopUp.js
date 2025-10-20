import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { globalColor } from '../../GlobalStyles'

export default function ModalPopUp({notificationVisible, title, body, closeCallback}) {
  return (
    <Modal
                visible={notificationVisible}
                animationType="fade"
                backdropColor={"rgba(60, 60, 60, 0.35)"}
                onRequestClose={closeCallback}

              >
                <View
                  style={{
                    flex: 1,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      width: "85%",
                      height: "35%",
                      borderRadius: 20,
                      backgroundColor: globalColor.background,
                      elevation: 10,
                    }}
                  >
                    <View style={{marginTop: 20, flex: 0.8}}>
                      <Text style={[styles.title, { alignSelf: "center", textAlign: 'justify' }]}>
                        {title}
                      </Text>
                    </View>
                    <View style={{flex: 2 , backgroundColor: "rgba(60, 60, 60, 0.05)", margin: 10, borderRadius: 10}}>
                        <Text style={[styles.body, {marginLeft: 10}]}>{body}</Text>
                    </View>
                    <View style={{flex: 0.5, width: '40%', alignSelf: 'center'}}>
                        <Button title='Aceptar' onPress={closeCallback}></Button>
                    </View>
                  </View>
                </View>
              </Modal>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: globalColor.text,
        justifyContent: "flex-start",
      },
      body: {
        fontSize: 20,
        textAlign: 'center',
        color: globalColor.text,
        fontWeight: '200'
      },
         
})