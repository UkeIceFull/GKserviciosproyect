import { StyleSheet } from "react-native";

const NoticeStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
      },
      card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
      },
      source: {
        fontSize: 14,
        color: "gray",
        marginTop: 5,
      },
});

export default NoticeStyleSheet;
