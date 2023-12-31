import React, { useState } from "react";
import "./OrderModal.css";

const DeleteConfirmationModal = ({
  selectedRows,
  showDeleteModal,
  onCancel,
  onConfirm,
}) => {
  return (
    showDeleteModal && (
      <div className="modal">
        <div className="modal-content text-center">
          <div className="text-xl font-bold">Confirm Archive</div>
          <p className="mb-5">
            Are you sure you want to archive the selected order(s)?
          </p>
          {selectedRows.map((item) => (
            <div key={item.id}>
              <p className="text-xl">
                <span className="text-2xl text-center items-center justify-center">
                  •
                </span>{" "}
                {item.po_number} - {item.carrier}
              </p>
            </div>
          ))}
          <div className=" flex flex-row justify-center mt-10">
            <div
              onClick={onCancel}
              className="bg-red-400 text-white p-3 rounded-lg m-1 cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={onConfirm}
              className="bg-green-400 text-white p-3 rounded-lg m-1 cursor-pointer"
            >
              Confirm
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
