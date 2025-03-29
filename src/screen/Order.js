import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const theme = useSelector((state) => state.cart.theme);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const unsubscribe = firestore()
        .collection("orders")
        .where("userId", "==", user.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders found.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.orderCard, isDarkMode && styles.darkCard]}
            onPress={() => navigation.navigate("OrderDetails", { order: item })}
          >
            <View style={styles.header}>
              <Text style={[styles.orderId, isDarkMode && styles.darkText]}>Order ID: {item.id}</Text>
              <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#ccc" : "#333"} />
            </View>
            <FlatList
              data={item.items}
              keyExtractor={(product, index) => index.toString()}
              renderItem={({ item: product }) => (
                <View style={styles.itemContainer}>
                  <Image source={{ uri: product.image }} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={[styles.name, isDarkMode && styles.darkText]}>{product.title}</Text>
                    <Text style={styles.price}>₹{product.price * product.qut}</Text>
                    <Text style={styles.qty}>Qty: {product.qut}</Text>
                  </View>
                </View>
              )}
            />
            <Text style={[styles.total, isDarkMode && styles.darkText]}>Total: ₹{item.totalAmount.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign:"center",
    backgroundColor: "#d9534f",
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    width:"90%",
    alignSelf:"center"
  
  },
  darkCard: {
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,

    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  qty: {
    fontSize: 13,
    color: "#777",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
});

export default OrderHistoryScreen;
