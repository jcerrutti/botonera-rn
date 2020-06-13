import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function SearchInput({ onSearch }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    onSearch(input.trim());
  }, [input]);

  return (
    <View style={styles.searchContainer}>
      <Text>Filtrar audios</Text>
      <TextInput style={styles.textInput} onChangeText={(text) => setInput(text)} value={input} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    borderColor: '#252a34',
    borderWidth: 1,
    width: '30%',
    marginLeft: 5,
  },
});
