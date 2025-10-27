import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    Component: {
        borderCurve: 'circular',
        borderRadius: 16,
        marginVertical: 42,
        backgroundColor: '#3269D2'
    },
    Gif: {
        height: 208,
        width: '100%',
    },
    ImageGif: {
        borderCurve: 'circular',
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
    },
    Detail: {
        padding: 16,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#1E1E1E',
        borderCurve: 'circular',
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
    },
    TextTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    TextSubtitle: {
        color: 'white',
        fontWeight: 'regular'
    },
})
