const apiKey = 'fc054715ea4309de289cadb87ce7feff'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === 200) {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;
      const icon = weather[0].icon;

      weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      `;
    } else {
      weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
  }
}