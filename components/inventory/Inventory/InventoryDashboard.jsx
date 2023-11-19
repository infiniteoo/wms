import OccupancyProgress from "../Dashboard/OccupancyProgress";
import RecentActivity from "../Dashboard/RecentActivity";
import InventoryTimeline from "./InventoryTimeline";

const InventoryDashboard = () => {
  return (
    <div className="p-4  flex flex-col w-screen">
      <div className="p-4 flex flex-row">
        <div className="w-1/2">
          {" "}
          <OccupancyProgress />
        </div>

        <div className="w-1/2">
          {" "}
          <RecentActivity />
        </div>
      </div>
      <div className="">
        <InventoryTimeline />
      </div>
    </div>
  );
};

export default InventoryDashboard;
