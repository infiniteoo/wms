import React from "react";
import "./ProgressBar.css"; // You can create a CSS file for styling
import dynamicCounter from "./DynamicCounter";
import CountUp from "react-countup";

function ProgressBar({ message, totalQty, showUnitsLeft = false }) {
  let progress = dynamicCounter(totalQty);

  // Checking if progress and message exist and are valid
  const isProgressValid = progress && progress[0] && !isNaN(progress[0]);
  const isMessageValid = message && typeof message === "string";

  const percent = progress[0].toFixed(2);
  const totalUnits = totalQty;

  const unitsCreated = (percent / 100) * totalUnits;

  const displayValue = showUnitsLeft ? unitsLeft : unitsCreated;

  return (
    <div>
      <div className="progress-container">
        {isProgressValid && (
          <div className="progress-bar" style={{ width: `${progress[0]}%` }}>
            <div className="flex flex-row justify-start">
              {isMessageValid && (
                <div className="progress-text ml-2">{`${message} `}</div>
              )}
              <div className="progress-text">{progress[0].toFixed(2)}%</div>
            </div>
          </div>
        )}
      </div>
      <div className="text-right text-md mt-1">
        {showUnitsLeft ? "Units Left This Hour: " : "Units This Hour: "}
        <CountUp start={displayValue} end={displayValue} /> / {totalQty}{" "}
      </div>
    </div>
  );
}

export default ProgressBar;
