import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, TextComponent, View } from 'react-native';

import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import ServerSetupScreen from './components/ServerSetupScreen';
import HomeScreen from './components/HomeScreen';

import './global'

export default function App() {
    const Stack = createNativeStackNavigator()

//   async function getLibraries(token) {
//     let newLibraries = []

//     let response = await fetch(`${URL}/api/libraries`, {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     })

//     response = await response.json()

//     response.libraries.forEach(library => {
//       newLibraries.push(library.name)
//     });

//     setLibraries(newLibraries.join('\r\n'))
//     getLibraryItems(token, response.libraries[0].id)
//   }

//   async function getLibraryItems(token, libraryID) {
//     let items = []

//     let response = await fetch(`${URL}/api/libraries/${libraryID}/items`, {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     }).then(response => response.json())
//       .then(json => { return json })

//     response.results.forEach(result => {
//       items.push(result.media.metadata.title)
//     })

//     setLibraryItems(items.join('\r\n'))

//   }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Splash"
            component={SplashScreen}
        />
        <Stack.Screen
            name="ServerSetup"
            component={ServerSetupScreen}
        />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
        />
        <Stack.Screen
            name='Home'
            component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'top',
    fontFamily: 'sans-serif'
  },
  header: {
    margin: 0,
    padding: 0
  }
});
