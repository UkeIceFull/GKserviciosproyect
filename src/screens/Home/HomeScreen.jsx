import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Menu from "../../components/Menu";
import MapView, { Marker } from "react-native-maps";
import styles from "./HomeStyleSheet";

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const location = {
    latitude: -12.1191,
    longitude: -77.034,
  };

  return (
    <View style={styles.container}>
      {/* Sección superior */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Icon name="bars" size={30} color="#fff" />
        </TouchableOpacity>
        <Menu visible={menuVisible} onClose={closeMenu} />

        {/* Contenedor del mapa */}
        <View style={styles.mapContainer}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} />
          </MapView>
        </View>
      </View>

      {/* Sección inferior */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ReportScreen")}
        >
          <Icon name="flash" size={25} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Reporte</Text>
        </TouchableOpacity>
        <Text style={styles.greeting}>¡Recuerda!</Text>
        <Text style={styles.subText}>¡Reporta todos tus paquetes!</Text>
      </View>
    </View>
  );
}