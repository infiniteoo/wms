import React, { useState } from "react";
import supabase from "../supabase";
import { View, Text, TextInput, Image, Pressable } from "react-native";

const EnterPONumber = ({
  setStep,
  poNumber,
  setPONumber,
  verifiedAppointment,
  setVerifiedAppointment,
}) => {
  const handleNext = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments") // Replace with your actual table name
        .select()
        .eq("purchaseOrderNumber", poNumber);

      if (error) {
        console.log("ERROR: ", error);
      } else if (data && data.length > 0) {
        setVerifiedAppointment(data);
        setStep(2);
      } else {
        alert("PO Number not found");
        setPONumber("");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
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
          marginBottom: 100,
          borderRadius: "5px ",
        }}
      />
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
        Enter Pick-Up or PO Number
      </Text>
      <TextInput
        value={poNumber}
        onChangeText={(text) => setPONumber(text)} // Update the state with the entered text
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
        style={{ flexDirection: "row", justifyContent: "center", width: 300 }}
      >
        <Pressable
          label="NEXT"
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

export default EnterPONumber;
