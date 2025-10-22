import { View, Text } from 'react-native';
import DailyTraining from '../components/DailyTraining/DailyTraining';
import InputEmail from '../components/InputComponents/InputEmail';
import React from 'react';
import InputSenha from '../components/InputComponents/InputSenha';
import ButtonComponent from '../components/ButtonComponents/ButtonComponent';
import ButtonTextComponent from '../components/ButtonComponents/ButtonTextComponent';

interface LoginScreenProps {

}

const LoginScreen: React.FC<LoginScreenProps> = () => {
    return (
        <View style={{ margin: 'auto', marginHorizontal: 16 }} >
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
            <ButtonComponent nome='Login'/>

            <ButtonTextComponent nome={'Esqueceu a senha?'} />
            <ButtonTextComponent nome={'Registre-se'} />
        </View>
    )
};

export default LoginScreen;
