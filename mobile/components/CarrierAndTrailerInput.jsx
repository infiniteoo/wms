import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";

const CarrierAndTrailerInput = ({
  setStep,
  poNumber,
  setPONumber,
  signInData,
  setSignInData,
  verifiedAppointment,  
  setVerifiedAppointment,
}) => {
  const handleNext = () => {
    // You can use the `poNumber` state here for further processing
    setStep(4);
  };

  const handleBack = () => {
    setStep(2);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{
          height: "80px",
          width: "370px",
          marginBottom: 50,
          borderRadius: "5px ",
        }}
      />
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
        Enter Carrier
      </Text>
      <TextInput
        value={signInData.carrier}
        onChangeText={(text) => setSignInData({ ...signInData, carrier: text })} // Update the state with the entered text
        style={{
          color: "black",
          width: 300,
          height: 60,
          borderColor: "white",
          backgroundColor: "white",
          borderWidth: 1,
          fontSize: 24,
          marginBottom: 20,
          paddingLeft: 20,
        }}
      />

      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
        Enter Trailer Number
      </Text>
      <TextInput
        value={signInData.trailer}
        onChangeText={(text) => setSignInData({ ...signInData, trailer: text })} // Update the state with the entered text
        style={{
          color: "black",
          width: 300,
          height: 60,
          borderColor: "white",
          backgroundColor: "white",
          borderWidth: 1,
          fontSize: 24,
          marginBottom: 20,
          paddingLeft: 20,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 300,
        }}
      >
        <Pressable
          title="Back"
          onPress={handleBack}
          color="darkred" // Change the color to a different one
          style={{
            width: "45%",
            height: 60,
            fontSize: 24,
            backgroundColor: "darkred",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            color: "white",
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>BACK</Text>
        </Pressable>
        <Pressable
          title="NEXT"
          onPress={handleNext}
          color="darkgreen" // Change the color to a different one
          style={{
            width: "45%",
            height: 60,
            fontSize: 24,
            backgroundColor: "darkgreen",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            color: "white",
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>NEXT</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CarrierAndTrailerInput;
