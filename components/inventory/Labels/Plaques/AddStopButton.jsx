import React from "react";

const AddStopButton = ({ numberOfStops, setNumberOfStops, stop }) => {
  return (
    <div className="text-center">
      <label
        htmlFor="price"
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        Add Next Item
      </label>

      <button
        className="text-3xl mb-4"
        onClick={() => {
          setNumberOfStops(numberOfStops + 1);
        }}
      >
        ➕
      </button>
    </div>
  );
};

export default AddStopButton;
