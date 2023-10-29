import React, { useState, useEffect } from "react";

const ContextMenu = ({
  x,
  y,
  itemDetails,
  groupDetails,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [editedTitle, setEditedTitle] = useState(itemDetails?.title || "");
  const [editedStart, setEditedStart] = useState(itemDetails?.start || "");
  const [editedEnd, setEditedEnd] = useState(itemDetails?.end || "");
  const [editedGroupTitle, setEditedGroupTitle] = useState(
    groupDetails?.title || ""
  );
  const [editedGroupRightTitle, setEditedGroupRightTitle] = useState(
    groupDetails?.rightTitle || ""
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (itemDetails) {
      setEditedTitle(itemDetails.title);
      setEditedStart(itemDetails.start);
      setEditedEnd(itemDetails.end);
    }
    if (groupDetails) {
      setEditedGroupTitle(groupDetails.title);
      setEditedGroupRightTitle(groupDetails.rightTitle);
      setEditedStart(groupDetails.startTime);
    }
  }, [itemDetails, groupDetails]);

  const handleSave = () => {
    // Parse the editedStart and editedEnd strings as Date objects
    const start = new Date(editedStart);
    const end = new Date(editedEnd);

    onSave(editedTitle, start, end, groupDetails); // Pass the Date objects to the onSave function
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".context-menu")) {
      onCancel();
    }
  };

  const getDateFromMilliseconds = (milliseconds) => {
    const date = new Date(milliseconds);
    return `${date.getHours()}:${date.getMinutes()} ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div
      className="context-menu bg-white border-2 border-black rounded-md p-2"
      style={{ position: "absolute", top: y, left: x, zIndex: 1000 }}
    >
      <div className="font-bold mb-2">Item Details</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            value={editedStart}
            onChange={(e) => setEditedStart(e.target.value)}
          />
          {/* Use datetime-local input for End Time */}
          <input
            type="datetime-local"
            value={editedEnd}
            onChange={(e) => setEditedEnd(e.target.value)}
          />
        </div>
      ) : itemDetails ? (
        <div>
          {groupDetails ? (
            <>
              <p>Employee #: {groupDetails.id}</p>
              <p>
                Employee: {groupDetails.title} {groupDetails.rightTitle}
              </p>
            </>
          ) : null}
          <p>Event: {itemDetails.title}</p>
          <p>Start Time: {getDateFromMilliseconds(itemDetails.start)}</p>
          <p>End Time: {getDateFromMilliseconds(itemDetails.end)}</p>
        </div>
      ) : (
        <p>Item not found.</p>
      )}
      <div className="flex flex-row justify-center border-white text-white p-2 m-5">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-2 py-1 mx-1 rounded hover:bg-green-700"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-2 py-1 mx-1 rounded hover:bg-blue-700"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-2 py-1 mx-1 rounded hover-bg-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 mx-1 rounded hover-bg-gray-700"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
