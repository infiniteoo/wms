import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      let { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        console.error(error);
      } else {
        setInventory(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto mt-10">
      {inventory && (
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
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
              <tr key={item.id} className="bg-gray-100 hover:bg-gray-200">
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
    </div>
  );
}

export default Inventory;
