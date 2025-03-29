import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  FontAwesome from "react-native-vector-icons/Ionicons";
import  Feather  from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screen/Home";
import CartScreen from "./CartItems";
import Wishlist from "../screen/WishList";

import EditProfileScreen from "./Profile";

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
        name="Wishlist" 
        component={Wishlist} 
        options={{ tabBarIcon: () => <Feather name="heart" size={24} color="gray" /> ,
   
 
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
                <Tab.Screen 
        name="User" 
        component={EditProfileScreen} 
        options={{ tabBarIcon: () => <FontAwesome name="person" size={24} color="gray" />,
   
 
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
    }} 
      />
    </Tab.Navigator>
  );
}
