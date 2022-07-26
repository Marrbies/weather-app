let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

//Current Date
let now = new Date();
let h6 = document.querySelector("h6");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h6.innerHTML = `${day} ${date}, ${hours}:${minutes} `;

let search = document.querySelector("#search-button");
search.addEventListener("click", searchCity);

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let cityName = response.data.name;
  cityElement.innerHTML = `📍 ${cityName}`;

  celsiusTemperature = response.data.main.temp;
  //temperature
  let tempElement = document.querySelector("#currentTemp");
  let temperature = Math.round(celsiusTemperature);
  tempElement.innerHTML = `${temperature} °C`;

  //Wind

  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${wind} km/h`;

  //Humidity

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity} %`;

  //Clouds

  let cloudElement = document.querySelector("#clouds");
  let cloud = response.data.weather[0].description;
  cloudElement.innerHTML = `${cloud}`;
  //Icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function locationButton(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "320347d27aec8d1725f14ee75b4ecee0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`;

  function showTemperature(position) {
    let currentTemperature = Math.round(position.data.main.temp);
    let temperatureCur = document.querySelector("#currentTemp");
    temperatureCur.innerHTML = `${currentTemperature} °C`;

    let city = document.querySelector("#city");
    let cityName = position.data.name;
    city.innerHTML = `📍 ${cityName}`;

    let humidity = position.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity} %`;

    let windElement = document.querySelector("#wind");
    let wind = Math.round(position.data.wind.speed);
    windElement.innerHTML = `${wind} km/h`;

    let cloudsElement = document.querySelector("#clouds");
    let clouds = position.data.weather[0].description;
    cloudsElement.innerHTML = clouds;
  }
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationButton);
}
let locationCurrent = document.querySelector("#searchCurrentLocation");
locationCurrent.addEventListener("click", getCurrentPosition);

//Fahrenheit link
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let toFahrenheitLink = document.querySelector("#fahrenheit-link");
toFahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusTemperature = null;
//Celsius Link

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let toCelsiusLink = document.querySelector("#celsius-link");
toCelsiusLink.addEventListener("click", displayCelsiusTemperature);
//Search engine
function searchCity(city) {
  let apiKey = "320347d27aec8d1725f14ee75b4ecee0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${city}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchCityInput");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Kyiv");
