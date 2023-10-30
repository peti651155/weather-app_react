import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Kezdőértéknek London lett beállítva

  const API_KEY = '39fcfbebee3c502b73e6062ba8c4eb8';

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  return (
    <div>
      <input 
        type="text" 
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => setCity(city)}>Fetch Weather</button>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
