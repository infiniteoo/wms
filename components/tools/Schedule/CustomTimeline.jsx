import React, { useEffect, useState } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";
import generateFakeData from "./generate-fake-data";
import ContextMenu from "./ContextMenu";
import { v4 as uuidv4 } from "uuid";

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

const CustomTimeline = ({
  groups,
  appointments,
  setGroups,
  setAppointments,
}) => {
  /* const { poops: poops, initialItems } = generateFakeData(15); */
  const defaultTimeStart = moment().subtract(1, "hour").toDate();
  const defaultTimeEnd = moment(defaultTimeStart).add(24, "hours").toDate();
  const [state, setState] = useState({});
  console.log(groups, appointments);
  /* setState({
    groups,
    appointments,
    defaultTimeStart,
    defaultTimeEnd,
  }); */
  const handleEdit = (itemId) => {
    // Define the edit logic here
  };

  const handleDelete = (itemId) => {
    // Define the delete logic here
  };

  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (itemId, e) => {
    e.preventDefault(); // Prevent the default context menu
    const position = { x: e.clientX, y: e.clientY };
    const groupDetails = state.groups.find(
      (group) =>
        group.id === state.items.find((item) => item.id === itemId).group
    );
    setContextMenu({ position, itemId, groupDetails });
  };

  const handleEmptyAreaClick = (groupId, time, e) => {
    console.log("group id", groupId);
    console.log("time", time);
    console.log("e", e);
    e.preventDefault(); // Prevent the default context menu
    const position = { x: e.clientX, y: e.clientY };
    console.log("position", position);
    console.log("state.groups", state.groups);
    console.log("state.items", state.items);
    const groupDetails = {
      id: groupId,
      title: "",
      rightTitle: "",
      bgColor: "",
      startTime: new Date(time).toISOString(), // Convert the time to ISO date string
    };

    setContextMenu({ position, itemId: "23423s", groupDetails });
    // Define the empty area click logic here
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
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

  const getItemDetails = (itemId) => {
    const selectedItem = state.items.find((item) => item.id === itemId);

    if (selectedItem) {
      return {
        title: selectedItem.title,
        start: selectedItem.start,
        end: selectedItem.end,
      };
    }

    return null;
  };

  const onSave = (title, start, end, groupDetails) => {
    const newUuid = uuidv4();
    const numericId = parseInt(newUuid.replace(/-/g, ""), 16);

    const newItem = {
      group: groupDetails.id,
      title: title,
      start: start,
      end: end,
    };

    const updatedItems = [...state.items, newItem];

    setState({ ...state, items: updatedItems });
    setContextMenu(null);
  };

  return (
    <div
      className="timeline-container"
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {groups && groups.length > 0 ? (
        <Timeline
          onCanvasClick={handleEmptyAreaClick}
          groups={groups}
          items={appointments}
          keys={keys}
          itemsSorted
          itemTouchSendsClick={true}
          stackItems={true}
          itemHeightRatio={0.75}
          showCursorLine
          canMove={true}
          canChangeGroup={true}
          canResize={true}
          className="mt-1"
          traditionalZoom={true}
          onItemMove={handleItemMove}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onItemContextMenu={handleRightClick}
        >
          <TimelineHeaders className="sticky">
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      ) : (
        <div>Loading...</div>
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.position.x}
          y={contextMenu.position.y}
          itemDetails={getItemDetails(contextMenu.itemId)}
          groupDetails={contextMenu.groupDetails}
          onEdit={() => handleEdit(contextMenu.itemId)}
          onDelete={() => handleDelete(contextMenu.itemId)}
          onCancel={() => setContextMenu(null)}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default CustomTimeline;
