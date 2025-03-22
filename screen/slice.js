import { createSlice } from '@reduxjs/toolkit';
import { Alert } from "react-native";

const initialState = {
  cartItems: [],
  wishlist: [],  // Wishlist added here
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, qut: 1 }); // Initialize quantity
      } else {
        Alert.alert("Error", "Item already in cart!");
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      let item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.qut++;  
        item.price = item.qut * (item.unitPrice || action.payload.unitPrice);  
      }
    },

    decrementQuantity: (state, action) => {
      let item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.qut > 1) {
        item.qut--;  
        item.price = item.qut * (item.unitPrice || action.payload.unitPrice);  
      }
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.wishlist=[];
    },

    // Wishlist Reducers
    addToWishlist: (state, action) => {
      const exists = state.wishlist.some(item => item.id === action.payload.id);
      if (!exists) {
        state.wishlist.push(action.payload);
      } else {
        Alert.alert("Error", "Item already in wishlist!");
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
    },
  },
});

export const { 
  addToCart, removeFromCart, emptyCart, 
  incrementQuantity, decrementQuantity, 
  addToWishlist, removeFromWishlist 
} = cartSlice.actions;

export default cartSlice.reducer;
