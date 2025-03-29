import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, Keyboard, TouchableWithoutFeedback, Alert 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth"; 

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleGetCode = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email!");
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("Success", "Password reset email sent! Check your inbox.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={styles.arrow}>
          <Ionicons name="chevron-back" size={17} color="gray" />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password</Text>
        <Image source={require(".././assets/2nd.png")} style={styles.icon1} />

        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#555" style={styles.icon} />
          <TextInput
            placeholder="Your Email Address"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.getCodeButton} onPress={handleGetCode}>
          <Text style={styles.getCodeText}>Get Code</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  arrow: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    top: 50,
    left: 20,
   
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 13,
    color: "#000",
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    width: "100%",
    height: 45,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#000",
  },
  getCodeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  getCodeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
``