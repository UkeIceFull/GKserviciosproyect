import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#788D90',
  },
  logoContainer: {  
    position: 'absolute',
    top: 40, 
    alignItems: 'center'
  },
  logo: {  
    width: 160, 
    height: 160
  },
  // Cuadro semitransparente
  transparentBox: { 
    marginTop: 150, 
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },  
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff', 
    borderRadius: 15, 
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1, 
    borderColor: '#ddd',
  },
  input: { 
    height: 50,
    fontSize: 16,
    color: '#333'
  },
  registerButton: { 
    backgroundColor: '#FF8C00',  
    paddingVertical: 14,  
    borderRadius: 30,  
    width: '80%',  
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: { 
    color: '#FFFFFF',  
    fontSize: 18,  
    fontWeight: 'bold',  
    marginLeft: 10
  },
  icon: { 
    marginLeft: -8  
  },
});