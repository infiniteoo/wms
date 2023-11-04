import React, { useState } from "react";
import * as XLSX from "xlsx"; // Corrected import statement

import ProductionTable from "./ProductionTable";
import DataReader from "./DataReader";

export default function Timeline() {
  const [timelineA, setTimelineA] = useState([]);
  const [timelineB, setTimelineB] = useState([]);
  const [timelineC, setTimelineC] = useState([]);
  const [dateAndTimeline, setDateAndTimeline] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  function excelDateToJSDate(excelDate) {
    return new Date(
      (excelDate - 1) * 24 * 60 * 60 * 1000 + new Date("1900-01-01").getTime()
    );
  }

  function excelTimeToFormattedTime(excelTime) {
    if (excelTime < 1) {
      const hours = Math.floor(excelTime * 24);
      const minutes = Math.round((excelTime * 24 - hours) * 60);
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      return formattedTime;
    } else {
      return ""; // Handle other cases as needed
    }
  }

  const fetchTimeline = () => {
    // Assuming your XLSX file is in the public directory
    const filePath = "/timeline_sample.xlsx";

    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: "array" });

        // Assuming a single sheet, you can access it by index (0)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet to an array of objects
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Remove the header row if it exists
        if (excelData.length > 0 && Array.isArray(excelData[0])) {
          excelData.shift();
        }

        // Convert Excel date serial numbers to Date objects
        const dateColumns = ["DateColumn1", "DateColumn2"]; // Replace with actual column names
        excelData.forEach((row) => {
          dateColumns.forEach((columnName) => {
            const columnIndex = excelData[0].indexOf(columnName);
            if (columnIndex !== -1) {
              row[columnIndex] = excelDateToJSDate(row[columnIndex]);
            }
          });
        });

        // Convert Excel time fractions to formatted time strings
        const timeColumns = ["TimeColumn1", "TimeColumn2"]; // Replace with actual column names
        excelData.forEach((row) => {
          timeColumns.forEach((columnName) => {
            const columnIndex = excelData[0].indexOf(columnName);
            if (columnIndex !== -1) {
              row[columnIndex] = excelTimeToFormattedTime(row[columnIndex]);
            }
          });
        });
        /* console.log(excelData); */
        setTimelineData(excelData); // Store the data in state
        /* console.log("Timeline.jsx: timelineData", timelineData); */
      });
  };

  return (
    <main className="text-sm flex w-screen mt-5 flex-col">
      <DataReader
        setTimelineA={setTimelineA}
        setTimelineB={setTimelineB}
        setTimelineC={setTimelineC}
        setDateAndTimeline={setDateAndTimeline}
        timelineData={timelineData}
        fetchTimeline={fetchTimeline}
      />
      <ProductionTable
        timelineA={timelineA}
        timelineB={timelineB}
        timelineC={timelineC}
        dateAndTimeline={dateAndTimeline}
        timelineData={timelineData}
      />
    </main>
  );
}
