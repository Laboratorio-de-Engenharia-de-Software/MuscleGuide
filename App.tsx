import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import GridScreen from './src/screens/GridScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ExerciseListScreen from './src/screens/ExerciseListScreen';


export type RootStackParamList = {
  Login: undefined; // 'undefined' significa que a tela de Login não espera parâmetros
  Home: undefined;  // 'undefined' significa que a tela de Home não espera parâmetros
  Grid: undefined;  // 'undefined' significa que a tela de Home não espera parâmetros
  ExerciseList: {treinoId: string};  // 'undefined' significa que a tela de Home não espera parâmetros
  // Exemplo futuro: Profile: { userId: string; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient()


const styles = StyleSheet.create({
  globalContainer: {
    flex: 1, // Faz com que o container ocupe toda a tela
    backgroundColor: 'black', // Define o fundo como preto (ou '#121212' para um preto mais suave)
  },
});

export default function App() {
  return (
    // <View style={styles.globalContainer}>
    //   {/* <HomeScreen /> */}
    //   {/* <LoginScreen /> */}
    //   <GridScreen />
    // </View>
    <QueryClientProvider client={queryClient}>

      <NavigationContainer>
        {/* O Stack.Navigator define o sistema de navegação por pilha */}
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Grid" component={GridScreen} />
          <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
