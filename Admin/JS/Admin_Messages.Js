let logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
  localStorage.setItem("loggedInUser", "");
  window.location.href = "Login.html";
});

let adminData = JSON.parse(localStorage.getItem("adminData")) || [];
let cardContainer = document.getElementById("tableEvent");
let color = true;

// Load SweetAlert
const script = document.createElement("script");
script.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
document.head.appendChild(script);

// Populate Admins Table
function populateTable() {
  cardContainer.innerHTML = `
    <th class="thw10">#</th>
    <th class="thw20">Name</th>
    <th class="thw20">Email</th>
    <th class="thw20">Password</th>
    <th class="thw10">Action</th>
  `;
  adminData.forEach((event, index) => {
    const tr = document.createElement("tr");
    tr.className = color ? "card cardBlue" : "card";
    color = !color;

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${event.name}</td>
      <td>${event.email}</td>
      <td>**********</td>
      <td>
        <div class="btnEvent edit-button" data-id="${
          event.name
        }"><i class="bi bi-pen-fill"></i></div>
        <div class="btnEvent red delete-button" data-id="${event.name}">
          <i class="bi bi-trash-fill" style="color: white;"></i>
        </div>
      </td>
    `;
    cardContainer.appendChild(tr);

    // Edit button
    tr.querySelector(".edit-button").addEventListener("click", () => {
      openEditPopup(event);
    });

    // Delete button
    tr.querySelector(".delete-button").addEventListener("click", () => {
      swal({
        title: "Delete",
        text: "Are you sure you want to delete this admin?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteEventById(event.name);
          tr.remove();
          swal("Delete", "Admin has been deleted successfully!", "success");
        }
      });
    });
  });
}

// Popup for Editing Admins
const editEventPopup = document.getElementById("editEventPopup");
const closeEditPopupBtn = document.getElementById("closeEditPopupBtn");
const updateEventBtn = document.getElementById("updateEventBtn");

function openEditPopup(event) {
  document.getElementById("editEventName").value = event.name;
  document.getElementById("editEventEmail").value = event.email;
  document.getElementById("editEventPassword").value = event.password;
  editEventPopup.style.display = "block";

  updateEventBtn.onclick = () => {
    const updatedEvent = {
      name: document.getElementById("editEventName").value,
      email: document.getElementById("editEventEmail").value,
      password: document.getElementById("editEventPassword").value,
    };
    updateEvent(event.name, updatedEvent);
    editEventPopup.style.display = "none";
    swal("Edit", "Admin has been edited successfully!", "success");
  };
}

closeEditPopupBtn.addEventListener("click", () => {
  editEventPopup.style.display = "none";
});

// Update Event Function
function updateEvent(originalName, updatedEvent) {
  const index = adminData.findIndex((event) => event.name === originalName);
  if (index !== -1) {
    adminData[index] = updatedEvent;
    localStorage.setItem("adminData", JSON.stringify(adminData));
    populateTable(); // Refresh table
  }
}

// Call populate on page load
populateTable();

// Fetch formData from local storage
let formData = JSON.parse(localStorage.getItem("formData")) || [];

// Populate Messages Table
function populateTableMessages() {
  const tableBody = document.querySelector("#tableMessages tbody");
  tableBody.innerHTML = ""; // Clear existing content

  formData.forEach((message, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="thw10">${index + 1}</td>
            <td class="thw20">${message.name}</td>
            <td class="thw20">${message.email}</td>
            <td class="thw20">${message.comment}</td>
            <td class="thw10">
                <div class="btnEvent red delete-button" data-name="${
                  message.name
                }">
                    <span class="bi bi-trash-fill" style="color: white;"></span>
                </div>
            </td>
        `;
    tableBody.appendChild(tr);

    // Delete button functionality
    tr.querySelector(".delete-button").addEventListener("click", () => {
      swal({
        title: "Delete",
        text: "Are you sure you want to delete this message?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteMessageByName(message.name);
          tr.remove();
          swal("Delete", "Message has been deleted successfully!", "success");
        }
      });
    });
  });
}

// Call the function on page load to populate the table
populateTableMessages();

// Delete Function for messages
function deleteMessageByName(name) {
  formData = formData.filter((message) => message.name !== name);
  localStorage.setItem("formData", JSON.stringify(formData));
  populateTableMessages(); // Refresh messages table
}
