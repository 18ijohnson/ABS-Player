import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextComponent, View } from 'react-native';

export default function App() {
  const [status, setStatus] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userID, setUserID] = useState("")
  const [userToken, setUserToken] = useState("")

  async function getStatus() {
    return fetch('https://abs.isaac.one/status')
      .then(response => response.json())
      .then(json => `Initialized: ${json.isInit}\nLanguage: ${json.language}`)
      .then(string => setStatus(string));
  };

  async function getLogin() {
    let body = {"username": username, "password": password}

    console.log(body)

    let response = await fetch('https://abs.isaac.one/login', {
      method: 'POST', 
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    response = await response.json()

    setUserID(response.user.id)
    setUserToken(response.user.token)
  }

  return (
    <View style={styles.container}>
      <h1>Server</h1>
      <label htmlFor='ip'>Server URL:</label>
      <input type='text' id='ip' name='ip' defaultValue={'https://abs.isaac.one'}></input>
      <button onClick={getStatus}>Check Status</button>
      <Text>{status}</Text>

      <h1>Login</h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" value={username} onChange={event => setUsername(event.target.value)}></input>
      <label htmlFor="pwd">Password:</label>
      <input type="password" id="pwd" name="pwd" value={password} onChange={event => setPassword(event.target.value)}></input>
      <button onClick={getLogin}>Login</button>
      <Text>ID: {userID}</Text>
      <Text>Token: {userToken}</Text>
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
