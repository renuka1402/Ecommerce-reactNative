import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Slider');
    }, 2000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.logo}>marty</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashContainer: { flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: '#002366'
       },
  logo:
   {
    
     fontSize:40,
      color: '#fff', 
      fontWeight: 'bold'
     },
});
