import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { updateLibraries } from '../global'

export default function HomeScreen({navigation}) {

    //initialSetup(route.params.user.token)

    return (
    <View style={styles.container}>
        <Text>Home</Text>
        <button onClick={updateLibraries}>Update Libraries</button>
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