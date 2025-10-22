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
        color: 'white',
    },
    input: {
        height: 45,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#1E1E1E',
        fontSize: 16,
        color: 'white'
        },
});

export default InputStyles;