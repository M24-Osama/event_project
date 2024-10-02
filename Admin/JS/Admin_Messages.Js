let adminData = JSON.parse(localStorage.getItem("adminData")) || []; // Use an empty array if null
let formData = JSON.parse(localStorage.getItem("formData")) || []; // Use an empty array if null
console.log(adminData);
let cardContainer = document.getElementById("tableEvent");
let count = 0;
let countM = 0;
let color = true;
// Create a script element
const script = document.createElement("script");

// Set the source to the SweetAlert CDN
script.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";

// Append the script to the document's head
document.head.appendChild(script);

// Optionally, add an event listener to ensure the script is loaded
script.onload = () => {
  console.log("SweetAlert script has been loaded.");
};

// Populate the table with adminData
function populateTableMassages() {
  const tableBody = document.querySelector("#tableMessages tbody");

  let countM = 0;
  formData.forEach((event) => {
    const tr = document.createElement("tr");
    tr.className = "card";
    if (color) {
      tr.className += " cardBlue";
      color = false;
    } else {
      color = true;
    }

    tr.setAttribute("data-id", event.name);
    tr.innerHTML = `
      <td>${countM + 1}</td>
      <td>${event.name}</td>
      <td>${event.email}</td>
      <td>${event.comment}</td>
      <th class="thw10">Action</th>
      <td>  
        <div class="btnEvent red delete-button" data-id="${event.name}">
          <span class="bi bi-trash-fill" style="color: white;"> Delete</span>
        </div>
      </td>
    `;

    tableBody.appendChild(tr);
    countM++;

    // Add event listeners for delete and edit buttons
    const deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      swal({
        title: "Delete",
        text: "Are you sure you want to delete this event?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const eventName = deleteButton.getAttribute("data-id");
          console.log(eventName);
          deleteEventByName(eventName); // Handle event deletion
          tr.remove(); // Remove the row from the table
          swal("Delete", "Event has been deleted successfully!", "success");
        }
      });
    });
  });
}

function populateTable() {
  cardContainer.innerHTML = `
    <th class="thw10">#</th>
    <th class="thw20">Name</th>
    <th class="thw20">Email</th>
    <th class="thw20">Massages</th>
    <th class="thw10">Action</th>
  `;

  count = 0;
  adminData.forEach((event) => {
    const tr = document.createElement("tr");
    tr.className = "card";
    if (color) {
      tr.className += " cardBlue";
      color = false;
    } else {
      color = true;
    }
    tr.setAttribute("data-id", event.name);
    tr.innerHTML = `
      <td>${count}</td>
      <td>${event.name}</td>
      <td>${event.email}</td>
      <td>${event.password}</td>
      <td>  
        <div class="btnEvent edit-button" data-id="${event.name}"><i class="bi bi-pen-fill"> Edit</i></div>

        <div class="btnEvent red delete-button" data-id="${event.name}">
          <span class="bi bi-trash-fill" style="color: white;"> Delete</span>
        </div>
      </td>
    `;

    cardContainer.appendChild(tr);
    count += 1;

    // Add event listeners to the buttons
    const deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      swal({
        title: "Delete",
        text: "Are you sure you want to delete this event?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const eventName = deleteButton.getAttribute("data-id"); // Use the name directly
          console.log(eventName); // Logs the name instead of an ID
          deleteEventById(eventName); // Pass the event name
          tr.remove(); // Remove the row from the UI
          swal("Delete", "Event has been deleted successfully!", "success");
        }
      });
    });
  });
}
// Call populateTable on page load
populateTable();
populateTableMassages();
function deleteEventById(eventName) {
  adminData = adminData.filter((event) => event.name !== eventName);
  localStorage.setItem("adminData", JSON.stringify(adminData));
}
function deleteEventByName(eventName) {
  adminData = adminData.filter((event) => event.name !== eventName);
  localStorage.setItem("formData", JSON.stringify(adminData));
}
let searchInput = document.getElementById("search");
searchInput.addEventListener("input", search);

function search(e) {
  const value = (e.target.value || searchInput.value).toLowerCase();
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    const title = card.children[1].textContent.toLowerCase();
    const loc = card.children[2].textContent.toLowerCase();

    if (title.includes(value) || loc.includes(value)) {
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

const showPopupBtn = document.getElementById("showPopupBtn");
const eventPopup = document.getElementById("eventPopup");
const closePopupBtn = document.getElementById("closePopupBtn");
const submitEventBtn = document.getElementById("submitEventBtn");

const eventTitleInput = document.getElementById("eventTitle");
const eventDateInput = document.getElementById("eventDate");
const eventTimeInput = document.getElementById("eventTime");
const eventDescriptionInput = document.getElementById("eventDescription");
const eventImagesInput = document.getElementById("eventImages");
const locationDisplay = document.getElementById("locationDisplay");

const setLocationBtn = document.getElementById("setLocationBtn");
const locationPopup = document.getElementById("locationPopup");
const closeLocationPopup = document.getElementById("closeLocationPopup");
const saveLocationBtn = document.getElementById("saveLocationBtn");

showPopupBtn.addEventListener("click", () => {
  eventPopup.style.display = "flex";
});

closePopupBtn.addEventListener("click", () => {
  eventPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === eventPopup) {
    eventPopup.style.display = "none";
  }
  if (event.target === locationPopup) {
    locationPopup.style.display = "none";
  }
  if (event.target === editEventPopup) {
    editEventPopup.style.display = "none";
  }
});

// location popup
setLocationBtn.addEventListener("click", () => {
  locationPopup.style.display = "flex";
});

closeLocationPopup.addEventListener("click", () => {
  locationPopup.style.display = "none";
  clearSearchBox();
});

function clearSearchBox() {
  document.getElementById("searchLocation").value = "";
}

function checkFormValidity() {
  if (
    eventTitleInput.value &&
    eventDateInput.value &&
    eventTimeInput.value &&
    eventDescriptionInput.value &&
    locationDetails.fullAddress &&
    selectedImages.length > 0
  ) {
    submitEventBtn.disabled = false;
  } else {
    submitEventBtn.disabled = true;
  }
}

eventImagesInput.addEventListener("change", function () {
  selectedImages = [];
  const files = eventImagesInput.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImages.push(e.target.result);
      checkFormValidity();
    };

    reader.readAsDataURL(file);
  }
  checkFormValidity();
});

