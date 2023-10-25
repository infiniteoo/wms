import React, { useState } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";
import generateFakeData from "./generate-fake-data";
import ContextMenu from "./ContextMenu";

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

  const handleEdit = (itemId) => {
    // Define the edit logic here
  };

  const handleDelete = (itemId) => {
    // Define the delete logic here
  };

  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (itemId, e) => {
    console.log("Right clicked: ", itemId, e);
    e.preventDefault(); // Prevent the default context menu
    const position = { x: e.clientX, y: e.clientY };
    setContextMenu({ position, itemId });
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
    // Find the item based on the itemId
    const selectedItem = state.items.find((item) => item.id === itemId);

    if (selectedItem) {
      // You can customize this to include other item details
      return {
        title: selectedItem.title,
        start: selectedItem.start,
        end: selectedItem.end,
      };
    }

    return null; // Return null if the item is not found
  };

  return (
    <div>
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
        onItemContextMenu={handleRightClick}
      >
        <TimelineHeaders className="sticky">
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.position.x}
          y={contextMenu.position.y}
          itemDetails={getItemDetails(contextMenu.itemId)}
          onEdit={() => handleEdit(contextMenu.itemId)}
          onDelete={() => handleDelete(contextMenu.itemId)}
          onCancel={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default CustomTimeline;
