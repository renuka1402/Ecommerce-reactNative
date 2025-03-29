import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import notifee, { AndroidImportance } from "@notifee/react-native";
import auth from "@react-native-firebase/auth";  
import firestore from "@react-native-firebase/firestore"; 

const Payment = ({ navigation }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission() {
    try {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: "payment_success",
        name: "Payment Notifications",
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {
      console.log("Permission Error:", error);
    }
  }

  async function setNotification(title, body) {
    const user = auth().currentUser;  
    if (!user) {
      Alert.alert("Error", "You need to be logged in to proceed with payment.");
      return;
    }

    const channelId = "payment_success"; 

    await firestore().collection("notifications").add({
      userId: user.uid,
      title,
      body,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });


    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        pressAction: { id: "default" },
      },
    });
  }

  const handlePayment = () => {
    var options = {
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      currency: "INR",
      key: "rzp_test_AhEXwUKhgtPBSk",
      amount: 100 * 100,
      name: "E-Commerce App",
      prefill: {
        email: "renu66138@example.com",
        contact: "9399105486",
        name: "Renuka",
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        Alert.alert("Payment Successful", `Payment ID: ${data.razorpay_payment_id}`);
        await setNotification("Pay Successful", `Payment ID: ${data.razorpay_payment_id}`);

        navigation.navigate("home"); 
      })
      .catch(async (error) => {
        console.log("Razorpay Error:", error);
        Alert.alert("Payment Failed");
        await setNotification("Payment Failed", "Please try again.");
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Pay with Razorpay</Text>
      <TouchableOpacity
        onPress={handlePayment}
        style={{ backgroundColor: "#F37254", padding: 15, borderRadius: 5 }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
