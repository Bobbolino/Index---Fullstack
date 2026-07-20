const clock = document.querySelector("#clock");
const date = document.querySelector("#date");
const greeting = document.querySelector("#greeting");

const aboutButton = document.querySelector("#about-button");
const aboutSection = document.querySelector("#about");

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
}

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

aboutButton.addEventListener("click", function () {
  aboutSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

updateClock();
updateGreeting();

setInterval(updateClock, 1000);
const topButton = document.querySelector("#top-button");
const header = document.querySelector("#top");
topButton.addEventListener("click", function () {
  header.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
