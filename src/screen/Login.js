import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setShowForgotPassword(false);

    let isValid = true;

    if (!email) {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address!");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required!");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters!");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await auth().signInWithEmailAndPassword(email, password);
      setModalMessage("Login successful!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("home");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setModalMessage("No account found with this email.");
      } else if (error.code === "auth/invalid-credential") {
        setModalMessage("Incorrect password. Please try again.");
        setShowForgotPassword(true);
      } else {
        setModalMessage(error.message);
      }
      setModalVisible(true);
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
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input}
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        />
      </View>
    <Text style={styles.errorText}>{passwordError}</Text> 
      <Text style={styles.linkText} onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot Password?
      </Text>
      <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
        <Text style={styles.signUpText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Log In with</Text>
      <View style={styles.socialContainer}>
        <FontAwesome5 name="facebook" size={35} color="#007BFF" style={styles.socialIcon} />
        <Image source={require(".././assets/Google__G__logo.svg.png")} style={styles.icon1} />
      </View>

      <Text style={styles.loginText}>
        Don't have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Signup")}>
          Sign Up
        </Text>
      </Text>

      <Modal transparent visible={modalVisible} animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modalBox}>
      <Text style={styles.modalText}>{modalMessage}</Text>

      {showForgotPassword ? (
        <>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("ForgotPassword");
            }}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </>
      ) : (
    ""
      )}
    </View>
  </View>
</Modal>

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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 13,
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
    height: 45,
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#000",
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 8,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 12,
    marginBottom: 25,
    marginTop: -20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  forgotButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  forgotButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default LoginScreen;



// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Image } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import auth from "@react-native-firebase/auth";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   const handleLogin = async () => {
//     setEmailError("");
//     setPasswordError("");
//     setShowForgotPassword(false);

//     let isValid = true;

//     if (!email) {
//       setEmailError("Email is required!");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Enter a valid email address!");
//       isValid = false;
//     }

//     if (!password) {
//       setPasswordError("Password is required!");
//       isValid = false;
//     } else if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters!");
//       isValid = false;
//     }

//     if (!isValid) return;

//     try {
//       await auth().signInWithEmailAndPassword(email, password);
//       setModalMessage("Login successful!");
//       setModalVisible(true);
//       setTimeout(() => {
//         setModalVisible(false);
//         navigation.navigate("home");
//       }, 2000);
//     } catch (error) {
//       if (error.code === "auth/user-not-found") {
//         setModalMessage("No account found with this email.");
//       } else if (error.code === "auth/invalid-credential") {
//         setModalMessage("Incorrect password. Please try again.");
//         setShowForgotPassword(true);
//       } else {
//         setModalMessage(error.message);
//       }
//       setModalVisible(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={styles.arrow}>
//         <Ionicons name="chevron-back" size={20} color="gray" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Log In</Text>

//       <Text style={styles.label}>E-mail</Text>
//       <View style={styles.inputContainer}>
//         <Icon name="envelope" size={20} color="#555" style={styles.icon} />
//         <TextInput
//           placeholder="Your Email Address"
//           style={styles.input}
//           placeholderTextColor="gray"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError("");
//           }}
//         />
//       </View>
//       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//       <Text style={styles.label}>Password</Text>
//       <View style={styles.inputContainer}>
//         <MaterialCommunityIcons name="lock-outline" size={20} color="#555" style={styles.icon} />
//         <TextInput
//           placeholder="Enter Your Password"
//           style={styles.input}
//           placeholderTextColor="gray"
//           secureTextEntry
//           value={password}
//           onChangeText={(text) => {
//             setPassword(text);
//             setPasswordError("");
//           }}
//         />
//       </View>
//       {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//       <Text style={styles.linkText} onPress={() => navigation.navigate("ForgotPassword")}>
//         Forgot Password?
//       </Text>
//       <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
//         <Text style={styles.signUpText}>Log In</Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>Or Log In with</Text>
//       <View style={styles.socialContainer}>
//         <FontAwesome5 name="facebook" size={35} color="#007BFF" style={styles.socialIcon} />
//         <Image source={require(".././assets/Google__G__logo.svg.png")} style={styles.icon1} />
//       </View>

//       <Text style={styles.loginText}>
//         Don't have an account?{" "}
//         <Text style={styles.linkText} onPress={() => navigation.navigate("Signup")}>
//           Sign Up
//         </Text>
//       </Text>

//       <Modal transparent visible={modalVisible} animationType="fade">
//   <View style={styles.modalContainer}>
//     <View style={styles.modalBox}>
//       <Text style={styles.modalText}>{modalMessage}</Text>

//       {showForgotPassword ? (
//         <>
//           <TouchableOpacity
//             onPress={() => {
//               setModalVisible(false);
//               navigation.navigate("ForgotPassword");
//             }}
//             style={styles.forgotButton}
//           >
//             <Text style={styles.forgotButtonText}>Forgot Password?</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
//             <Text style={styles.modalButtonText}>OK</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//     ""
//       )}
//     </View>
//   </View>
// </Modal>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   arrow: {
//     padding: 5,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     top: 50,
//     left: 20,
//     shadowColor: "white",
//     shadowRadius: 5,
//     elevation: 1,
//   },
//   title: {
//     marginTop: 50,
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   label: {
//     alignSelf: "flex-start",
//     fontSize: 15,
//     color: "black",
//     marginBottom: 10,
//     fontWeight: "bold",
//     marginLeft: 12,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: "#D1D1D1",
//     width: "95%",
//     height: 52,
//     marginBottom: 5,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     color: "#000",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     alignSelf: "flex-start",
//     marginLeft: 12,
//     marginBottom: 8,
//   },
//   linkText: {
//     color: "#007BFF",
//     fontWeight: "bold",
//     fontSize: 14,
//     alignSelf: "flex-end",
//     marginRight: 12,
//     marginBottom: 25,
//     marginTop: -8,
//   },
//   signUpButton: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 12,
//     borderRadius: 30,
//     width: "95%",
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   signUpText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   orText: {
//     marginTop: 220,
//     marginBottom: 15,
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   socialContainer: {
//     flexDirection: "row",
//     gap: 20,
//   },
//   icon1: {
//     width: 35,
//     height: 35,
//     marginTop: 3,
//   },
//   loginText: {
//     marginTop: 20,
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalBox: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//   },
//   modalButtonText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   forgotButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#007BFF",
//     borderRadius: 5,
//   },
//   forgotButtonText: {
//     color: "#fff",
//     fontSize: 14,
//   },
// });

// export default LoginScreen;