saveLocationBtn.addEventListener("click", () => {
  if (markerLocation) {
    locationDisplay.innerHTML = `Location: ${locationDetails.city}, ${locationDetails.country}<br>Full Location: ${locationDetails.fullAddress}`;
    editLocationDisplay.innerHTML = `Location: ${locationDetails.city}, ${locationDetails.country}<br>Full Location: ${locationDetails.fullAddress}`;

    locationPopup.style.display = "none";

    clearSearchBox();

    checkFormValidity();
  } else {
    alert("Please select a location.");
  }
});

const today = new Date().toISOString().split("T")[0];
console.log(today);
eventDateInput.setAttribute("min", today);
document.getElementById("editEventDate").setAttribute("min", today);
// Handle form submission
submitEventBtn.addEventListener("click", () => {
  const selectedDate = eventDateInput.value;

  // Validate if the selected date is today or in the future
  if (new Date(selectedDate) < new Date(today)) {
    alert("Please select a date that is today or in the future.");
    return;
  }

  // Display confirmation dialog
  swal({
    title: "Add",
    text: "Are you sure you want to Add this event?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const eventData = {
        id: Date.now(),
        title: eventTitleInput.value,
        description: eventDescriptionInput.value,
        date: eventDateInput.value,
        time: eventTimeInput.value,
        images: selectedImages,
        location: `${locationDetails.city}, ${locationDetails.country}`,
        fullLocation: locationDetails.fullAddress,
        markerLocation: markerLocation,
      };

      adminData.push(eventData);
      localStorage.setItem("adminData", JSON.stringify(adminData));

      // Clear the form fields
      eventTitleInput.value = "";
      eventDateInput.value = "";
      eventTimeInput.value = "";
      eventDescriptionInput.value = "";
      eventImagesInput.value = "";
      selectedImages = [];
      locationDetails = { city: "", country: "", fullAddress: "" };
      locationDisplay.innerHTML = "No location selected.";
      submitEventBtn.disabled = true;
      eventPopup.style.display = "none";

      // Add new event to the table
      populateTable();
      swal("Add", "Event has been added successfully!", "success");
    } else {
      eventPopup.style.display = "none";
    }
  });
});

// Edit functionality
let editingEventId = null;
const editEventPopup = document.getElementById("editEventPopup");
const closeEditPopupBtn = document.getElementById("closeEditPopupBtn");
const updateEventBtn = document.getElementById("updateEventBtn");
const editSetLocationBtn = document.getElementById("editSetLocationBtn");
const editLocationDisplay = document.getElementById("editLocationDisplay");

// Function to populate the edit form
function populateEditForm(event) {
  document.getElementById("editEventTitle").value = event.title;
  document.getElementById("editEventDate").value = event.date;
  document.getElementById("editEventTime").value = event.time;
  document.getElementById("editEventDescription").value = event.description;

  editLocationDisplay.innerHTML = `Location: ${event.location}<br>Full Location: ${event.fullLocation}`;

  editingEventId = event.id;
  locationDetails = {
    city: event.location.split(",")[0].trim(),
    country: event.location.split(",")[1].trim(),
    fullAddress: event.fullLocation,
  };
  markerLocation = event.markerLocation;
  selectedImages = event.images;
}

// Function to update an event
function updateEvent(updatedEvent) {
  const index = adminData.findIndex((event) => event.id === updatedEvent.id);
  if (index !== -1) {
    adminData[index] = updatedEvent;
    localStorage.setItem("adminData", JSON.stringify(adminData));
    populateTable();
  }
}

closeEditPopupBtn.addEventListener("click", () => {
  editEventPopup.style.display = "none";
});

editSetLocationBtn.addEventListener("click", () => {
  locationPopup.style.display = "flex";
});

updateEventBtn.addEventListener("click", () => {
  swal({
    title: "Edit",
    text: "Are you sure you want to edit this event?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const updatedEvent = {
        name: document.getElementById("editEventTitle").value,
        email: document.getElementById("editEventDescription").value,
        password: document.getElementById("editEventDate").value,
      };

      updateEvent(updatedEvent);
      editEventPopup.style.display = "none";
      swal("Edit", "Event has been edited successfully!", "success");
    }
  });
});
