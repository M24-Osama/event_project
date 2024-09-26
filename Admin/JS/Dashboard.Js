let events = JSON.parse(localStorage.getItem("Event")) || []; // Use an empty array if null

events.push({
  id: 1,
  title: "free medical day",
  img: ["../image/freeday.png"],
  desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
  date: "12 nov 2024",
  location: "Jordan/Irbid",
});

cardContainer = document.getElementById("tableEvent");
let count = 0;
events.forEach((event) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${count}</td>
    <td>${event.id}</td>
    <td>${event.title}</td>
    <td>${event.date}</td>
    <td>${event.location}</td>
    <td class = "desc">${event.desc}</td>
    <td>  
        <div class="btnEvent" ><i class="bi bi-pen-fill"> Edit</i></div>
        <div class="btnEvent" style="background-color: red "> <i class="bi bi-trash-fill" style="color: white;"> Delete</i> </div>
    </td>
`;
  count += 1;
  cardContainer.appendChild(tr);
});
