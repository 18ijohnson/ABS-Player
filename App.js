import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextComponent, View } from 'react-native';

export default function App() {
  const [URL, setURL] = useState("https://abs.isaac.one")

  const [status, setStatus] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userID, setUserID] = useState("")
  const [userToken, setUserToken] = useState("")
  const [libraries, setLibraries] = useState([])
  const [libraryItems, setLibraryItems] = useState([])

  async function getStatus() {
    return fetch(`${URL}/status`)
      .then(response => response.json())
      .then(json => `Initialized: ${json.isInit}\nLanguage: ${json.language}`)
      .then(string => setStatus(string));
  };

  async function getLogin() {
    let body = {"username": username, "password": password}

    let response = await fetch(`${URL}/login`, {
      method: 'POST', 
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    response = await response.json()

    setUserID(response.user.id)
    setUserToken(response.user.token)

    getLibraries(response.user.token)
  }

  async function getLibraries(token) {
    let newLibraries = []

    let response = await fetch(`${URL}/api/libraries`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    response = await response.json()

    response.libraries.forEach(library => {
      newLibraries.push(library.name)
    });

    setLibraries(newLibraries.join('\r\n'))
    getLibraryItems(token, response.libraries[0].id)
  }

  async function getLibraryItems(token, libraryID) {
    let items = []

    let response = await fetch(`${URL}/api/libraries/${libraryID}/items`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(json => { return json })

    response.results.forEach(result => {
      items.push(result.media.metadata.title)
    })

    setLibraryItems(items.join('\r\n'))

  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
        />
      </Stack.Navigator>
      <View style={styles.container}>
        <h1 style={styles.header}>Server</h1>
        <label htmlFor='ip'>Server URL:</label>
        <input type='text' id='ip' name='ip' value={URL} onChange={event => setURL(event.target.value)}></input>
        <button onClick={getStatus}>Check Status</button>
        <Text>{status}</Text>

        <h1 style={styles.header}>Login</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={event => setUsername(event.target.value)}></input>
        <label htmlFor="pwd">Password:</label>
        <input type="password" id="pwd" name="pwd" value={password} onChange={event => setPassword(event.target.value)}></input>
        <button onClick={getLogin}>Login</button>
        <Text>ID: {userID}</Text>
        <Text>Token: {userToken}</Text>

        <h1 style={styles.header}>Libraries</h1>
        <Text>{libraries}</Text>

        <h1 style={styles.header}>Items</h1>
        <Text>{libraryItems}</Text>
      </View>
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
