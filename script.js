/* =========================================
   1. TYPEWRITER EFFECT
   ========================================= */
const words = ["builder", "sorcerer", "wanderer", "tinker", "seeker"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const typewriterSpan = document.getElementById("typewriter");
    if (!typewriterSpan) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

/* =========================================
   2. MOBILE NAVIGATION (HAMBURGER)
   ========================================= */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }
}

/* =========================================
   3. SCROLL ANIMATIONS (Intersection Observer)
   ========================================= */
function initAnimations() {
    const observerOptions = { threshold: 0.15 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // This targets .status-item (Home), .resume-btn (Home), 
    // and .animate-on-scroll (About/Projects)
    const elementsToAnimate = document.querySelectorAll('.status-item, .resume-btn, .animate-on-scroll, section');
    
    elementsToAnimate.forEach((el) => {
        observer.observe(el);
    });
}

/* =========================================
   4. INITIALIZE ALL SCRIPTS
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    type();
    initMobileMenu();
    initAnimations();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

/* =========================================
   5. PROJECT CAROUSEL LOGIC
   ========================================= */
function initCarousel() {
    const slider = document.getElementById('projectSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const cards = document.querySelectorAll('.netflix-card');

    if (slider && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 400, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }

    cards.forEach(card => {
        const video = card.querySelector('video');
        
        // Video Play/Pause on hover
        card.addEventListener('mouseenter', () => video.play());
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Click to navigate
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) window.location.href = link;
        });
    });
}

// Update your existing document listener:
document.addEventListener("DOMContentLoaded", () => {
    type();
    initMobileMenu();
    initAnimations();
    initCarousel(); // Add this line here
});
