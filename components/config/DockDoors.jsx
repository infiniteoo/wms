import { Mr_Dafoe } from "next/font/google";
import React, { useState, useEffect } from "react";

const DockDoors = () => {
  const [totalSpots, setTotalSpots] = useState(1); // Initial totalSpots value
  const [dockDoors, setDockDoors] = useState([]);

  const handleTotalSpotsChange = (event) => {
    setTotalSpots(parseInt(event.target.value, 10));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // Generate the dock doors based on the totalSpots value
    const generateDockDoors = () => {
      const doors = [];
      for (let i = 1; i <= totalSpots; i++) {
        const randomColor = getRandomColor();
        doors.push(
          <div
            key={i}
            style={{ "--random-color": randomColor }}
            className="bg-random-color p-2 rounded-md text-white w-3/12"
          >
            Dock {i}
          </div>
        );
      }
      setDockDoors(doors);
    };

    generateDockDoors();
  }, [totalSpots]);

  return (
    <div>
      <label className="font-bold">
        Total Spots in Dock Yard:
        <input
          type="range"
          min="1"
          max="50"
          value={totalSpots}
          onChange={handleTotalSpotsChange}
          className="w-1/3 ml-5 items-center justify-center text-center mt-2"
        />
        {totalSpots}
      </label>
      <div
        className="dock-yard mt-5 overflow-y-scroll border-2 border-gray-300 rounded-md p-5 m-2"
        style={{ maxHeight: "70vh", maxWidth: "90vw" }}
      >
        <div className="grid grid-cols-2 gap-2">
          {dockDoors.map((door, index) => (
            <div className="flex flex-row justify-center text-center">
              <div key={index} className="ml-3 mb-6 w-full p-5">
                {door}
              </div>
              <div className="border-2 border-black w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockDoors;
