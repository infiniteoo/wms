import barcodeGenerator from "../../../components/inventory/Labels/Plaques/barcodeGenerator.js";

export default async function handler(req, res) {
  const { orderNumber } = req.query;
  console.log("orderNumber", orderNumber);
  console.log("hello from generateImage handler");
  console.log("req", req);

  /* try { */
  let completed = barcodeGenerator(orderNumber);
  console.log("completed before", completed);
  if (completed) {
    console.log("completed after", completed);
    res.status(200).json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, error: "Barcode generation failed" });
  }
  /*   } catch (error) {
    console.error("Error during barcode generation:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  } */
}
