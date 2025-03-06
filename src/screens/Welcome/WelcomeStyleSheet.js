import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#617f84' 
    },
    logo: {  
      width: 300, 
      height: 300,
      marginLeft: -20, 
    },
    title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 20 
    },
    loginButton: { 
      backgroundColor: '#0BA2E8',
      padding: 15, 
      borderRadius: 20, 
      marginTop: 20, 
      width: 200, 
      alignItems: 'center', 
      flexDirection: 'row', 
      justifyContent: 'center' 
    },
    registerButton: { 
      backgroundColor: '#FF851C',
      padding: 15, 
      borderRadius: 20, 
      marginTop: 20,
      width: 200, 
      alignItems: 'center', 
      flexDirection: 'row',
      justifyContent: 'center'  
    },
    buttonText: { 
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10 
    },
    icon: {
      marginRight: 10, 
    }
  });