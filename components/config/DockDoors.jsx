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
    <div className="flex flex-col mt-8">
      <div className="flex flex-row">
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
            <span className="ml-3 bg-blue-500 rounded-full text-white py-3 px-4">
              {totalSpots}
            </span>
          </label>
        </div>
      </div>

      <div
        className="dock-yard mt-5 overflow-y-scroll border-2 border-gray-300 rounded-md p-5 m-2"
        style={{ maxHeight: "70vh", maxWidth: "90vw" }}
      >
        <div className="flex flex-col gap-2">
          {dockDoors.map((door, index) => (
            <div
              key={index}
              className="flex flex-row justify-center text-center"
            >
              <div className="ml-3 mb-6 w-11/12 p-5 px-5 text-3xl">{door}</div>
              <div className="blank-lane border-2 border-black w-full text-center justify-center items-center text-5xl font-bold pt-7">
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
