import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputStyles from './InputStyles';

// Exemplo de Input Tipo Data de Nascimento (simulação com máscara)
const InputDataNascimento: React.FC = () => {
    const [data, setData] = useState('');
    return (
        <View style={InputStyles.container}>
            <Text style={InputStyles.label}>
                Data Nascimento
            </Text>           
            {/* <TextInputMask
                style={InputStyles.input}
                placeholder="DD/MM/AAAA"
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={data}
                onChangeText={setData}
                keyboardType="numeric"
            /> */}
        </View>
    );
};

export default InputDataNascimento;