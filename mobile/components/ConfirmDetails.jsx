import React, { useState } from "react";
import supabase from "../supabase";
import { View, Text, TextInput, Image, Pressable } from "react-native";

const ConfirmDetails = ({
  setStep,
  poNumber,
  setPONumber,
  verifiedAppointment,
  setVerifiedAppointment,
  signInData,
  setSignInData,
}) => {
  const handleConfirm = async () => {
    try {
      const combinedData = {
        signInData,
        checkInTime: new Date(),
        status: "Checked In",
      };

      // Update the database record with the combined data
      const { data, error } = await supabase
        .from("appointments")
        .eq("id", verifiedAppointment.id)
        .update(combinedData);

      if (error) {
        console.log("ERROR: ", error);
      } else {
        setStep(5);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleBack = () => {
    setStep(3);
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
        Name: {signInData.name}
        Phone: {signInData.phone}
        Carrier: {signInData.carrier}
        Trailer: {signInData.trailer}
        PO Number: {poNumber}
      </Text>

      <View
        style={{ flexDirection: "row", justifyContent: "between", width: 300 }}
      >
        <Pressable
          label="Back"
          onPress={handleBack}
          color="darkgreen" // Change the color to a different one
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
          <Text style={{ color: "white", fontSize: 24 }}>Back</Text>
        </Pressable>
        <Pressable
          label="NEXT"
          onPress={handleConfirm}
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
          <Text style={{ color: "white", fontSize: 24 }}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmDetails;
