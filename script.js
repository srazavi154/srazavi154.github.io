/* =========================================
   1. TYPEWRITER EFFECT
   ========================================= */
const words = ["builder", "sorcerer", "wanderer", "tinker", "seeker"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const typewriterSpan = document.getElementById("typewriter");
    
    // Safety check: only run if the element exists on this page
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
            
            // Toggle icon between bars and 'X'
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked (useful for mobile UX)
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
   3. INTERSECTION OBSERVER (Fade-in animations)
   ========================================= */
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

/* =========================================
   4. INITIALIZE ALL SCRIPTS
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Start Typewriter
    type();

    // Start Mobile Menu
    initMobileMenu();

    // Start Scroll Animations
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

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
