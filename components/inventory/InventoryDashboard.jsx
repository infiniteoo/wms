import OccupancyProgress from "./OccupancyProgress";
import RecentActivity from "./RecentActivity";

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
    </div>
  );
};

export default InventoryDashboard;
