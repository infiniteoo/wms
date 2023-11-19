import { useState, useEffect } from "react";

const DisplayTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date()); // Update with a new Date object
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div>
      <p className="text-xl font-bold">{formattedTime}</p>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};

export default DisplayTime;
