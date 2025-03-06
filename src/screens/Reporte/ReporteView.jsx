import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ReporteViewStyleSheet";

export default function ReporteView() {
  const navigation = useNavigation();

  const renderEmptyCard = () => (
    <View style={styles.card}>
      <Text style={styles.emptyText}>Sin reportes aún</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={[]} // Puedes cambiarlo por una lista real
        renderItem={renderEmptyCard}
        keyExtractor={(item, index) => index.toString()}
      />
      
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("Reporte")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}