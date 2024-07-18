const API_KEY = "cea3998d1c29c7454d84c254b0726002";
const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

form.onsubmit = submitHandler;

async function submitHandler(e) {
  e.preventDefault();

  if (!input.value.trim()) {
    console.log("Enter City name");
    return;
  }
  const cityInfo = await getGeo(input.value.trim());

  const weatherInfo = await getGeoWeather(
    cityInfo[0]["lat"],
    cityInfo[0]["lon"]
  );
  console.log(weatherInfo);

  const weatherData = {
    name: weatherInfo.name,
    temp: weatherInfo.main.temp,
    humidity: weatherInfo.main.humidity,
    speed: weatherInfo.wind.speed,
    main: weatherInfo.weather[0]["main"],
  };
  renderWeatherData(weatherData);
}

async function getGeo(name) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  return data;
}

async function getGeoWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return data;
}

function renderWeatherData(data) {
  const temp = document.querySelector(".weather__temp");
  const city = document.querySelector(".weather__city");
  const humidity = document.querySelector("#humidity");
  const speed = document.querySelector("#speed");

  temp.innerText = Math.round(data.temp) + '*c';
  city.innerText = data.name;

  humidity.innerText = data.humidity + '%';
  speed.innerText = data.speed + 'km/h';
}
