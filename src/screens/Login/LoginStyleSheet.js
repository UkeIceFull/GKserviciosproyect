import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#617f84',
    paddingHorizontal: 20
  },
  logo: {  
    width: 200, 
    height: 200, 
    marginBottom: 10
  },
  // Cuadro semitransparente
  transparentBox: { 
    width: '95%', 
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    padding: 30,
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#1E6BFB',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 18,
    backgroundColor: '#FFF',
    paddingHorizontal: 10
  },
  inputIcon: {
    marginRight: 10
  },
  input: { 
    flex: 1,
    paddingVertical: 15,
    fontSize: 17,
    color: '#333'
  },
  loginButton: { 
    backgroundColor: '#0BA2E8', 
    paddingVertical: 14,
    borderRadius: 20, 
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 10
  },
  icon: { 
    marginLeft: -8 
  },
  registerText: { 
    color: '#000', 
    fontSize: 17, 
    marginTop: 20
  },
  registerLink: { 
    color: '#FF0000', 
    fontSize: 17, 
    fontWeight: 'bold' 
  },
  eyeButton: {
  position: 'absolute',
  right: 10,
  top: '40%',
  transform: [{ translateY: -10 }],
  padding: 5,
},

});
