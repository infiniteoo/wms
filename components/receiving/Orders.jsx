import React, { useEffect, useState } from "react";

import { supabase } from "../../supabase";
import InventoryToolbar from "./InventoryToolbar";
import ItemModal from "./ItemModal";
import { useUser } from "@clerk/clerk-react";
import DeleteConfirmationModal from "./ConfirmationModal";

const Orders = () => {
  const [inventory, setInventory] = useState([]);
  const [actionModifier, setActionModifier] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modifier, setModifier] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const cancelDelete = () => {
    // Cancel the delete operation and close the modal
    setActionModifier("");
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (selectedRows.length > 0) {
      // Create an array to store promises for each delete operation
      const deletePromises = selectedRows.map(async (row) => {
        try {
          // Delete the item
          const { data, error } = await supabase
            .from("inventory")
            .delete()
            .eq("id", row.id)
            .select();
          if (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      });

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Update the local state to remove the deleted items
      const updatedInventory = inventory.filter(
        (item) =>
          !selectedRows.some((selectedItem) => selectedItem.id === item.id)
      );
      setInventory(updatedInventory);

      // Clear the selected rows and close the modal
      setSelectedRows([]);
      setActionModifier("");
      setShowDeleteModal(false);
    }
  };

  console.log("selectedRows", selectedRows);
  useEffect(() => {
    fetchInventory();
  }, [currentPage, searchTerm]); // Listen for changes in currentPage and searchTerm

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .ilike(modifier, `%${searchTerm}%`)
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

      if (error) {
        console.error(error);
      } else {
        setInventory(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSave = async (formData) => {
    const {
      itemNumber,
      description,
      lpnNumber,
      lotNumber,
      status,
      location,
      cases,
      manufacturedDate,
      expirationDate,
      agingProfile,
    } = formData;

    const daysToExpire =
      (new Date(expirationDate) - new Date(manufacturedDate)) /
      (1000 * 60 * 60 * 24);

    const item = {
      item_number: itemNumber,
      description,
      lpn_number: lpnNumber,
      lot_number: lotNumber,
      status,
      location,
      cases,
      manufactured_date: manufacturedDate,
      expiration_date: expirationDate,
      days_to_expire: daysToExpire + "Days",
      lastTouchedBy: user.user.fullName,
      fifo: null,
      aging_profile: agingProfile,

      last_modified: new Date(),
    };
    // if selectedRows is empty, add item to database
    if (selectedRows.length === 0) {
      // Add logic to save item to database
      const { data, error } = await supabase
        .from("inventory")
        .insert([item])
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory([...inventory, data[0]]);
        setSelectedRows([]);
        setActionModifier("");
        console.log("action modified: ", actionModifier);
      }
    } else {
      // update item in database with selectedRows[0].id
      console.log("selectedRow[0].id", selectedRows[0].id);
      console.log("item", item);
      const { data, error } = await supabase
        .from("inventory")
        .update(item)
        .eq("id", selectedRows[0].id)

        .select();

      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory(
          inventory.map((item) => {
            if (item.id === data[0].id) {
              return data[0];
            } else {
              return item;
            }
          })
        );
        setSelectedRows([]);
        setActionModifier("");
      }
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event, rowItem) => {
    event.stopPropagation(); // Prevent the click event from propagating to the row
    handleRowClick(rowItem);
  };

  const handleRowClick = (rowItem) => {
    setSelectedRows((prevSelectedRows) => {
      // Check if the clicked row is already selected
      const isRowSelected = prevSelectedRows.some(
        (item) => item.id === rowItem.id
      );

      if (isRowSelected) {
        // If the row is already selected, remove it from the selected rows
        return prevSelectedRows.filter((item) => item.id !== rowItem.id);
      } else {
        // If the row is not selected, add it to the selected rows
        return [...prevSelectedRows, rowItem];
      }
    });
  };

  return (
    <div className="mt-8 border-orange-500 ml-2" style={{ width: "99%" }}>
  <InventoryToolbar
    inventory={inventory}
    setInventory={setInventory}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    modifier={modifier}
    setModifier={setModifier}
    actionModifier={actionModifier}
    setActionModifier={setActionModifier}
    selectedRows={selectedRows}
    setIsOpen={setIsOpen}
    setSelectedRows={setSelectedRows}
    setItemToDelete={setItemToDelete}
    setShowDeleteModal={setShowDeleteModal}
    fetchInventory={fetchInventory}
  />
  {inventory && (
    <div className="table-container h-80 overflow-y-auto mt-1">
      <table className="rounded-lg overflow-hidden text-sm w-full">
        <colgroup>
          <col style={{ width: "40px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "100px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "100px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "200px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "100px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "60px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "120px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "120px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "80px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "120px" }} /> {/* Adjust the width as needed */}
          <col style={{ width: "120px" }} /> {/* Adjust the width as needed */}
        </colgroup>
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2"></th>
            <th className="py-2">Item Number</th>
            <th className="py-2">Lot Number</th>
            <th className="py-2">Description</th>
            <th className="py-2">LPN Number</th>
            <th className="py-2">Cases</th>
            <th className="py-2">Manufactured Date</th>
            <th className="py-2">Expiration Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Location</th>
            <th className="py-2">Aging Profile</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                selectedRows.some(
                  (selectedItem) => selectedItem.id === item.id
                )
                  ? "font-bold bg-yellow-200"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleRowClick(item)}
            >
              <td className="py-2">
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, item)}
                  checked={selectedRows.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  style={{ marginRight: "6px" }}
                />
                {selectedRows.includes(item.id) ? "✓" : null}
              </td>
              <td className="py-2">{item.item_number}</td>
              <td className="py-2">{item.lot_number}</td>
              <td className="py-2">{item.description}</td>
              <td className="py-2">{item.lpn_number}</td>
              <td className="py-2">{item.cases}</td>
              <td className="py-2">{item.manufactured_date}</td>
              <td className="py-2">{item.expiration_date}</td>
              <td className="py-2">{item.status}</td>
              <td className="py-2">{item.location}</td>
              <td className="py-2">{item.aging_profile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

  <div className="pagination text-center mt-10">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-md bg-blue-500 text-white text-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
    >
      &laquo; Previous Page
    </button>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={inventory && inventory.length < itemsPerPage}
      className="px-4 py-2 rounded-md bg-blue-500 text-white text-lg hover:bg-blue-600 ml-4 focus:outline-none focus:ring focus:ring-blue-300"
    >
      Next Page &raquo;
    </button>
    {isOpen && (
      <ItemModal
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        onSave={onSave}
        selectedRows={selectedRows}
      />
    )}
    {showDeleteModal && (
      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        selectedRows={selectedRows}
      />
    )}
  </div>
</div>

  );
};

export default Orders;
