const createTemplate = require("../../../components/inventory/Labels/Plaques/manual-template.jsx");

export default async function handler(req, res) {
  try {
    const result = await createTemplate(req.body);
    if (result) {
      console.log("Sending PDF");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=export.pdf");
      res.send(result);
    } else {
      console.log("Error: PDF generation failed");
      res.status(500).json({ error: "PDF generation failed" });
    }
  } catch (error) {
    console.error("Error: Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
