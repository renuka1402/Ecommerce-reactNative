import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal ,ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, emptyCart, incrementQuantity, decrementQuantity } from "../redux/Slice";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import notifee, { AndroidImportance } from "@notifee/react-native";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const CustomModal = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel} style={styles.modalButtonCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.modalButtonConfirm}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  let totalPrice = cartItems.reduce((total, item) => total + item.price * item.qut, 0);
  const tax = totalPrice * 0.15;
  const grandTotal = totalPrice + tax;

  const showModal = (message, action) => {
    setModalMessage(message);
    setModalAction(() => action);
    setModalVisible(true);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission() {
    await notifee.requestPermission();
  }

  async function displayNotification() {
    if (cartItems.length === 0) {
      showModal("Cart is Empty. Please add items before proceeding to payment.", () => setModalVisible(false));
      return;
    }
    
    const user = auth().currentUser;
    if (!user) {
      showModal("You need to be logged in to proceed with payment.", () => setModalVisible(false));
      return;
    }

    const orderData = {
      userId: user.uid,
      items: cartItems,
      totalAmount: grandTotal,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };

    await firestore().collection("orders").add(orderData);

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });

    await firestore().collection("notifications").add({
      userId: user.uid,
      title: "Payment Initiated",
      body: "Your order is being processed.",
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    await notifee.displayNotification({
      title: "Payment Initiated",
      body: "Your order is being processed.",
      android: {
        channelId,
        pressAction: { id: "default" },
      },
    });
    navigation.navigate("Payment");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <CustomModal 
        visible={modalVisible} 
        message={modalMessage} 
        onConfirm={() => {
          modalAction && modalAction();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="white" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity onPress={() => showModal("This will remove all items from your cart. Continue?", () => dispatch(emptyCart()))}>
          <MaterialCommunityIcons name="delete-outline" size={20} color="white" style={styles.arrow} />
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
              <Text style={styles.price}>${item.price*item.qut}</Text>
                <TouchableOpacity onPress={() => showModal("Remove this item from cart?", () => dispatch(removeFromCart(item.id)))}>
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color="#d9534f" />
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
          <Text style={styles.orderText}>Total</Text>
          <Text style={styles.orderText}>${totalPrice}</Text>
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
      
      <TouchableOpacity style={styles.paymentButton} onPress={displayNotification}>
        <Text style={styles.paymentText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 13,
    paddingHorizontal: 20,
    width:"100%",
    marginBottom:10,

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:"white"
  },


  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    margin:10,
 alignSelf:"center",
 width:"90%",

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
   
    justifyContent: 'center',
    alignItems: 'center',
 fontWeight:"bold"

 
  },
  orderDetails: {
    width:"90%",
    backgroundColor: '#F1F3F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#007BFF',

    alignSelf:"center",
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
 
    paddingVertical: 12,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    alignSelf:"center",
    width:"90%",
    marginBottom:10
  },
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
   
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

export default CartScreen;






// const CartScreen = ({ navigation }) => {
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const dispatch = useDispatch();

//   let totalPrice = 0;
//   for (let i = 0; i < cartItems.length; i++) {
//     totalPrice += cartItems[i].price;
//   }
//   const tax = totalPrice * 0.15;
//   const grandTotal = totalPrice + tax;

//   const confirmDeleteItem = (id) => {
//     Alert.alert(
//       "Remove Item",
//       "Are you sure you want to remove this item from your cart?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Yes, Delete", onPress: () => dispatch(removeFromCart(id)), style: "destructive" }
//       ]
//     );
//   };

//   const confirmEmptyCart = () => {
//     Alert.alert(
//       " Empty Cart",
//       "This will remove all items from your cart. Do you want to continue?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Empty Cart", onPress: () => dispatch(emptyCart()), style: "destructive" }
//       ]
//     );
//   };
//   useEffect(() => {
//     requestPermission();
//   }, []);

//   async function requestPermission() {
//     await notifee.requestPermission();
//   }

//   async function displayNotification() {
//     if (cartItems.length === 0) {
//       Alert.alert("Cart is Empty", "Please add items to your cart before proceeding to payment.");
//       return;
//     }
    
//     const user = auth().currentUser;
//     if (!user) {
//       Alert.alert("Error", "You need to be logged in to proceed with payment.");
//       return;
//     }
//     const orderData = {
//       userId: user.uid,
//       items: cartItems,
//       totalAmount: grandTotal,
//       timestamp: firestore.FieldValue.serverTimestamp(),
//     };

//     await firestore().collection("orders").add(orderData);

//     const channelId = await notifee.createChannel({
//       id: "default",
//       name: "Default Channel",
//       importance: AndroidImportance.HIGH,
//     });

//     await firestore().collection("notifications").add({
//       userId: user.uid,
//       title: "Payment Initiated",
//       body: "Your order is being processed.",
//       timestamp: firestore.FieldValue.serverTimestamp(),
//     });

//     await notifee.displayNotification({
//       title: "Payment Initiated",
//       body: "Your order is being processed.",
//       android: {
//         channelId,
//         pressAction: { id: "default" },
//       },
//     });
//     navigation.navigate("payment")
//   }


//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={20} color="gray" style={styles.arrow} />
//         </TouchableOpacity>
//         <Text style={styles.title}>My Cart</Text>
//         <TouchableOpacity onPress={confirmEmptyCart}>
//           <MaterialCommunityIcons name="delete-outline" size={20} color="gray" style={styles.arrow} />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.cardContainer}>
//             <View style={styles.cartItem}>
//               <View style={styles.imageContainer}>
//                 <Image source={{ uri: item.image }} style={styles.image} />
//               </View>

//               <View style={styles.details}>
//                 <Text numberOfLines={1} style={styles.name}>{item.title}</Text>
//                 <Text style={styles.qty}>Quantity: {item.qut}</Text>
//                 <Text style={styles.price}>${item.price*item.qut}</Text>
//                 <TouchableOpacity onPress={() => confirmDeleteItem(item.id)} style={styles.removeButton}>
//                   <MaterialCommunityIcons name="trash-can-outline" size={20} color="red" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))} style={styles.qtyButton1}>
//                   <Text style={styles.qtyText}>+</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))} style={styles.qtyButton}>
//                   <Text style={styles.qtyText1}>-</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
//       />

//       <View style={styles.orderDetails}>
//         <Text style={styles.orderTitle}>Order Details</Text>
//         <View style={styles.orderRow}>
//           <Text style={styles.orderText}>Total items</Text>
//           <Text style={styles.orderText}>{cartItems.length}</Text>
//         </View>
//         <View style={styles.orderRow}>
//           <Text style={styles.orderText}>Total</Text>
//           <Text style={styles.orderText}>${totalPrice}</Text>
//         </View>
//         <View style={styles.orderRow}>
//           <Text style={styles.orderText}>Total Tax</Text>
//           <Text style={styles.orderText}>15%</Text>
//         </View>
//         <View style={styles.orderRow}>
//           <Text style={styles.grandTotalText}>Grand Total</Text>
//           <Text style={styles.grandTotalAmount}>${grandTotal}</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.paymentButton} onPress={displayNotification} >
//         <Text style={styles.paymentText}>Proceed to Payment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };