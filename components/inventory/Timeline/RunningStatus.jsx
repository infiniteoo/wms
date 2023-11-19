import React from "react";
import "./RunningStatus.css";

function RunningStatus({ status }) {
  if (status.includes("RUNNING")) {
    return <div className="running-box">{status}</div>;
  } else {
    return <div className="stopped-box">{status}</div>;
  }
}

export default RunningStatus;
