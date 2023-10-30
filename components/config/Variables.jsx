import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const Variables = () => {
  const [inputTotalSpots, setInputTotalSpots] = useState(0); // Separate state for the input
  const [config, setConfig] = useState({});

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const { data, error } = await supabase
          .from("config")
          .select("config")
          .eq("id", 1);

        if (error) {
          console.error("Error fetching variables:", error.message);
          return;
        }

        if (data && data.length > 0) {
          setConfig(data[0].config);
          setInputTotalSpots(data[0].config.TOTAL_SPOTS_IN_WAREHOUSE);
        }
      } catch (error) {
        console.error("Error fetching variables:", error);
      }
    };

    fetchVariables();
  }, []); // No need to include inputTotalSpots as a dependency

  const handleTotalSpotsChange = (event) => {
    setInputTotalSpots(event.target.value); // Update the input state
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from("config").upsert([
        {
          id: 1,
          config: {
            ...config,
            TOTAL_SPOTS_IN_WAREHOUSE: inputTotalSpots, // Use the input value
          },
        },
      ]);

      if (error) {
        console.error("Error updating configuration:", error.message);
      } else {
        console.log("Configuration updated successfully:", data);
      }
    } catch (error) {
      console.error("Error while updating configuration:", error);
    }
  };

  return (
    <div className="ml-3">
      <label>
        Total Spots in Warehouse:
        <input
          type="number"
          value={inputTotalSpots} // Use the input state here
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
