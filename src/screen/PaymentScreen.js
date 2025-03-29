import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Swipeable } from "react-native-gesture-handler";
import moment from "moment";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = firestore()
        .collection("notifications")

        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setNotifications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

    }
  }, []);

  const deleteNotification = (id) => {
    firestore()
      .collection("notifications").doc(id) .delete()
      .then(() => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
      })
      .catch((error) => console.error("Error deleting notification:", error));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity onPress={() => deleteNotification(id)} style={styles.deleteButton}>
      <Ionicons name="trash" size={20} color="#000" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.notificationItem}>
        <Ionicons name="notifications" size={24} color="#ffb400" />
        <View style={styles.textWrapper}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationBody}>{item.body}</Text>
        </View>
        <Text style={styles.timestamp}>
          {item.timestamp ? moment(item.timestamp.toDate()).fromNow() : "No Date"}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList data={notifications}
       keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textWrapper: {
    flex: 1,
    marginLeft:20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationBody: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    position: "absolute",
    top: 10,
    right: 15,
  },
  deleteButton: {
 borderWidth:1,
 
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 8,
    marginVertical: 20,
  },
});
