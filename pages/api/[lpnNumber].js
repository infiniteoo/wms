import axios from "axios";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export default async function handler(req, res) {
  const { lpnNumber } = req.query;
  const barcodeURL = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${lpnNumber}&scale=2`;

  try {
    console.log("Generating PDF for LPN Number:", lpnNumber);
    const barcodeResponse = await axios.get(barcodeURL, {
      responseType: "arraybuffer",
    });

    if (!barcodeResponse.data || barcodeResponse.data.length === 0) {
      console.error("Invalid or empty image data.");
      res.status(500).send("Invalid or empty image data.");
      return;
    }

    // Convert array buffer to base64
    const base64Barcode = Buffer.from(barcodeResponse.data).toString("base64");
    console.log("Base64 Barcode:", base64Barcode);
    res.send(base64Barcode);

    const pdfContent = (
      <Document>
        <Page size="ID1">
          <View>
            <Text>LPN Number: {lpnNumber}</Text>
            <Image
              src={`data:image/png;base64,${base64Barcode}`} // Use base64 data
              style={{ width: 200, height: 100 }}
            />
            <Text>Item Description: Your Item Description</Text>
            <Text>Lot Number: Your Lot Number</Text>
            <Text>Manufacturing Date: Your Manufacturing Date</Text>
            <Text>Expiration Date: Your Expiration Date</Text>
            <Text>Quantity: Your Quantity</Text>
          </View>
        </Page>
      </Document>
    );

    renderToBuffer(pdfContent, (buffer) => {
      res.setHeader("Content-Type", "application/pdf");
      res.end(buffer);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
}

export const config = {
  type: "experimental-background",
};
