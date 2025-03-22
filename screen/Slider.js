import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Slider = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("./images/1st.png")} style={styles.image} />
      <Text style={styles.text}>We Provide High Quality Products Just For You</Text>

    
      <View style={styles.dotsContainer}>
        <View style={styles.activeDot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Slider1')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Signup')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image:
  {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },
  text:
  {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  },
  dotsContainer:
  {
    flexDirection: 'row',
    marginBottom: 20
  },
  dot:
  {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4
  },
  activeDot:
  {
   backgroundColor: '#007BFF',
    width: 14,
    height: 10, marginHorizontal: 4,
    borderRadius: 5,
  },
  button: {
backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 50,
    paddingHorizontal: 30,
    width: "80%",
    alignItems: "center"
  },
  buttonText:
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  skipText:
  {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
});
export default Slider;
