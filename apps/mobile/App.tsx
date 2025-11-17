import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

// Importe os componentes de Tela e o seu novo Navegador de Abas
import LoginScreen from './src/screens/LoginScreen';
import ExerciseListScreen from './src/screens/ExerciseListScreen';
import TabRoutes, { TabStackParamList } from './src/infrastructure/framework/TabRoutes'; // 🎯 Novo componente que agrupa Home e Grid
import RegisterScreen from './src/screens/RegisterScreen';
import AnamineseScreen from './src/screens/AnamineseScreen';

// =========================================================
// 1. DEFINIÇÃO DA TIPAGEM DE ROTAS (RootStackParamList)
// =========================================================

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Anaminese: undefined;
  Tabs: NavigatorScreenParams<TabStackParamList>;
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
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Anaminese" component={AnamineseScreen} />

          {/* 🎯 Tela de Abas: Contém Home e Grid. Esta tela agora substitui as rotas individuais de Home e Grid. */}
          <Stack.Screen name="Tabs" component={TabRoutes} />

          {/* Tela de Detalhe: Fica fora das abas para esconder o Navbar Bottom ao ver exercícios */}
          <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}