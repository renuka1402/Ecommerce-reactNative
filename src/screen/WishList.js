import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, emptyCart } from '../redux/Slice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Wishlist = ({ navigation }) => {
  const wishlist = useSelector(state => state.cart.wishlist);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [emptyCartModal, setEmptyCartModal] = useState(false);

  // Open delete confirmation modal
  const confirmRemoveItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Remove item if confirmed
  const handleRemoveItem = () => {
    if (selectedItem) {
      dispatch(removeFromWishlist(selectedItem.id));
    }
    setModalVisible(false);
  };

  // Empty wishlist confirmation
  const confirmEmptyCart = () => {
    setEmptyCartModal(true);
  };

  // Handle emptying the wishlist
  const handleEmptyCart = () => {
    dispatch(emptyCart());
    setEmptyCartModal(false);
  };

  return (
    
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="white" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
        <TouchableOpacity onPress={confirmEmptyCart}>
          <MaterialCommunityIcons name="delete-outline" size={20} color="white" style={styles.arrow} />
        </TouchableOpacity>
      </View>

      {/* Wishlist Items */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { product: item })}
            style={styles.productCardWrapper}
          >
            <View style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
              </View>
              <TouchableOpacity style={styles.heartIcon} onPress={() => confirmRemoveItem(item)}>
                <AntDesign name="heart" size={18} color="red" />
              </TouchableOpacity>
              <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.productRating}>⭐ {item.rating.rate}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Remove Item Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to remove this item?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleRemoveItem}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Empty Cart Confirmation Modal */}
      <Modal visible={emptyCartModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>This will remove all items from your cart. Do you want to continue?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEmptyCartModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleEmptyCart}>
                <Text style={styles.buttonText}>Empty Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  title: { fontSize: 22, color: 'white',
     marginRight: 10,
    fontWeight:"bold", },
  productRow: { justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 },
  productCardWrapper: { width: '48%' },
  productCard: {
    width: '90%',
    height: 160,
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: "rgb(244, 243, 244)",
    width: '100%',
    height: 80,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 5,
  },
  productImage: { width: '60%', height: 50, borderRadius: 1, resizeMode: 'contain' },
  heartIcon: { position: 'absolute', top: 18, right: 10 },
  productTitle: { fontSize: 14, alignSelf: "flex-start" },
  productRating: { alignSelf: "flex-start" },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: 'black', alignSelf: "flex-start" },
  arrow: {
    padding: 5,
    borderRadius: 10,
 
    justifyContent: 'center',

  },

  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: "space-around", width: '100%' },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Wishlist;
