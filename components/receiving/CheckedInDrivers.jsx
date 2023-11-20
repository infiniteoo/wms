import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

const CheckedInDrivers = ({ setActiveTab }) => {
  const [drivers, setdrivers] = useState([]);

  const getCheckedInDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("driver_check_in")
        .select("*")
        .eq("status", "Scheduled");

      error && console.log("error", error);
      data && setdrivers(data);
    } catch (error) {
      console.error("Error getting total row count:", error);
    }
  };

  useEffect(() => {
    getCheckedInDrivers();
  }, []);
  const formattedCheckIn = (date) => (
    <>
      {new Date(date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        year: "2-digit",
      })}
    </>
  );

  return (
    <div className="p-4 w-full">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-lg font-bold border-b">Checked In Drivers</p>
        {drivers.length > 0 ? (
          drivers.map((driver, index) => (
            <div className="flex flex-row justify-between items-center mb-2 mt-2 h-full overflow-y-scroll">
              <div className="flex flex-col">
                <p className="text-md">{index + 1}.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Name: {driver.driverName}</p>
                <p className="text-sm">Phone: {driver.driverPhoneNumber}</p>
                <p className="text-sm">Carrier: {driver.carrier}</p>
                <p className="text-sm">Trailer: {driver.trailerNumber}</p>
                <p className="text-sm">Destination: {driver.destination}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Checked In</p>
                <p className="text-sm">{formattedCheckIn(driver.created_at)}</p>
                <button
                  className="text-sm bg-blue-400 rounded-xl text-white"
                  onClick={() => {
                    setActiveTab("driver check-in");
                  }}
                >
                  Assign Door
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl font-bold">No Drivers Checked In</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckedInDrivers;
