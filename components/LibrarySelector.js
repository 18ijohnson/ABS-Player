import global, { storage } from '../global'
import { StyleSheet, Text, TextComponent, View } from 'react-native';
import { MMKV } from 'react-native-mmkv'
import { useState, useEffect } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

export default function LibrarySelector() {
    const libraries = JSON.parse(storage.getString('libraries'))
    const librariesUpdated = storage.getString('librariesUpdated')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(libraries.map(library => {return {label:  library.name, value: library.id}}));

    console.log('Libs', libraries)

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Library: </Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
            />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'start',
      justifyContent: 'start',
      padding: 24,
      fontFamily: 'sans-serif'
    },
    header: {
      margin: 0,
      padding: 0
    },
    label: {
        margin: 0,
        padding: 1,
        fontWeight: 'bold',
    },
    dropdown: {
        
    }
  });