import React, { useState, useEffect, useRef } from "react";
import StatTracker from "./StatTracker";
import {
  highlightMatchingRows,
  clearMatchingRowHighlights,
} from "./utils/rowHighlighter.js";

const ProductionTable = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
  timelineData,
}) => {
  // Create a ref to store the matched row element
  const matchedRowRef = useRef(null);

  // State to keep track of the current hour
  const [currentHour, setCurrentHour] = useState(
    new Date().getHours().toString().padStart(2, "0") + ":00"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newHour =
        new Date().getHours().toString().padStart(2, "0") + ":00:00";
      setCurrentHour(newHour);
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentHour]);

  // create a state that keeps track of what product, item number and quantity is being produced on each of the three timelines
  const [unitsThisHour, setUnitsThisHour] = useState({
    timelineA: { item: 0, product: "", qty: 0 },
    timelineB: { item: 0, product: "", qty: 0 },
    timelineC: { item: 0, product: "", qty: 0 },
    timelineD: { item: 0, product: "", qty: 0 },
  });

  // define current hour

  // define fake date as 08/29/2023
  const fakeDate = new Date(2023, 7, 29);

  useEffect(() => {
    const updatedUnitsThisHour = { ...unitsThisHour };

    // Initialize the total quantity for each timeline
    const totalQtyByTimeline = {
      timelineA: 0,
      timelineB: 0,
      timelineC: 0,
    };

    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];

    tables.forEach((table, tableIndex) => {
      table.forEach((row, rowIndex) => {
        const rowDate = new Date(row[0]);

        if (
          rowDate.toDateString() === fakeDate.toDateString() &&
          row[1] === currentHour
        ) {
          // Unhighlight the previously highlighted rows and remove CSS effects
          const highlightedRows = document.querySelectorAll(".highlighted-row");
          highlightedRows.forEach((highlightedRow) => {
            highlightedRow.classList.remove("font-bold");
            highlightedRow.classList.remove("border-4");
            highlightedRow.classList.remove("border-black");
            highlightedRow.classList.remove("bg-green-200");
            highlightedRow.style.backgroundColor = "";
          });

          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(
            `.table-row-${rowIndex}`
          );
          trElements.forEach((trElement) => {
            trElement.classList.add("font-bold");
            trElement.classList.add("border-4");
            trElement.classList.add("border-black");
            trElement.classList.add("bg-green-200");
            trElement.style.backgroundColor = "#86EFAC";
            trElement.classList.add("highlighted-row");
          });

          // Store the matched row element in the ref
          matchedRowRef.current = trElements[0];
          // Scroll to the matched row element and center it
          if (matchedRowRef.current) {
            matchedRowRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }

          // Update the total quantity for this timeline
          totalQtyByTimeline[
            `timeline${String.fromCharCode(65 + tableIndex)}`
          ] += row[5];

          // Update the other information in the unitsThisHour state
          updatedUnitsThisHour[
            `timeline${String.fromCharCode(65 + tableIndex)}`
          ] = {
            item: row[3],
            product: row[4],
            qty: row[5],
          };
        }
      });
    });

    // Update the unitsThisHour state with total quantities
    Object.keys(totalQtyByTimeline).forEach((timelineKey) => {
      updatedUnitsThisHour[timelineKey].totalQty =
        totalQtyByTimeline[timelineKey];
    });

    setUnitsThisHour(updatedUnitsThisHour);
  }, [dateAndTimeline, currentHour]);

  const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
  return (
    <div className="justify-around flex flex-col w-screen text-sm">
      <StatTracker
        timelineA={timelineA}
        timelineB={timelineB}
        timelineC={timelineC}
        dateAndTimeline={dateAndTimeline}
        setUnitsThisHour={setUnitsThisHour}
        unitsThisHour={unitsThisHour}
        timelineData={timelineData}
      />
      <table className=" table-fixed rounded-lg shadow-lg w-screen">
        <tbody>
          <tr>
            <td className="w-1/12 p-2 border-r" style={{ width: "10%" }}>
              <table
                className="w-1/12 min-h-[400px] rounded-lg shadow-lg"
                style={{ width: "10%" }}
              >
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-blue-500 text-white top-0 sticky ">
                      Date
                    </th>
                    <th className="px-2 py-1 text-left bg-blue-500 text-white top-0 sticky ">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dateAndTimeline.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(tables, row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(tables, row[0], row[1]);
                      }}
                    >
                      <td className="px-2 py-1 align-top  ">{row[0]}</td>
                      <td className="px-2 py-1 align-top ">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className=" p-2 border-r" style={{ width: "25%" }}>
              <table className="min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-green-500 text-white top-0 sticky ">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-green-500 text-white pl-5 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-green-500 text-white top-0 sticky ">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineA.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        row[4] === "Change over"
                          ? "bg-blue-300 text-white" // Add a blue background for "change over"
                          : index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500" : ""
                            }`
                          : ` ${row[4] === "CIP" ? "bg-red-200" : "bg-white"}`
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(tables, row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(tables, row[0], row[1]);
                      }}
                    >
                      <td
                        className={`px-2 py-1 align-top w-1/12 ${
                          row[0] === "CIP" ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {row[3]}
                      </td>
                      <td className="px-2 py-1  align-top w-4/6 truncate">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/12">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="p-2 border-r" style={{ width: "25%" }}>
              <table className="table-fixed min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white top-0 sticky">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white pl-10 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white top-0 sticky">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineB.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        row[4] === "Change over"
                          ? "bg-blue-300 text-white" // Add a blue background for "change over"
                          : index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500" : ""
                            }`
                          : ` ${row[4] === "CIP" ? "bg-red-200" : "bg-white"}`
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(tables, row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(tables, row[0], row[1]);
                      }}
                    >
                      <td className={`px-2 py-1 align-top w-1/12 `}>
                        {row[3]}
                      </td>
                      <td className="px-2 py-1 pl-10 align-top w-4/6 truncate">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/12">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className=" p-2 border-r" style={{ width: "25%" }}>
              <table className="table-fixed min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white top-0 sticky ">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white pl-5 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white top-0 sticky ">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineC.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        row[4] === "Change over"
                          ? "bg-blue-300 text-white" // Add a blue background for "change over"
                          : index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500" : ""
                            }`
                          : ` ${row[4] === "CIP" ? "bg-red-200" : "bg-white"}`
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(tables, row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(tables, row[0], row[1]);
                      }}
                    >
                      <td
                        className={`px-2 py-1 align-top w-1/6 ${
                          row[0] === "CIP" ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {row[3]}
                      </td>
                      <td className="px-2 py-1 pl-5 align-top w-4/6 truncate">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/12">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTable;
