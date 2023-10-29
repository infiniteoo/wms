import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import events from "./events";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "../../../supabase";

import moment from "moment";

export default function Selectable({}) {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase.from("appointments").select("*");

      if (data) {
        const formattedData = data.map((appointment) => ({
          id: appointment.id,
          title: appointment.title,
          start: new Date(appointment.start), // Convert to Date
          end: new Date(appointment.end), // Convert to Date
        }));

        console.log("formattedData", formattedData);
        setEvents(formattedData);
      }
    };

    fetchAppointments();
  }, []);

  const handleSelectSlot = useCallback(
    async ({ start, end }) => {
      console.log("start start", start);
      console.log("end end", end);

      const title = window.prompt("New Event Title");
      if (title) {
        const { data, error } = await supabase
          .from("appointments")
          .insert([{ start, end, title }])
          .select("*");

        if (data) {
          const formattedData = data.map((appointment) => ({
            ...appointment,
            start: new Date(appointment.start).toString(), // Format start date
            end: new Date(appointment.end).toString(), // Format end date
          }));

          console.log("formattedData", formattedData);

          setEvents((prev) => [...prev, { start, end, title }]);
        }
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center mt-7">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ width: "90%", height: "80vh" }}
        />
      </div>
    </Fragment>
  );
}
