import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import InventoryToolbar from "./InventoryToolbar";
import ItemModal from "./ItemModal";
import { useUser } from "@clerk/clerk-react";
import DeleteConfirmationModal from "./ConfirmationModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DisplayInventory = () => {
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
      // delete item(s)
      console.log("selectedRows", selectedRows);
      const { data, error } = await supabase
        .from("inventory")
        .delete()
        .in(
          "id",
          selectedRows.map((row) => row.id)
        )
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory(
          inventory.filter((item) => {
            return !selectedRows.includes(item);
          })
        );
        setSelectedRows([]);
        setActionModifier("");
      }
    }

    // Close the modal
    setShowDeleteModal(false);
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
      aging_profile: null,
      id: selectedRows[0].id,
      created_at: selectedRows[0].created_at,
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
        .eq("id", item.id)

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

  const handleCheckboxChange = (event) => {
    const rowId = parseInt(event.target.parentElement.parentElement.id);
    handleRowClick(rowId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (rowItem) => {
    // Toggle the selection of the clicked row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.some((item) => item.id === rowItem.id)) {
        return prevSelectedRows.filter((item) => item.id !== rowItem.id);
      } else {
        return [rowItem];
      }
    });
  };

  return (
    <div className="mt-8 border-orange-500 ">
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
      />
      {inventory && (
        <table className="rounded-lg overflow-hidden">
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
            {inventory.map((item) => (
              <tr
                key={item.id}
                className={`${
                  selectedRows.some(
                    (selectedItem) => selectedItem.id === item.id
                  )
                    ? "font-bold bg-yellow-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleRowClick(item)}
              >
                <td className="py-2">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={selectedRows.includes(item.id)}
                  />
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
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Previous Page
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={inventory && inventory.length < itemsPerPage}
          className="pl-5"
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

export default DisplayInventory;
