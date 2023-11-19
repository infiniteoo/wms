import { useState, useEffect } from "react";

const TimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date()); // Update with a new Date object
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <p className="text-sm font-bold">{formattedTime}</p>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};

export default TimeComponent;
