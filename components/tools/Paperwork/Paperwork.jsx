import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const Paperwork = () => {
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
      width: 120,
      height: 80,
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
    <div className="paperwork-container flex flex-row ml-2 mt-3 justify-left">
      <div className="left-column h-100 border-gray-400 border-xl border-2 text-center w-100 p-2">
        <h2 className="font-bold">Completed Orders</h2>
        <ul className="w-100 text-sm mt-3">
          {completedOrders &&
            completedOrders.map((order) => (
              <li
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="mt-2 text-md cursor-pointer hover:bg-orange-100 hover:font-bold"
              >
                {order.po_number} - {order.carrier}
              </li>
            ))}
        </ul>
      </div>

      <div className="w-full ml-2">
        <PDFViewer width="100%" height={500}>
          {selectedOrder && (
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.column}>
                  <Text style={styles.title}>Great Blue</Text>
                  <Text style={styles.subtitle}>Bill of Lading</Text>
                  <View style={styles.header}>
                    <Text style={styles.text}>
                      Current Date: {new Date().toLocaleDateString()}
                    </Text>
                    <Text style={styles.text}>
                      Current Time: {new Date().toLocaleTimeString()}
                    </Text>
                  </View>
                  <Text style={styles.sectionTitle}>Order Information</Text>
                  <View style={styles.grid}>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.text}>
                        PO Number: {selectedOrder.po_number}
                      </Text>
                      <Text style={styles.text}>
                        Order ID: {selectedOrder.id}
                      </Text>
                      <Text style={styles.text}>
                        Created By: {selectedOrder.created_by}
                      </Text>
                      <Text style={styles.text}>
                        Carrier: {selectedOrder.carrier}
                      </Text>
                      <Text style={styles.text}>
                        Trailer Number: {selectedOrder.trailer_number}
                      </Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.text}>
                        Loaded By: {selectedOrder.unloaded_by}
                      </Text>
                      <Text style={styles.text}>
                        Dock Door: {selectedOrder.assigned_dock_door}
                      </Text>
                      <Text style={styles.text}>
                        Appointment Date:{" "}
                        {new Date(
                          selectedOrder.appointment_date
                        ).toLocaleDateString()}
                      </Text>
                      <Text style={styles.text}>
                        Appointment Time:{" "}
                        {new Date(
                          selectedOrder.appointment_time
                        ).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.box}>
                    <Text style={{ fontWeight: "bold" }}>
                      ATTENTION: Please keep your reefer unit set to 34 degrees
                      continuous for your journey.
                    </Text>
                    <Text style={{ marginTop: "3" }}>
                      Initial here to confirm: ______________
                    </Text>
                  </View>
                  <Text style={styles.sectionTitle}>Order Lines</Text>
                  <View style={styles.grid}>
                    {selectedOrder.order_lines &&
                      selectedOrder.order_lines.map((line, index) => (
                        <>
                          <View
                            key={index}
                            style={{ width: "50%", marginBottom: 10 }}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  backgroundColor: "lightgray",
                                  width: "50%",
                                },
                              ]}
                            >
                              Order Line #{index + 1}
                            </Text>
                            <Text style={styles.text}>
                              Item: {line.item_number}
                            </Text>
                            <Text style={styles.text}>
                              Quantity: {line.cases}
                            </Text>
                            <Text style={styles.text}>
                              Lot Number: {line.lot_number}
                            </Text>
                          </View>
                          <View style={{ width: "50%", marginBottom: 10 }}>
                            <Text style={styles.text}>
                              Description: {line.description}
                            </Text>
                            <Text style={styles.text}>
                              Expiration Date: {line.expiration_date}
                            </Text>
                            <Text style={styles.text}>
                              Manufactured Date: {line.manufacturing_date}
                            </Text>
                          </View>
                        </>
                      ))}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.column}>
                      <Text style={styles.text}>Seal Number</Text>
                      <Text style={styles.text}>__________________</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.text}>Driver Name (Printed)</Text>
                      <Text style={styles.text}>__________________</Text>
                      <Text style={[styles.text, { marginTop: "15" }]}>
                        Driver Name (Signature)
                      </Text>
                      <Text style={styles.text}>__________________</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.text}>Current Date</Text>
                      <Text style={styles.text}>__________________</Text>
                    </View>
                  </View>
                  <View style={styles.box}>
                    <Text style={{ fontWeight: "bold" }}>
                      Thank you for your business, and please have a safe
                      journey! If you have any questions, please contact us at
                      1-800-555-5555.
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
          )}
        </PDFViewer>
      </div>
    </div>
  );
};

export default Paperwork;
