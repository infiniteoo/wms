import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Chart from "chart.js/auto";

const InventoryTimeline = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const { data, error } = await supabase
          .from("inventory")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(100);

        if (error) {
          console.error(error);
        } else {
          setActivity(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentActivity();
  }, []);

  useEffect(() => {
    if (activity.length > 0) {
      const timestamps = activity.map((item) => new Date(item.last_modified));
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
                label: "Activity Count",
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
                  text: "Activity Count",
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

export default InventoryTimeline;
