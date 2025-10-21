import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {StyleSheet, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1, // Faz com que o container ocupe toda a tela
    backgroundColor: '#2d2c2cff', // Define o fundo como preto (ou '#121212' para um preto mais suave)
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.globalContainer}>
      <HomeScreen />
    </SafeAreaView>
  );
}
