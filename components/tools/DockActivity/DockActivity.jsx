import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import UnloadingInfo from "./UnloadingInfo";

const DockActivity = () => {
  const [inputTotalSpots, setInputTotalSpots] = useState(1);
  const [dockDoors, setDockDoors] = useState([]);
  const [sliderChanged, setSliderChanged] = useState(false);
  const [inboundOrders, setInboundOrders] = useState([]);
  const [outboundOrders, setOutboundOrders] = useState([]);

  useEffect(() => {
    // Fetch dockDoors data from the database
    const fetchDockDoorsData = async () => {
      try {
        const { data, error } = await supabase
          .from("config")
          .select("config")
          .eq("id", 1);

        if (error) {
          console.error("Error fetching dockDoors data:", error.message);
          return;
        }

        if (data.length > 0) {
          const existingDockDoors = data[0].config.dockDoors;
          if (existingDockDoors) {
            setDockDoors(existingDockDoors);
            setInputTotalSpots(existingDockDoors.length); // Set slider value
          }
        }
      } catch (error) {
        console.error("Error fetching dockDoors data:", error);
      }
    };

    fetchDockDoorsData();
  }, [inputTotalSpots, sliderChanged]);

  useEffect(() => {
    // query the incoming_orders and outgoing_orders tables for orders with status  "unloading" and "loading" respectively and load them into states

    const fetchIncomingOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("incoming_orders  ")
          .select("*")
          .eq("status", "Unloading");

        if (error) {
          console.error("Error fetching incoming orders:", error.message);
          return;
        }

        if (data.length > 0) {
          const incomingOrders = data;
          console.log(incomingOrders);
          setInboundOrders(incomingOrders);
        }
      } catch (error) {
        console.error("Error fetching incoming orders:", error);
      }
    };

    const fetchOutgoingOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("outbound_orders")
          .select("*")
          .eq("status", "Loading");

        if (error) {
          console.error("Error fetching outgoing orders:", error.message);
          return;
        }

        if (data.length > 0) {
          const outgoingOrders = data;
          console.log(outgoingOrders);
          setOutboundOrders(outgoingOrders);
        }
      } catch (error) {
        console.error("Error fetching outgoing orders:", error);
      }
    };

    fetchIncomingOrders();
    fetchOutgoingOrders();
  }, []);

  const handleDoorNameChange = (id, newName) => {
    setDockDoors((prevDockDoors) =>
      prevDockDoors.map((door) =>
        door.id === id ? { ...door, name: newName } : door
      )
    );
  };

  return (
    <div className="flex flex-col mt-8">
      <div
        className="dock-yard mt-5 overflow-y-scroll border-2 border-gray-300 rounded-md p-5 m-2"
        style={{ maxHeight: "70vh", maxWidth: "90vw" }}
      >
        <div className="flex flex-col gap-2">
          {dockDoors.map((door, index) => (
            <div
              key={door.id}
              className="flex flex-row justify-between text-center"
            >
              <input
                type="text"
                value={door.name}
                onChange={(e) => handleDoorNameChange(door.id, e.target.value)}
                className="ml-3 mb-6 w-1/3 p-5 px-5 text-3xl mr-4 text-white"
                style={{ backgroundColor: door.color }}
                readOnly
              />

              <div
                style={{ backgroundColor: "white" }}
                className="blank-lane border-2 border-black w-full text-center justify-center items-center text-5xl font-bold pt-7"
              >
                {inboundOrders.length === 0 && outboundOrders.length === 0 ? (
                  "Empty"
                ) : (
                  <>
                    {inboundOrders.map((order) => (
                      <div key={order.id}>
                        {order.assigned_dock_door === door.name ? (
                          <UnloadingInfo order={order} />
                        ) : null}
                      </div>
                    ))}
                    {outboundOrders.map((order) => (
                      <div key={order.id}>
                        {order.assigned_dock_door === door.name ? (
                          <UnloadingInfo order={order} />
                        ) : null}
                      </div>
                    ))}
                    {inboundOrders
                      .concat(outboundOrders)
                      .every((order) => order.assigned_dock_door !== door.name)
                      ? "Empty"
                      : null}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockActivity;
