import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const Variables = () => {
  const [totalSpots, setTotalSpots] = useState(0);

  const handleTotalSpotsChange = (event) => {
    setTotalSpots(event.target.value);
  };

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        // Fetch the TOTAL_SPOTS_IN_WAREHOUSE value from the "config" table
        const { data, error } = await supabase
          .from("config")
          .select("TOTAL_SPOTS_IN_WAREHOUSE")
          .single();

        if (error) {
          console.error("Error fetching variable:", error.message);
        } else if (data) {
          // If the value is found, update the state
          setTotalSpots(data.TOTAL_SPOTS_IN_WAREHOUSE);
        }
      } catch (error) {
        console.error("Error while fetching variables:", error);
      }
    };

    fetchVariables();
  }, []);

  const handleSave = async () => {
    try {
      // Update the TOTAL_SPOTS_IN_WAREHOUSE value in the "config" table
      const { data, error } = await supabase.from("config").upsert([
        {
          TOTAL_SPOTS_IN_WAREHOUSE: totalSpots,
        },
      ]);

      if (error) {
        console.error("Error updating variable:", error.message);
      } else {
        console.log("Variable updated successfully:", data);
      }
    } catch (error) {
      console.error("Error while updating variables:", error);
    }
  };

  return (
    <div className="ml-3">
      <label>
        Total Spots in Warehouse:
        <input
          type="number"
          value={totalSpots}
          onChange={handleTotalSpotsChange}
          className="w-1/3 ml-2"
        />
      </label>
      <button
        onClick={handleSave}
        className="bg-green-300 rounded-lg text-white px-2 py-1"
      >
        Save
      </button>
    </div>
  );
};

export default Variables;
