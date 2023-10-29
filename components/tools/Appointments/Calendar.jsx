import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Calendar, Views } from "react-big-calendar";
import events from "./events";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "../../../supabase";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DnDCalendar = withDragAndDrop(Calendar);

import moment from "moment";

export default function Selectable({}) {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase.from("appointments").select("*");

      if (data) {
        const formattedData = data.map((appointment) => ({
          id: appointment.id,
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
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
            id: appointment.id,
            title: appointment.title,
            start: new Date(appointment.start),
            end: new Date(appointment.end),
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

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

  const onView = useCallback((newView) => setView(newView), [setView]);

  const onEventDrop = async (event) => {
    // Handle event drop here (e.g., update the event's start and end times)
    // Make a request to your backend to update the event's position
    // Example request to update the event in the database:
    const updatedEvent = {
      id: event.event.id, // You may need to adjust the key to match your data
      start: event.start,
      end: event.end,
    };

    const { data, error } = await supabase
      .from("appointments")
      .upsert([updatedEvent])
      .select("*");

    if (data) {
      const updatedEventData = data[0];
      console.log("Event dragged and dropped:", updatedEventData);
      data[0].start = new Date(data[0].start);
      data[0].end = new Date(data[0].end);

      // Find and update the existing event in myEvents state
      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event
        )
      );
    }
  };

  const onEventResize = async (event) => {
    // Handle event resize here (e.g., update the event's start and end times)
    // Make a request to your backend to update the event's duration
    // Example request to update the event in the database:
    const updatedEvent = {
      id: event.event.id, // You may need to adjust the key to match your data
      start: event.start,
      end: event.end,
    };

    console.log("updatedEvent", updatedEvent);

    const { data, error } = await supabase
      .from("appointments")
      .upsert([updatedEvent])
      .select("*");

    if (data) {
      const updatedEventData = data[0];
      console.log("Event resized and updated:", updatedEventData);
      data[0].start = new Date(data[0].start);
      data[0].end = new Date(data[0].end);

      // Find and update the existing event in myEvents state
      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event
        )
      );
    }
  };

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
        <DnDCalendar
          defaultDate={defaultDate}
          defaultView={view}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          onNavigate={onNavigate}
          onView={onView}
          scrollToTime={scrollToTime}
          style={{ width: "90%", height: "80vh" }}
          date={date}
          onEventDrop={onEventDrop} // Add event drop handler
          onEventResize={onEventResize} // Add event resize handler
        />
      </div>
    </Fragment>
  );
}
