document.addEventListener("DOMContentLoaded", function () {
  const getWeatherButton = document.getElementById("display-w-btn");
  const cityInput = document.getElementById("city-input");
  const weatherContainer = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("display-description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "0f4defa719088f299870c05b24f9f4d4"; // Replace with your actual OpenWeatherMap API key
  getWeatherButton.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (city === "") {
      errorMessage.textContent = "Please enter a city name.";
      errorMessage.classList.remove("hidden");
      weatherContainer.classList.add("hidden");
      return;
    }
    try {
      const data = await fetchWeather(city);
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      errorMessage.textContent =
        "An error occurred while fetching weather data.";
      errorMessage.classList.remove("hidden");
      weatherContainer.classList.add("hidden");
    }
  });
  async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(apiUrl);

    const data = await response.json();
    return data;
  }
  function displayWeather(data) {
    console.log(data);
    if (data.cod === "404") {
      errorMessage.textContent = "City not found. Please try again.";
      errorMessage.classList.remove("hidden");
      weatherContainer.classList.add("hidden");
    }
    const { name, main, weather, sys } = data;
    cityName.textContent = `${name}, ${sys.country}`;
    temperature.textContent = `Temperature: ${main.temp} °C`;
    weatherDescription.textContent = `Weather: ${weather[0].description}`;
    errorMessage.classList.add("hidden");
    weatherContainer.classList.remove("hidden");
  }
});
