import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import bg from "../public/bg.svg";
import { useState } from "react";
import EnterPONumber from "./components/EnterPONumber";
import NameAndNumberInput from "./components/NameAndNumberInput";
import CarrierAndTrailerInput from "./components/CarrierAndTrailerInput";
import ConfirmDetails from "./components/ConfirmDetails";
import FinalConfirmation from "./components/FinalConfirmation";
import LoadingScreen from "./components/LoadingScreen";
import supabase from "./supabase";

export default function App() {
  const [step, setStep] = useState(1);
  const [poNumber, setPONumber] = useState("");
  const [verifiedAppointment, setVerifiedAppointment] = useState({});
  const [signInData, setSignInData] = useState({
    name: "",
    trailer: "",
    phone: "",
    carrier: "",
    date: new Date(),
  });

  return (
    <ImageBackground
      source={{ uri: bg }} // Replace with your image URL
      style={styles.background}
    >
      <View style={styles.container}>
        {step === 1 && (
          <EnterPONumber
            setStep={setStep}
            setPONumber={setPONumber}
            poNumber={poNumber}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
            signInData={signInData}
            setSignInData={setSignInData}
          />
        )}
        {step === 2 && (
          <NameAndNumberInput
            setStep={setStep}
            signInData={signInData}
            setSignInData={setSignInData}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
          />
        )}
        {step === 3 && (
          <CarrierAndTrailerInput
            setStep={setStep}
            signInData={signInData}
            setSignInData={setSignInData}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
          />
        )}
        {step === 4 && (
          <ConfirmDetails
            poNumber={poNumber}
            setPONumber={setPONumber}
            setStep={setStep}
            signInData={signInData}
            setSignInData={setSignInData}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
          />
        )}
        {step === 5 && (
          <FinalConfirmation
            poNumber={poNumber}
            setPONumber={setPONumber}
            setStep={setStep}
            signInData={signInData}
            setSignInData={setSignInData}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
          />
        )}
        {step === 6 && (
          <LoadingScreen
            poNumber={poNumber}
            setPONumber={setPONumber}
            setStep={setStep}
            signInData={signInData}
            setSignInData={setSignInData}
            verifiedAppointment={verifiedAppointment}
            setVerifiedAppointment={setVerifiedAppointment}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // You can adjust this as needed
  },
});
