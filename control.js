// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Image fade-in on scroll
const photos = document.querySelectorAll('.photo');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

photos.forEach(photo => observer.observe(photo));


const track = document.querySelector('.logo-track');
track.innerHTML += track.innerHTML;

//---------My Work Section----------

let currentIndex = 0;

function moveSlide(step){
const slider = document.querySelector('.work-grid');
const item = document.querySelectorAll('.work-item');
const totalItems = item.length;

currentIndex += step;

if (currentIndex >= totalItems){
    currentIndex = 0;
}else if (currentIndex < 0){
    currentIndex = totalItems -1;
}
const offset = -currentIndex * 100;
slider.style.transform = `translateX(${offset}%)`;
}


