import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";

const OccupancyProgress = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [TOTAL_SPOTS_IN_WAREHOUSE, setTotalSpotsInWarehouse] = useState(0);

  const getTotalRowCount = async () => {
    try {
      const { data, count } = await supabase
        .from("inventory")
        .select("*", { count: "exact", head: true });

      if (count) {
        const totalCount = count;
        setTotalCount(totalCount); // Update the state with the total count
      } else {
        setTotalCount(0); // Update with 0 if no data is available (e.g., empty table)
      }
    } catch (error) {
      console.error("Error getting total row count:", error);
      setTotalCount(0); // Update with 0 in case of an error
    }
  };

  const getTotalSpots = async () => {
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*")
        .eq("id", 1);

      if (data) {
        setTotalSpotsInWarehouse(data[0].config.TOTAL_SPOTS_IN_WAREHOUSE);
      } else {
        setTotalCount(0); // Update with 0 if no data is available (e.g., empty table)
      }
    } catch (error) {
      console.error("Error getting total row count:", error);
      setTotalCount(0); // Update with 0 in case of an error
    }
  };

  useEffect(() => {
    getTotalRowCount();
    getTotalSpots();
  }, []);

  // Calculate the number of occupied spots
  const occupiedSpots = totalCount;

  // Calculate the percentage of occupied spots
  const percentageOccupied = (occupiedSpots / TOTAL_SPOTS_IN_WAREHOUSE) * 100;

  return (
    <div className="p-4 w-full">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold">Warehouse Occupancy</h2>
        <p>Total Spots: {TOTAL_SPOTS_IN_WAREHOUSE}</p>
        <p>Occupied Spots: {occupiedSpots}</p>
        <p>Occupancy Percentage: {percentageOccupied.toFixed(2)}%</p>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {percentageOccupied.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div
              style={{ width: `${percentageOccupied}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyProgress;
