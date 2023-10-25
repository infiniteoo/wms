const ContextMenu = ({ x, y, itemDetails, onEdit, onDelete, onCancel }) => {
  return (
    <div
      className="context-menu bg-white border-2 border-black rounded-md p-2"
      style={{ position: "absolute", top: y, left: x, zIndex: 1000 }}
    >
      <div className="font-bold mb-2">Item Details</div>
      {itemDetails ? (
        <div>
          <p>Title: {itemDetails.title}</p>
          <p>Start Time: {itemDetails.start}</p>
          <p>End Time: {itemDetails.end}</p>
        </div>
      ) : (
        <p>Item not found.</p>
      )}
      <div className="flex flex-row bg-black border-white text-white p-2 m-5">
        <button
          className="bg-blue-500 text-white px-2 py-1 mx-1 rounded hover:bg-blue-700"
          onClick={onEdit}
        >
          Edit
        </button>
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
