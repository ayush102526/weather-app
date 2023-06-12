import React, { useState } from 'react';
import './WeatherApp.css';

const convert = (value) => {
  return value && (value - 32) * 5/9

}

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'edce743860b81501734267fae671b946'; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button className="get-weather-btn" onClick={fetchWeatherData}>
          Get Weather
        </button>
      </div>

      {weatherData && (
        <div className="weather-data-container">
          <h2 className="city-name">Weather in {weatherData.name}</h2>
          <p className="temperature">
            Temperature: {Math.round(weatherData?.main?.temp)||0}°C
          </p>
          <p className="description">
            Description: { Array.isArray(weatherData?.weather) && weatherData?.weather[0]?.description}
          </p>
        </div>
      )}
    </div>
  );
};



export default WeatherApp;


