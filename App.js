import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Botonera Del Poder</Text>
      </View>
      <Dashboard></Dashboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: '#ff2e63',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  headerText: {
    color: '#eaeaea',
    fontSize: 20,
  },
});
