import React, { useEffect, useState } from "react";

import ReportTable from "./ReportTable";
import { supabase } from "@/supabase";

const Incidents = () => {
  return (
    <div className="p-2 mt-10 flex flex-col">
      <ReportTable />
    </div>
  );
};

export default Incidents;
