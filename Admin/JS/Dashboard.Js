let events = JSON.parse(localStorage.getItem("events")) || []; // Use an empty array if null
console.log(events);
let cardContainer = document.getElementById("tableEvent");
let count = 0;
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

// Populate the table with events
function populateTable() {
  cardContainer.innerHTML = `
    <th class="thw10">#</th>
    <th class="thw10">ID</th>
    <th class="thw20">Event's Name</th>
    <th class="thw20">Date</th>
    <th class="thw20">Time</th>
    <th class="thw20">Location</th>
    <th class="thw20">Description</th>
    <th class="thw20">Action</th>
  `;

  count = 0;
  events.forEach((event) => {
    const tr = document.createElement("tr");
    tr.className = "card";
    if (color) {
      tr.className += " cardBlue";
      color = false;
    } else {
      color = true;
    }
    tr.setAttribute("data-id", event.id);
    tr.innerHTML = `
      <td>${count}</td>
      <td>${event.id}</td>
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.time}</td>
      <td>${event.location}</td>
      <td><div class="desc">${event.description}</div></td>
      <td>  
        <div class="btnEvent edit-button" data-id="${event.id}"><i class="bi bi-pen-fill"> Edit</i></div>
        <div class="btnEvent red delete-button" data-id="${event.id}">
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
          const eventId = parseInt(deleteButton.getAttribute("data-id"), 10);
          deleteEventById(eventId);
          tr.remove();
          swal("Delete", "Event has been deleted successfully!", "success");
        }
      });
      // if (confirm("Are you sure you want to delete this event?")) {
      //   const eventId = parseInt(deleteButton.getAttribute("data-id"), 10);
      //   deleteEventById(eventId);
      //   tr.remove();
      // }
    });

    const editButton = tr.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      const eventId = parseInt(editButton.getAttribute("data-id"), 10);
      const eventToEdit = events.find((e) => e.id === eventId);
      if (eventToEdit) {
        populateEditForm(eventToEdit);
        editEventPopup.style.display = "flex";
      }
    });
  });
}

// Call populateTable on page load
populateTable();

function deleteEventById(eventId) {
  events = events.filter((event) => event.id !== eventId);
  localStorage.setItem("events", JSON.stringify(events));
}

let searchInput = document.getElementById("search");
searchInput.addEventListener("input", search);

function search(e) {
  console.log(e);
  const value = (e.target.value || searchInput.value).toLowerCase();
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    const id = card.children[1].textContent.toLowerCase();
    const title = card.children[2].textContent.toLowerCase();
    const loc = card.children[5].textContent.toLowerCase();

    if (title.includes(value) || id.includes(value) || loc.includes(value)) {
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

let locationName = null;
let fullAddress = null;
let markerLocation = null;
let selectedImages = [];
let locationDetails = {
  city: "",
  country: "",
  fullAddress: "",
};

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
console.log(today );
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

      events.push(eventData);
      localStorage.setItem("events", JSON.stringify(events));

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
  // if (confirm("Are you sure you want to add this event?")) {
  //   const eventData = {
  //     id: Date.now(),
  //     title: eventTitleInput.value,
  //     description: eventDescriptionInput.value,
  //     date: eventDateInput.value,
  //     time: eventTimeInput.value,
  //     images: selectedImages,
  //     location: `${locationDetails.city}, ${locationDetails.country}`,
  //     fullLocation: locationDetails.fullAddress,
  //     markerLocation: markerLocation,
  //   };

  //   events.push(eventData);
  //   localStorage.setItem("events", JSON.stringify(events));

  //   // Clear the form fields
  //   eventTitleInput.value = "";
  //   eventDateInput.value = "";
  //   eventTimeInput.value = "";
  //   eventDescriptionInput.value = "";
  //   eventImagesInput.value = "";
  //   selectedImages = [];
  //   locationDetails = { city: "", country: "", fullAddress: "" };
  //   locationDisplay.innerHTML = "No location selected.";
  //   submitEventBtn.disabled = true;
  //   eventPopup.style.display = "none";

  //   // Add new event to the table
  //   populateTable();
  // } else {
  //   eventPopup.style.display = "none";
  // }
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
  const index = events.findIndex((event) => event.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem("events", JSON.stringify(events));
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
        id: editingEventId,
        title: document.getElementById("editEventTitle").value,
        description: document.getElementById("editEventDescription").value,
        date: document.getElementById("editEventDate").value,
        time: document.getElementById("editEventTime").value,
        images: selectedImages,
        location: `${locationDetails.city}, ${locationDetails.country}`,
        fullLocation: locationDetails.fullAddress,
        markerLocation: markerLocation,
      };

      updateEvent(updatedEvent);
      editEventPopup.style.display = "none";
      swal("Edit", "Event has been edited successfully!", "success");
    }
  });
  // if (confirm("Are you sure you want to update this event?")) {
  //   const updatedEvent = {
  //     id: editingEventId,
  //     title: document.getElementById("editEventTitle").value,
  //     description: document.getElementById("editEventDescription").value,
  //     date: document.getElementById("editEventDate").value,
  //     time: document.getElementById("editEventTime").value,
  //     images: selectedImages,
  //     location: `${locationDetails.city}, ${locationDetails.country}`,
  //     fullLocation: locationDetails.fullAddress,
  //     markerLocation: markerLocation,
  //   };

  //   updateEvent(updatedEvent);
  //   editEventPopup.style.display = "none";
  // }
});

// Google Maps Code
let map;
let marker1;
let geocoder;

function initMap() {
  const initialLocation = { lat: 31.963158, lng: 35.930359 }; // Amman/Jordan
  geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: initialLocation,
  });

  map.addListener("click", (event) => {
    const clickedLocation = event.latLng;

    if (marker1) {
      marker1.setPosition(clickedLocation);
    } else {
      marker1 = new google.maps.Marker({
        position: clickedLocation,
        map: map,
        draggable: true,
      });
    }

    markerLocation = {
      lat: clickedLocation.lat(),
      lng: clickedLocation.lng(),
    };

    // Reverse Geocode the clicked location
    geocoder.geocode(
      { location: markerLocation, language: "en" },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            locationName = results[0].address_components;
            fullAddress = results[0].formatted_address;
            let city = "";
            let country = "";

            locationName.forEach((component) => {
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("country")) {
                country = component.long_name;
              }
            });

            locationDetails = {
              city: city,
              country: country,
              fullAddress: fullAddress,
            };
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  });
}

function geocodeAddress() {
  const address = document.getElementById("searchLocation").value;

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      if (marker1) {
        marker1.setPosition(results[0].geometry.location);
      } else {
        marker1 = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
        });
      }

      map.setZoom(15);
      markerLocation = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };

      locationName = results[0].address_components;
      fullAddress = results[0].formatted_address;
      let city = "";
      let country = "";

      locationName.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      });

      locationDetails = {
        city: city,
        country: country,
        fullAddress: fullAddress,
      };
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
