import { View, Text } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// ⬅️ Importa a tipagem de rotas (assumindo a mesma estrutura de diretório)

import ButtonComponent from "../components/ButtonComponents/ButtonComponent";
import ButtonTextComponent from "../components/ButtonComponents/ButtonTextComponent";
import InputEmail from "../components/InputComponents/InputEmail";
import InputSenha from "../components/InputComponents/InputSenha";
import InputTextComponent from "../components/InputComponents/InputTextComponent";
import InputDataNascimento from "../components/InputComponents/InputDataNascimento";
import { RootStackParamList } from "apps/mobile/App";

// Tipagem de navegação para a tela de Registro
type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, 'Register'>

const RegisterScreen: React.FC = ({ }) => {

    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const goToAnaminese = () => {
        navigation.navigate('Anaminese');
    };
    
    // 🚀 NOVA FUNÇÃO: Voltar para a tela de Login
    const goToLogin = () => {
        navigation.navigate('Login'); 
    };

    return (
        <View style={{ margin: 'auto', backgroundColor: 'black', height: '100%', width: '100%', padding: 16, paddingTop: 64 }} >
            <Text style={{
                color: '#3269D2',
                fontSize: 48,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 0
            }}>
                Muscle Guide
            </Text>
            <Text style={{
                color: '#3269D2',
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 0
            }}>
                Registro de Usuario
            </Text>
            <InputTextComponent label={"Nome"} placeholder={"Digite seu primeiro nome"} />
            <InputTextComponent label={"Sobrenome"} placeholder={"Digite seu sobrenome"} />
            <InputEmail />
            <InputDataNascimento />
            <InputSenha label={"Defina uma senha"} placeholder={"Mínimo de 8 caracteres"} />
            <InputSenha label={"Confirmar senha"} placeholder={"Repita a mesma senha"} />
            <ButtonComponent nome='Próximo' onPress={goToAnaminese} />

            {/* Chamada para tela de Login */}
            <ButtonTextComponent
                nome={'Já possui uma conta?'}
                onPress={goToLogin} // ⬅️ Funcao de navegacao aplicada AQUI!
            />
        </View>
    )
}

export default RegisterScreen;