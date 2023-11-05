const createTemplate = require("../../../components/inventory/Labels/Plaques/manual-template.jsx");

export default async (req, res) => {
  try {
    const result = await createTemplate(req.body);
    /*  console.log("req.body", req.body); */
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=export.pdf");
    result.pipe(res);
  } catch (error) {
    console.error("Error generating and sending PDF:", error);
    res.status(500).send("Error generating and sending PDF");
  }
};
