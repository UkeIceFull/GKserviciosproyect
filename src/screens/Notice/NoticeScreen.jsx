import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchNoticias } from "../../services/newsService";
import styles from "./NoticeStyleSheet";
import Ionicons from "react-native-vector-icons/Ionicons";

const NoticeScreen = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarNoticias = async () => {
      const data = await fetchNoticias();
      const noticiasFiltradas = data.filter((item) => 
        item.title.toLowerCase().includes("robo") ||
        item.title.toLowerCase().includes("asalto") ||
        item.title.toLowerCase().includes("delito") ||
        item.title.toLowerCase().includes("crimen") ||
        item.title.toLowerCase().includes("seguridad") ||
        item.title.toLowerCase().includes("policía")
      );
      setNoticias(noticiasFiltradas);
      setLoading(false);
    };
    cargarNoticias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ultimas Noticias!!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={noticias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate("NoticeDetails", { noticia: item })}
            >
              <Image source={{ uri: item.urlToImage || "https://via.placeholder.com/150" }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.source}>
                  <Ionicons name="newspaper-outline" size={16} color="gray" /> {item.source.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default NoticeScreen;