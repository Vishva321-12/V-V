// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

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

// Duplicate logo track for seamless scrolling
const track = document.querySelector('.logo-track');
if (track) {
  track.innerHTML += track.innerHTML;
}

//---------My Work Section Slider----------
let currentWorkIndex = 0;

function moveWorkSlide(step) {
  const slider = document.querySelector('.work-grid');
  const items = document.querySelectorAll('.work-item');
  const totalItems = items.length;

  if (!slider || totalItems === 0) return;

  currentWorkIndex += step;

  if (currentWorkIndex >= totalItems) {
    currentWorkIndex = 0;
  } else if (currentWorkIndex < 0) {
    currentWorkIndex = totalItems - 1;
  }

  const offset = -currentWorkIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

//----------Black and White Image Parallax Effect----------
const blackWhiteImg = document.querySelector('.black-whitemg img');
const imgSection = document.querySelector('.black-whitemg');

if (blackWhiteImg && imgSection) {
  window.addEventListener('scroll', () => {
    const rect = imgSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const scrollStart = windowHeight * 0.5;
    const scrollProgress = Math.max(0, Math.min(1, (scrollStart - rect.top) / (windowHeight * 1.5)));
    
    const blurAmount = scrollProgress * 25;
    const scale = 1 - (scrollProgress * 0.2);
    const opacity = 1 - scrollProgress;
    
    blackWhiteImg.style.filter = `blur(${blurAmount}px)`;
    blackWhiteImg.style.transform = `translateX(-50%) scale(${scale})`;
    blackWhiteImg.style.opacity = opacity;
  });
}

//-----------Portfolio Lookbook Slider----------
let portfolioSlideIndex = 0;

function moveSlide(step) {
  const wrapper = document.getElementById('slide');
  if (!wrapper) return;
  
  const totalSlides = wrapper.children.length;

  portfolioSlideIndex = (portfolioSlideIndex + step + totalSlides) % totalSlides;

  const movePercentage = -portfolioSlideIndex * 100;
  wrapper.style.transform = `translateX(${movePercentage}%)`;
}