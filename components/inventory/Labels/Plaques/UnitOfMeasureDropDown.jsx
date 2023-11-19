import { useState } from "react";
import uomData from "./uomData.js";

const NumberOfPalletsDropDown = ({ stop, setDefinedStops }) => {
  const [selectedOption, setSelectedOption] = useState(uomData[0].measurement);
  const stopIndex = stop.stopNumber - 1;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        unitOfMeasure: event.target.value,
      };
      return updatedStops;
    });
  };

  return (
    <div className="block text-xs w-1/5 font-medium leading-6 text-gray-900 relative ml-2 rounded-md shadow-sm ">
      <label
        htmlFor="price"
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        UOM
      </label>

      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="block w-full rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium block text-sm leading-6 text-gray-900 relative rounded-md shadow-sm h-7"
      >
        {uomData.map((option, index) => (
          <option key={option.id} value={option.measurement}>
            {option.measurement}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NumberOfPalletsDropDown;
