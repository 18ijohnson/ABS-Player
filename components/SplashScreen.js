import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { storage } from '../global';

export default function SplashScreen({navigation}) {
    useEffect(() => { 
        initialNav()
    }, [])


    function initialNav() {
        const urlExists = storage.contains('serverURL')
        const userExists = storage.contains('user')

        //todo check server status before nav

        if (urlExists) {
            const url = storage.getString('serverURL')
            console.log('Server URL: ', url)
            if (userExists) {
                const userString = storage.getString('user')
                const userJSON = JSON.parse(userString)
                console.log('User: ', userJSON)
                navigation.navigate('Home')
            } else {
                navigation.navigate('Login')
            }
        } else {
            navigation.navigate('ServerSetup')
        }

    }

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'sans-serif'
    },
    header: {
        margin: 0,
        padding: 0
    }
  });