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

const Tags = () => {
  const [lpn, setLPN] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      const { data, error } = await supabase
        .from("outbound_orders")
        .select("*")
        .eq("completed", true)
        .is("archived", false);

      if (error) console.log("error", error);
      if (data) setCompletedOrders(data);
      console.log("fetched data", data);
    };

    fetchCompletedOrders();
  }, []);

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
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
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
      <div className="left-column h-100 border-gray-400 border-xl border-2 text-center w-100 p-2">
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
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="manufacturingDate">Manufacturing Date:</label>
            <input
              type="text"
              id="manufacturingDate"
              value={manufacturingDate}
              onChange={(e) => setManufacturingDate(e.target.value)}
            />
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
            <Page size="ID1" style={styles.page}>
              <View style={styles.column}>
                <View style={styles.grid}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.text}>LPN: {lpn}</Text>
                    <Image
                      style={styles.logo}
                      src="https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/sign/barcodes/102523.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXJjb2Rlcy8xMDI1MjMucG5nIiwiaWF0IjoxNjk5MTQ4OTkwLCJleHAiOjE3MzA2ODQ5OTB9.7KVejWtBA6Y3RqJ0DXDh0eEY2METR6HW8R-8rqW6dK0&t=2023-11-05T01%3A49%3A50.161Z"
                    />

                    <Text style={styles.text}>Order ID: {lotNumber}</Text>
                  </View>
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
                      <Text style={styles.text}>
                        Expiration Date: {expirationDate}
                      </Text>
                      <Text style={styles.text}>
                        Manufactured Date: {manufacturingDate}
                      </Text>
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
