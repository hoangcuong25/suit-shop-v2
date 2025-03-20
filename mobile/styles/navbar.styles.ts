import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
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
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: -2, height: 0 },
        shadowRadius: 4,
    },
    closeDrawer: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});
