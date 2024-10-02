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
setInterval(function () {
  plusSlides(1);
}, 5000);
//Latest adminData added
let adminData = JSON.parse(localStorage.getItem("adminData")) || []; // Use an empty array if null
console.log(adminData);
// latest adminData
cardContainer = document.getElementById("card-container");
let cont = 0;
adminData.reverse().forEach((event) => {
  if (cont == 4) {
    return;
  }
  const i = event.images.join("@");
  cont += 1;
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <a href="../adminDataDetails/index.html?title=${encodeURIComponent(
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
      <h4>${event.date}</h4>
    </div>
  
  </a>
`;
  cardContainer.appendChild(card);
});

// starting soon
cardContainer = document.getElementById("card-container-soon");
let contSoon = 0;
const today = new Date();
const sevenDaysLater = new Date(today);
sevenDaysLater.setDate(today.getDate() + 7);
adminData.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB;
});

adminData.reverse().forEach((event) => {
  const eventDate = new Date(event.date);
  if (contSoon == 4) {
    return;
  }

  if (eventDate > today && eventDate <= sevenDaysLater) {
    const i = event.images.join("@");
    contSoon += 1;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <a href="../adminDataDetails/index.html?title=${encodeURIComponent(
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
      <h4>${event.date}</h4>
    </div>
  
  </a>
  `;
    cardContainer.appendChild(card);
  }
});
let ch = cardContainer.children;
if (ch.length == 0) {
  const card = document.createElement("div");
  card.className = "cardSoon";
  card.innerHTML = `
    <h3>Coming soon adminData</h3>
`;
  cardContainer.appendChild(card);
}
// nav
function nav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//submit form in footer
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const comment = document.getElementById("comment").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !comment) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields!",
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid email address!",
    });
    return;
  }

  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  const newEntry = { name, email, comment };

  formData.push(newEntry);

  localStorage.setItem("formData", JSON.stringify(formData));

  Swal.fire({
    // position: "center",
    icon: "success",
    title: "Your message sent successfully!",
    showConfirmButton: false,
    timer: 1500,
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comment").value = "";
});

window.onload = function () {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comment").value = "";

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

let feedbacksNum = document.getElementById("feedbacks");
let adminDataNum = document.getElementById("adminData");

function getUsersAndadminDataNumber() {
  adminDataNum.innerHTML = JSON.parse(localStorage.getItem("adminData")).length;
  feedbacksNum.innerHTML = JSON.parse(localStorage.getItem("formData")).length;
}
getUsersAndadminDataNumber();
