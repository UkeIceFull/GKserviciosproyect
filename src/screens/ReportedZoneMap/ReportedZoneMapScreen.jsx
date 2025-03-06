
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import styles from "./ReportedZoneMapStyleSheet";

export default function ReportedZoneMapScreen() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [delitos, setDelitos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerDelitos();
    }, []);

    const obtenerDelitos = async () => {
        try {
            const response = await fetch("https://api-sap-senati.onrender.com/api/reporte_delitos");
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Error al obtener los delitos");
            }

            const delitosTransformados = data.map((delito) => ({
                nombre: delito.nombre || "Incidente sin nombre",
                tipo: delito.tipo || "Desconocido",
                fecha: formatoFecha(delito.fecha || "2025-03-01T14:30:00.000Z"),
                hora: formatoHora(delito.fecha || "2025-03-01T14:30:00.000Z"),
                latitud: parseFloat(delito.latitud) || -12.0464,  
                longitud: parseFloat(delito.longitud) || -77.0428
            }));

            setDelitos(delitosTransformados);
        } catch (error) {
            Alert.alert("Error", "No se pudo obtener la información de delitos.");
            console.error("Error al obtener delitos:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatoFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString("es-PE", { year: "numeric", month: "2-digit", day: "2-digit" });
    };

    const formatoHora = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", hour12: false });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: isFullScreen ? 1 : 2 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: -12.0464,
                        longitude: -77.0428,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.05,
                    }}
                >
                    {delitos.map((delito, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: delito.latitud, longitude: delito.longitud }}
                        >
                            <Callout>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>{delito.nombre}</Text>
                                    <Text>Tipo: {delito.tipo}</Text>
                                    <Text>Fecha: {delito.fecha}</Text>
                                    <Text>Hora: {delito.hora}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>

                {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}
            </View>

            <TouchableOpacity
                style={styles.fullScreenButton}
                onPress={() => setIsFullScreen(!isFullScreen)}
            >
                <Text style={styles.buttonText}>
                    {isFullScreen ? "Ver Mapa Parcial" : "Ver Mapa Completo"}
                </Text>
            </TouchableOpacity>

            <View style={{ flex: isFullScreen ? 0 : 1 }} />
        </View>
    );
}


