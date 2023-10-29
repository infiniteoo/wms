import React, { useState } from "react";
import { AiOutlinePlusCircle } from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import { BiCog } from "@react-icons/all-files/bi/BiCog";
import AddAppointmentModal from "./AddAppointmentModal";
import SettingsModal from "./SettingsModal";

const Toolbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const addAppointment = () => {
    // Define the add logic here
    /* setOpenModal(true); */
  };

  const handleOpenSettings = () => {
    // Define the settings logic here
    setOpenSettings(true);
  };

  return (
    <div className="mt-3 flex flex-row text-2xl">
      <AiOutlinePlusCircle onClick={addAppointment} />
      <BiCog className="ml-1" onClick={handleOpenSettings} />
      {openModal && <AddAppointmentModal setOpenModal={setOpenModal} />}
      {openSettings && <SettingsModal setOpenSettings={setOpenSettings} />}
    </div>
  );
};

export default Toolbar;
