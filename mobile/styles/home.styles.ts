import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'column',
        gap: 25,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 350,
        borderRadius: 10,
    },
    textImage: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        width: '100%'
    },
    viewFullImage: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        left: 15,
    }
});

export default styles