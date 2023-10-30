import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const Variables = () => {
  const [totalSpots, setTotalSpots] = useState(0);
  const [config, setConfig] = useState({}); // Initial config value

  const handleTotalSpotsChange = (event) => {
    setTotalSpots(event.target.value);
  };

  useEffect(() => {
    const fetchVariables = async () => {
      const { data, error } = await supabase
        .from("config")
        .select("*")
        .eq("id", 1);

      if (error) {
        console.error("Error fetching variables:", error.message);
      }

      if (data) {
        const newConfig = data[0].config;
        console.log("config", newConfig);
        setConfig(newConfig);
        setTotalSpots(newConfig.TOTAL_SPOTS_IN_WAREHOUSE || 0);
      }
    };

    fetchVariables();
  }, []);

  const handleSave = async () => {
    try {
      // Update the TOTAL_SPOTS_IN_WAREHOUSE value in the "config" table
      const { data, error } = await supabase.from("config").upsert([
        {
          id: 1,
          config: { TOTAL_SPOTS_IN_WAREHOUSE: totalSpots },
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
