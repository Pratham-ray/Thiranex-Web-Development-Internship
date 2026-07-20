const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const condition = document.getElementById("condition");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Loading state
    cityName.textContent = "Loading...";
    temperature.textContent = "...";
    humidity.textContent = "...";
    wind.textContent = "...";
    weatherIcon.textContent = "⏳";
    condition.textContent = "Fetching weather...";

    try {

        // Get coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error("City not found");
        }

        const place = geoData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        cityName.textContent = `${place.name}, ${place.country}`;

        temperature.textContent =
            weatherData.current.temperature_2m + " °C";

        humidity.textContent =
            weatherData.current.relative_humidity_2m + " %";

        wind.textContent =
            weatherData.current.wind_speed_10m + " km/h";

        const weather = getWeatherCondition(
            weatherData.current.weather_code
        );

        weatherIcon.textContent = weather.icon;
        condition.textContent = weather.text;

        changeBackground(weatherData.current.weather_code);

    } catch (error) {

        cityName.textContent = "City Not Found";
        temperature.textContent = "--";
        humidity.textContent = "--";
        wind.textContent = "--";
        weatherIcon.textContent = "❌";
        condition.textContent = "Try another city.";

    }

}

function getWeatherCondition(code) {

    if (code === 0)
        return { icon: "☀️", text: "Clear Sky" };

    if ([1, 2, 3].includes(code))
        return { icon: "⛅", text: "Partly Cloudy" };

    if ([45, 48].includes(code))
        return { icon: "🌫️", text: "Fog" };

    if ([51, 53, 55, 56, 57].includes(code))
        return { icon: "🌦️", text: "Drizzle" };

    if ([61, 63, 65, 66, 67].includes(code))
        return { icon: "🌧️", text: "Rain" };

    if ([71, 73, 75, 77].includes(code))
        return { icon: "❄️", text: "Snow" };

    if ([80, 81, 82].includes(code))
        return { icon: "🌦️", text: "Rain Showers" };

    if ([95, 96, 99].includes(code))
        return { icon: "⛈️", text: "Thunderstorm" };

    return { icon: "🌤️", text: "Unknown" };
}

function changeBackground(code) {

    const body = document.body;

    if (code === 0) {

        body.style.background =
            "linear-gradient(135deg,#FFD54F,#FF9800)";

    }
    else if ([1,2,3].includes(code)) {

        body.style.background =
            "linear-gradient(135deg,#90CAF9,#64B5F6)";

    }
    else if (
        [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)
    ) {

        body.style.background =
            "linear-gradient(135deg,#4FC3F7,#1565C0)";

    }
    else if ([95,96,99].includes(code)) {

        body.style.background =
            "linear-gradient(135deg,#512DA8,#1A237E)";

    }
    else if ([71,73,75,77].includes(code)) {

        body.style.background =
            "linear-gradient(135deg,#E3F2FD,#BBDEFB)";

    }
    else {

        body.style.background =
            "linear-gradient(135deg,#74ebd5,#9face6)";

    }

}
function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const date = now.toLocaleDateString("en-US", options);

    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("dateTime").innerHTML =
        `📅 ${date}<br>🕒 ${time}`;

}

updateDateTime();

setInterval(updateDateTime, 1000);