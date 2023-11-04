import React from "react";
import TimeComponent from "./TimeComponent";
import WeatherComponent from "./WeatherComponent";

const TimeAndWeather = () => {
  return (
    <div className=" flex flex-col items-center">
      <div className="text-3xl p-1 text-center mr-2">
        <TimeComponent />
      </div>
      <div className="mt-5">
        <WeatherComponent
          apiKey={process.env.NEXT_PUBLIC_API_KEY}
          city={"Boise"}
        />
      </div>
    </div>
  );
};

export default TimeAndWeather;
