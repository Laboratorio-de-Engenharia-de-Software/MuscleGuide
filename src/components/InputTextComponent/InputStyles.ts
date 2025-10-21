import { StyleSheet } from "react-native"; // Importe o 'Text' e 'StyleSheet'

const InputStyles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
});

export default InputStyles;