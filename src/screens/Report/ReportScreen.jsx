import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import styles from "./ReportStyleSheet";

export default function ReportScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Cargando ubicación...");
  const [evidences, setEvidences] = useState([]);
  const [type, setType] = useState("");
  const [types] = useState(["Etregado", "Devuelto", "Atrasado", "Equivocado", "Otro"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Ha ocurrido un error al enviar tu reporte.");

  const checkmarkRef = useRef(null);
  const errorIconRef = useRef(null);

  // Function to get the dynamic placeholder based on selected incident type
  const getDescriptionPlaceholder = () => {
    if (!type) return "Toca para escribir la descripción...";

    const placeholders = {
      Entregado: "Proporciona los detalles",
      Devuelto: "Proporciona los detalles",
      Atrasado: "Proporciona los detalles",
      Equivocado: "Proporciona los detalles",
      Otro: "Proporciona los detalles",
    };

    return placeholders[type] || `Descripción de ${type}`;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permiso denegado para acceder a la ubicación");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude });
      getAddress(userLocation.coords.latitude, userLocation.coords.longitude);
    })();
  }, []);

  const getAddress = async (latitude, longitude) => {
    try {
      let [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result) {
        setAddress(`${result.street}, ${result.city}, ${result.region}, ${result.country}`);
      } else {
        setAddress("Ubicación no encontrada");
      }
    } catch (error) {
      setAddress("Error al obtener la dirección");
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    getAddress(latitude, longitude);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const pickMedia = async (fromCamera, mediaType) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status !== "granted") {
      showError("Permiso denegado", "Necesitas activar los permisos de cámara.");
      return;
    }

    let result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: mediaType,
          allowsEditing: true,
          quality: 1,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: mediaType,
          allowsEditing: true,
          quality: 1,
        });

    if (!result.canceled) {
      console.log(result.assets[0]); // Verifica qué devuelve
      setEvidences([...evidences, result.assets[0].uri]);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setType("");
    setEvidences([]);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const showError = (title, message) => {
    setErrorMessage(message || "Ha ocurrido un error al enviar tu reporte.");
    setShowErrorModal(true);

    // Animar el icono de error cuando se muestre el modal
    setTimeout(() => {
      if (errorIconRef.current) {
        errorIconRef.current.animate(
          {
            0: { scale: 0, opacity: 0 },
            0.5: { scale: 1.2, opacity: 1 },
            1: { scale: 1, opacity: 1 },
          },
          800
        );
      }
    }, 300);

    // Cerrar el modal después de 3 segundos
    setTimeout(() => {
      setShowErrorModal(false);
    }, 3000);
  };

  const handleSubmit = () => {
    // Validación básica
    if (!name.trim()) {
      showError("Error", "Por favor, ingresa tu nombre.");
      return;
    }

    if (!description.trim()) {
      showError("Error", "Por favor, describe el proceso.");
      return;
    }

    if (!type.trim()) {
      showError("Error", "Por favor, selecciona el estado del paquete.");
      return;
    }

    if (!location) {
      showError("Error", "Por favor, selecciona la ubicación en el mapa.");
      return;
    }

    const isSuccess = Math.random() > 0.3; // 70% de probabilidad de éxito para demostración

    if (isSuccess) {
      // Mostrar animación de éxito
      setShowSuccessModal(true);

      // Animar el checkmark cuando se muestre el modal
      setTimeout(() => {
        if (checkmarkRef.current) {
          checkmarkRef.current.animate(
            {
              0: { scale: 0, opacity: 0 },
              0.5: { scale: 1.2, opacity: 1 },
              1: { scale: 1, opacity: 1 },
            },
            800
          );
        }
      }, 300);

      // Cerrar el modal y restablecer el formulario después de 2.5 segundos
      setTimeout(() => {
        resetForm();
      }, 2500);
    } else {
      // Mostrar animación de error
      showError("Error de conexión", "No se pudo enviar el reporte. Por favor, verifica tu conexión e inténtalo nuevamente.");
    }
  };

  const selectType = (selectedType) => {
    setType(selectedType);
    setShowDropdown(false);

    // If user was already editing, keep the editing state
    if (!isEditingDescription && description === "") {
      setIsEditingDescription(true);
    }
  };

  const renderSuccessModal = () => {
    return (
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animatable.View style={styles.successModal} animation="zoomIn" duration={500}>
            <Animatable.View ref={checkmarkRef} style={styles.checkmarkContainer}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </Animatable.View>
            <Text style={styles.successTitle}>¡Reporte enviado!</Text>
            <Text style={styles.successMessage}>Continua asi!</Text>
          </Animatable.View>
        </View>
      </Modal>
    );
  };
  const removeEvidence = (index) => {
    setEvidences(evidences.filter((_, i) => i !== index));
  };

  const renderErrorModal = () => {
    return (
      <Modal transparent visible={showErrorModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animatable.View style={styles.errorModal} animation="zoomIn" duration={500}>
            <Animatable.View ref={errorIconRef} style={styles.errorIconContainer}>
              <View style={styles.errorCircle}>
                <Text style={styles.errorIcon}>✕</Text>
              </View>
            </Animatable.View>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.errorButton} onPress={() => setShowErrorModal(false)}>
              <Text style={styles.errorButtonText}>Entendido</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reportar Paquete</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />

      <Text style={styles.label}>Estado del Paquete</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.dropdownButtonText}>{type || "Seleccionar estado"}</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {types.map((item) => (
            <TouchableOpacity key={item} style={styles.dropdownItem} onPress={() => selectType(item)}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Descripción</Text>
      <TouchableOpacity onPress={() => setIsEditingDescription(true)}>{isEditingDescription ? <TextInput style={[styles.input, styles.textArea]} placeholder={getDescriptionPlaceholder()} multiline value={description} onChangeText={setDescription} autoFocus /> : <Text style={[styles.input, styles.textArea]}>{description || getDescriptionPlaceholder()}</Text>}</TouchableOpacity>

      <TouchableOpacity style={styles.mainButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.mainButtonText}>Seleccionar Fecha</Text>
      </TouchableOpacity>

      {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />}
      <Text style={styles.input}>{date.toLocaleDateString()}</Text>

      <Text style={styles.label}>Ubicación</Text>
      <Text style={styles.input}>📍 {address}</Text>
      <Text style={styles.input}>
        Lat: {location?.latitude} - Lon: {location?.longitude}
      </Text>

      <MapView style={styles.map} onPress={handleMapPress} initialRegion={{ latitude: -12.1191, longitude: -77.034, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
        {location && <Marker coordinate={location} />}
      </MapView>

      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity style={[styles.mediaButton, styles.cameraButton]} onPress={() => pickMedia(true, ImagePicker.MediaTypeOptions.Images)}>
          <Text style={styles.mediaButtonText}>📷 Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mediaButton, styles.galleryButton]} onPress={() => pickMedia(false, ImagePicker.MediaTypeOptions.All)}>
          <Text style={styles.mediaButtonText}>🗂 Elegir en Galeria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.evidenceContainer}>
        {evidences.map((uri, index) => (
          <View key={index} style={styles.evidenceItem}>
            <Image source={{ uri }} style={styles.evidenceImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeEvidence(index)}>
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Reporte</Text>
      </TouchableOpacity>

      {renderSuccessModal()}
      {renderErrorModal()}
    </ScrollView>
  );
}
