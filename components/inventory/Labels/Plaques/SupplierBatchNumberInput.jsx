import React, { useState } from "react";
import axios from "axios";

const SupplierBatchNumberInput = ({
  stop,
  definedStops,
  setDefinedStops,
  numberOfStops,
  setNumberOfStops,
}) => {
  const stopIndex = stop.stopNumber - 1; // Assuming stops are 1-indexed

  const [enteredOrderNumber, setEnteredOrderNumber] = useState("");

  const handleBlur = () => {
    if (enteredOrderNumber === "") return;

    // fetch post /api/generateImage/:orderNumber
    // axios.post(`http://localhost:8156/api/generateImage/${enteredOrderNumber}`);
    axios.post(
      process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
        ? `/api/generateImage/${enteredOrderNumber}`
        : `https://fgftags.com/api/generateImage/${enteredOrderNumber}`
    );
  };

  /* update setEnteredOrderNumber with the event */

  const handleOrderNumberChange = (event) => {
    const selectedOrderNumber = event.target.value;

    setEnteredOrderNumber(selectedOrderNumber);

    setDefinedStops((prevDefinedStops) => {
      const updatedStops = [...prevDefinedStops];
      updatedStops[stopIndex] = {
        ...updatedStops[stopIndex],
        supplierBatchNumber: selectedOrderNumber,
      };
      return updatedStops;
    });
  };

  return (
    <div className="ml-2 w-2/5">
      <label htmlFor="price" className="block text-xs  leading-6 text-gray-900">
        Batch
      </label>
      <div className="relative  rounded-md shadow-xs ">
        <input
          type="text"
          name="price"
          id="price"
          className="block  w-full rounded-md border-0  pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  h-7 text-xs"
          placeholder=""
          onChange={handleOrderNumberChange}
          value={enteredOrderNumber}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default SupplierBatchNumberInput;
