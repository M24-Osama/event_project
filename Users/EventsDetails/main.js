function getUrlParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    date: params.get("date"),
    time: params.get("time"),
    title: params.get("title"),
    image: params.get("img"),
    desc: params.get("desc"),
    location: params.get("location"),
    fullLocation: params.get("fullLocation"),
    lat: params.get("lat"),
    lng: params.get("lng"),
    // id: 1,
    // title: "free medical day",
    // img: "../image/freeday.png",
    // desc: "Maintaining a healthy lifestyle is not just about exercising regularly or eating balanced meals; it's about finding a sustainable routine that promotes overall well-being.",
    // date: "12 nov 2024",
    // location: "Jordan/Irbid",
    // fullLocation: "Akef Al-Fayiz St. 116, Amman, Jordan",
    // markerLocation: {
    //   lat: 32.0,
    //   lng: 35.0,
  };
}
const data = getUrlParams();

function getTempByLocation(location) {
  const dashPos = location.split(",");
  let subbedLoc = dashPos[0].trim();

  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=dd0ce2b6bc1242f79b2131516242809&q=${subbedLoc}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      console.log(data.current.temp_c);
      return data.current.temp_c;
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      return null; // Return null or some default value in case of an error
    });
}

// Update the title, description, and location immediately
document.getElementById("title").innerHTML = data.title;
document.getElementById("desc").innerHTML = data.desc;
document.getElementById("location").innerHTML = data.location;
document.getElementById("time").innerHTML = data.time;
document.getElementById("date").innerHTML = data.date;

// Fetch and display temperature
getTempByLocation(data.location).then((temp) => {
  if (temp !== null) {
    document.getElementById("temp").innerHTML = `${temp} °C`;
  } else {
    document.getElementById("temp").innerHTML = "Temp isn't valid";
  }
});

let img = document.getElementById("slideshow");
let arrimage = data.image.split("@");

arrimage.forEach((element) => {
  const div = document.createElement("div");
  div.className = "mySlides fade";
  div.innerHTML = `<img src=${element} />`;
  img.appendChild(div);
});

let marker1;
let marker2;
let directionsRenderer;
let directionsService;
let map;
let myLoc;
let loc = { lat: Number(data.lat), lng: Number(data.lng) };
//let loc = { lat: 31.9539, lng: 35.9106 }

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: loc,
  });
  directionsRenderer.setMap(map);
  marker1 = new google.maps.Marker({
    position: loc,
    map: map,
  });
  marker1.setPosition(loc);
}
function myPlace(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        myLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Center the map on the current location
        map.setCenter(myLoc);
        map.setZoom(15);

        // Add a marker to indicate the current location
        marker2 = new google.maps.Marker({
          position: myLoc,
          map: map,
          title: "You are here!",
        });
        marker2.setPosition(myLoc);
      },
      (error) => {
        alert("Error Code = " + error.code + " - " + error.message);
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, pos) {
  const infoWindow = new google.maps.InfoWindow();
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
function direction(loc, myLoc) {
  if (!myLoc) {
    alert("Activate your location");
    return;
  }
  const destination = myLoc;

  // Create a request for directions
  const request = {
    origin: loc,
    destination: myLoc,
    travelMode: google.maps.TravelMode.DRIVING, // Can be WALKING, BICYCLING, TRANSIT, etc.
  };

  // Get directions from the DirectionsService
  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map
      directionsRenderer.setDirections(result);
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });
  marker1.setMap(null);
}

function Clear() {
  directionsRenderer.setDirections({ routes: [] });
  if (marker2) {
    marker2.setMap(null);
  }
  if (marker1) {
    marker1 = new google.maps.Marker({
      position: loc,
      map: map,
    });
    map.panTo(marker1.getPosition());
    map.setZoom(15);
  }
}

window.onload = initMap;
let slideIndex = 1;
//showSlides(slideIndex);

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
}
plusSlides(1);
setInterval(function () {
  plusSlides(1);
}, 5000);

// nav
function nav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}