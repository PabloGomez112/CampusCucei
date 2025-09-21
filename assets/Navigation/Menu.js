import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Principal from '../Screens/Principal';
import Directorio from '../Screens/Directorio';
import SplashScreen from '../Screens/SplashScreen';
import Video from '../Screens/Video';
import Profile from '../Screens/Profile';
import Notifications from '../Screens/Notifications';

function RootStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Principal}/>
        </Stack.Navigator>
    )

}

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='splash' screenOptions={{animation: 'none'}}>
        <Stack.Screen name='splash' component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name='inicio' component={Principal} options={{headerShown: false}} />
            <Stack.Screen name='directorio' component={Directorio} options={{headerShown: false}}/>
            <Stack.Screen name='video' component={Video} options={{headerShown: false}}/>
            <Stack.Screen name='perfil' component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name='notificacion' component={Notifications} options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
