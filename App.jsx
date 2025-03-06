import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/navegation/AppNavigator";
import { SQLiteProvider } from "expo-sqlite";
import { setupDatabase } from "./src/Database/database";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext"; 

const AppWrapper = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <AppNavigator />
    </View>
  );
};

export default function App() {
  useEffect(() => {
    setupDatabase(); 
  }, []);

  return (
    <ThemeProvider> 
      <SQLiteProvider databaseName="users.db">
        <AppWrapper />
      </SQLiteProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
});
