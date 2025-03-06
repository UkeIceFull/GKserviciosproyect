import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topSection: {
        flex: 3,
        backgroundColor: '#2D2F33',
    },
    mapContainer: {
        flex: 1,
    },
    bottomSection: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0BA2E8',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});