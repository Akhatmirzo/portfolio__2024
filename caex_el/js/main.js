// Etaj elemnt
const etajList = document.querySelectorAll('.map_complex-control-list-item');
const complex_mapImage = ["./images/map_complex-image.png", "./images/map_complex-image.png", "./images/photo__complex_swiper-image.jpg"]

// Image zoom element
const imageZoomEl = document.querySelectorAll('.map_complex-images');

// Plus, minus zoom image
const plusZoom = document.querySelector('.plusZoom');
const minusZoom = document.querySelector('.minusZoom');

// // fullscreen-btn element
const fullscreenButton = document.querySelector('.fullscreen-btn');
const closefullscreenBtn = document.querySelector('.close-fullscreen');
const fullscreenWrapper = document.querySelector('.map_complex-image-fullscreen');

// Image
const image = document.querySelectorAll('.map_complex-images img');

//* Swiper 
const swiper = new Swiper(".photo_complex-Swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".prev-btn",
  },
});

// *End of Swiper


//* Image zoom

let x, y, width, height;
imageZoomEl.forEach(elem => {
  elem.onmouseenter = () => {
    const size = elem.getBoundingClientRect();

    x = size.x;
    y = size.y;
    width = size.width;
    height = size.height;
  };

  elem.onmousemove = (e) => {
    const horizoltal = (e.clientX - x) / width * 100;
    const vertical = (e.clientY - y) / height * 100;

    elem.style.setProperty('--x', horizoltal + '%');
    elem.style.setProperty('--y', vertical + '%');
  }
});

// * Image zoom End of

//! click zoom image

let zoomCount = 1;

plusZoom.addEventListener('click', () => {
  if (zoomCount < 10) {
    zoomCount++;
    image.forEach(elem => {
      elem.style.transform = `scale(${zoomCount})`;
    });
  }
})

minusZoom.addEventListener('click', () => {
  if (zoomCount > 1) {
    zoomCount--;
    image.forEach(elem => {
      elem.style.transform = `scale(${zoomCount})`;
    });
  }
})

// ***************************

etajList.forEach((elem, index) => {
  elem.addEventListener('click', () => {

    // scrool behavior for complex map images
    imageZoomEl.forEach(elem => {
      elem.scrollIntoView({ behavior: "smooth" });
    });

    image.forEach(elem => {
      // Image replace
      elem.src = complex_mapImage[index];

      //? zoom cliking 
      // zoomCount = 1;
      // elem.style.transform = `scale(${zoomCount})`;
    })

    // Remove active class
    etajList.forEach(elem => {
      elem.classList.remove('map_complex-active');
    })

    // Add active class click etajList
    elem.classList.add('map_complex-active');
  });
})

// Fullscreen
fullscreenButton.addEventListener('click', () => {
  imageZoomEl.forEach(elem => {
    elem.scrollIntoView({ behavior: "smooth" });
  });

  fullscreenWrapper.classList.add('fullscreen-active');
});

closefullscreenBtn.addEventListener('click', () => {
  fullscreenWrapper.classList.remove('fullscreen-active');
});
