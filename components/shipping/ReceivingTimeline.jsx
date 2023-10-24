import React from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const ReceivingTimeline = () => {
  const groups = [
    { id: 1, title: "Inbounds" },
    { id: 2, title: "Outbounds" },
  ];

  const items = [
    {
      id: 1,
      group: 1,
      title: "Inbound #34",
      start_time: moment(),
      end_time: moment().add(2, "hour"),
    },
    {
      id: 2,
      group: 2,
      title: "Outbound - Crete #44",
      start_time: moment().add(-0.5, "hour"),
      end_time: moment().add(4.5, "hour"),
    },
    {
      id: 3,
      group: 1,
      title: "Inbound #37",
      start_time: moment().add(4, "hour"),
      end_time: moment().add(6, "hour"),
    },
  ];

  return (
    <div className="p-4 rounded shadow-md mr-1">
      <h2 className="text-lg font-semibold">Appointment Calendar</h2>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-6, "hour")}
        defaultTimeEnd={moment().add(12, "hour")}
        sidebarWidth={100}
        lineHeight={43}
        itemHeightRatio={0.75}
      />
    </div>
  );
};

export default ReceivingTimeline;
