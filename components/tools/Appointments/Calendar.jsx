import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { Calendar, Views } from "react-big-calendar";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "../../../supabase";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import Modal from "./Modal";

const DnDCalendar = withDragAndDrop(Calendar);

export default function Selectable({}) {
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log("myEvents", myEvents);
    console.log("view", view);
  }, [myEvents, view]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase.from("appointments").select("*");

      if (data) {
        const formattedData = data.map((appointment) => ({
          id: appointment.id,
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
          created_at: appointment.created_at,
          created_by: appointment.created_by,
          updated_at: appointment.updated_at,
          order_number: appointment.order_number,
          updated_by: appointment.updated_by,
          carrier: appointment.carrier,
          trailer_number: appointment.trailer_number,
          booker_name: appointment.booker_name,
          booker_phone: appointment.booker_phone,
          booker_email: appointment.booker_email,
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

  const handleSelectEvent = useCallback((event) => {
    console.log("event", event);
    setSelectedEvent(event);
    setOpenModal(true);
  });

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

  const onView = useCallback((newView) => setView(newView), [setView]);

  const onEventDrop = async (event) => {
    const updatedEvent = {
      id: event.event.id,
      start: event.start,
      end: event.end,
    };

    const { data, error } = await supabase
      .from("appointments")
      .upsert([updatedEvent])
      .select("*");

    if (data) {
      const updatedEventData = data[0];

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
    const updatedEvent = {
      id: event.event.id,
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
          view={view}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
        />
      </div>
      {openModal && (
        <Modal
          closeModal={closeModal}
          appointment={selectedEvent}
          setEvents={setEvents}
        />
      )}
    </Fragment>
  );
}
