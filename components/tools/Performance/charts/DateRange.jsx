import React from "react";

const DateRange = ({ dateRange }) => {
  return (
    <div>
      <div className="date-range-display font-bold text-xl bg-gray-200 p-1 rounded border-4 border-gray-400">
        {dateRange}
      </div>
    </div>
  );
};

export default DateRange;
