import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CityDetails() {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState({ hour: "", minute: "" });

  
  const getWeatherIcon = (description) => {
    switch (description) {
      case "clouds":
        return { icon: require('./../../cloud.png'), label: "Cloudy" };
      case "clear":
        return { icon: require('./../../sunny.png'), label: "Clear sky" };
      case "rain":
        return { icon: require('./../../rain.png'), label: "Rainy" };
      case "fog":
        return { icon: require('./../../fog.png'), label: "Foggy" };
      default:
        return { icon: null, label: description };
    }
  };


  const getLocalTimeFromTimestamp = (timestamp, timezone) => {
    const offset = timezone / 3600;
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const localDate = new Date(utcTime + (3600000 * offset));

    return {
      hour: localDate.toLocaleTimeString('hu-HU', { hour: '2-digit' }),
      minute: localDate.toLocaleTimeString('hu-HU', { minute: '2-digit' })
    };
  };

  const updateLocalTime = (timezone) => {
    const time = getLocalTimeFromTimestamp(Date.now() / 1000, timezone);
    setLocalTime(time);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=0a637e21f9a23db50f11af77185a3601`);

        if (response.ok) {
          const data = await response.json();
          setWeather(data);
          updateLocalTime(data.timezone);
        } else {
          console.error(`API error with status ${response.status}`);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    if (cityName) {
      fetchWeather();
    }

    const intervalId = setInterval(() => {
      if (weather && weather.timezone) {
        updateLocalTime(weather.timezone);
      }
    }, 6000000); // 1 minute (60000 ms)

    return () => clearInterval(intervalId); // Cleanup
  }, [cityName, weather]);

  return (
    <div>
      <button className='backButton' onClick={() => navigate('/')}>
        <img src={require('./../../vissza.png')} alt="Back" />
      </button>
      <div className="container_list">
        <h1 className="timehm">{localTime.hour}<br/>{localTime.minute}</h1>
        <h1>{cityName}</h1>
        {weather && (
      <div>
        <img src={getWeatherIcon(weather.weather[0].main.toLowerCase()).icon} alt={weather.weather[0].main} />
        <p>{getWeatherIcon(weather.weather[0].main.toLowerCase()).label}</p>
      </div>
    )}
      {weather ? (
        <div className="weather-details">
          <div className="weather-item">
            <div className="icon">
              <img src={require('./../../temp.png')} alt="Temperature" />
            </div>
            <div className="value">
              <p>{weather.main.temp}°C</p>
            </div>
          </div>
          <div className="weather-item">
            <div className="icon">
              <img src={require('./../../sunrise.png')} alt="Sunrise" />
            </div>
            <div className="value">
              <p>{getLocalTimeFromTimestamp(weather.sys.sunrise, weather.timezone).hour}:{getLocalTimeFromTimestamp(weather.sys.sunrise, weather.timezone).minute}</p>
            </div>
          </div>
          <div className="weather-item">
            <div className="icon">
              <img src={require('./../../sunset.png')} alt="Sunset" />
            </div>
            <div className="value">
              <p>{getLocalTimeFromTimestamp(weather.sys.sunset, weather.timezone).hour}:{getLocalTimeFromTimestamp(weather.sys.sunset, weather.timezone).minute}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      </div>
    </div>
  );
}

export default CityDetails;
