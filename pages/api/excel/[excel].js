const path = require("path");
const XLSX = require("xlsx");

export default async function (req, res) {
  console.log("entered /api/excel");
  const filePath = path.join("./pages/api/excel/", "/Inventory.csv");
  console.log("filepath created: ", filePath);
  const workbook = XLSX.readFile(filePath);
  console.log("workbook created: ");

  const sheetName = workbook.SheetNames[0];
  console.log("sheetname created: ");
  const worksheet = workbook.Sheets[sheetName];
  console.log("worksheet created");
  const excelData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: true,
  });
  console.log("CSV data processed");
  if (excelData.length > 0 && Array.isArray(excelData[0])) {
    excelData.shift(); // Remove the header row if it exists
  }

  // Only process the first 5 rows
  /*  const firstFiveRows = excelData.slice(105, 110) */

  const formattedData = excelData.map((row) => {
    const parts = row[0].split(" ");
    const [date, time] = parts;
    const [meridian, ...userParts] = parts[2].split("\n"); // Split the meridian and user using '\n'
    const user = userParts.join(" ").trim(); // Join the user parts back together and trim any extra spaces

    let strippedUser = (user.match(/[A-Z]+/g) || []).join("");
    const [activity, operation] = row[1].split("\n");
    const item = row[2];
    let warehouse = "";
    let strippedItem = "";
    let choppedItem = "";

    if (item === 3006 || item.includes("3006")) {
      warehouse = "3006";
    }

    if (typeof item === "string" && item.includes("3006")) {
      let finalStrippedItem = "";
      strippedItem = item.replace("3006", "");
      if (strippedItem.includes("\n")) {
        finalStrippedItem = strippedItem.replace("\n", "");
      } else {
        finalStrippedItem = strippedItem;
      }
      choppedItem = finalStrippedItem.replace(/\s+/g, "");
    }

    const quantity = row[3];
    const moveUOM = row[4];

    const lpnData = row[5];
    let lpn = "";
    let destinationLPN = "";
    if (typeof lpnData === "string" && lpnData.includes("\n")) {
      lpn = lpnData.split("\n")[0];
      destinationLPN = lpnData.split("\n")[1];
    } else {
      lpn = lpnData;
    }

    let subLPNdata = row[6];
    let subLPN = "";
    let destinationSubLPN = "";

    if (typeof subLPNdata === "string" && subLPNdata.includes("\n")) {
      subLPN = subLPNdata.split("\n")[0];
      destinationSubLPN = subLPNdata.split("\n")[1];
    } else {
      subLPN = subLPNdata;
    }

    let detailLPNData = row[7];
    let detailLPN = "";
    let destinationDetailLPN = "";

    if (typeof detailLPNData === "string" && detailLPNData.includes("\n")) {
      detailLPN = detailLPNData.split("\n")[0];
      destinationDetailLPN = detailLPNData.split("\n")[1];
    } else {
      detailLPN = detailLPNData;
    }

    let sourceLocationData = row[8];
    let sourceLocation = "";
    let destinationLocation = "";

    if (
      typeof sourceLocationData === "string" &&
      sourceLocationData.includes("\n")
    ) {
      sourceLocation = sourceLocationData.split("\n")[0];
      destinationLocation = sourceLocationData.split("\n")[1];
    } else {
      sourceLocation = sourceLocationData;
    }

    let sourceAreaData = row[9];
    let sourceArea = "";
    let destinationArea = "";

    if (typeof sourceAreaData === "string" && sourceAreaData.includes("\n")) {
      sourceArea = sourceAreaData.split("\n")[0];
      destinationArea = sourceAreaData.split("\n")[1];
    } else {
      sourceArea = sourceAreaData;
    }

    return {
      date,
      time: `${time} ${meridian}`,
      user: strippedUser,
      activity,
      operation,
      itemNumber: choppedItem,
      warehouse,
      quantity,
      moveUOM,
      lpn,
      destinationLPN,
      subLPN,
      destinationSubLPN,
      detailLPN,
      destinationDetailLPN,
      sourceLocation,
      destinationLocation,
      sourceArea,
      destinationArea,
    };
  });
  console.log("returning formatted data");
  res.json(formattedData);
}
