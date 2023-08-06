import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import {AsyncStorage} from 'react-native';

import { storage } from '../global'

export default function ServerSetupScreen({navigation}) {
    const [URL, setURL] = useState("https://abs.isaac.one");

    function getStatus() {
        fetch(`${URL}/status`).then(async response => {
            if(response.status == 200) { 
                response = await response.json() 
                return response
            } else { 
                throw new Error(response.status) 
            }
        }).then(async json => {
            console.log("Server Status: ", json)
            if(json.isInit == true) { 
                storage.set('serverURL', URL)
                navigation.navigate('Login', {URL: URL})
            }
        })

    }

    return (
        <View style={styles.container}>
            <h1 style={styles.header}>Server</h1>
            <label htmlFor='ip'>Server URL:</label>
            <input type='text' id='ip' name='ip' value={URL} onChange={event => setURL(event.target.value)}></input>
            <button onClick={getStatus}>Next</button>
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
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
  header: {
    margin: 0,
    padding: 0
  }
});