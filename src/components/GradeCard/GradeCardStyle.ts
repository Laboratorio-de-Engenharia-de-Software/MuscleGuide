import { StyleSheet } from 'react-native';


const GradeStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 8,
        gap: 16,
        borderCurve: 'circular',
        borderRadius: 8,
        marginVertical: 4,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        width: '100%',
        // backgroundColor: 'red'
    },
    subtitle: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'medium',
        width: '100%',
        // backgroundColor: 'red'
    },
})

export default GradeStyles;