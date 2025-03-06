import React, { useRef, useEffect } from "react";
import { Animated, Modal, TouchableOpacity, Text, View, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Menu = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const openMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (visible) {
      openMenu();
    }
  }, [visible]);

  const handleNavigation = (screenName) => {
    if (screenName === "Login") {
      Alert.alert(
        "Cerrar Sesión",
        "¿Estás seguro que deseas cerrar sesión?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sí, cerrar sesión",
            onPress: () => {
              closeMenu();
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      closeMenu();
      navigation.navigate(screenName);
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={closeMenu} />

        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity activeOpacity={1} style={styles.menuContent}>
            {/* Logo */}
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            {/* Ítems del menú con iconos */}
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Profile")} activeOpacity={0.7}>
              <Ionicons name="person-outline" size={22} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Configuraciones")} activeOpacity={0.7}>
              <Ionicons name="settings-outline" size={22} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>Configuraciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Dashboard")} activeOpacity={0.7}>
              <Ionicons name="time-outline" size={22} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Ayuda")} activeOpacity={0.7}>
              <Ionicons name="help-circle-outline" size={22} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>          

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("ReporteView")} activeOpacity={0.7}>
              <Ionicons name="alert-circle-outline" size={22} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>Reportes</Text>
            </TouchableOpacity>

            {/* Cerrar sesión */}
            <TouchableOpacity style={styles.menuItemLogout} onPress={() => handleNavigation("Login")} activeOpacity={0.7}>
              <Ionicons name="log-out-outline" size={22} color="red" style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: "red" }]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backdrop: {
    flex: 1,
  },
  menuContainer: {
    width: 250,
    height: "100%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  menuContent: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  logo: {
    width: 200,
    height: 130,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
    marginLeft: -10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemLogout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
  },
});

export default Menu;