let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//Latest events added
let events = JSON.parse(localStorage.getItem("Event")) || []; // Use an empty array if null

events.push(
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 1,
    title: "free medical day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
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
// latest events
cardContainer = document.getElementById("card-container");
let cont = 0;
events.reverse().forEach((event) => {
  if (cont == 4) {
    return;
  }
  cont += 1;
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <a href="../HTML/EventDetails.html?title=${event.title}&img=${event.img}&desc=${event.desc}&date=${event.date}&location=${event.location}">
  <img src="${event.img[0]}" style="width: 100%;">
  <h2>${event.title}</h2>
  <br>
  <p>${event.desc}</p>
  <br>
  <h4>${event.date}</h4>
  <h4>${event.location}</h4>
  
  </a>
`;

  cardContainer.appendChild(card);
});

// starting soon
cardContainer = document.getElementById("card-container-soon");
let contSoon = 0;
events.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB;
});
events.reverse().forEach((event) => {
  if (contSoon == 4) {
    return;
  }
  contSoon += 1;
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <a href="../HTML/EventDetails.html?title=${event.title}&img=${event.img}&desc=${event.desc}&date=${event.date}&location=${event.location}">
    <img src="${event.img[0]}" style="width: 100%;">
    <h2>${event.title}</h2>
    <br>
    <p>${event.desc}</p>
    <br>
  <h4>${event.date}</h4>

    <h4>${event.location}</h4>
    </a>
  `;

  cardContainer.appendChild(card);
});
// nav
function nav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const comment = document.getElementById("comment").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !comment) {
    alert("Please fill in all fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  const newEntry = { name, email, comment };

  formData.push(newEntry);

  localStorage.setItem("formData", JSON.stringify(formData));

  alert("Form submitted!");
});

window.onload = function () {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comment").value = "";
};
