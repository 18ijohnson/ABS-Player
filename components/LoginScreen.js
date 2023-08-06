import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { storage } from '../global';

export default function LoginScreen({navigation}) {
    const URL = storage.getString('serverURL')

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function getLogin() {
        let body = {"username": username, "password": password}
        let response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })  
        .then(response => response.json())

        console.log(response)
        storage.set('user', JSON.stringify(response.user))

        navigation.navigate('Home')
    }

    return (
    <View style={styles.container}>
        <h1 style={styles.header}>Login</h1>
        <h5 style={styles.header}>{URL}</h5>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={event => setUsername(event.target.value)}></input>
        <label htmlFor="pwd">Password:</label>
        <input type="password" id="pwd" name="pwd" value={password} onChange={event => setPassword(event.target.value)}></input>
        <button onClick={getLogin}>Login</button>
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