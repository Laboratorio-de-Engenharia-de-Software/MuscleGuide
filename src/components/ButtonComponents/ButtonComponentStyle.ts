import { StyleSheet } from "react-native";

const ButtonStyle = StyleSheet.create({
    Button: {
        backgroundColor: '#3269D2',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center', 
        borderCurve: "circular",
        borderRadius: 8

    },
    ButtonTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    ButtonText: {
        backgroundColor: 'transparent',
        marginTop: 8
    },
    ButtonTextTitle: {
        color: '#3269D2',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ButtonStyle;