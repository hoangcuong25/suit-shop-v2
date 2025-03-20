import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12
    },

    handBag: {
        position: 'relative',
    },

    quantiy: {
        position: 'absolute',
        top: -5,
        right: -7,
        width: 22,
        height: 22,
        backgroundColor: '#273d52',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles