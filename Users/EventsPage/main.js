// Retrieve events from localStorage
const events = JSON.parse(localStorage.getItem("events")) || [];
const eventsContainers = document.querySelectorAll(".events-container");
const searchInput = document.getElementById("search");
const links = document.querySelectorAll(".pagination ul li.link");
let currentValue = 1;
const cardsPerPage = 8;

// Function to create a card for an event
function createEventCard(event) {
  const i = event.images.join("@");
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
           <a href="../eventsDetails/index.html?title=${encodeURIComponent(
             event.title
           )}&img=${encodeURIComponent(i)}&desc=${encodeURIComponent(
    event.description
  )}&date=${encodeURIComponent(event.date)}&time=${encodeURIComponent(
    event.time
  )}&location=${encodeURIComponent(
    event.location
  )}&fullLocation=${encodeURIComponent(
    event.fullLocation
  )}&lat=${encodeURIComponent(
    event.markerLocation.lat
  )}&lng=${encodeURIComponent(
    event.markerLocation.lng
  )}&time=${encodeURIComponent(event.time)}">
    <img src="${event.images[0]}" style="width: 100%;">
    <h2>${event.title}</h2>
    <p>${event.description}</p>
    <div class ="card-date-loc">
      <h4>${event.location}</h4>
      <h4 class = "date">${event.date}</h4>
    </div>
  
  </a>
  `;
  return card;
}

// Function to distribute event cards into containers
function distributeCards() {
  eventsContainers.forEach((container) => (container.innerHTML = ""));
  for (let i = 0; i < events.length; i++) {
    const containerIndex = Math.floor(i / cardsPerPage);
    if (containerIndex < eventsContainers.length) {
      const card = createEventCard(events[i]);
      eventsContainers[containerIndex].appendChild(card);
    }
  }
}

// Function to show the current container
function updateVisibleContainer() {
  eventsContainers.forEach((container, index) => {
    container.style.display = index === currentValue - 1 ? "grid" : "none";
  });
}

// Search functionality to filter cards
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const title = card.querySelector("h2").innerText.toLowerCase();
    const desc = card.querySelector("p").innerText.toLowerCase();
    const location = card.querySelector("h4").innerText.toLowerCase();
    const isVisible =
      title.includes(value) || desc.includes(value) || location.includes(value);
    card.classList.toggle("hide", !isVisible);
  });
});

// Pagination link handling
function handleLinkClick(e) {
  currentValue = parseInt(e.target.getAttribute("value"));
  updateLinksAndContainer();
}

links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

function updateLinksAndContainer() {
  links.forEach((link) => link.classList.remove("active"));
  links[currentValue - 1].classList.add("active");
  updateVisibleContainer();
}

// Previous and next buttons
document.getElementById("prev").addEventListener("click", () => {
  if (currentValue > 1) currentValue--;
  updateLinksAndContainer();
});

document.getElementById("next").addEventListener("click", () => {
  if (currentValue < links.length) currentValue++;
  updateLinksAndContainer();
});

// Initialize page
function initializePage() {
  distributeCards();
  updateVisibleContainer();
  if (links.length > 0) links[0].classList.add("active");
}

initializePage();

function nav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

window.onload = function () {
  let darkMood = localStorage.getItem("darkMood");
  if (darkMood == "light") {
    body.classList.add("darkMood");
  } else {
    localStorage.setItem("darkMood", "dark");
  }
};

function darkMood() {
  let darkMood = localStorage.getItem("darkMood");
  const body = document.getElementById("body");
  if (darkMood == "dark") {
    body.classList.add("darkMood");
    localStorage.setItem("darkMood", "light");
  } else {
    body.classList.remove("darkMood");
    localStorage.setItem("darkMood", "dark");
  }
}

function searchDate() {
  const dateInput = document.getElementById("date-input").value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    console.log(dateInput);
    const dateElement = card.querySelector(".date");
    console.log(dateElement);
    const dateText = dateElement ? dateElement.textContent.trim() : "";
    console.log(card);
    const isVisible = dateText.includes(dateInput);
    card.classList.toggle("hide", !isVisible);
  });
}
