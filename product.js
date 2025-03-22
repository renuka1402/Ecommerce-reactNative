import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addToCart } from './slice'; 
const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity - 1);

  return (
    <View style={styles.container}>


<TouchableOpacity  onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="chevron-back" size={20} color="gray" />
        </TouchableOpacity>

      <Text style={styles.categoryTitle}>Product Details</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <AntDesign name='hearto' size={15} color='gray' />
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
          <TouchableOpacity style={styles.addToCartButton}  onPress={() => dispatch(addToCart({ ...product, qut: quantity }))}>
            <Text style={styles.buttonText1}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  backButton: { position: 'absolute', top: 8, left: 20, zIndex: 10, borderRadius: 5 },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 5,
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
    top: 5,
    left: 20,
  
      shadowRadius: 5,
      elevation: 1,
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
  }
});

export default ProductDetailsScreen;





