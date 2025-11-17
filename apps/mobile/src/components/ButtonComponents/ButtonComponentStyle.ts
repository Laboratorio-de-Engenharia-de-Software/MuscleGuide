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
    ButtonStart: {
        backgroundColor: '#3269D2',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderCurve: "circular",
        borderRadius: 8,
        flexDirection: 'row'
    },
    ButtonTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    ButtonStartTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    ButtonText: {
        backgroundColor: 'transparent',
        marginTop: 8
    },
    ButtonTextTitle: {
        color: '#3269D2',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    arrowRight: {
        color: 'white'
    }
})

export default ButtonStyle;