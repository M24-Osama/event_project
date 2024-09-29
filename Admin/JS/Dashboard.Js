let events = JSON.parse(localStorage.getItem("events")) || []; // Use an empty array if null
console.log(events);
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
    <td>${event.time}</td>
    <td >${event.location}</td>
    <td><div class = "desc" >${event.description}</div></td>
    <td>  
        <div class="btnEvent" ><i class="bi bi-pen-fill"> Edit</i></div>
        <div class="btnEvent red"> <span class="bi bi-trash-fill" style="color: white;"> Delete</span> </div>
    </td>
`;
  count += 1;
  cardContainer.appendChild(tr);
});

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

  alert("Event saved successfully!");

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
