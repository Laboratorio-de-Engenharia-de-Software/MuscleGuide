import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1, // Faz com que o container ocupe toda a tela
    backgroundColor: 'black', // Define o fundo como preto (ou '#121212' para um preto mais suave)
  },
});

export default function App() {
  return (
    <View style={styles.globalContainer}>
      {/* <HomeScreen /> */}
      <LoginScreen />
    </View>
  );
}
