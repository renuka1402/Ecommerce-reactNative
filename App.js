// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// import auth from "@react-native-firebase/auth";


// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSignup = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match!");
//       return;
//     }

  //   try {
  //   const authapp=  await auth().createUserWithEmailAndPassword(email, password)
  //     Alert.alert("Success", "Account created successfully!");
   
   
  //     console.log(authapp)
  //   } catch (error) {
  //     console.log(error.message)
  //     Alert.alert("Error", error.message);
  //     console.log(error.message)
  //   }
  // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Signup</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
      
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
    
//       />
//       <Button title="Signup" onPress={handleSignup} />
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
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     color:"#000",
//   },
// });

// export default App;





import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import SignupScreen from "./screen/Signup";
import LoginScreen from "./screen/login";
import ForgotPasswordScreen from "./screen/password";
import SplashScreen from "./screen/open";
import store from "./screen/store";
import Slider from "./screen/Slider";
import Slider1 from "./screen/Slider1";
import Slider2 from "./screen/Slider2";
import HomeScreen from "./screen/home";
import BottomTabNavigator from "./screen/buttomnav";
import ProductDetailsScreen from "./screen/product"
import CartScreen from "./screen/cartItem";
import Wishlist from "./screen/wishlist";
import Notification from "./screen/nitification";
import UserProfile from "./screen/profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
          
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Slider" component={Slider} />
          <Stack.Screen name="Slider1" component={Slider1} />
          <Stack.Screen name="Slider2" component={Slider2} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          
         
          <Stack.Screen name="home" component={BottomTabNavigator} />

          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cartscreen" component={CartScreen} />
          <Stack.Screen name="wishlist" component={Wishlist} />
     
          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen name="user" component={UserProfile}/>
     
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
