import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, ScrollView } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignUpScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(" ");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: '615540133695-n56c83acspfc0131jn39b68398mmio2g.apps.googleusercontent.com',
        scopes: ['email']
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
      valid = false;
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


    const handleSignUp = async () => {
      if (!validate()) return;
      try {
        const Auth = await auth().createUserWithEmailAndPassword(email, password);
        const user = Auth.user;
        await firestore().collection('users').doc(user.uid).set({
          name, email, profileImage
        });
        setModalMessage("Account created successfully!");
        setModalVisible(true);
        setTimeout(() => navigation.navigate("Login"), 2000);
      } catch (error) {
        setModalMessage(error.message);
        setModalVisible(true);
      }
  
  

    try {
      const Auth = await auth().createUserWithEmailAndPassword(email, password);
      const user = Auth.user;

      await firestore().collection('users').doc(user.uid).set({
        name: name,
        email: email,
        password: password,
        profileImage: profileImage || "",
      });

      setModalMessage("Account created successfully!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered!";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters!";
      }
      setModalMessage(errorMessage);
      setModalVisible(true);
    }
  };

  const pickImageFromCamera = async () => {
    const options = { mediaType: "photo", quality: 1, saveToPhotos: true };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("cencel");
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
        setProfileImage(response.assets[0]?.uri);
      }
    });
  };
  // async function onGoogleButtonPress() {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const signInResult = await GoogleSignin.signIn();

  //   // Try the new style of google-sign in result, from v13+ of that module
  //   idToken = signInResult.data?.idToken;
  //   if (!idToken) {
  //     // if you are using older versions of google-signin, try old style result
  //     idToken = signInResult.idToken;
  //   }
  //   if (!idToken) {
  //     throw new Error('No ID token found');
  //   }

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="chevron-back" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <TouchableOpacity onPress={pickImageFromGallery} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (

          <Ionicons name="person-circle" size={100} color="gray" />

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
        <Feather name="user" size={18} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Name Here" placeholderTextColor="#888" style={styles.input} value={name} onChangeText={setName} />

      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={17} color="#555" style={styles.icon} />
        <TextInput placeholder="Your Email Address" style={styles.input} placeholderTextColor="#888" keyboardType="email-address" value={email} onChangeText={setEmail} />
          
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Your Password" placeholderTextColor="#888" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
       
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <Text style={styles.label}>Re-Type Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput placeholder="Re-Type Your Password" placeholderTextColor="#888" style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

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
        <TouchableOpacity
        >
          <Image source={require(".././assets/Google__G__logo.svg.png")} style={styles.icon1} />
        </TouchableOpacity>

      </View>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>Log In</Text>
      </Text>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    fontFamily: "Poppins-Medium",
  },
  errorText: { color: "#d9534f",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 2,},

  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,

    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  },
  imageButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 1
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderRadius: 20,
    paddingHorizontal: 12
  },
  imageButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5
  },


  arrow: {
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
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 13,
    color: "black",
    marginBottom: 5,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop:10,
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
    height: 45,
    marginBottom: 2,
    color: "black",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginRight: 60,
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 12,
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
    marginTop:10,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 15,
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
    marginTop: 3,
  },
  loginText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default SignUpScreen