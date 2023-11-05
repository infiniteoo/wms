import React, { useState } from "react";
import "./DatePicker.css"; // Import your CSS file
import TodaysDate from "./todaysDate";
import formatDateToMMDDYY from "./formatDateToMMDDYY";
import axios from "axios";

const ProductionDatePicker = ({
  options,
  numberOfStops,
  setNumberOfStops,
  stop,
  setDefinedStops,
  definedStops,
}) => {
  const [selectedDate, setSelectedDate] = useState(TodaysDate());
  const stopIndex = stop.stopNumber - 1; // Assuming stops are 1-indexed

  const handleDateChange = (event) => {
    const formattedDate = formatDateToMMDDYY(event.target.value);

    setSelectedDate(event.target.value);
    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        productionDate: formattedDate,
      };
      return updatedStops;
    });
  };

  const handleBlur = () => {
    const formattedDate = formatDateToMMDDYY(selectedDate);
    axios.post(
      process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? `/api/generateImage/${formattedDate}`
        : `https://fgftags.com/api/generateImage/${formattedDate}`
    );
  };

  return (
    <div className="w-2/5 ml-2">
      <label className="block text-xs font-medium leading-6 text-gray-900  ">
        Prod Date
      </label>
      <input
        type="date"
        className=" h-7 text-xs border-md rounded-md border-0 py-1.5 pl-2 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600   sm:leading-6 font-medium block text-sm leading-6 text-gray-900 relative rounded-md shadow-sm w-full text-xs"
        value={selectedDate}
        onChange={handleDateChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default ProductionDatePicker;
