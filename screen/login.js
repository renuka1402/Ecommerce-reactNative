import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "All fields are required!");
    return;
  }

  try {
    const loginAuth = await auth().signInWithEmailAndPassword(email, password);
    
    Alert.alert("Success", "Login successful!");
    
    navigation.navigate("home"); 
  } catch (error) {
    console.log("Firebase Auth Error:", error.code); 

    if (error.code === "auth/user-not-found") {
      Alert.alert("Error", "No account found with this email.");
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Error", "Incorrect password. Please try again.", [
        { text: "OK" },
        { text: "Forgot Password?", onPress: () => navigation.navigate("ForgotPassword") }
      ]);
    } else {
      Alert.alert("Error", error.message);
    }
  }
};

  

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="chevron-back" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.title}>Log In</Text>

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#555" style={styles.icon} />
        <TextInput 
          placeholder="Your Email Address" 
          style={styles.input} 
          placeholderTextColor="gray"  
          value={email} 
          onChangeText={setEmail}
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input} 
          placeholderTextColor="gray"     
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
        />
      </View>

      <Text style={styles.linkText} onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot Password?
      </Text>

      <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
        <Text style={styles.signUpText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Log In with</Text>
      <View style={styles.socialContainer}>
        <FontAwesome5 name="facebook" size={35} color="#007BFF" style={styles.socialIcon} />
        <Image source={require("./images/Google__G__logo.svg.png")} style={styles.icon1} />
      </View>

      <Text style={styles.loginText}>
        Don't have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Signup")}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
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
    shadowColor: "white",
    shadowRadius: 5,
    elevation: 1,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 15,
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    width: "95%",
    height: 52,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 12,
    marginBottom: 25,
    marginTop: -8,
  },
  signUpButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 30,
    width: "95%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
  },
  orText: {
    marginTop: 220,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
  },
  icon1: {
    width: 35,
    height: 35,
    marginTop: 3,
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;
