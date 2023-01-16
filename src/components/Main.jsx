import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Main() {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target[0].value);
  };
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-weather5.p.rapidapi.com/weather",
        params: { location: city, format: "json", u: "c" },
        headers: {
          "X-RapidAPI-Key":
            "bf50a2b637mshfece12331b7334fp1ae225jsn6d716c566b8e",
          "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      setWeather(response.data);
      console.log(response.data);
    };
    fetchWeather();
  }, [city]);

  return (
    <main>
      <form className="location bg-slate-800	" onSubmit={(e) => handleSubmit(e)}>
        <input className="imput-text" type="text" />
        <input className="imput-submit" type="submit" />
      </form>

      <div className="display">
        <h2 className="city">City</h2>
        <h3>{weather && weather.location.city}</h3>

        <h2 className="condition">CONDITIONS</h2>
        <h3 className="response">
          {weather && weather.current_observation.condition.temperature + "°"}
        </h3>
        <h2>SUNRISE</h2>
        <h3 className="response">
          {weather && weather.current_observation.astronomy.sunrise}
        </h3>
        <h2>SUNSET</h2>
        <h3 className="response ">
          {" "}
          {weather && weather.current_observation.astronomy.sunset}
        </h3>
        <h2>HUMIDITY</h2>
        <h3 className="response">
          {weather && weather.current_observation.atmosphere.humidity}
        </h3>
      </div>
    </main>
  );
}

export default Main;
