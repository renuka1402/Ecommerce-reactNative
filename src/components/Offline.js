import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const OfflineScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#721c24",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OfflineScreen;
