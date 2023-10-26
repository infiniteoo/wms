import React, { useEffect, useState } from "react";
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
  const { groups, items: initialItems } = generateFakeData(15);
  const defaultTimeStart = moment().subtract(1, "hour").toDate();
  const defaultTimeEnd = moment(defaultTimeStart).add(24, "hours").toDate();
  const [state, setState] = useState({
    groups,
    items: initialItems,
    defaultTimeStart,
    defaultTimeEnd,
  });

  useEffect(() => {
    console.log("groups", groups);
    console.log("initialItems", initialItems);
  }, [groups, initialItems]);

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
    const updatedItems = state.items.map((item) => {
      if (item.id === contextMenu.itemId) {
        return {
          ...item,
          title,
          start,
          end,
          group: contextMenu.groupDetails.id, // Update the group ID with the selected group
        };
      }
      return item;
    });

    setState({ ...state, items: updatedItems });
    setContextMenu(null);
  };

  return (
    <div
      className="timeline-container"
      style={{ maxHeight: "500px", overflowY: "scroll" }}
    >
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
