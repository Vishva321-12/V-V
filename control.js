// Global Indexes
let currentWorkIndex = 0;
let portfolioSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let portTouchStartX = 0;
let portTouchEndX = 0;

// 1. DOM Content Loaded (Merged into one)
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize dots for both sliders
    createDots();          // For Screening Room
    createPortfolioDots(); // For My Story

    // Initial position fix
    updateSliderPosition();
    updatePortfolioPosition();
});

//-----------Portfolio (My Story) Slider Logic----------
function createPortfolioDots() {
    const dotsContainer = document.getElementById('portfolioDots');
    const slides = document.querySelectorAll('#slide > div');

    if (!dotsContainer || slides.length === 0) return;
    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('p-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            portfolioSlideIndex = index;
            updatePortfolioPosition();
        });
        dotsContainer.appendChild(dot);
    });
}

function moveSlide(step) {
    const wrapper = document.getElementById('slide');
    if (!wrapper) return;
    const totalSlides = wrapper.children.length;

    portfolioSlideIndex = (portfolioSlideIndex + step + totalSlides) % totalSlides;
    updatePortfolioPosition(); // This updates the dots AND moves the slide
}

function updatePortfolioPosition() {
    const wrapper = document.getElementById('slide');
    const dots = document.querySelectorAll('.p-dot');
    if (!wrapper) return;

    const movePercentage = -portfolioSlideIndex * 100;
    wrapper.style.transform = `translateX(${movePercentage}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === portfolioSlideIndex);
    });
}

//---------My Work (The Screening Room) Slider----------
function createDots() {
    const itemsdot = document.querySelectorAll('.work-item');
    const dotsContainer = document.getElementById('paginationDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";

    itemsdot.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentWorkIndex = index;
            updateSliderPosition();
        });
        dotsContainer.appendChild(dot);
    });
}

function moveWorkSlide(step) {
    const items = document.querySelectorAll('.work-item');
    const totalItems = items.length;
    if (totalItems === 0) return;

    currentWorkIndex += step;
    if (currentWorkIndex >= totalItems) {
        currentWorkIndex = 0;
    } else if (currentWorkIndex < 0) {
        currentWorkIndex = totalItems - 1;
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.querySelector('.work-grid');
    const dots = document.querySelectorAll('.dot');
    if (!slider) return;

    const offset = -currentWorkIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentWorkIndex);
    });
}

// --- MOBILE SWIPE (Work Slider) ---
const sliderContainer = document.querySelector('.work-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
}

function handleGesture() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) moveWorkSlide(1);
    if (touchEndX - touchStartX > threshold) moveWorkSlide(-1);
}

// --- MOBILE SWIPE (Portfolio/Lookbook Slider) ---
const portfolioContainer = document.querySelector('.lookbookslider');

if (portfolioContainer) {
    portfolioContainer.addEventListener('touchstart', e => {
        portTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    portfolioContainer.addEventListener('touchend', e => {
        portTouchEndX = e.changedTouches[0].screenX;
        handlePortfolioGesture();
    }, { passive: true });
}

function handlePortfolioGesture() {
    const threshold = 50;
    if (portTouchStartX - portTouchEndX > threshold) {
        moveSlide(1); // Swipe Left -> Next
    }
    if (portTouchEndX - portTouchStartX > threshold) {
        moveSlide(-1); // Swipe Right -> Prev
    }
}

//----------Parallax & Image Fade-in----------
const photos = document.querySelectorAll('.photo');
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });
photos.forEach(photo => photoObserver.observe(photo));

const blackWhiteImg = document.querySelector('.black-whitemg img');
const imgSection = document.querySelector('.black-whitemg');
if (blackWhiteImg && imgSection) {
    window.addEventListener('scroll', () => {
        const rect = imgSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollStart = windowHeight * 0.5;
        const scrollProgress = Math.max(0, Math.min(1, (scrollStart - rect.top) / (windowHeight * 1.5)));
        blackWhiteImg.style.filter = `blur(${scrollProgress * 25}px)`;
        blackWhiteImg.style.transform = `translateX(-50%) scale(${1 - (scrollProgress * 0.2)})`;
        blackWhiteImg.style.opacity = 1 - scrollProgress;
    });
}

//Duplicate the logos to create the seamless "circle"-----------
const logoTrack = document.getElementById('logo-track');
if (logoTrack) {
    const logos = Array.from(logoTrack.children);
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        logoTrack.appendChild(clone);
    });
}

// Scroll animation trigger
function handleScrollAnimation() {
    const contactSection = document.querySelector('.contact-section');
    const heading = document.querySelector('.contact-section h2');
    const intro = document.querySelector('.contact-intro');
    const contactItems = document.querySelectorAll('.contact-item');
    const thankYou = document.querySelector('.thank-you');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heading.classList.add('animate');
                intro.classList.add('animate');
                contactItems.forEach(item => {
                    item.classList.add('animate');
                });
                thankYou.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(contactSection);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', handleScrollAnimation);