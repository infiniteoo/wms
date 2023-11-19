import React from "react";
import ShippingTimeline from "./ShippingTimeline";
import RecentActivity from "./RecentActivity";
import CheckedInDrivers from "./CheckedInDrivers";

const ShippingDashboard = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col border-black shadow-md mt-10">
      <div className="flex flex-row">
        <div className="w-1/2 h-1/2">
          <div className="flex flex-col h-full justify-start">
            <CheckedInDrivers setActiveTab={setActiveTab} />
          </div>
        </div>
        <div className="w-1/2 ml-2 h-1/2">
          <div className="flex flex-col h-full ">
            <RecentActivity />
          </div>
        </div>
      </div>
      <div className="mt-3 h-full">
        <ShippingTimeline />
      </div>
    </div>
  );
};

export default ShippingDashboard;
