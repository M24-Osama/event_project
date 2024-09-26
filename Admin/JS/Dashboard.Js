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
    id: 2,
    title: "free day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  },
  {
    id: 3,
    title: " day",
    img: ["../image/freeday.png"],
    desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    date: "12 nov 2024",
    location: "Jordan/Irbid",
  }
);

cardContainer = document.getElementById("tableEvent");
let count = 0;
let color = true;
events.forEach((event) => {
  const tr = document.createElement("tr");
  tr.className = "card";
  if (color) {
    tr.className += " cardBlue";
    color = false;
  } else {
    color = true;
  }
  tr.innerHTML = `
    <td>${count}</td>
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.date}</td>
    <td>${event.location}</td>
    <td><div class = "desc">${event.desc}</div></td>
    <td>  
        <div class="btnEvent" ><i class="bi bi-pen-fill"> Edit</i></div>
        <div class="btnEvent" style="background-color: red "> <i class="bi bi-trash-fill" style="color: white;"> Delete</i> </div>
    </td>
`;
  count += 1;
  cardContainer.appendChild(tr);
});

let searchInput = document.getElementById("search");

function search(e) {
  console.log(e);
  const value = (e.target.value || searchInput.value).toLowerCase();
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    const id = card.children[0].textContent.toLowerCase();
    const title = card.children[2].textContent.toLowerCase();

    if (title.includes(value) || id.includes(value)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Attach click event listener to the search icon
document.getElementById("search-icon").addEventListener("click", () => {
  search({ target: searchInput });
});
