import React from "react";

const UnloadingInfo = ({ order }) => {
  return (
    <div>
      <div>
        <p className="text-2xl text-black font-normal">
          Status: <span className="font-bold">{order.status}</span>
        </p>
        <p className="text-sm text-black font-normal">
          PO Number:
          <span className="   "> {order.po_number}</span>
        </p>
        <p className="text-sm text-black font-normal">
          Operator:
          <span className="   "> {order.unloaded_by}</span>
        </p>
        <p className="text-sm text-black font-normal">
          Carrier:
          <span className="   "> {order.carrier}</span>
        </p>
      </div>
      <img
        src="bigrig.svg"
        alt="Big Rig"
        width="200"
        height="200"
        className="float-right mr-1"
      />
    </div>
  );
};

export default UnloadingInfo;
