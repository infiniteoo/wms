import React, { useState, useEffect, memo } from "react";
import { format } from "date-fns";
import { COLORS } from "../utils/constants";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// Registering the required pieces for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PalletPick = ({ data, userObject }) => {
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) => item.activity === "Pallet Pick");

    const userCounts = filteredData.reduce((acc, cur) => {
      const user = cur.user;
      if (user !== "NOUSER") {
        acc[user] = (acc[user] || 0) + 1;
      }
      return acc;
    }, {});
    let earliestDate = new Date(filteredData[0]?.date);
    let latestDate = new Date(filteredData[0]?.date);

    filteredData.forEach((item) => {
      const currentDate = new Date(item.date);
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
          label: "Pallet Pick",
          data: sortedUsers.data,
          backgroundColor: COLORS,
          borderColor: COLORS.map((color) => color.replace("0.6", "1")),
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
              backgroundColor: "white",
            }}
          >
            Pallet Picks
          </div>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                  labels: {
                    font: {
                      size: 18,
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default memo(PalletPick);
