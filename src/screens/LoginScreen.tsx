// LoginScreen.tsx

import { View, Text } from 'react-native';
import React from 'react';
// Importe o tipo correto do React Navigation se estiver usando
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';// Tipos de rotas de exemplo


// ...outros componentes
import InputEmail from '../components/InputComponents/InputEmail';
import InputSenha from '../components/InputComponents/InputSenha';
import ButtonComponent from '../components/ButtonComponents/ButtonComponent';
import ButtonTextComponent from '../components/ButtonComponents/ButtonTextComponent';


interface LoginScreenProps {
    // Se você estiver usando o hook useNavigation, não precisa desta interface,
    // mas se a tela for passada diretamente como prop:
    // navigation: NavigationProp<RootStackParamList, 'Login'>;
}

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>

const LoginScreen: React.FC<LoginScreenProps> = () => {
    // O hook useNavigation é a forma moderna e mais flexível de acessar a navegação
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const goToHome = () => {
        // Altere 'Register' para o nome da sua rota de cadastro
        navigation.navigate('Home');
    };

    // const goToRegister = () => {
    //     // Altere 'Register' para o nome da sua rota de cadastro
    //     navigation.navigate('Register'); 
    // };

    // const goToForgotPassword = () => {
    //     // Altere 'ForgotPassword' para o nome da sua rota de esqueci a senha
    //     navigation.navigate('ForgotPassword'); 
    // };

    return (
        <View style={{ margin: 'auto', backgroundColor: 'black', height: '100%', width: '100%', padding: 16, paddingTop: 224 }} >
            <Text style={{
                color: '#3269D2',
                fontSize: 48,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 64
            }}>
                Muscle Guide
            </Text>
            <InputEmail />
            <InputSenha />
            <ButtonComponent nome='Login' onPress={goToHome} />

            {/* Chamada para tela de Esqueceu a senha */}
            <ButtonTextComponent
                nome={'Esqueceu a senha?'}
            // onPress={goToForgotPassword} // Passa a função de navegação
            />

            {/* Chamada para tela de Registro */}
            <ButtonTextComponent
                nome={'Registre-se'}
            // onPress={goToRegister} // Passa a função de navegação
            />
        </View>
    )
};

export default LoginScreen;