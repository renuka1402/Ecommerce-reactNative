// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import NetInfo from "@react-native-community/netinfo";
// import store, { persistor } from "./src/redux/Store";

// // Screens
// import SplashScreen from "./src/screen/LogoPage";
// import SignupScreen from "./src/screen/Signup";
// import LoginScreen from "./src/screen/Login";
// import ForgotPasswordScreen from "./src/screen/Password";
// import BottomTabNavigator from "./src/components/BottomNav";
// import ProductDetailsScreen from "./src/components/ProductDetail";
// import CartScreen from "./src/components/CartItems";
// import Wishlist from "./src/screen/WishList";
// import Notification from "./src/screen/Notification";
// import EditProfileScreen from "./src/components/Profile";
// import Payment from "./src/components/Payments";
// import OrderHistoryScreen from "./src/screen/Order";
// import OfflineScreen from "./src/components/Offline";
// import Slider from "./src/screen/Sliderscreen"
// import Slider1 from"./src/screen/Sliderscreen1"
// import Slider2 from "./src/screen/Sliderscreen2";

// const Stack = createStackNavigator();

// export default function App() {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {isConnected ? (
//           <NavigationContainer>
//                    <Stack.Navigator screenOptions={{ headerShown: false }}>
// <Stack.Screen name="Splash" component={SplashScreen} />
// <Stack.Screen name="Slider" component={Slider} />
// <Stack.Screen name="Slider1" component={Slider1} />
// <Stack.Screen name="Slider2" component={Slider2} />
//             <Stack.Screen name="Signup" component={SignupScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//             <Stack.Screen name="home" component={BottomTabNavigator} />
//             <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
//             <Stack.Screen name="Cartscreen" component={CartScreen} />
//             <Stack.Screen name="c" component={Wishlist} />
//             <Stack.Screen name="notification" component={Notification} />
//             <Stack.Screen name="user" component={EditProfileScreen} />
//             <Stack.Screen name="payment" component={Payment} />
//             <Stack.Screen name="order" component={OrderHistoryScreen}/>
//           </Stack.Navigator>
//           </NavigationContainer>
//         ) : (
//           <OfflineScreen onRetry={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))} />
//         )}
//       </PersistGate>
//     </Provider>
//   );
// }



import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import auth from "@react-native-firebase/auth";
import NetInfo from "@react-native-community/netinfo";
import store, { persistor } from "./src/redux/Store";
import SplashScreen from "./src/screen/LogoPage";
import SignupScreen from "./src/screen/Signup";
import LoginScreen from "./src/screen/Login";
import ForgotPasswordScreen from "./src/screen/Password";
import BottomTabNavigator from "./src/components/BottomNav";
import ProductDetailsScreen from "./src/components/ProductDetail";
import CartScreen from "./src/components/CartItems";
import Wishlist from "./src/screen/WishList";
import Notification from "./src/screen/Notification";
import EditProfileScreen from "./src/components/Profile";
import Payment from "./src/components/Payments";
import OrderHistoryScreen from "./src/screen/Order";
import OfflineScreen from "./src/components/Offline";
import Slider from "./src/screen/Sliderscreen"
import Slider1 from "./src/screen/Sliderscreen1"
import Slider2 from "./src/screen/Sliderscreen2";


const Stack = createStackNavigator();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Firebase Authentication state listener
    const unsubscribeAuth = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribeNetInfo();
      unsubscribeAuth();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isConnected ? (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <>
                
                  <Stack.Screen name="Home" component={BottomTabNavigator} />

                  <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                  <Stack.Screen name="Cartscreen" component={CartScreen} />
                  <Stack.Screen name="Wishlist" component={Wishlist} />
                  <Stack.Screen name="Notification" component={Notification} />
                  <Stack.Screen name="User" component={EditProfileScreen} />
                  <Stack.Screen name="Payment" component={Payment} />
                  <Stack.Screen name="Order" component={OrderHistoryScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Splash" component={SplashScreen} />
      
                  <Stack.Screen name="Slider" component={Slider} />
                  <Stack.Screen name="Slider1" component={Slider1} />
                  <Stack.Screen name="Slider2" component={Slider2} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <OfflineScreen onRetry={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))} />
        )}
      </PersistGate>
    </Provider>
  );
}




// // import React, { useEffect } from "react";
// // import { View, Text, Button } from "react-native";
// // import notifee, { AndroidImportance } from "@notifee/react-native";

// // const App = () => {
// //   useEffect(() => {
// //     requestPermission();
// //   }, []);

// //   // Request Notification Permission
// //   async function requestPermission() {
// //     const settings = await notifee.requestPermission();
// //     if (settings.authorizationStatus === 1) {
// //       console.log("Notification Permission Granted");
// //     } else {
// //       console.log("Notification Permission Denied");
// //     }
// //   }

// //   // Show Local Notification
// //   async function displayNotification() {
// //     await notifee.requestPermission(); // Ensure permission before showing notification

// //     const channelId = await notifee.createChannel({
// //       id: "default",
// //       name: "Default Channel",
// //       importance: AndroidImportance.HIGH,
// //     });

// //     await notifee.displayNotification({
// //       title: "Hello, Renuka! ",
// //       body: "This is your local notification using Notifee.",
// //       android: {
// //         channelId,
// //         pressAction: { id: "default" },
// //       },
// //     });
// //   }

// //   return (
// //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

// //       <Button title="Show Notification" onPress={displayNotification} />
// //     </View>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const InternetCheck = () => {
//   const [isConnected, setIsConnected] = useState(null);

//   useEffect(() => {
//     // Subscribe to network state updates
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>{isConnected ? 'Connected to Internet' : 'No Internet Connection'}</Text>
//     </View>
//   );
// };

// export default InternetCheck;
