import React, { useState, useEffect, memo } from "react";
import { COLORS } from "../utils/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  RadarController,
  RadialLinearScale,
} from "chart.js";

import { Doughnut } from "react-chartjs-2"; // Import Doughnut

import { PieController, ArcElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  RadarController,
  RadialLinearScale
);

const itemsShipped = ({ data, userObject, isInModal }) => {
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    if (!data) return; // Make sure data is available

    const itemCounts = data.reduce((acc, cur) => {
      const itemNumber = cur.itemNumber;
      if (itemNumber) {
        // Only count itemNumber that are not blank or undefined
        acc[itemNumber] = (acc[itemNumber] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort itemCounts from highest to lowest count.
    const sortedEntries = Object.entries(itemCounts).sort(
      ([, a], [, b]) => b - a
    );

    // Convert sorted entries to labels and data arrays.
    const sortedItems = sortedEntries.reduce(
      (acc, [item, count]) => {
        acc.labels.push(item);
        acc.data.push(count);
        return acc;
      },
      { labels: [], data: [] }
    );

    setChartData({
      labels: sortedItems.labels,
      datasets: [
        {
          data: sortedItems.data,
          backgroundColor: COLORS.slice(0, sortedItems.data.length),
          borderColor: COLORS.slice(0, sortedItems.data.length).map((color) =>
            color.replace("0.6", "1")
          ),
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  return (
    <div className="bg-gray-100 z-50 flex flex-col h-full">
      {chartData ? (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              position: "relative",
              zIndex: 50,
              backgroundColor: "white",
            }}
          >
            Item Numbers Shipped
          </div>
          <div
            style={{
              width: isInModal ? "600px" : "200px",
              height: isInModal ? "600px" : "200px",
              margin: "auto",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default memo(itemsShipped);
