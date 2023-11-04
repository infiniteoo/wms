import React from "react";

const StopNumber = ({ numberOfStops, stop }) => {
  return (
    <div className="flex flex-col justify-end items-end">
      <div>
        <label
          htmlFor="stopNumber"
          style={{ fontSize: "15px", fontWeight: "bold", marginRight: "5px" }}
        >
          
        </label>
      </div>
      <div> <label
          htmlFor="stopNumber"
          style={{ fontSize: "15px", fontWeight: "bold", marginRight: "5px" }}
        >
          {stop ? stop + "." : "1."}
        </label> </div>
    </div>
  );
};

export default StopNumber;
