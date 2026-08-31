const clock = document.querySelector("#clock");

const date = document.querySelector("#date");

const greeting = document.querySelector("#greeting");

const weatherElement = document.querySelector("#weather");

const aboutButton = document.querySelector("#about-button");

const aboutSection = document.querySelector("#about");

const topButton = document.querySelector("#top-button");

const header = document.querySelector("#top");

/* =========================
   KLOCKA OCH DATUM
========================= */

function updateClock() {
  const currentTime = new Date();

  const hours = currentTime.getHours().toString().padStart(2, "0");

  const minutes = currentTime.getMinutes().toString().padStart(2, "0");

  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds}`;

  const formattedDate = currentTime.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  date.textContent =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  updateGreeting();
}

/* =========================
   HÄLSNING
========================= */

function updateGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour < 10) {
    greeting.textContent = "God morgon!";
  } else if (currentHour < 18) {
    greeting.textContent = "God dag!";
  } else {
    greeting.textContent = "God kväll!";
  }
}

/* =========================
   VÄDER
========================= */

function getWeather() {
  if (!navigator.geolocation) {
    weatherElement.textContent = "Kunde inte hämta position";

    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,weather_code`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Fel vid hämtning av väderdata");
        }

        const data = await response.json();

        const temperature = Math.round(data.current.temperature_2m);

        const weatherCode = data.current.weather_code;

        let icon = "☀️";

        let text = "Klart";

        /* KLART */

        if (weatherCode === 0) {
          icon = "☀️";

          text = "Klart";
        } else if (weatherCode >= 1 && weatherCode <= 3) {

        /* MOLN */
          icon = "☁️";

          text = "Molnigt";
        } else if (weatherCode >= 45 && weatherCode <= 48) {

        /* DIMMA */
          icon = "🌫️";

          text = "Dimma";
        } else if (weatherCode >= 51 && weatherCode <= 57) {

        /* DUGGREGN */
          icon = "🌦️";

          text = "Duggregn";
        } else if (weatherCode >= 61 && weatherCode <= 67) {

        /* REGN */
          icon = "🌧️";

          text = "Regn";
        } else if (weatherCode >= 71 && weatherCode <= 77) {

        /* SNÖ */
          icon = "❄️";

          text = "Snö";
        } else if (weatherCode >= 80 && weatherCode <= 82) {

        /* REGNSKURAR */
          icon = "🌦️";

          text = "Regnskurar";
        } else if (weatherCode >= 85 && weatherCode <= 86) {

        /* SNÖSKURAR */
          icon = "🌨️";

          text = "Snöskurar";
        } else if (weatherCode >= 95) {

        /* ÅSKA */
          icon = "⛈️";

          text = "Åska";
        }

        weatherElement.textContent = `${icon} ${text} ${temperature}°C`;
      } catch (error) {
        weatherElement.textContent = "Kunde inte hämta väder";

        console.error(error);
      }
    },

    (error) => {
      console.error(error);

      if (error.code === 1) {
        weatherElement.textContent = "📍 Position nekad";
      } else {
        weatherElement.textContent = "Kunde inte hämta position";
      }
    },
  );
}

/* =========================
   OM MIG-KNAPP
========================= */

aboutButton.addEventListener("click", function () {
  aboutSection.scrollIntoView({
    behavior: "smooth",

    block: "start",
  });
});

/* =========================
   TILL TOPPEN-KNAPP
========================= */

topButton.addEventListener("click", function () {
  header.scrollIntoView({
    behavior: "smooth",

    block: "start",
  });
});

/* =========================
   STARTA SIDAN
========================= */

updateClock();

getWeather();

/* Uppdatera klockan varje sekund */

setInterval(updateClock, 1000);

/* Uppdatera vädret var 10:e minut */

setInterval(getWeather, 10 * 60 * 1000);

console.log("Nyfiken utvecklare? Vågat...");
