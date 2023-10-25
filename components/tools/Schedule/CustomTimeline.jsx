import React, { useState } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";
import generateFakeData from "./generate-fake-data";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

const CustomTimeline = () => {
  const { groups, items } = generateFakeData(15);
  // set to one hour before now
  const defaultTimeStart = moment().subtract(1, "hour").toDate();

  const defaultTimeEnd = moment(defaultTimeStart).add(24, "hours").toDate();

  const [state, setState] = useState({
    groups,
    items,
    defaultTimeStart,
    defaultTimeEnd,
  });

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    console.log(
      "in handleItemMove (itemId, dragTime, newGroupOrder)",
      itemId,
      dragTime,
      newGroupOrder
    );
    console.log("state.items", state.items);
    const updatedItems = state.items.map((item) => {
      if (item.id === itemId) {
        const start = dragTime;
        const end = moment(dragTime)
          .add(item.end - item.start, "ms")
          .toDate();
        return { ...item, start, end, group: newGroupOrder + 1 };
      }
      return item;
    });

    setState({ ...state, items: updatedItems });
  };

  return (
    <Timeline
      groups={state.groups}
      items={state.items}
      keys={keys}
      itemsSorted
      itemTouchSendsClick={true}
      stackItems={false}
      itemHeightRatio={0.75}
      showCursorLine
      canMove={true}
      canChangeGroup={true}
      canResize={true}
      className="mt-10"
      traditionalZoom={true}
      onItemMove={handleItemMove}
      defaultTimeStart={state.defaultTimeStart}
      defaultTimeEnd={state.defaultTimeEnd}
    >
      <TimelineHeaders className="sticky">
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
};

export default CustomTimeline;
