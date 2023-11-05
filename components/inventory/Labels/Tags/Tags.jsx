import React, { useState, useEffect } from "react";
import { supabase } from "../../../../supabase";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tags = () => {
  const [lpn, setLPN] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  /*  const [expirationDate, setExpirationDate] = useState(new Date()); // Initialize with a date
  const [manufacturingDate, setManufacturingDate] = useState(new Date()); // Initialize with a date */
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleDateChange = (date, stateSetter) => {
    stateSetter(date);
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completedOrders, setCompletedOrders] = useState(null);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "black",
    },
    column: {
      width: "100%",
      padding: 20,
      backgroundColor: "#f0f0f0",
    },
    logo: {
      width: 80,
      height: 40,
      marginBottom: 20,
    },
    title: {
      fontSize: 48,
      textAlign: "center",
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 10,
      textAlign: "center",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
    },
    text: {
      fontSize: 10,
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "col",
      justifyContent: "space-between",
    },
    box: {
      backgroundColor: "lightgray",
      padding: 10,
      marginBottom: 20,
      fontSize: 14,
      marginTop: 10,
    },
  });
  return (
    <div className="paperwork-container flex flex-row ml-2 mt-3 justify-left w-screen">
      <div className="left-column h-100 border-gray-400 border-xl border-2 text-center w-40 p-2">
        <h2 className="font-bold">Enter Tag Details</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="lpn">LPN:</label>
            <input
              type="text"
              id="lpn"
              value={lpn}
              onChange={(e) => setLPN(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lotNumber">Lot Number:</label>
            <input
              type="text"
              id="lotNumber"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
            <label htmlFor="itemNumber">Item Number:</label>
            <input
              type="text"
              id="itemNumber"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            {/*  <label htmlFor="expirationDate">Expiration Date:</label>
              <DatePicker
              id="expirationDate"
              selected={expirationDate}
              onChange={(date) => handleDateChange(date, setExpirationDate)}
            /> */}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="manufacturingDate">Manufacturing Date:</label>
             <DatePicker
              id="manufacturingDate"
              selected={manufacturingDate}
              onChange={(date) => handleDateChange(date, setManufacturingDate)}
            /> */}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="w-full ml-2">
        <PDFViewer width="100%" height={500}>
          <Document>
            <Page size="ID1" style={styles.page} orientation="landscape">
              <View style={styles.column}>
                <View style={styles.grid}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.text}>LPN:</Text>
                    <Text style={styles.text}> {lpn}</Text>
                  </View>
                  <Image
                    style={styles.logo}
                    src={{
                      uri: "https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/public/barcodes/353535.png",
                    }}
                  />

                  <Text style={styles.text}>Lot Number: {lotNumber}</Text>
                  <View style={{ width: "50%" }}></View>
                </View>

                <View style={styles.grid}>
                  <View>
                    <View style={{ width: "50%", marginBottom: 10 }}>
                      <Text style={styles.text}>Item: {itemNumber}</Text>
                      <Text style={styles.text}>Quantity: {quantity}</Text>
                      <Text style={styles.text}>Lot Number: {lotNumber}</Text>
                    </View>
                    <View style={{ width: "50%", marginBottom: 10 }}>
                      <Text style={styles.text}>
                        Description: {description}
                      </Text>
                      {/*  <Text style={styles.text}>
                        Expiration Date: {expirationDate}
                      </Text>
                      <Text style={styles.text}>
                        Manufactured Date: {manufacturingDate}
                      </Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default Tags;
