document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("display-w-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("display-temp");
  const descriptionDisplay = document.getElementById("display-description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "0f4defa719088f299870c05b24f9f4d4";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    console.log(city);
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error(error);
      showError();
    }
  });
  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
  }
  function displayWeatherData(weatherData) {}
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
