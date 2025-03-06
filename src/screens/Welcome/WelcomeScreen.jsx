import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importar íconos de Ionicons
import styles from './WelcomeStyleSheet'; // Importar estilos


export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo de la APP */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} /> 
      
      {/* Botón Ingresar */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        {/* Icono Ingresar */}
        <Ionicons name="log-in-outline" size={24} color="#fff" style={styles.icon} /> 
        <Text style={styles.buttonText}>Ingresar</Text> 
      </TouchableOpacity>

      {/* Botón Registrar */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        {/* Icono Registrar */}
        <Ionicons name="person-add-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Registrar</Text> 
      </TouchableOpacity>
    </View>
  );
}








