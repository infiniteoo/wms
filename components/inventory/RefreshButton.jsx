import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { AiOutlineReload } from "@react-icons/all-files/ai/AiOutlineReload";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const RefreshButton = ({ setInventory, fetchInventory }) => {
  const handleRefresh = async () => {
        fetchInventory();
  };

  return (
    <button
      onClick={handleRefresh}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-10 rounded-full focus:outline-none focus:shadow-outline"
      title="Refresh Database"
    >
     
      <AiOutlineReload/>
    </button>
  );
};

export default RefreshButton;
