import React, { useState } from "react";
import { TextInput, View, Text } from "react-native"; // Importe o 'Text' e 'StyleSheet'
import InputStyles from "./InputStyles";

interface InputTextComponentProp {
    label: string;
    placeholder: string;
    password?: boolean; // Tornamos opcional e definimos um default
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Adiciona mais tipos de teclado
}

const InputTextComponent: React.FC<InputTextComponentProp> = ({ 
    label, 
    placeholder, 
    password = false, // Define um valor padrão
    keyboardType = 'default' // Define um valor padrão
}) => {
    const [value, setValue] = useState('');
    
    // Este valor é controlado pelo componente pai (formulário), 
    // mas o state local é usado aqui apenas para fins de demonstração do componente de input.

    return (
        <View style={InputStyles.container}>
            <Text style={InputStyles.label}>
                {label}
            </Text>
            <TextInput 
                style={InputStyles.input}
                placeholder={placeholder}
                placeholderTextColor={'white'}
                onChangeText={setValue} // Atualiza o state local
                value={value}
                keyboardType={keyboardType}
                autoCapitalize="none"
                secureTextEntry={password} // Aplica a prop de senha
            />
        </View>
    );
}

// --- Estilos ---


export default InputTextComponent;