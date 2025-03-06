import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import styles from './RegisterStyleSheet';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const checkIfEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error("Error verificando el email:", error);
      return false;
    }
  };

  const handleRegister = async () => {
    if (!form.nombres || !form.apellidos || !form.dni || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const emailExists = await checkIfEmailExists(form.email);
      if (emailExists) {
        Alert.alert('Error', 'El correo ya está registrado. Intenta iniciar sesión.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuario", user.uid), {
        uid: user.uid,
        nombres: form.nombres,
        apellidos: form.apellidos,
        dni: form.dni,
        email: form.email
      });

      Alert.alert('Éxito', 'Registro exitoso');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.transparentBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            placeholderTextColor="#888"
            value={form.nombres}
            onChangeText={(text) => handleChange('nombres', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#888"
            value={form.apellidos}
            onChangeText={(text) => handleChange('apellidos', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="DNI"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.dni}
            onChangeText={(text) => handleChange('dni', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Ionicons name="person-add-outline" size={22} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}