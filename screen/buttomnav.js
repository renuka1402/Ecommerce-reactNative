import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  FontAwesome from "react-native-vector-icons/Ionicons";
import  Feather  from "react-native-vector-icons/Ionicons";
import HomeScreen from "./home";
import CartScreen from "./cartItem";
import Wishlist from "./wishlist";
import UserProfile from "./profile";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="gray" />,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
      <Tab.Screen 
        name="Cartscreen" 
        component={CartScreen} 
        options={{ tabBarIcon: () => <Feather name="cart" size={24} color="gray" /> ,
   
 
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
            <Tab.Screen 
        name="wishlist" 
        component={Wishlist} 
        options={{ tabBarIcon: () => <Feather name="heart" size={24} color="gray" /> ,
   
 
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
                <Tab.Screen 
        name="user" 
        component={UserProfile} 
        options={{ tabBarIcon: () => <FontAwesome name="circle-user" size={24} color="gray" />,
   
 
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
    </Tab.Navigator>
  );
}
