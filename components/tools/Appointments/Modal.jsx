import React from "react";

const Modal = ({ closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <div className="modal" id="item-modal" style={{ zIndex: "6000" }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <form onSubmit={handleSubmit} id="item-form">
          <div className="column"></div>

          <div className="column"></div>

          <div className="column" style={{ width: "100%" }}></div>

          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
