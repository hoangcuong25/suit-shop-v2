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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 16,
        paddingVertical: 50,
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
    expanded: {
        flexDirection: 'column',
        gap: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: '#f0f0f0',
    },
});
