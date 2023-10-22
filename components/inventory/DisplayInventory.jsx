import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import InventoryToolbar from "./InventoryToolbar";
import ItemModal from "./ItemModal";
import { useUser } from "@clerk/clerk-react";

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
      days_to_expire: daysToExpire,
      lastTouchedBy: user.user.fullName,
    };

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
  };

  const handleCheckboxChange = (event) => {
    const rowId = parseInt(event.target.parentElement.parentElement.id);
    handleRowClick(rowId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (rowId) => {
    // Toggle the selection of the clicked row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
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
                  selectedRows.includes(item.id)
                    ? "font-bold bg-yellow-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleRowClick(item.id)}
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
      </div>
    </div>
  );
};

export default DisplayInventory;