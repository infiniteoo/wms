import React, { useState, useEffect, memo } from "react";
import { COLORS } from "../utils/constants";
import { format } from "date-fns";

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

import { Bar } from "react-chartjs-2";

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

const InventoryAttributeChange = ({ data, userObject }) => {
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const filteredData = data.filter(
      (item) => item.activity === "Inventory Attribute Change"
    );

    const userCounts = filteredData.reduce((acc, cur) => {
      const user = cur.user;
      if (user !== "NOUSER") {
        acc[user] = (acc[user] || 0) + 1;
      }
      return acc;
    }, {});

    let earliestDate = new Date(filteredData[0]?.date); // assuming date is a field in your data
    let latestDate = new Date(filteredData[0]?.date);

    filteredData.forEach((item) => {
      const currentDate = new Date(item.date); // replace 'date' with your actual date field
      if (currentDate < earliestDate) earliestDate = currentDate;
      if (currentDate > latestDate) latestDate = currentDate;
    });

    // Formatting the dates
    const formattedEarliestDate = format(earliestDate, "MMMM do yyyy, h:mm a");
    const formattedLatestDate = format(latestDate, "MMMM do yyyy, h:mm a");

    setDateRange(`${formattedEarliestDate} - ${formattedLatestDate}`);

    // Convert to array, sort, and create labels and data arrays.
    const sortedUsers = Object.entries(userCounts)
      .sort((a, b) => b[1] - a[1])
      .reduce(
        (acc, [user, count]) => {
          acc.labels.push(user);
          acc.data.push(count);
          return acc;
        },
        { labels: [], data: [] }
      );

    setChartData({
      labels: sortedUsers.labels,
      datasets: [
        {
          label: "Inventory Attribute Change",
          data: sortedUsers.data,
          backgroundColor: COLORS.slice(0, sortedUsers.data.length), // Use the array of COLORS here
          borderColor: COLORS.slice(0, sortedUsers.data.length).map((color) =>
            color.replace("0.6", "1")
          ), // Replace the alpha value with 1 for border
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <div className="bg-gray-100 z-50">
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
            Inventory Attribute Change
          </div>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 14, // adjust this value for x-axis labels
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 18, // adjust this value for y-axis labels
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: false, // This will hide the legend including the color box
                },
              },
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default memo(InventoryAttributeChange);
