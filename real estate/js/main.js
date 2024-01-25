const navbarList = document.querySelector('.navbar__list');
const menuBars = document.getElementById('menu_bars');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const logo = document.querySelector('.logo__dark img')

//todo Contact form group selectors
const visitorsForm = document.getElementById('visitors__form');
const participantsForm = document.getElementById('participants__form');
const partnersForm = document.getElementById('partners__form');
// BTn
const visitorBtn = document.getElementById('visitorBtn');
const participantsBtn = document.getElementById('participantsBtn');
const partnersBtn = document.getElementById('partnersBtn');
// All btn
const allBtn = document.querySelectorAll('.contact__form-group-btn button');

//observerBtn
const observerBtn = document.querySelector('.observerBtn');

// bus_stop_point__list
const busStopPointList = document.querySelector('.bus_stop_point__list ul');

hamburgerBtn.addEventListener('click', () => {
    navbarList.classList.toggle('navbar__active');

    if (navbarList.classList.contains('navbar__active')) {
        logo.src = "./assets/images/caex__logo-light.svg";
        hamburgerBtn.innerHTML = `
            <i id="menu_bars" class="fa-solid fa-xmark"></i>
        `
    } else {
        logo.src = "../assets/images/caex__logo-dark.svg";
        hamburgerBtn.innerHTML = `
            <i id="menu_bars" class="fa-solid fa-bars"></i>
        `
    }
});

// Contact form element replace
visitorBtn.addEventListener("click", function () {
    allBtn.forEach(btn => {
        btn.classList.remove('form-group-active')
    })
    visitorBtn.classList.add('form-group-active')

    participantsForm.style.display = "none";
    partnersForm.style.display = "none";
    visitorsForm.style.display = "block";
});

participantsBtn.addEventListener("click", function () {
    allBtn.forEach(btn => {
        btn.classList.remove('form-group-active')
    })
    participantsBtn.classList.add('form-group-active')

    participantsForm.style.display = "block";
    partnersForm.style.display = "none";
    visitorsForm.style.display = "none";
});

partnersBtn.addEventListener("click", function () {
    allBtn.forEach(btn => {
        btn.classList.remove('form-group-active')
    })
    partnersBtn.classList.add('form-group-active')

    participantsForm.style.display = "none";
    partnersForm.style.display = "block";
    visitorsForm.style.display = "none";
});

// observer replace text content
const observerRegister = document.querySelector('.observer__register');
const observerparticipant = document.querySelector('.observer__participants');
const observerUseful = document.querySelector('.observer__useful');

const textContent = [observerRegister, observerparticipant, observerUseful];
for (let i = 0; i < observerBtn.children.length; i++) {
    observerBtn.children[i].addEventListener("click", function () {
        for (const btn of observerBtn.children) {
            btn.classList.remove('observerBtnActive');
            btn.children[0].style.display = 'none';
        }

        for (const text of textContent) {
            text.style.display = 'none';
        }

        textContent[i].style.display = 'block';

        observerBtn.children[i].classList.add('observerBtnActive');
        observerBtn.children[i].children[0].style.display = "block";
    });
}

// bus_stop_point__list
console.dir(busStopPointList);
for (const pointlist of busStopPointList.children) {
    pointlist.addEventListener("click", function () {
        for (const list of busStopPointList.children) {
            list.classList.remove('bus_stop_list-active');
        }

        pointlist.classList.add("bus_stop_list-active");
    })
}