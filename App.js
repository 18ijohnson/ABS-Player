import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextComponent, View } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [status, setStatus] = useState("")

  async function getStatus() {
    return fetch('https://abs.isaac.one/status')
      .then(response => response.json())
      .then(json => `Initialized: ${json.isInit}\nLanguage: ${json.language}`)
      .then(string => setStatus(string));
  };

  return (
    <View style={styles.container}>
      <h1>Server</h1>
      <label for='ip'>Server URL:</label>
      <input type='text' id='ip' name='ip' value={'https://abs.isaac.one'}></input>
      <button onClick={getStatus}>Check Status</button>
      <Text>{status}</Text>

      <h1>Login</h1>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"></input>
      <label for="pwd">Password:</label>
      <input type="password" id="pwd" name="pwd"></input>

      <h1>Status</h1>
      

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'start',
  },
});
