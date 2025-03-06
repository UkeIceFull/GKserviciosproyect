import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const NoticiaDetalleScreen = ({ route }) => {
  const { noticia } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: noticia.urlToImage || "https://via.placeholder.com/300" }} style={styles.image} />
      
      <Text style={styles.title}>{noticia.title}</Text>
      
      <Text style={styles.source}>
        <Ionicons name="newspaper-outline" size={18} color="gray" /> {noticia.source.name}
      </Text>

      <Text style={styles.description}>{noticia.description || "Sin descripción disponible."}</Text>

      <Text style={styles.content}>{noticia.content || "No hay más detalles disponibles."}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  source: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
});

export default NoticiaDetalleScreen;
