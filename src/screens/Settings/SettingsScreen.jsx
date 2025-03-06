import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Activar Modo Oscuro
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? "#f4f3f4" : "#fff"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
});

export default SettingsScreen;