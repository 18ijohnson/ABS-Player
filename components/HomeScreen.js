import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { updateLibraries } from '../global'
import LibrarySelector from './LibrarySelector.js'

export default function HomeScreen({navigation}) {

    //initialSetup(route.params.user.token)

    return (
    <View style={styles.container}>
        <LibrarySelector/>
        {/* <button onClick={updateLibraries}>Update Libraries</button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'left',
    justifyContent: 'center',
    padding: 24,
    fontFamily: 'sans-serif'
  },
  header: {
    margin: 0,
    padding: 0
  }
});