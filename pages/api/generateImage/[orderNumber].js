import barcodeGenerator from "../../../components/inventory/Labels/Plaques/barcodeGenerator.js";

export default async function handler(req, res) {
  const { orderNumber } = req.query;
  try {
    let completed = await barcodeGenerator(orderNumber);
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
