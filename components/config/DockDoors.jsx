import React, { useState, useEffect } from "react";
import { CompactPicker } from "react-color"; // Import SketchPicker from react-color
import { supabase } from "../../supabase";

const DockDoors = () => {
  const [totalSpots, setTotalSpots] = useState(1);
  const [dockDoors, setDockDoors] = useState([]);

  const handleTotalSpotsChange = (event) => {
    setTotalSpots(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const generateDockDoors = () => {
      const doors = [];
      for (let i = 1; i <= totalSpots; i++) {
        const randomColor = getRandomColor();
        doors.push({
          id: i,
          name: `Dock ${i}`,
          color: randomColor,
        });
      }
      setDockDoors(doors);
    };

    generateDockDoors();
  }, [totalSpots]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleDoorNameChange = (id, newName) => {
    setDockDoors((prevDockDoors) =>
      prevDockDoors.map((door) =>
        door.id === id ? { ...door, name: newName } : door
      )
    );
  };

  const handleColorChange = (id, color) => {
    setDockDoors((prevDockDoors) =>
      prevDockDoors.map((door) =>
        door.id === id ? { ...door, color: color } : door
      )
    );
  };
  const handleSave = async () => {
    try {
      // Fetch the existing config data from Supabase
      const { data: existingConfigData, error: configError } = await supabase
        .from("config")
        .select("config")
        .eq("id", 1);

      if (configError) {
        console.error(
          "Error fetching existing config data:",
          configError.message
        );
        return;
      }

      // Extract the existing configuration
      const existingConfig = existingConfigData[0]?.config || {};

      // Create a new config object by combining the existing configuration with dock doors data
      const newConfig = {
        ...existingConfig,
        dockDoors: dockDoors, // Assuming dockDoors is an array of dock door data
      };

      // Update the config data in the Supabase "config" table
      const { data: updatedData, error: updateError } = await supabase
        .from("config")
        .upsert([
          {
            id: 1,
            config: newConfig,
          },
        ]);

      if (updateError) {
        console.error("Error updating config data:", updateError.message);
        return;
      }

      console.log("Config data updated successfully:", updatedData);
    } catch (error) {
      console.error("Error while updating config data:", error);
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row justify-start">
        <div className="flex flex-col">
          <label className="font-bold ml-2">
            Total Spots in Dock Yard:
            <input
              type="range"
              min="1"
              max="50"
              value={totalSpots}
              onChange={handleTotalSpotsChange}
              className="w-2/3 ml-5 items-center justify-center text-center mt-2"
            />
            <span className="ml-3 bg-blue-500 rounded-full text-white py-3 px-4 ">
              {totalSpots}
            </span>
          </label>
        </div>
        <button
          onClick={handleSave}
          className="rounded-lg text-black hover:border-black hover:border-2 px-5 hover:font-bold ml-5 mt-5"
        >
          Save
        </button>
      </div>

      <div
        className="dock-yard mt-5 overflow-y-scroll border-2 border-gray-300 rounded-md p-5 m-2"
        style={{ maxHeight: "70vh", maxWidth: "90vw" }}
      >
        <div className="flex flex-col gap-2">
          {dockDoors.map((door, index) => (
            <div
              key={door.id}
              className="flex flex-row justify-between text-center"
            >
              <input
                type="text"
                value={door.name}
                onChange={(e) => handleDoorNameChange(door.id, e.target.value)}
                className="ml-3 mb-6 w-11/12 p-5 px-5 text-3xl mr-4"
              />
              <div
                className="color-picker mr-4"
                style={{ display: "inline-block" }}
              >
                <CompactPicker
                  color={door.color}
                  onChange={(color) => handleColorChange(door.id, color.hex)}
                />
              </div>
              <div
                style={{ backgroundColor: door.color }}
                className="blank-lane border-2 border-black w-full text-center justify-center items-center text-5xl font-bold pt-7"
              >
                Empty
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockDoors;
