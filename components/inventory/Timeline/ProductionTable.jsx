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
}) => {
  // Create a ref to store the matched row element
  const matchedRowRef = useRef(null);
  // State to keep track of the current hour

  const [currentHour, setCurrentHour] = useState(
    new Date().getHours().toString().padStart(2, "0") + ":00:00"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newHour =
        new Date().getHours().toString().padStart(2, "0") + ":00:00";
      setCurrentHour(newHour);
    }, 5000); // Update every minute

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

  // create useeffect on component start

  useEffect(() => {
    const updatedUnitsThisHour = { ...unitsThisHour };

    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];

    tables.forEach((table, tableIndex) => {
      let totalQty = 0; // Initialize the total quantity for this timeline

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
            highlightedRow.style.backgroundColor = ""; // Remove background color
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
            trElement.style.backgroundColor = "#86EFAC"; // Set the background color to the desired color
            trElement.classList.add("highlighted-row"); // Add a class to mark as highlighted
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
          totalQty += row[5];

          // Set the values in the unitsThisHour state based on the current timeline
          updatedUnitsThisHour[
            `timeline${String.fromCharCode(65 + tableIndex)}`
          ] = {
            item: row[3],
            product: row[4],
            qty: row[5],
            totalQty, // Add the totalQty to the state
          };
        }
      });

      const myTables = [timelineA, timelineB, timelineC];

      myTables.forEach((table, tableIndex) => {
        let totalQty = 0; // Initialize the total quantity for this timeline

        table.forEach((row, rowIndex) => {
          /*  */
          if (
            row[3] ===
              updatedUnitsThisHour[
                `timeline${String.fromCharCode(66 + tableIndex)}`
              ].item &&
            row[4] ===
              updatedUnitsThisHour[
                `timeline${String.fromCharCode(66 + tableIndex)}`
              ].product
          ) {
            // Update the total quantity for this timeline
            totalQty += row[5];

            // Set the values in the unitsThisHour state based on the current timeline
            updatedUnitsThisHour[
              `timeline${String.fromCharCode(66 + tableIndex)}`
            ] = {
              item: row[3],
              product: row[4],
              qty: row[5],
              totalQty, // Add the totalQty to the state
            };
            setUnitsThisHour(updatedUnitsThisHour);
          }
        });
      });
    });

    setUnitsThisHour(updatedUnitsThisHour);
  }, [dateAndTimeline, currentHour]);

  const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
  return (
    <div className="justify-between">
      <StatTracker
        timelineA={timelineA}
        timelineB={timelineB}
        timelineC={timelineC}
        dateAndTimeline={dateAndTimeline}
        setUnitsThisHour={setUnitsThisHour}
        unitsThisHour={unitsThisHour}
      />
      <table className=" table-fixed rounded-lg shadow-lg">
        <tbody>
          <tr>
            <td className="w-1/12 p-2 border-r">
              <table className="w-1/12 min-h-[400px] rounded-lg shadow-lg">
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
            <td className=" p-2 border-r" style={{ width: "30.56%" }}>
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
            <td className="p-2 border-r" style={{ width: "30.56%" }}>
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
            <td className=" p-2 border-r" style={{ width: "30.56%" }}>
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
