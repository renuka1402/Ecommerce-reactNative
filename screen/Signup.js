
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId: '615540133695-95kgv0e6b9m5n4fs8gvfjucj6d6llll5.apps.googleusercontent.com', 
// });


const SignUpScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
  
    try {
    const AuthApp=  await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login"); 
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already registered!");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "Password should be at least 6 characters!");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };
  // const onGoogleButtonPress= async ()=>{
  
   

  //   try {
  //     console.log(1);
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     console.log(12);
  //     const signInResult = await GoogleSignin.signIn();
  //     console.log(123);
      
  //     // Try the new style of google-sign in result, from v13+ of that module
  //     idToken = signInResult.data?.idToken;
      
  //     if (!idToken) {
  //     console.log(1234);
  //     // if you are using older versions of google-signin, try old style result
  //     idToken = signInResult.idToken;
  //   }
  //   console.log(12345);
  //   if (!idToken) {
  //     console.log(123456);
  //     throw new Error('No ID token found');
  //   }
  //   console.log(1234567);
    
  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);
  //   console.log(12345678);
  
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
    
  //   } catch (error) {
  //      console.log(error)
  //   }
   

  // }

  const pickImageFromCamera = async () => {
    const options = { mediaType: "photo", quality: 1, saveToPhotos: true };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorMessage) {
        console.log("Camera Error: ", response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const pickImageFromGallery = async () => {
    const options = { mediaType: "photo", quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled gallery picker");
      } else if (response.errorMessage) {
        console.log("Gallery Error: ", response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="chevron-back" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <TouchableOpacity onPress={pickImageFromGallery} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Feather name="user" size={20} color="#888" />
        )}
      </TouchableOpacity>

      <View style={styles.imageButtons}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImageFromCamera}>
          <Feather name="camera" size={18} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={pickImageFromGallery}>
          <Feather name="image" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Name Here"   placeholderTextColor="#888"   style={styles.input} value={name} onChangeText={setName} />
      </View>

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Your Email Address" style={styles.input}   placeholderTextColor="#888"   keyboardType="email-address" value={email} onChangeText={setEmail} />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Your Password"   placeholderTextColor="#888"   style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      <Text style={styles.label}>Re-Type Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Re-Type Your Password"   placeholderTextColor="#888"   style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      <TouchableOpacity style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>
          I agree with the <Text style={styles.linkText}>terms and conditions</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Sign Up with</Text>
      <View style={styles.socialContainer}>
        <FontAwesome5 name="facebook" size={35} color="#007BFF" style={styles.socialIcon} />
        <TouchableOpacity >
  <Image source={require("./images/Google__G__logo.svg.png")} style={styles.icon1} />
</TouchableOpacity>

      </View>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>Log In</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingHorizontal: 20 },

  imageContainer: { width: 60, height: 60, borderRadius: 50, backgroundColor: "#eee", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  profileImage: { width: "100%", height: "100%", borderRadius: 50 },
  imageButtons: { flexDirection: "row", gap: 10, marginBottom: 10 },
  imageButton: { flexDirection: "row", alignItems: "center",  padding: 3, borderRadius: 20, paddingHorizontal: 12 },
  imageButtonText: { color: "white", fontSize: 14, marginLeft: 5 },
  

  arrow:{
    padding: 8,
  borderRadius: 10,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 20,
  left: 20,
  shadowColor: "white",
  
  
  elevation: 5,  
    },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop:15,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10, 
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
    color:"black",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginRight: 60,
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 13,
    marginLeft: 5,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  signUpButton: {
  backgroundColor: '#007BFF',
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
    marginTop: 10,
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
    marginTop:3,
  },
  loginText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});


export default SignUpScreen;