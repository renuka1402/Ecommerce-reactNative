import React from "react";
import { View, Text, Image, StyleSheet ,Button} from "react-native";

const UserProfile= ({ navigation }) => {
const logout=()=>{
  navigation.navigate("Login"); 
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Button title="Logout" onPress={logout}></Button>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

});

export default UserProfile;
