import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import  Ionicons  from "react-native-vector-icons/Ionicons";

const notifications = [
  {
    id: "1",
    title: "50% OFF",
    message: "in Ultraboost all terrain Ltd shoes!!!",
    icon: require("./images/1st.png"),
    category: "Today",
  },
  {
    id: "2",
    title: "One Step ahead",
    message: "with new stylish collections every week.",
    icon: require("./images/1st.png"),
    category: "Today",
  },
  {
    id: "3",
    title: "Order Update",
    message: "Package from your order #67398 has been arrived.",
    icon: require("./images/1st.png"),
    category: "Earlier",
  },
  {
    id: "4",
    title: "70% OFF",
    message: "in Cutter and Buck Women's knit!!!",
    icon: require("./images/1st.png"),
    category: "Earlier",
  },
  {
    id: "5",
    title: "Wallet Update",
    message: "$200 added in your wallet successfully.",

    icon: require("./images/1st.png"),
    category: "Earlier",
  },
  {
    id: "6",
    title: "Order Update",
    message: "Package from your order #34867 has been arrived.",
  
    icon: require("./images/1st.png"),
    category: "Earlier",
  },
];

const Notification = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

   
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Today</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
           
          </View>
        )}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Earlier</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  clearText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  highlightCard: {
    backgroundColor: "#EAF1FE",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationMessage: {
    fontSize: 14,
    color: "gray",
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: "blue",
    borderRadius: 4,
    marginLeft: 10,
  },
});

export default Notification;
