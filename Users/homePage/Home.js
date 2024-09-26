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



events.push({
  title: "free medical day",
  img: ["../image/freeday.png"],
  desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
  date: "12 nov 2024",
  location: "Jordan/Irbid",
});

cardContainer = document.getElementById("card-container");

events.forEach((event) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <a href="../HTML/EventDetails.html?title=${event.title}&img=${event.img}&desc=${event.desc}&date=${event.date}&location=${event.location}">
  <img src="${event.img[0]}" style="width: 100%;">
  <h2>${event.title}</h2>
  <br>
  <p>${event.desc}</p>
  <br>
  <h4>${event.location}</h4>
  </a>
`;

  cardContainer.appendChild(card);
});
