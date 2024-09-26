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
let events = [];
events = JSON.parse(localStorage.getItem('Event'));
  console.log(events);

  events.push(
   {
       title:"free medial day",
       img:"../Assets/freeday.png",
       desc:"this is a description for the event",
       date:"12 nov 2024",
       location:"Jordan/Irbid",
   }
  ) ;
  events.push(
   {
       title:"free medial day",
       img:"//Users/image/freeday.png",
       desc:"another card with desc",
       date:"12 nov 2024",
       location:"Jordan/Irbid",
   }
  );

  cardContainer = document.getElementById('card-container');
        
  events.forEach((event) => {
   const card = document.createElement('div');
   card.className = 'card';

   const Title = document.createElement('h2');
    Title.textContent = event.title;
   
    const Image = document.createElement('img');
    Image.src = event.img;
    Image.style.width = '100%';

    const desc = document.createElement('p');
    desc.textContent = event.desc;
    
    const loc = document.createElement('h4');
    loc.textContent = event.location;

    card.appendChild(Image);
    card.appendChild(Title);
    card.appendChild(desc);
    card.appendChild(loc);
      
    cardContainer.appendChild(card);
  });