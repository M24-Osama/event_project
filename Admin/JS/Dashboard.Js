let events = JSON.parse(localStorage.getItem("events")) || []; // Use an empty array if null
console.log(events);
cardContainer = document.getElementById("tableEvent");
let count = 0;
let color = true;
events.forEach((event) => {
  const tr = document.createElement("tr");
  tr.className = "card";
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
    <td>${event.time}</td>
    <td >${event.location}</td>
    <td><div class = "desc" >${event.description}</div></td>
    <td>  
    <div class="btnEvent"><i class="bi bi-pen-fill"> Edit</i></div>
        <div class="btnEvent red delete-button" data-id="${event.id}">
            <span class="bi bi-trash-fill" style="color: white;"> Delete</span>
        </div>
    </td>
  `;

  cardContainer.appendChild(tr);
  count += 1;
  // Add the event listener to the delete button
  const deleteButton = tr.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure to Delete?")) {
      const eventId = parseInt(deleteButton.getAttribute("data-id"), 10);
      deleteEventById(eventId);
      tr.remove(); // Remove the row from the table
    }
  });
});

function deleteEventById(eventId) {
  // Filter out the event with the matching ID
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
    const loc = card.children[4].textContent.toLowerCase();

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

    locationPopup.style.display = "none";

    clearSearchBox();

    checkFormValidity();
  } else {
    alert("Please select a location.");
  }
});

// Handle form submission
submitEventBtn.addEventListener("click", () => {
  // Display confirmation dialog
  if (confirm("Are you sure you want to add this event?")) {
    // If the user confirms, proceed with adding the event
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

    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    existingEvents.push(eventData);
    localStorage.setItem("events", JSON.stringify(existingEvents));

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
      <td>${eventData.id}</td>
      <td>${eventData.title}</td>
      <td>${eventData.date}</td>
      <td>${eventData.time}</td>
      <td>${eventData.fullLocation}</td>
      <td><div class = "desc">${eventData.description}</div></td>
      <td>  
          <div class="btnEvent" ><i class="bi bi-pen-fill"> Edit</i></div>
          <div class="btnEvent red"> <span class="bi bi-trash-fill" style="color: white;"> Delete</span> </div>
      </td>
    `;
    count += 1;
    cardContainer.appendChild(tr);
  } else {
    eventPopup.style.display = "none";
  }
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

//Edit event 
let editEventId = null; // Variable to keep track of which event is being edited

// Modify the submit button text to reflect the action
submitEventBtn.innerText = "Add Event"; 

// Add the click listener for the Edit button
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-pen-fill")) {
    const eventId = parseInt(e.target.closest("tr").querySelector("td:nth-child(2)").textContent);
    const eventToEdit = events.find(event => event.id === eventId);
    
    if (eventToEdit) {
      // Fill the popup form with the event's data
      eventTitleInput.value = eventToEdit.title;
      eventDateInput.value = eventToEdit.date;
      eventTimeInput.value = eventToEdit.time;
      eventDescriptionInput.value = eventToEdit.description;
      locationDisplay.innerHTML = `Location: ${eventToEdit.location}<br>Full Location: ${eventToEdit.fullLocation}`;
      selectedImages = eventToEdit.images;  // Set the images

      // Set the event ID to be edited
      editEventId = eventToEdit.id;

      // Change submit button text to "Save Changes"
      submitEventBtn.innerText = "Save Changes";

      // Show the popup
      eventPopup.style.display = "flex";
    }
  }
});

// Modify the submit button click listener to handle both add and edit
submitEventBtn.addEventListener("click", () => {
  // Display confirmation dialog
  if (confirm(editEventId ? "Are you sure you want to edit this event?" : "Are you sure you want to add this event?")) {
    // Check if it's an edit action or add action
    if (editEventId) {
      // Update the existing event in the array
      const updatedEventData = {
        id: editEventId,
        title: eventTitleInput.value,
        description: eventDescriptionInput.value,
        date: eventDateInput.value,
        time: eventTimeInput.value,
        images: selectedImages,
        location: `${locationDetails.city}, ${locationDetails.country}`,
        fullLocation: locationDetails.fullAddress,
        markerLocation: markerLocation,
      };

      const eventIndex = events.findIndex(event => event.id === editEventId);
      events[eventIndex] = updatedEventData;  // Update the event in the array
      editEventId = null; // Reset the edit ID
      
      submitEventBtn.innerText = "Add Event"; // Reset button text
    } else {
      // Add new event
      const newEventData = {
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

      events.push(newEventData);  // Add the new event to the array
    }

    // Update localStorage with the updated events array
    localStorage.setItem("events", JSON.stringify(events));

    // Clear the form fields after adding/editing
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

    // Re-render the events table to reflect changes
    renderEvents();
  } else {
    eventPopup.style.display = "none";
  }
});

// Function to render events in the table (after edit or add)
function renderEvents() {
  cardContainer.innerHTML = "";  // Clear the current table
  count = 0;
  color = true;

  events.forEach(event => {
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
      <td>${event.time}</td>
      <td>${event.fullLocation}</td>
      <td><div class = "desc">${event.description}</div></td>
      <td>  
          <div class="btnEvent" ><i class="bi bi-pen-fill"> Edit</i></div>
          <div class="btnEvent red delete-button" data-id="${event.id}">
              <span class="bi bi-trash-fill" style="color: white;"> Delete</span>
          </div>
      </td>
    `;
    cardContainer.appendChild(tr);
    count += 1;
  });
}
