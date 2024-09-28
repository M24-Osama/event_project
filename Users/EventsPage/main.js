// Retrieve events from localStorage
const events = JSON.parse(localStorage.getItem("Event")) || [];
const eventsContainers = document.querySelectorAll(".events-container");
const searchInput = document.getElementById("search");
const links = document.querySelectorAll(".pagination ul li.link");
let currentValue = 1; // Tracks the current page
const cardsPerPage = 8; // Number of cards per container
console.log("test");
events.push(
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "2024-09-09",
    location: "Jordan/Irbid",
    fullLocation: "Akef Al-Fayiz St. 116, Amman, Jordan",
    markerLocation: {
      lat: 32.0,
      lng: 35.0,
    },
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "2024-09-09",
    time: "12:00",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "2024-08-09",
    time: "12:00",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    time: "12:00",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "30 sep 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "2 nov 2023",
    location: "Jordan/Irbid",
  }
);
// Function to create a card for an event
function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
        <a href="../HTML/EventDetails.html?title=${event.title}&img=${event.img}&desc=${event.desc}&date=${event.date}&location=${event.location}">
            <img src="${event.img}" style="width: 100%;">
            <h1>${event.title}</h1>
            <p>${event.desc}</p>
            <br>
            <div class="card-date-loc">
            <h4>${event.location}</h4>
            <h4 class="date">${event.date}</h4>
            </div>
        </a>
    `;
  return card; // Return the created card
}

// Function to distribute event cards into containers
function distributeCards() {
  // Clear existing cards in all containers
  eventsContainers.forEach((container) => (container.innerHTML = ""));

  // Loop through events and add them to the appropriate container
  for (let i = 0; i < events.length; i++) {
    const containerIndex = Math.floor(i / cardsPerPage); // Determine which container to use
    if (containerIndex < eventsContainers.length) {
      const card = createEventCard(events[i]); // Create the card
      eventsContainers[containerIndex].appendChild(card); // Add the card to the container
    }
  }
}

// Function to show the current container
function updateVisibleContainer() {
  eventsContainers.forEach((container, index) => {
    container.style.display = index === currentValue - 1 ? "grid" : "none"; // Show or hide container
  });
}

// Search functionality to filter cards
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase(); // Get search input
  const cards = document.querySelectorAll(".card"); // Get all cards

  cards.forEach((card) => {
    const title = card.querySelector("h1").innerText.toLowerCase();
    const desc = card.querySelector("p").innerText.toLowerCase();
    const location = card.querySelector("h4").innerText.toLowerCase();

    // Check if the card should be visible
    const isVisible =
      title.includes(value) || desc.includes(value) || location.includes(value);
    card.classList.toggle("hide", !isVisible); // Show or hide the card
  });
});

// Function to handle pagination link clicks
function handleLinkClick(e) {
  currentValue = parseInt(e.target.getAttribute("value")); // Update current page number
  updateLinksAndContainer(); // Update visible container
}

// Attach event listeners to pagination links
links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// Update visible container and active link
function updateLinksAndContainer() {
  links.forEach((link) => link.classList.remove("active")); // Remove active class from all links
  links[currentValue - 1].classList.add("active"); // Add active class to the current link
  updateVisibleContainer(); // Show the correct container
}

// Previous button functionality
document.getElementById("prev").addEventListener("click", () => {
  if (currentValue > 1) currentValue--; // Decrease page number
  updateLinksAndContainer(); // Update the display
});

// Next button functionality
document.getElementById("next").addEventListener("click", () => {
  if (currentValue < links.length) currentValue++; // Increase page number
  updateLinksAndContainer(); // Update the display
});

// Initialize the page by distributing cards and showing the first container
function initializePage() {
  distributeCards(); // Distribute cards into containers
  updateVisibleContainer(); // Show the first container
  if (links.length > 0) links[0].classList.add("active"); // Set first link as active
}

// Call the initialize function when the script loads
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
  console.log("Selected date:", dateInput);
  cards.forEach((card) => {
    const dateElement = card.querySelector(".date");
    const dateText = dateElement ? dateElement.textContent.trim() : ""; // Extract text content
    const isVisible = dateText.includes(dateInput);
    card.classList.toggle("hide", !isVisible);
  });
}
