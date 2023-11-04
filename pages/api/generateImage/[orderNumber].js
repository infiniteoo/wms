import barcodeGenerator from "../../../components/inventory/Labels/Plaques/barcodeGenerator.js";

export default async (req, res) => {
  console.log("hellloooooo", req.query);
  const { orderNumber } = req.query;
  let generatedBarcode = barcodeGenerator(orderNumber);
  console.log("generatedBarcode", generatedBarcode);
};
