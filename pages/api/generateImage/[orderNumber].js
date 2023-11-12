import barcodeGenerator from "./barcodeGenerator.js";

export default function handler(req, res) {
  const { orderNumber } = req.query;
  try {
    let completed = barcodeGenerator(orderNumber);
    if (completed) {
      console.log("completed", completed);
      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Barcode generation failed" });
    }
  } catch (error) {
    console.error("Error during barcode generation:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export const config = {
  type: "experimental-background",
};
