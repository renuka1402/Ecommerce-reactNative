import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, emptyCart, incrementQuantity, decrementQuantity } from './slice';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  const tax = totalPrice * 0.15;
  const grandTotal = totalPrice + tax;

  const confirmDeleteItem = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Delete", onPress: () => dispatch(removeFromCart(id)), style: "destructive" }
      ]
    );
  };

  const confirmEmptyCart = () => {
    Alert.alert(
      " Empty Cart",
      "This will remove all items from your cart. Do you want to continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Empty Cart", onPress: () => dispatch(emptyCart()), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="gray" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity onPress={confirmEmptyCart}>
          <MaterialCommunityIcons name="delete-outline" size={20} color="gray" style={styles.arrow} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cartItem}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>

              <View style={styles.details}>
                <Text numberOfLines={1} style={styles.name}>{item.title}</Text>
                <Text style={styles.qty}>Quantity: {item.qut}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => confirmDeleteItem(item.id)} style={styles.removeButton}>
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))} style={styles.qtyButton1}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))} style={styles.qtyButton}>
                  <Text style={styles.qtyText1}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.orderDetails}>
        <Text style={styles.orderTitle}>Order Details</Text>
        <View style={styles.orderRow}>
          <Text style={styles.orderText}>Total items</Text>
          <Text style={styles.orderText}>{cartItems.length}</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderText}>Shipping Charges</Text>
          <Text style={styles.orderText}>0.00</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.grandTotalText}>Total</Text>
          <Text style={styles.grandTotalAmount}>${totalPrice}</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderText}>Total Tax</Text>
          <Text style={styles.orderText}>15%</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.grandTotalText}>Grand Total</Text>
          <Text style={styles.grandTotalAmount}>${grandTotal}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },


  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',


    shadowRadius: 5,
    elevation: 5,
    margin: 5,
  },


  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ackgroundColor: '#F8F9FA',

    borderRadius: 10,

  },


  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F1F3F6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  details: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  quantityContainer: {
    gap: 15,
  },
  qtyButton: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    shadowRadius: 5,
    elevation: 2,
  },
  qtyButton1: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginTop:-5
  },
  qtyText1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop:-7
  },
  qty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  arrow: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',


    shadowRadius: 5,
    elevation: 5,
  },
  orderDetails: {
    backgroundColor: '#F1F3F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 70,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#007BFF',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderText: {
    fontSize: 14,
    color: 'gray',
  },
  grandTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },

  paymentButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    marginTop: -50,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CartScreen;
