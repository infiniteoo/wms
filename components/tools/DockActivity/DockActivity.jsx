import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";

const DockActivity = () => {
  const [inputTotalSpots, setInputTotalSpots] = useState(1);
  const [dockDoors, setDockDoors] = useState([]);
  const [sliderChanged, setSliderChanged] = useState(false);

  const handleTotalSpotsChange = (event) => {
    setInputTotalSpots(parseInt(event.target.value, 10));
    setSliderChanged(true);
  };

  useEffect(() => {
    if (sliderChanged) {
      const generateDockDoors = () => {
        const doors = [];
        for (let i = 1; i <= inputTotalSpots; i++) {
          const randomColor = getRandomColor();
          doors.push({
            id: i,
            name: `Dock ${i}`,
            color: randomColor,
          });
        }
        setDockDoors(doors);
        setSliderChanged(false); // Reset the sliderChanged flag
      };

      generateDockDoors();
    }

    // Fetch dockDoors data from the database
    const fetchDockDoorsData = async () => {
      try {
        const { data, error } = await supabase
          .from("config")
          .select("config")
          .eq("id", 1);

        if (error) {
          console.error("Error fetching dockDoors data:", error.message);
          return;
        }

        if (data.length > 0) {
          const existingDockDoors = data[0].config.dockDoors;
          if (existingDockDoors) {
            setDockDoors(existingDockDoors);
            setInputTotalSpots(existingDockDoors.length); // Set slider value
          }
        }
      } catch (error) {
        console.error("Error fetching dockDoors data:", error);
      }
    };

    fetchDockDoorsData();
  }, [inputTotalSpots, sliderChanged]);

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

  return (
    <div className="flex flex-col mt-8">
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
                className="ml-3 mb-6 w-1/3 p-5 px-5 text-3xl mr-4 text-white"
                style={{ backgroundColor: door.color }}
                readOnly
              />

              <div
                style={{ backgroundColor: "white" }}
                className="blank-lane border-2 border-black w-full text-center justify-center items-center text-5xl font-bold pt-7"
              >
                <img
                  src="bigrig.svg"
                  alt="Big Rig"
                  width="200"
                  height="200"
                  className="float-right mr-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockActivity;
