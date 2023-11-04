const itemNames = require("./itemNames.js");
const barcodeGenerator = require("../barcodeGenerator.js");

const generateStaticBarcodes = () => {
  itemNames.forEach((item) => {
    barcodeGenerator(item.id.toString());
  });

  function formatDate(date) {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + day + year;
  }

  function generateDates() {
    const startDate = new Date();
    const endDate = new Date("2024-12-31");
    const dates = [];

    while (startDate <= endDate) {
      dates.push(formatDate(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  }

  const dateArray = generateDates();

  dateArray.forEach((date) => {
    barcodeGenerator(date);
  });
};

generateStaticBarcodes();

module.exports = generateStaticBarcodes;
