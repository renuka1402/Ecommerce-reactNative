import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToWishlist ,addToCart} from './slice';

const banners = [
    { image: require('./images/123.jpg') },
    { image: require('./images/222.jpg') },
    { image: require('./images/124.jpg') }
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState(['All']);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories');
            setCategories(['All', ...response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const filterProducts = () => {
        return products.filter(product =>
            (selectedCategory === 'All' || product.category === selectedCategory) &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <ScrollView style={styles.container}>
          
            <View style={styles.header}>
                <Image source={require('./images/33.jpg')} style={styles.logo} />
                <Text style={styles.title}>Welcome {'\n'}<Text style={styles.boldText}>Afifa Naeem</Text></Text>
                <View style={styles.iconRow}>
                    {/* <Ionicons name='search-outline' size={24} color='black' /> */}
                    <TouchableOpacity onPress={() => navigation.navigate('notification')} style={styles.arrow}>
                        <Ionicons name='notifications-outline' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            </View>

   
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Products..."
                    placeholderTextColor="#888" 
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <Ionicons name="search-outline" size={24} color="black" />
            </View>

     
            <View style={styles.bannerContainer}>
                <Swiper autoplay autoplayTimeout={3} showsPagination>
                    {banners.map((banner, index) => (
                        <Image key={index} source={banner.image} style={styles.banner} />
                    ))}
                </Swiper>
            </View>

                 <Text style={styles.categoryTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map((cat, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedCategory(cat)}>
                        <Text style={[styles.category, selectedCategory === cat && styles.selectedCategory]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filterProducts()}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        style={styles.productCardWrapper}
                    >
                        <View style={styles.productCard}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                            </View>
                            <TouchableOpacity style={styles.heartIcon} onPress={() => dispatch(addToWishlist(item))}>
                                <AntDesign name='hearto' size={18} color='gray' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addIcon} onPress={() => dispatch(addToCart(item))}>
                                <AntDesign name='plus' size={15} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.productRating}>⭐ {item.rating.rate}</Text>
                            <Text style={styles.productPrice}>${item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container:
    {
        flex: 1,

        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
   
    },
    title: {
        fontSize: 16,
        color: '#bbb',
        fontFamily: "Roboto Slab",
        marginRight:120,
    },
    arrow:{
marginRight:18,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#000",
   
    },
    iconRow: {
        flexDirection: 'row',
        gap: 15
    },
    bannerContainer: {
        height: 150,
        paddingHorizontal: 10,
        marginTop: 5
    },
    banner: {
        width: "96%",
        height: 150,
        borderRadius: 15,
        alignSelf: 'center'
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    categoryScroll: {
        marginTop: 10,
        paddingHorizontal: 20
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5
    },
    category: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#F0F0F0',

        color: 'black',
        fontSize: 13,
        fontWeight: "bold"
    },
    selectedCategory:
    {
        backgroundColor: 'black',
        color: 'white'
    },
    productRow:
    {
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20
    },
    productCardWrapper:
    {
        width: '48%',
        marginBottom: 15
    },
    productCard:
    {
        width: '100%',
        height: 185,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center'
    },
    productImage:
    {
        width: '60%',
        height: 70,
        borderRadius: 10,
        resizeMode: 'contain'
    },
    heartIcon: {
        position: 'absolute',
        top: 20,
        right: 10
    },
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
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: 15,
        marginVertical: 5
    },
    productTitle:
    {
        fontSize: 13,

        alignSelf: "flex-start"
    },
    productRating: {
        alignSelf: "flex-start"
    },
    productPrice:
    {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "flex-start"
    },
    searchContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 20,
        margin: 10,
        width:"91%",
        marginLeft:15,
    },
    searchInput:
    {
        flex: 1,
        height: 40,
        fontSize: 14
    },
});

export default HomeScreen;
