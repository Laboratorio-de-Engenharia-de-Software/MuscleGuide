import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

// Importe os componentes de Tela e o seu novo Navegador de Abas
import LoginScreen from './src/screens/LoginScreen';
import ExerciseListScreen from './src/screens/ExerciseListScreen';
import TabRoutes, { TabStackParamList } from './src/routes/TabRoutes'; // 🎯 Novo componente que agrupa Home e Grid

// =========================================================
// 1. DEFINIÇÃO DA TIPAGEM DE ROTAS (RootStackParamList)
// =========================================================

export type RootStackParamList = {
  // Rotas da pilha (Stack), geralmente telas que cobrem a tela toda, 
  // como Login ou telas de detalhe que escondem a barra de navegação inferior.
  Login: undefined;

  // 🎯 Rota Principal: A tela que contém o Bottom Tab Navigator
  Tabs: NavigatorScreenParams<TabStackParamList>;
  // Rota de detalhe que recebe um parâmetro e deve ser acessada de dentro das abas
  ExerciseList: { treinoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

// =========================================================
// 2. COMPONENTE PRINCIPAL
// =========================================================

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* Stack Navigator: Gerencia a navegação principal (pilha de telas) */}
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Tela de Login: Fica fora das abas */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* 🎯 Tela de Abas: Contém Home e Grid. Esta tela agora substitui as rotas individuais de Home e Grid. */}
          <Stack.Screen name="Tabs" component={TabRoutes} />

          {/* Tela de Detalhe: Fica fora das abas para esconder o Navbar Bottom ao ver exercícios */}
          <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}