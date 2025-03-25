import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        gap: 10
    },
    input: {
        width: 300,
        height: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontSize: 16,
        paddingHorizontal: 5,
    },
    inputHalf: {
        width: 140,
        height: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontSize: 16,
        paddingHorizontal: 5,
    },
    paswwrod: {
        position: 'absolute',
        right: 0,
        top: 30
    },
    button: {
        marginTop: 20,
        backgroundColor: 'red',
        width: 300,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
});

export default styles