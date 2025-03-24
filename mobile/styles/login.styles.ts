import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
        gap: 20
    },
    input: {
        width: 250,
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
        width: 250,
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
    loginGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: 250,
        height: 60,
        marginVertical: 15
    },
    logo: {
        width: 35,
        height: 35,
    },
});

export default styles