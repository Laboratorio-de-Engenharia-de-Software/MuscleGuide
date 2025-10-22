// import { Picker } from '@react-native-picker/picker';
import InputStyles from './InputStyles';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../DailyTraining/styles';

const opcoes = [
    { label: 'Selecione', value: '' },
    { label: 'Opção A', value: 'a' },
    { label: 'Opção B', value: 'b' },
];

// Exemplo de Input Dropdown/Select
const InputDropdown: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState(opcoes[0].value);

    return (
        <View style={InputStyles.container}>
            <Text style={InputStyles.label}>Selecione uma Opção</Text>
            <View >
            {/* <View style={styles.pickerContainer}> */}
                {/* <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={styles.picker}
                >
                    {opcoes.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker> */}
            </View>
        </View>
    );
};

// Adicionar estilos específicos para o Picker
const pickerStyles = StyleSheet.create({
    pickerContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden', // Importante para o Android
        backgroundColor: '#fff',
        height: 45,
        justifyContent: 'center',
    },
    picker: {
        height: 45,
        width: '100%',
    }
});

// Adicione os estilos do picker ao styles original para que tudo funcione.
Object.assign(InputStyles, pickerStyles);