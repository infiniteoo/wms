import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { ClockLoader } from "react-spinners";

const FinalConfirmation = ({
  setStep,
  poNumber,
  setPONumber,
  signInData,
  setSignInData,
  verifiedAppointment,
  setVerifiedAppointment,
}) => {
  const [readyToLoad, setReadyToLoad] = useState(false);

  useEffect(() => {
    const checkForDockDoorAssignment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/po/${verifiedAppointment[0].purchaseOrderNumber}`
        );
        const data = await response.json();
        console.log("returned data;", data);

        if (data[0].assignedDoor) {
          setReadyToLoad(true);
        }
      } catch (error) {
        console.error("Error while checking for dock door assignment:", error);
      }
    };

    checkForDockDoorAssignment();

    const timerId = setInterval(checkForDockDoorAssignment, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleConfirm = async () => {
    setStep(6);
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
      {!readyToLoad ? (
        <>
          <Text style={{ fontSize: 36, marginBottom: 20, fontWeight: "bold" }}>
            You're checked in, {signInData.name}!
          </Text>

          <Text style={{ fontSize: 24, marginBottom: 20, width: "90%" }}>
            Please wait for an assigned dock door. For now, please park in the
            staging area, set your refer to 34 degrees (continuous), and set
            your tandems. When a door is assigned, please chock your tires, pull
            your airhose, and open your trailer door.
          </Text>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 36, marginBottom: 20, fontWeight: "bold" }}>
            You're ready to be loaded, {signInData.name}!
          </Text>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {verifiedAppointment[0].loaderName} has been assigned to your load.
          </Text>

          <Text style={{ fontSize: 24, marginBottom: 20, width: "90%" }}>
            Please back into dock door {verifiedAppointment[0].assignedDoor}. Please
            open your trailer door, pull your airhose, chock your tires, and
            wait for your loader, {verifiedAppointment[0].loaderName}, to begin
            the loading sequence.
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
        {readyToLoad ? (
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
            <Text style={{ color: "white", fontSize: 24 }}>Confirm</Text>
          </Pressable>
        ) : (
          <ClockLoader size="75px" />
        )}
      </View>
    </View>
  );
};

export default FinalConfirmation;
