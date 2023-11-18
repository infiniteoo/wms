import React, { memo } from "react";

const Modal = ({ children, onClose }) => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  };

  const modalStyle = {
    width: "80%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    right: "3px",
    top: "10px",
    cursor: "pointer",
    paddingLeft: "10px", // Added paddingLeft to add space to the left of the close button
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <span
          style={closeButtonStyle}
          onClick={onClose}
          className="font-bold text-xl"
        >
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
