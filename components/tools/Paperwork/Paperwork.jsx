import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer"; // Import necessary components from react-pdf

const Paperwork = () => {
  // Dummy data for completed orders
  const completedOrders = [
    { id: 1, orderNumber: "123", date: "2023-10-30" },
    { id: 2, orderNumber: "456", date: "2023-10-29" },
    // Add more orders as needed
  ];

  // State to track the selected order for generating a PDF
  const [selectedOrder, setSelectedOrder] = useState(null);

  const styles = StyleSheet.create({
    section: {
      width: "20%", // Divide the page in half
      padding: 10,
    },
  });

  const generatePDF = (order) => {
    // Function to generate a PDF for the selected order
    // You can use the "react-pdf" library for PDF generation
    // Create a PDF document, add pages, and content
  };

  return (
    <div className="paperwork-container flex flex-row ml-2 mt-3 justify-left">
      {/* Left column with completed orders */}
      <div className="left-column h-100 border-gray-400 border-xl border-2 text-center w-100 p-2">
        <h2 className="font-bold">Completed Orders</h2>
        <ul className="w-100 text-sm mt-3">
          {completedOrders.map((order) => (
            <li
              key={order.id}
              className="mt-2 text-md cursor-pointer hover:bg-orange-100 hover:font-bold"
            >
              {order.orderNumber} - {order.date}
              {/*    <button onClick={() => setSelectedOrder(order)}>
                Generate PDF
              </button> */}
            </li>
          ))}
        </ul>
      </div>

      {/* Right column with PDF generator */}
      <div className="right-column w-full ml-2">
        {selectedOrder && (
          <button onClick={() => generatePDF(selectedOrder)}>
            Generate PDF for Order {selectedOrder.orderNumber}
          </button>
        )}
        {/* PDF Viewer to display generated PDFs */}
        <PDFViewer width="100%" height={500}>
          <Document>
            <Page size="A4">
              <View>
                <Text>Generated PDF Content</Text>
                {/* Add your PDF content here */}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default Paperwork;
