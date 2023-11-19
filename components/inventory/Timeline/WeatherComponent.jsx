import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherComponent({ apiKey, city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [apiKey, city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;
  const temperatureCelsius = main.temp - 273.15;
  const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32; // Convert to Fahrenheit
  const weatherDescription = weather[0].description;
  const weatherIcon = weather[0].icon;
  const highTempFahrenheit = (main.temp_max - 273.15) * 1.8 + 32;
  const lowTempFahrenheit = (main.temp_min - 273.15) * 1.8 + 32;

  return (
    <div className="flex flex-col">
      <div className="weather-component flex flex-row text-sm w-100">
        <div className="flex flex-wrap justify-around w-1/2">
          <img
            width="auto"
            className=""
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt="Weather Icon"
          />
          <p className="text-center text-sm">
            {Math.round(temperatureFahrenheit)}°F
          </p>
          <p className="text-sm">{weatherDescription}</p>
        </div>
        <div className="flex flex-col ml-2 w-1/2">
          <p className="text-sm text-right">
            High: {Math.round(highTempFahrenheit)} °F
          </p>
          <p className="text-sm text-right">
            Low: {Math.round(lowTempFahrenheit)} °F
          </p>
          <p className="text-sm ml-0.5"> </p>
          <p className="text-sm border-top border-t">{city}, Idaho</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherComponent;
