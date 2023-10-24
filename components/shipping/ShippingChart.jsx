import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Chart from "chart.js/auto";

const ShippingChart = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchRecentActivity() {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      try {
        const { data, error } = await supabase
          .from("outbound_orders")
          .select("created_at")
          .gte("created_at", twentyFourHoursAgo.toISOString())
          .order("created_at", { ascending: true });

        if (error) {
          console.error(error);
        } else {
          setActivity(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecentActivity();
  }, []);

  useEffect(() => {
    if (activity.length > 0) {
      const timestamps = activity.map((item) => new Date(item.created_at));
      const counts = Array(24).fill(0);

      timestamps.forEach((timestamp) => {
        const hour = timestamp.getHours();
        counts[hour] += 1;
      });

      const canvas = document.getElementById("inventory-timeline-chart");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (window.inventoryTimelineChart) {
          window.inventoryTimelineChart.destroy();
        }
        window.inventoryTimelineChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: Array.from({ length: 24 }, (_, i) => i),
            datasets: [
              {
                label: "Items Added in the Last 24 Hours",
                data: counts,
                backgroundColor: "rgba(51, 102, 204, 0.6)",
                borderColor: "rgba(51, 102, 204, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Hour of the Day",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Itemss",
                },
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [activity]);

  return (
    <div className="flex justify-center items-center h-1/4">
      <div className="inventory-timeline w-11/12 rounded-lg shadow-md">
        <canvas id="inventory-timeline-chart" width="400" height="75"></canvas>
      </div>
    </div>
  );
};

export default ShippingChart;
