import React from "react";
import ReceivingTimeline from "./ReceivingTimeline";
import RecentActivity from "./RecentActivity";

const ReceivingDashboard = () => {
  return (
    <div className="flex flex-col border-black shadow-md mt-10">
      <div>
        <RecentActivity />
      </div>
      <div className="mt-5 ml-1">
        <ReceivingTimeline />
      </div>
    </div>
  );
};

export default ReceivingDashboard;
