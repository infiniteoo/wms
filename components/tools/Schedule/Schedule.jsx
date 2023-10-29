import React, { useState, useEffect } from "react";
import CustomTimeline from "./CustomTimeline";
import Toolbar from "./Toolbar";
import { supabase } from "../../../supabase";

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) console.log("error", error);

    if (data) {
      const appointmentsArray = [];
      const groupsArray = [];

      const today = new Date();
      const next14Days = [];
      for (let i = 0; i < 14; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        next14Days.push(nextDay);
      }

      data.forEach((employee) => {
        // Add the employee to the groups array
        groupsArray.push({ id: employee.id, title: employee.name });

        next14Days.forEach((date, i) => {
          // Calculate the day of the week (0 for Sunday, 1 for Monday, etc.)
          const dayOfWeek = date.getDay(); // Use 'date' instead of 'next14Days[i]'

          // Check if the employee should work on this day of the week
          // Adjust these conditions based on your business rules
          let shouldWork = false;

          switch (employee.shift) {
            case "Mornings (6a-4:30p)":
              shouldWork =
                dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5;
              break;
            case "Swing (9a-7:30p)":
              shouldWork =
                dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4;
              break;
            case "Nights (5p-3:30a)":
              shouldWork =
                dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
              break;
            case "Nights (8p-6:30a)":
              shouldWork =
                dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
              break;
            default:
              shouldWork = false; // No defined shift
          }

          if (shouldWork) {
            // Define the start and end times based on the shift
            let startTime, endTime;

            switch (employee.shift) {
              case "Mornings (6a-4:30p)":
                startTime = "06:00:00"; // Add seconds
                endTime = "16:30:00"; // Add seconds
                break;
              case "Swing (9a-7:30p)":
                startTime = "09:00:00"; // Add seconds
                endTime = "19:30:00"; // Add seconds
                break;
              case "Nights (5p-3:30a)":
                startTime = "17:00:00"; // Add seconds
                endTime = "03:30:00"; // Add seconds
                break;
              case "Nights (8p-6:30a)":
                startTime = "20:00:00"; // Add seconds
                endTime = "06:30:00"; // Add seconds
                break;
              default:
                startTime = "00:00:00"; // Add seconds
                endTime = "00:00:00"; // Add seconds
            }

            // Create a new appointment object for this day
            const appointment = {
              id: `${employee.id}-${date.toISOString().split("T")[0]}`,
              group: employee.id,
              title: employee.shift,
              start: new Date(
                `${date.toISOString().split("T")[0]}T${startTime}Z`
              ).getTime(),
              end: new Date(
                `${date.toISOString().split("T")[0]}T${endTime}Z`
              ).getTime(),
            };

            // Add the appointment to the appointments array
            appointmentsArray.push(appointment);
          }
        });
      });

      // Set the state with the generated groups and appointments
      setGroups(groupsArray);
      setAppointments(appointmentsArray);
      console.log("appointmentsArray", appointmentsArray);
      console.log("groupsArray", groupsArray);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col">
      <Toolbar />
      <CustomTimeline groups={groups} appointments={appointments} />
    </div>
  );
};

export default Schedule;
