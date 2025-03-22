import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist,emptyCart } from './slice';
import  AntDesign from 'react-native-vector-icons/Ionicons';
import Feather  from 'react-native-vector-icons/Ionicons';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Wishlist = ({ navigation }) => {
  const wishlist = useSelector(state => state.cart.wishlist);
const dispatch=useDispatch();
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
        <Ionicons name="chevron-back" size={20} color="gray"  style={styles.arrow}/>
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
              <TouchableOpacity onPress={confirmEmptyCart}>
                 <MaterialCommunityIcons name="delete-outline" size={20} color="gray" style={styles.arrow} />
               </TouchableOpacity>
      </View>

 
      <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetails", { product: item })}
              style={styles.productCardWrapper}
            >
              <View style={styles.productCard}>
                <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.   productImage} />
                </View>
                <TouchableOpacity style={styles.heartIcon} onPress={() => dispatch(removeFromWishlist(item.id))}>
                  <AntDesign name="heart" size={18} color="red" />
                </TouchableOpacity>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                   <Text style={styles.productRating}>⭐ {item.rating.rate}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

    </View>
  );
};

const styles = StyleSheet.create({
    container: 
    { flex: 1,
       backgroundColor: '#fff',
       },
    header:
     {
      flexDirection: 'row',
       justifyContent: 'space-between', 
       alignItems: 'center',
        marginTop: 10 ,
        paddingHorizontal: 20 
      },
      productImage:
      {
          width: '60%',
          height: 70,
          borderRadius: 10,
          resizeMode: 'contain'
      },
    title:
     {
       fontSize: 20, 
       color: '#bbb',
        marginRight: 70 ,
      },
    boldText:
     {
       fontWeight: 'bold', 
       fontSize: 22,
       color:"#000"
      
       },
    iconRow: 
    { 
      flexDirection: 'row',
       gap: 15
       },
  
    bannerContainer:
     { 
      height: 150,
      paddingHorizontal: 20,
      marginTop:30, 
     },
    banner: 
    {
       width: "96%",
        height: 150,
         borderRadius: 15, 
         alignSelf: 'center'
         },
    logo:
     {
       width: 40,
        height: 40,
         borderRadius: 20 
        },
  
    categoryScroll:
     {
       marginTop: 10,
       paddingHorizontal: 20 
       },
    category: { 
      paddingVertical: 8, 
      paddingHorizontal: 16, 
      borderRadius: 20, 
      marginRight: 10, 
      backgroundColor: '#F0F0F0', 
      color: 'black', 
      fontSize: 14, 
      fontWeight: "bold" ,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    
    selectedCategory:
     {
       backgroundColor: 'black',
        color: 'white'
       },
  
    loader:
     {
       marginTop: 20
       },
  
    productRow:
     {
       justifyContent: 'space-between',
        marginTop: 20,  
         paddingHorizontal: 20 
         },
    productCardWrapper: { 
      width: '48%', 
     
   
    },
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
        alignItems: 'center' 
      },
      productImage: { 
        width: '60%', 
        height: 50, 
        borderRadius: 50, 
        resizeMode: 'contain' 
      
      },
    heartIcon: { position: 'absolute', top: 18, right: 10 },
    addIcon: { 
      position: 'absolute', 
      bottom: 5, 
      right: 10, 
      backgroundColor: "#007BFF", 
      borderRadius: 50, 
      width: 30, 
      height: 30, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    imageContainer: { 
      backgroundColor: "rgb(244, 243, 244)", 
      width: '100%', 
      height:80,
      borderRadius: 5, 
      alignItems: 'center', 
      paddingVertical: 15, 
      marginVertical: 5 
    },
    productTitle:
     {
       fontSize: 14,
        alignSelf:"flex-start" 
       },
    productRating:
    {
      alignSelf:"flex-start" 
    },
    productPrice: 
    {
       fontSize: 16,
        fontWeight: 'bold', 
        color: 'black',alignSelf:"flex-start" },


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
    elevation: 1,
    margin:5, 
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
ackgroundColor: '#F8F9FA', 
  
    borderRadius: 10,
    
  },
  image:{
    width:40,
    height:40,
  },
  plus:{
color:"white",
fontSize:20,
  },

  arrow:{
  padding:5,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

 
    shadowRadius: 5,
    elevation: 5,
  },


});

export default Wishlist;
