// src/routes/TabRoutes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import { TabStackParamList } from '../routes/TabRoutes';
// Importe suas telas
import HomeScreen from '../../screens/HomeScreen';
import GridScreen from '../../screens/GridScreen';
import { BicepsFlexed, Home } from 'lucide-react-native';
import { ImageBackground } from 'react-native';
// Importe outras telas de exemplo, como FoodScreen e SettingsScreen


// 🎯 Defina a tipagem específica para as abas
export type TabStackParamList = {
    HomeTab: undefined;
    TreinosTab: undefined;
};

type HomeTabScreenProps = BottomTabScreenProps<TabStackParamList, 'HomeTab'>;

export type HomeScreenProps = HomeTabScreenProps;


const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabRoutes() {
    const gridIcon = require("../../../assets/images/Icons/GridExercises.png")
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                // Estilos da própria barra de navegação
                tabBarStyle: {
                    backgroundColor: '#1E1E1E', // Fundo escuro
                    borderTopColor: '#3269D2', // Cor da borda superior
                    height: 64,
                    paddingBottom: 2,
                },
                // Estilos dos ícones/rótulos
                tabBarActiveTintColor: '#3269D2', // Cor do ícone ativo (Azul)
                tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
                headerShown: false, // Oculta o cabeçalho padrão das telas dentro da aba
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        // 🎯 Ícone: Casa
                        <Home color={color} size={size}/>
                    ),
                }}
            />

            <Tab.Screen
                name="TreinosTab"
                component={GridScreen} // Seu GridScreen se torna a aba "Treinos"
                options={{
                    title: 'Treinos',
                    tabBarIcon: ({ color, size }) => (
                        // 🎯 Ícone: Halteres (Ajuste o nome do ícone conforme sua biblioteca)
                        <BicepsFlexed color={color} size={size} />
                        // <ImageBackground
                        // style={{backgroundColor: 'red', width: 30, marginBottom: 28}}
                        //     source={gridIcon}
                        //     resizeMode='cover'
                        //     />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}