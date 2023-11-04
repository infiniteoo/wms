import React, { useState } from "react";
import palletCount from "./palletCount.js";

const NumberOfPalletsDropDown = ({
  options,
  numberOfStops,
  setNumberOfStops,
  stop,
  setDefinedStops,
  definedStops,
}) => {
  const [selectedOption, setSelectedOption] = useState(palletCount[2]);

  const stopIndex = stop.stopNumber - 1; // Assuming stops are 1-indexed

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        numberOfPallets: event.target.value,
      };
      return updatedStops;
    });
  };

  return (
    <div className="block text-xs w-1/5 font-medium leading-6 text-gray-900 relative rounded-md shadow-sm ml-2">
      <label
        htmlFor="price"
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        Pallets
      </label>

      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="block  rounded-md border-0 text-gray-900 ring-1 pl-1   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6 font-medium block  leading-6 text-gray-900 relative rounded-md shadow-sm h-7 text-xs w-full"
      >
        {palletCount.map((option, index) => (
          <option key={option.id} value={option.id}>
            {option.id}
          </option>
        ))}
      </select>

      
    </div>
  );
};

export default NumberOfPalletsDropDown;
