import barcodeGenerator from "../../../components/inventory/Labels/Plaques/barcodeGenerator.js";

export default async (req, res) => {
  const { orderNumber } = req.query;
  let generatedBarcode = barcodeGenerator(orderNumber);
  console.log("generatedBarcode", generatedBarcode);
};
