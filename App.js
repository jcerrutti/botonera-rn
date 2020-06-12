import React from 'react';
import { StyleSheet, View } from 'react-native';

import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <View style={styles.container}>
      <Dashboard></Dashboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
