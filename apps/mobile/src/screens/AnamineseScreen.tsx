import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// 🛑 Importamos a nova biblioteca Dropdown
// import DropDownPicker from 'react-native-dropdown-picker'; 

// Imports de navegação
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Imports de componentes (mantidos para contexto)
import ButtonComponent from "../components/ButtonComponents/ButtonComponent";
import ButtonTextComponent from "../components/ButtonComponents/ButtonTextComponent";
import { RootStackParamList } from "apps/mobile/App";
import DropDownPicker from "react-native-dropdown-picker";

// Defina sua tipagem de navegação (Genérico para compilar)
type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, 'Tabs'>;

// ➡️ Lista de itens de seleção no formato que o DropDownPicker espera
const initialItems = [
    { label: 'Perder Peso', value: 'perder_peso' },
    { label: 'Ganhar Massa Muscular', value: 'ganhar_massa' },
    { label: 'Melhorar Condicionamento', value: 'condicionamento' },
    { label: 'Manutenção', value: 'manutencao' },
];


const AnamineseScreen: React.FC = ({ }) => {
    
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    
    // 1. Estado para controlar se o dropdown está aberto ou fechado
    const [open, setOpen] = useState(false);
    // 2. Estado para o valor selecionado
    const [value, setValue] = useState(initialItems[0].value);
    // 3. Estado para a lista de itens
    const [items, setItems] = useState(initialItems);
    
    const goToHome = () => {
        navigation.navigate('Tabs', { screen: 'HomeTab', });
    };
    const goToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Muscle Guide</Text>
            
            <Text style={styles.subtitle}>
                Nos informe qual o seu objetivo procurando os nosso serviços
            </Text>

            <View style={{zIndex: 10}}> {/* ⬅️ ZIndex é crucial para que o dropdown apareça acima de outros elementos */}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    
                    // Estilos para o seu tema de fundo preto
                    style={dropdownStyles.dropdown}
                    textStyle={dropdownStyles.text}
                    placeholderStyle={dropdownStyles.text}
                    dropDownContainerStyle={dropdownStyles.dropDownContainer} // Estilo da lista que abre
                    
                    placeholder="Selecione seu Objetivo..."
                />
            </View>
            
            {/* O paddingBottom/marginTop ajusta a posição do botão para não ser coberto pelo dropdown aberto */}
            <View style={{marginTop: 50}}> 
                <ButtonComponent nome='Finalizar Cadastro' onPress={goToHome} />
            </View>
            
            <ButtonTextComponent
                nome={'Já possui uma conta?'} 
                onPress={goToLogin}/>
        </View>
    )
}

// ➡️ Estilos para o DropDownPicker (Adaptado para seu fundo preto)
const dropdownStyles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#1C1C1E',
        borderColor: '#3269D2',
        minHeight: 50,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    dropDownContainer: {
        backgroundColor: '#1C1C1E',
        borderColor: '#3269D2',
    }
});

// Estilos do contêiner principal
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 16,
        paddingTop: 224,
    },
    title: {
        color: '#3269D2',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 64
    },
    subtitle: {
        color: '#3269D2',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 64
    },
});

export default AnamineseScreen;