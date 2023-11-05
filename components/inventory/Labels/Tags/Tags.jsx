import React, { useState, useEffect } from "react";
import { supabase } from "../../../../supabase";
import axios from "axios";
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  column: {
    width: "100%",
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 7,
  },
  title: {
    fontSize: 20,
    textAlign: "right",
    marginBottom: 5,
  },
  lpn: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
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

const Tags = () => {
  const [lpn, setLPN] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date()); // Initialize with a date
  const [manufacturingDate, setManufacturingDate] = useState(new Date()); // Initialize with a date
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageGenerated, setImageGenerated] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [barcodeUri, setBarcodeUri] = useState("");

  const handleDateChange = (date, stateSetter) => {
    stateSetter(date);
  };

  useEffect(() => {
    if (imageGenerated) {
      setBarcodeUri(
        `https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/public/barcodes/${lpn}.png`
      );
    }
  }, [imageGenerated, lpn]);

  useEffect(() => {
    console.log("barcodeUri: ", barcodeUri);
  }, [barcodeUri]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lpn === "") return;

    // fetch post /api/generateImage/:orderNumber
    // axios.post(`http://localhost:8156/api/generateImage/${enteredOrderNumber}`);
    let result = await axios.post(
      process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? `/api/generateImage/${lpn}`
        : `https://fgftags.com/api/generateImage/${lpn}`
    );
    if (result.status === 200) {
      setFormComplete(true);
    }
  };
  const handleBlur = async () => {
    if (lpn === "") return;
    console.log("blurring");
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          ? `/api/generateImage/${lpn}`
          : `https://fgftags.com/api/generateImage/${lpn}`
      );
      if (result.status === 200) {
        console.log("Barcode generation successful.");
        setBarcodeUri(
          `https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/public/barcodes/${lpn}.png`
        );
        setImageGenerated(true);
      } else {
        console.error(
          "Barcode generation failed. Server returned status code:",
          result.status
        );
      }
    } catch (error) {
      console.error("Error during barcode generation:", error);
    }
  };

  return (
    <div className="paperwork-container flex flex-row ml-2 mt-3 justify-left w-screen">
      <div className="left-column h-100 border-gray-400 border-xl border-2 text-center w-1/3 p-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <div className="w-1/2">
              <label htmlFor="lpn">LPN:</label>
              <input
                type="text"
                id="lpn"
                value={lpn}
                onChange={(e) => setLPN(e.target.value)}
                onBlur={handleBlur}
              />
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
            </div>
            <div className="w-1/2 mx-3">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <DatePicker
                id="expirationDate"
                selected={expirationDate}
                onChange={(date) => handleDateChange(date, setExpirationDate)}
                style={{ width: "100%" }}
              />
              <label htmlFor="manufacturingDate">Manufacturing Date:</label>
              <DatePicker
                id="manufacturingDate"
                selected={manufacturingDate}
                onChange={(date) =>
                  handleDateChange(date, setManufacturingDate)
                }
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            {" "}
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Generate</button>

          <div className="mb-3"></div>
          <div className="mb-3"></div>
        </form>
      </div>

      <div className="w-2/3 ml-2">
        {formComplete && (
          <PDFViewer width="100%" height={500}>
            <Document>
              <Page size="ID1" style={styles.page} orientation="landscape">
                <View style={styles.column}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          textAlign: "left",
                          justifyContent: "left",
                        }}
                      >
                        <Text style={styles.lpn}> {lpn}</Text>
                      </View>
                      {imageGenerated && (
                        <Image
                          style={styles.logo}
                          src={{
                            uri: barcodeUri,
                          }}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        textAlign: "right",
                      }}
                    >
                      <Text style={styles.title}>{description}</Text>
                    </View>
                  </View>

                  <View style={styles.grid}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text style={styles.subtitle}>Lot Number: </Text>
                        <Text style={styles.text}>{lotNumber}</Text>
                        <Text style={styles.subtitle}>Item:</Text>
                        <Text style={styles.text}>{itemNumber}</Text>
                        <Text style={styles.subtitle}>Quantity: </Text>
                        <Text style={styles.text}>{quantity}</Text>
                      </View>
                      <View
                        style={{
                          width: "50%",
                          justifyContent: "right",
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "col",
                        }}
                      >
                        <Text style={styles.subtitle}>Manufactured Date:</Text>
                        <Text style={styles.text}>
                          {manufacturingDate.toDateString()}
                        </Text>
                        <Text style={styles.subtitle}>Expiration Date:</Text>
                        <Text style={styles.text}>
                          {expirationDate.toDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

export default Tags;
