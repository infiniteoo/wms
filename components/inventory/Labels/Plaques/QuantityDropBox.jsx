import React, { useState } from "react";

const QuantityNumberInput = ({
  stop,
  definedStops,
  setDefinedStops,
  numberOfStops,
  setNumberOfStops,
}) => {
  const stopIndex = stop.stopNumber - 1; // Assuming stops are 1-indexed

  const [quantityNumber, setQuantityNumber] = useState("");

  /* update setEnteredOrderNumber with the event */

  const handleQuantityNumberChange = (event) => {
    const enteredQuantityNumber = event.target.value;

    setQuantityNumber(enteredQuantityNumber);

    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        quantity: enteredQuantityNumber,
      };
      return updatedStops;
    });
  };

  return (
    <div className="ml-2 w-2/5">
      <label
        htmlFor="price"
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        Quantity
      </label>
      <div className="relative rounded-md shadow-sm ">
        <input
          type="text"
          name="price"
          id="price"
          className="block  w-full rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600   h-7 text-xs w-20"
          placeholder=""
          onChange={handleQuantityNumberChange}
          value={quantityNumber}
        />
      </div>
    </div>
  );
};

export default QuantityNumberInput;
