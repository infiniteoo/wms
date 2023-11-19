import TimeComponent from "./TimeComponent";
import WeatherComponent from "./WeatherComponent";

const TimeAndWeather = () => {
  return (
    <div className=" flex flex-col items-left justify-left w-100">
      <div className="text-lg p-1 text-left">
        <TimeComponent />
      </div>
      <div className="mt-3">
        <WeatherComponent
          apiKey={process.env.NEXT_PUBLIC_WEATHER_API_KEY}
          city={"Boise"}
        />
      </div>
    </div>
  );
};

export default TimeAndWeather;
