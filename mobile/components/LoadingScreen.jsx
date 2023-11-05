import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { ClockLoader } from "react-spinners";

const LoadingScreen = ({
  setStep,
  poNumber,
  setPONumber,
  signInData,
  setSignInData,
  verifiedAppointment,
  setVerifiedAppointment,
}) => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const checkForCompletion = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/po/${verifiedAppointment[0].purchaseOrderNumber}`
        );
        const data = await response.json();

        if (data[0].status === "Complete") {
          setLoadingComplete(true);
        }
      } catch (error) {
        console.error("Error while checking for loading completion:", error);
      }
    };

    checkForCompletion();

    const timerId = setInterval(checkForCompletion, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleConfirm = async () => {
    setStep(1);
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
      {!loadingComplete ? (
        <>
          <Text style={{ fontSize: 36, marginBottom: 20, fontWeight: "bold" }}>
            Now loading in door {verifiedAppointment[0].assignedDoor},{" "}
            {signInData.name}!
          </Text>

          <Text style={{ fontSize: 24, marginBottom: 20, width: "90%" }}>
            Please wait for your loader, {verifiedAppointment[0].loaderName}, to
            finish loading your trailer. A confirmation will appear when loading
            is complete.
          </Text>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 36, marginBottom: 20, fontWeight: "bold" }}>
            Your trailer is now loaded, {signInData.name}!
          </Text>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            Please proceed to the office window to receive your paperwork.
          </Text>

          <Text style={{ fontSize: 24, marginBottom: 20, width: "90%" }}>
            Thank you for joining us today! We hope to see you again soon!
          </Text>
        </>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: 300,
        }}
      >
        {loadingComplete ? (
          <Pressable
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
            <Text style={{ color: "white", fontSize: 24 }}>Start Over</Text>
          </Pressable>
        ) : (
          <ClockLoader size="75px" />
        )}
      </View>
    </View>
  );
};

export default LoadingScreen;
