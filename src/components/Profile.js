import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Modal, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import * as ImagePicker from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/Slice";
import Icon from "react-native-vector-icons/FontAwesome";

const EditProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.cart.theme);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    requestPermission();
    createNotificationChannel();
    fetchUserData();
  }, []);

  async function requestPermission() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus !== 1) {
      console.log("Notification Permission Denied");
    }
  }

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });
  };

  const fetchUserData = async () => {
    const user = auth().currentUser;
    if (user) {
      setEmail(user.email);
      const doc = await firestore().collection("users").doc(user.uid).get();
      if (doc.exists) {
        const userData = doc.data();
        setName(userData.name || "");
        setProfileImage(userData.profileImage || "");
      }
    }
  };

  const selectImage = async () => {
    const options = { mediaType: "photo", quality: 1 };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled gallery picker");
      } else if (response.errorMessage) {
        console.log("Gallery Error: ", response.errorMessage);
      } else {
        setProfileImage(response.assets[0]?.uri);
      }
    });
  };

  const updateProfile = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;
  
      await firestore().collection("users").doc(user.uid).set(
        {
          name: name,
          profileImage: profileImage,
        },
        { merge: true }
      );
      setModalVisible(true)
      setIsLogout(false)
  
      setModalMessage("Profile updated successfully!");
  
      await notifee.displayNotification({
        title: "Profile Updated",
        body: "Your profile has been updated successfully!",
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
        },
      });
    } catch (error) {
      console.error("Profile Update Error:", error);
    }
  };
  
  const handleLogout = async () => {
    setModalVisible(true)
    setIsLogout(true)
    setModalMessage("Are You Sure Logout...");
  };
  
  const handleLogoutConfirm = async () => {
    try {
      await auth().signOut();
      setModalVisible(false);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  const removeImage = () => {
    setProfileImage("");
    firestore().collection("users").doc(auth().currentUser.uid).update({ profileImage: "" });
    setModalVisible(true)
    setIsLogout(false)
  
    setModalMessage("Are You Sure Remove Profile ?");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={20} color="white" style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Profile</Text>
      <TouchableOpacity>
        <Icon name="cog" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  
    <View style={styles.profileSection}>
      <TouchableOpacity style={styles.profileImageWrapper} onPress={selectImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle" size={100} color="gray" />
        )}
        <Ionicons name="camera" size={24} color="#fff" style={styles.cameraIcon} />
      </TouchableOpacity>
        <TextInput 
          style={[styles.input, isDarkMode && styles.darkInput]} 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter your name"
          placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
        />
        <Text style={[styles.email, isDarkMode && styles.darkText]}>{email}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.updateButton, { borderColor: isDarkMode ? "#fff" : "gray" }]} onPress={updateProfile}>
          <Text style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>Update</Text>
        </TouchableOpacity>
        {profileImage && (
          <TouchableOpacity style={[styles.removeButton, { borderColor: isDarkMode ? "#fff" : "gray" }]} onPress={removeImage}>
            <Text style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>

<ScrollView style={styles.menuContainer}>
  <TouchableOpacity style={styles.menuItem}   onPress={() => navigation.navigate("Notification")}>

    <View style={styles.menuLeft}>
      <Icon name="bell" size={20} color="#000" />
      <Text style={styles.menuText}>Notification</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#888" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}  onPress={() => navigation.navigate("Order")}
  >
    <View style={styles.menuLeft}>
      <Icon name="list-alt" size={20} color="#000" />
      <Text style={styles.menuText}>My Order</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#888" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Icon name="credit-card" size={20} color="#000" />
      <Text style={styles.menuText}>Payment</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#888" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("Cartscreen")}>
      <View style={styles.menuLeft}>
      <Icon name="shopping-cart" size={20} color="#000" />
      <Text style={styles.menuText}>Cart</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#888" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("Wishlist")}>
    <View style={styles.menuLeft}>
      <Icon name="heart" size={20} color="#000" />
      <Text style={styles.menuText}>Wish List</Text>
    </View>
    <Icon name="chevron-right" size={16} color="#888" />
  </TouchableOpacity>
</ScrollView>

<Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
  <View style={styles.modalButtons}>
            {/* Confirm Logout Button */}
            {isLogout ? (
              <TouchableOpacity onPress={handleLogoutConfirm} style={styles.modalButtonConfirm}>
                <Text style={styles.modalButtonText}>Confirm Logout</Text>
              </TouchableOpacity>
            ) : null}

            {/* OK Button for Update & Remove */}
      

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButtonCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            {!isLogout && (
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButtonConfirm}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            )}</View>
          </View>
        </View>
      </Modal>
        <TouchableOpacity style={[styles.logoutButton, { borderColor: isDarkMode ? "#fff" : "gray" }]} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>Logout</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 2,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },

  darkContainer: {
    backgroundColor: "#121212",
  },
  orderCard: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
  
    position: "relative",
 
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007BFF",
    padding: 3,
    borderRadius: 15,
  },
  input: {
    fontSize: 18,
    textAlign: "center",
    width: 100,
    fontWeight:"bold",

   


  },
  darkInput: {
    color: "#fff",
    borderBottomColor: "#555",
  },
  email: {
    fontSize: 16,
    color: "#777",

  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginTop: 10,
    gap:20,
    marginLeft:50,
  },
  updateButton: {

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0056b3",
    alignItems: "center",
  },
  removeButton: {

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a71d2a",
    alignItems: "center",
  },
  logoutButton: {
    
width:"90%",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
    alignSelf:"center",
    marginBottom:20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  themeToggle: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "70%",
    height:150,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent:"center",
   gap:10,
   marginTop:10,
  },
  modalButtonCancel: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonConfirm: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  
});


export default EditProfileScreen;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
// } from "react-native";
// import auth from "@react-native-firebase/auth";

// const EditProfileScreen = ({ navigation }) => {
//   const [logoutModalVisible, setLogoutModalVisible] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       navigation.navigate("Login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//     setLogoutModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.logoutButton}
//         onPress={() => setLogoutModalVisible(true)}
//       >
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>

      // {/* Logout Confirmation Modal */}
      // <Modal
      //   animationType="slide"
      //   transparent={true}
      //   visible={logoutModalVisible}
      //   onRequestClose={() => setLogoutModalVisible(false)}
      // >
      //   <View style={styles.modalContainer}>
      //     <View style={styles.modalContent}>
      //       <Text style={styles.modalTitle}>Logout</Text>
      //       <Text style={styles.modalMessage}>
      //         Are you sure you want to log out?
      //       </Text>

      //       <View style={styles.buttonContainer}>
      //         <TouchableOpacity
      //           style={[styles.modalButton, styles.cancelButton]}
      //           onPress={() => setLogoutModalVisible(false)}
      //         >
      //           <Text style={styles.cancelText}>Cancel</Text>
      //         </TouchableOpacity>

      //         <TouchableOpacity
      //           style={[styles.modalButton, styles.confirmButton]}
      //           onPress={handleLogout}
      //         >
      //           <Text style={styles.confirmText}>Logout</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </View>
      // </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   logoutButton: {
//     backgroundColor: "#D32F2F",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   logoutButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   cancelButton: {
//     backgroundColor: "#B0BEC5",
//     marginRight: 10,
//   },
//   confirmButton: {
//     backgroundColor: "#D32F2F",
//   },
//   cancelText: {
//     color: "#000",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   confirmText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default EditProfileScreen;




