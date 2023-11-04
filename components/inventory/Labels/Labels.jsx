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
import Plaques from "./Plaques/Plaques.jsx";
import Tags from "./Tags/Tags.jsx";

const Labels = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completedOrders, setCompletedOrders] = useState(null);
  const [activeTab, setActiveTab] = useState("Tags"); // Initialize the active tab

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
    labelGeneratorsBox: {
      width: "100s%", // Set the width to 35%
      marginRight: "2%", // Add some margin for spacing
    },
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tags":
        return <Tags />;

      case "Plaques":
        return <Plaques />;

      default:
        return null;
    }
  };

  return (
    <div className="paperwork-container flex flex-row ml-2 mt-3 justify-left">
      <div
        className="labelGeneratorsBox h-100 border-gray-400 border-xl border-2 text-center p-2"
        style={styles.labelGeneratorsBox}
      >
        <div className="flex justify-center h-100 ">
          {/* Tab for Tags */}
          <button
            className={`rounded-l-xl w-1/4 bg-blue-500 text-white p-2 ${
              activeTab === "Tags" ? "bg-blue-700" : ""
            }`}
            onClick={() => setActiveTab("Tags")}
          >
            Tags
          </button>
          {/* Tab for Plaques */}
          <button
            className={`rounded-r-xl w-1/4 bg-blue-500 text-white p-2 ${
              activeTab === "Plaques" ? "bg-blue-700" : ""
            }`}
            onClick={() => setActiveTab("Plaques")}
          >
            Plaques
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Labels;
