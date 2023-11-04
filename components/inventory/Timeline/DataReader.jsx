import React, { useEffect } from "react";

const DataReader = ({
  setTimelineA,
  setTimelineB,
  setTimelineC,
  setDateAndTimeline,
  timelineData,
  fetchTimeline,
}) => {
  useEffect(() => {
    fetchTimeline();

    const convertExcelDateToJSDate = (excelDate) => {
      const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch is December 30, 1899
      return new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000);
    };

    const convertExcelTimeToFormattedTime = (excelTime) => {
      if (excelTime < 1) {
        const hours = Math.floor(excelTime * 24);
        const minutes = Math.round((excelTime * 24 - hours) * 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      } else {
        return ""; // Handle other cases as needed
      }
    };

    const updatedTimelineA = [];
    const updatedTimelineB = [];
    const updatedTimelineC = [];
    const updatedDateAndTimeline = [];

    timelineData.forEach((row) => {
      const dateValue = convertExcelDateToJSDate(row[0]).toLocaleDateString();
      const timeValue = convertExcelTimeToFormattedTime(row[1]);

      const updatedRow = [dateValue, timeValue, ...row.slice(2)];

      const dateAndTimelineEntry = updatedRow.slice(0, 2); // Entries 0 and 1
      const entryA = updatedRow.slice(0, 6); // Entries 0-5
      const entryB = [...updatedRow.slice(0, 3), ...updatedRow.slice(7, 10)]; // Entries 0-2 and 7-9
      const entryC = [...updatedRow.slice(0, 3), ...updatedRow.slice(11, 14)]; // Entries 0-2 and 11-13

      updatedDateAndTimeline.push(dateAndTimelineEntry);
      updatedTimelineA.push(entryA);
      updatedTimelineB.push(entryB);
      updatedTimelineC.push(entryC);
    });

    setTimelineA(updatedTimelineA);
    setTimelineB(updatedTimelineB);
    setTimelineC(updatedTimelineC);
    setDateAndTimeline(updatedDateAndTimeline);
  }, [
    timelineData,
    setTimelineA,
    setTimelineB,
    setTimelineC,
    setDateAndTimeline,
    fetchTimeline,
  ]);

  return <div></div>;
};

export default DataReader;
