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
  LineElement,
  PointElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// Registering the required pieces for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TrailerLoad = ({ data, userObject }) => {
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState("");

  const options = {
    indexAxis: "y", // To make the bar chart horizontal.
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Count: ${context.parsed.x}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const filteredData = data.filter(
      (item) => item.activity === "Trailer load"
    );

    const userCounts = filteredData.reduce((acc, cur) => {
      const user = cur.user;
      if (user !== "NOUSER") {
        acc[user] = (acc[user] || 0) + 1;
      }
      return acc;
    }, {});
    let earliestDate =
      filteredData.length > 0 ? new Date(filteredData[0]?.date) : new Date();
    let latestDate =
      filteredData.length > 0 ? new Date(filteredData[0]?.date) : new Date();

    filteredData.forEach((item) => {
      const currentDate = new Date(item.date);
      if (currentDate < earliestDate) earliestDate = currentDate;
      if (currentDate > latestDate) latestDate = currentDate;
    });

    // Check if earliestDate and latestDate are valid dates before formatting.
    const formattedEarliestDate =
      earliestDate instanceof Date && !isNaN(earliestDate)
        ? format(earliestDate, "MMMM do yyyy, h:mm a")
        : "Invalid Date";

    const formattedLatestDate =
      latestDate instanceof Date && !isNaN(latestDate)
        ? format(latestDate, "MMMM do yyyy, h:mm a")
        : "Invalid Date";
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
          label: "Trailer Load",
          data: sortedUsers.data,
          backgroundColor: COLORS, // Use the array of COLORS here
          borderColor: COLORS.map((color) => color.replace("0.6", "1")),
          borderWidth: 1,
          hoverBackgroundColor: COLORS.map((color) =>
            color.replace("0.6", "0.8")
          ),
          hoverBorderColor: COLORS.map((color) => color.replace("0.6", "1")),
          hoverBorderWidth: 2, // Increase border width on hover
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
            Trailer Load
          </div>
          <Bar data={chartData} options={options} />{" "}
        </>
      ) : null}
    </div>
  );
};

export default memo(TrailerLoad);
