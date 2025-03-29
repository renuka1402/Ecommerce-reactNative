import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  cartItems: [],
  wishlist: [],
  theme: "light", // Default theme light
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        state.cartItems.push({ ...action.payload, qut: 1 });
      } else {
        Alert.alert("Error", "Item already in cart!");
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.qut++;
      }
    },

    decrementQuantity: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.qut > 1) {
        item.qut--;
      }
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.wishlist = [];
    },

    addToWishlist: (state, action) => {
      console.log("Adding to wishlist:", action.payload);
      const exists = state.wishlist.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.wishlist.push(action.payload);
      } else {
        Alert.alert("Error", "Item already in wishlist!");
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  incrementQuantity,
  decrementQuantity,
  addToWishlist,
  removeFromWishlist,
  toggleTheme,
} = cartSlice.actions;

export default cartSlice.reducer;
