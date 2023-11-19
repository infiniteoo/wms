import React, { useState } from "react";
import itemNames from "./itemNames.js";
import itemSplit from "./itemSplit.js";

const ItemNameDropDown = ({ options, stop, setDefinedStops }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const stopIndex = stop.stopNumber - 1;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    const itemNumberAndName = itemSplit(event.target.value);

    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        itemNumber: itemNumberAndName[0],
        itemDescription: itemNumberAndName[1],
      };
      return updatedStops;
    });
  };

  return (
    <div className="block text-xs font-medium leading-6 w-4/5 text-gray-900 relative rounded-md shadow-sm ">
      <label
        htmlFor="price"
        className="block text-xs font-medium leading-6 text-gray-900 "
      >
        Item
      </label>

      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="block w-full rounded-md border-0  pl-1 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  font-medium block  leading-6 text-gray-900 relative rounded-md shadow-sm h-7 text-xs"
      >
        {itemNames.map((option, index) => (
          <option key={option.name} value={option.name} className="text-xs">
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemNameDropDown;
