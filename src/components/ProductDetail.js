import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Modal,ScrollView } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../redux/Slice'; 
const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);  

  const handleAddToCart = () => {
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      setModalMessage('This item is already in your cart.');
    } else {
      dispatch(addToCart({ ...product, qut: quantity }));
      setModalMessage('Item added to cart successfully!');
    }

    setModalVisible(true);
  };
  async function displayNotification() {
  
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
    navigation.navigate("payment");
  }


  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity - 1);

  return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>


<TouchableOpacity  onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="chevron-back" size={20} color="gray" />
        </TouchableOpacity>

      <Text style={styles.categoryTitle}>Product Details</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.heartIcon}>
              <AntDesign name="hearto" size={18} color="gray" />
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>


      <View style={styles.headerContainer}>
        <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.priceHeading}>Price</Text>
      </View>

      <View style={styles.ratingPriceContainer}>
        <Text style={styles.productRating}>⭐ {product.rating.rate} (122 reviews)</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>


      <View style={styles.detailsContainer}>



        <Text style={styles.sectionTitle}>Select Color</Text>
        <View style={styles.colorContainer}>
          <View style={styles.colorBoxContainer}>
            <View style={[styles.colorBox, { backgroundColor: 'purple' }]} />
          </View>
          <View style={styles.colorBoxContainer}>
            <View style={[styles.colorBox, { backgroundColor: 'blue' }]} />
          </View>
          <View style={styles.colorBoxContainer}>
            <View style={[styles.colorBox, { backgroundColor: 'red' }]} />
          </View>
          <View style={styles.colorBoxContainer}>
            <View style={[styles.colorBox, { backgroundColor: 'green' }]} />
          </View>
        </View>




        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeBox, selectedSize === size && styles.selectedSize]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <AntDesign name="minus" size={15} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton1}>
            <AntDesign name="plus" size={15} color="white" />
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>Description</Text>
        <Text numberOfLines={2} style={styles.descriptionText}>
          {product.description}
        </Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}   onPress={handleAddToCart}>
            <Text style={styles.buttonText1}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}onPress={()=>navigation.navigate("Payment")}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10, borderRadius: 5 },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },

  imageContainer: {
    width: '100%',
    backgroundColor: "rgb(244, 243, 244)",
    height: 220,
    padding: 20,
    alignItems: 'center',
    marginTop: 20
  },
  arrow:{
    padding:5,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      position: "absolute",
    top: 20,
    left: 20,
  
    },

  productImage: { width: 150, height: 150, resizeMode: 'contain' },

  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 30,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
  },

  dotsContainer:
  {
    flexDirection: 'row',
    marginTop: 20
  },
  dot:
  {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4
  },
  activeDot:
  {
    backgroundColor: '#007BFF',
    width: 9,
    height: 7,
    marginHorizontal: 4,
    borderRadius: 5
  },

  headerContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10
  },

  productTitle:
  {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10
  },

  priceHeading:
  {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray'
  },

  ratingPriceContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5
  },

  productRating:
  {
    fontSize: 14,
    color: '#666'
  },

  productPrice:
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF'
  },

  sectionTitle:
  {
    fontSize: 16,
    fontWeight: 'bold', paddingHorizontal: 20,
    marginTop: 10
  },

  colorContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 5,

  },
  colorBoxContainer: {
    padding: 8,
    backgroundColor: "rgb(244, 243, 244)",

    borderRadius: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },

  sizeContainer:
  {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  sizeBox:
  {
    padding: 6,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
    backgroundColor: "rgb(244, 243, 244)"
  },
  selectedSize:
  {
    borderWidth: 1,
    borderColor: '#007BFF'
  },
  sizeText:
  {
    fontSize: 12
  },
  selectedSizeText:
  {
    fontSize: 12,
    color: '#007BFF'
  },

  quantityContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10
  },
  quantityButton:
  {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 30,
    alignItems: 'center'
  },
  quantityButton1:
  {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 30,
    alignItems: 'center',
    backgroundColor: '#007BFF'
  },

  descriptionText:
  {
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
    , marginTop: 5
  },
  readMore:
  {
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#007BFF'
  },

  buttonContainer:
  {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  addToCartButton:
  {
    flex: 1,
    padding: 15,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 40,
    marginRight: 10,
    alignItems: 'center'
  },
  buyNowButton:
  {
    flex: 1,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 40,
    alignItems: 'center'
  },

  buttonText:
  {
    color: "white",
    fontWeight: 'bold'
  },
  buttonText1:
  {
    color: '#007BFF',
    fontWeight: 'bold'
  },
  modalContainer: { flex: 1,
     justifyContent: 'center', 
     alignItems: 'center', 
     backgroundColor: 'rgba(0,0,0,0.5)' 
    },
  modalBox: {
     backgroundColor: '#fff',
      padding: 40,

       borderRadius: 10, 
      alignItems: 'center'
     },
  modalText: { 
    fontSize: 16
    , marginBottom: 10
   },
  modalButton: {  
      backgroundColor: "red",
    width:100,
    height:30,
    alignItems:"center",
     padding: 6,
      borderRadius: 5 ,
      marginTop:10,
    },
  modalButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default ProductDetailsScreen;



// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/Slice';

// const ProductDetailsScreen = ({ route, navigation }) => {
//   const { product } = route.params || {};

//   // Handle undefined product
//   if (!product) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>Product details not found!</Text>
//       </View>
//     );
//   }

//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const [expanded, setExpanded] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);  
//   const [modalMessage, setModalMessage] = useState('');

//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cartItems);  // Fixed Redux State

//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

//   const handleAddToCart = () => {
//     const isAlreadyInCart = cartItems.some((item) => item.id === product.id);

//     if (isAlreadyInCart) {
//       setModalMessage('This item is already in your cart.');
//     } else {
//       dispatch(addToCart({ ...product, qut: quantity }));
//       setModalMessage('Item added to cart successfully!');
//     }

//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
//         <Ionicons name="chevron-back" size={20} color="gray" />
//       </TouchableOpacity>

//       <Text style={styles.categoryTitle}>Product Details</Text>

//       <View style={styles.imageContainer}>
//         <Image source={{ uri: product.image }} style={styles.productImage} />
//         <TouchableOpacity style={styles.heartIcon}>
//           <AntDesign name="hearto" size={15} color="gray" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.headerContainer}>
//         <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
//         <Text style={styles.priceHeading}>Price</Text>
//       </View>

//       <View style={styles.ratingPriceContainer}>
//         <Text style={styles.productRating}>⭐ {product.rating.rate} (122 reviews)</Text>
//         <Text style={styles.productPrice}>${product.price}</Text>
//       </View>

//       <View style={styles.detailsContainer}>
//         <Text style={styles.sectionTitle}>Select Size</Text>
//         <View style={styles.sizeContainer}>
//           {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[styles.sizeBox, selectedSize === size && styles.selectedSize]}
//               onPress={() => setSelectedSize(size)}
//             >
//               <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Quantity</Text>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
//             <AntDesign name="minus" size={15} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{quantity}</Text>
//           <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton1}>
//             <AntDesign name="plus" size={15} color="white" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionTitle}>Description</Text>
//         <Text numberOfLines={expanded ? undefined : 2} style={styles.descriptionText}>
//           {product.description}
//         </Text>
//         <TouchableOpacity onPress={() => setExpanded(!expanded)}>
//           <Text style={styles.readMore}>{expanded ? 'Show Less' : 'Read More'}</Text>
//         </TouchableOpacity>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
//             <Text style={styles.buttonText1}>Add to Cart</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buyNowButton}>
//             <Text style={styles.buttonText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Modal for Cart Message */}
//       <Modal transparent={true} visible={modalVisible} animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalText}>{modalMessage}</Text>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
//               <Text style={styles.modalButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   arrow: {
//     padding: 5,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     position: "absolute",
//     top: 20,
//     left: 20,
//   },
//   categoryTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 20 },
//   imageContainer: { alignItems: 'center', marginTop: 20 },
//   productImage: { width: 150, height: 150, resizeMode: 'contain' },
//   heartIcon: { position: 'absolute', top: 20, right: 30, padding: 5, borderRadius: 8 },
//   headerContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
//   productTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
//   priceHeading: { fontSize: 16, fontWeight: 'bold', color: 'gray' },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
//   addToCartButton: { flex: 1, padding: 15, borderWidth: 1, borderRadius: 40, marginRight: 10, alignItems: 'center' },
//   buyNowButton: { flex: 1, padding: 15, backgroundColor: '#007BFF', borderRadius: 40, alignItems: 'center' },
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
//   modalText: { fontSize: 16, marginBottom: 10 },
//   modalButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
//   modalButtonText: { color: '#fff', fontWeight: 'bold' }
// });

// export default ProductDetailsScreen;






