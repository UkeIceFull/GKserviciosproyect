import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView, Image, Switch, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { db, storage } from "../../services/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./ReporteStyleSheet";

export default function ReporteScreen() {
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [customType, setCustomType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Activa los permisos de ubicación.");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  const pickMedia = async (fromCamera) => {
    let result = fromCamera ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 }) : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled && result.assets?.length > 0) {
      setEvidences([...evidences, result.assets[0].uri]);
    }
  };

  const uploadImages = async () => {
    try {
      const uploadTasks = evidences.map(async (uri, index) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `reportes/${Date.now()}_${index}.jpg`);
        await uploadBytes(imageRef, blob);
        return getDownloadURL(imageRef);
      });

      return await Promise.all(uploadTasks);
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
      return [];
    }
  };

  const submitReport = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Debes ingresar una descripción.");
      return;
    }

    setLoading(true);
    try {
      const imageUrls = await uploadImages();
      const reportData = {
        anonimo: anonymous,
        nombre: anonymous ? "" : name,
        email: anonymous ? "" : email,
        celular: anonymous ? "" : phone,
        dni: anonymous ? "" : dni,
        tipo: incidentType === "Otro" ? customType : incidentType,
        descripcion: description,
        ubicacion: location ? { direccion: "", latitud: location.latitude, longitud: location.longitude } : null,
        evidencias: imageUrls,
        fecha: Timestamp.now(),
      };
      await addDoc(collection(db, "reportes"), reportData);
      Alert.alert("Éxito", "Reporte enviado correctamente.");
      setAnonymous(false);
      setName("");
      setEmail("");
      setPhone("");
      setDni("");
      setIncidentType("");
      setCustomType("");
      setDescription("");
      setEvidences([]);
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el reporte.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.title}>Formulario de Denuncia</Text>

            <Switch value={anonymous} onValueChange={setAnonymous} />
            <Text>Denuncia Anónima</Text>

            {!anonymous && (
              <>
                <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDni} keyboardType="numeric" />
              </>
            )}

            <Text>Tipo de Incidente:</Text>
            <Picker selectedValue={incidentType} onValueChange={setIncidentType} style={styles.picker}>
              <Picker.Item label="Seleccione un tipo" value="" />
              <Picker.Item label="Robo" value="Robo" />
              <Picker.Item label="Extorsión" value="Extorsión" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>

            {incidentType === "Otro" && <TextInput style={styles.input} placeholder="Especifique el tipo" value={customType} onChangeText={setCustomType} />}

            <TextInput style={styles.input} placeholder="Descripción del incidente" value={description} onChangeText={setDescription} multiline />

            <Text>Ubicación:</Text>
            <View style={styles.mapContainer}>
              <MapView style={styles.map} region={location ? { latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 } : { latitude: 0, longitude: 0, latitudeDelta: 10, longitudeDelta: 10 }}>
                {location && <Marker coordinate={location} />}
              </MapView>
            </View>

            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={() => pickMedia(false)}>
                <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={() => pickMedia(true)}>
                <Text style={styles.imageButtonText}>Tomar Foto</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal>
              {evidences.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.imagePreview} />
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.submitButton} onPress={submitReport} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Enviar Reporte</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
