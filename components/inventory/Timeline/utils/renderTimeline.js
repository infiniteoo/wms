import ProgressBar from "../ProgressBar";
import CountUp from "react-countup";
import { calculateTotalUnitsByItem } from "./calculateTotalUnitsByItem";

export const renderTimeline = (
  timelineData,
  timelineA,
  timelineB,
  timelineC,
  startingQty,
  qty,
  unitsMadeThisHour
) => {
  const totalUnitsByItem = calculateTotalUnitsByItem({
    timelineData: timelineData,
    timelineA: timelineA,
    timelineB: timelineB,
    timelineC: timelineC,

    // Assuming timelineA is the appropriate property
  });

  if (timelineData.product === "CIP") {
    return (
      <div className="text-center text-2xl mt-5">CLEANING IN PROGRESS...</div>
    );
  }

  return (
    <div>
      {timelineData.product !== "CIP" ? (
        <div>
          <div className="w-100 mt-2">
            <ProgressBar
              qty={qty}
              totalQty={timelineData.qty}
              message={"Units/Hour:"}
              startingQty={startingQty}
              percentage={(unitsMadeThisHour / timelineData.qty) * 100}
            />
          </div>{" "}
          <div className="flex flex-row  w-100 ">
            <div className="stat-item">
              <p className="text-xs ">
                Item Number:{" "}
                <span className="text-sm">{timelineData.item}</span>
              </p>
            </div>
            <div className="stat-item flex flex-col">
              <p className="text-xs">Item:</p>
              <p className="text-sm ">{timelineData.product}</p>
            </div>
          </div>
          <div className="flex flex-row justify-start mt-1">
            <div className="stat-item">
              <p className="text-xs text-right">
                {" "}
                Units/Hour: {timelineData.qty}
              </p>
            </div>
            <div className="stat-item">
              <p className="text-xs text-right">
                Total Units: {timelineData.totalQty}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
