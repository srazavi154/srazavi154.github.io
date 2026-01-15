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
        typeSpeed = 2000; 
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
                if (icon) icon.classList.replace('fa-bars', 'fa-times');
            } else {
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }
}

/* =========================================
   3. SCROLL ANIMATIONS
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

    const elementsToAnimate = document.querySelectorAll('.status-item, .resume-btn, .animate-on-scroll, section, .projects-hero');
    elementsToAnimate.forEach((el) => observer.observe(el));
}

/* =========================================
   4. PROJECT CAROUSEL & CARD LOGIC
   ========================================= */
function initCarousel() {
    const slider = document.getElementById('projectSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const cards = document.querySelectorAll('.card');

    // Arrow Navigation
    if (slider && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
             const scrollAmount = slider.clientWidth * 0.75;
             slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
         });
         
        prevBtn.addEventListener('click', () => {
             const scrollAmount = slider.clientWidth * 0.75;
             slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
         });
    }

    // Card Behaviors
    cards.forEach(card => {
        const video = card.querySelector('video');

        // Video Play/Pause (Desktop Hover)
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => {});
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }

        // MOBILE TOUCH BEHAVIOR
        card.addEventListener('click', function(e) {
            // If user clicked a button (PDF/Video), let it happen
            if (e.target.closest('.circle-btn')) return;

            if (window.innerWidth <= 1024) {
                // If not active yet, show overlay first
                if (!this.classList.contains('active')) {
                    e.preventDefault();
                    cards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Optional: Play video on touch
                    if(video) video.play().catch(e => {});
                } 
                // If already active, the second tap follows the data-link (if any)
            } else {
                // Desktop Link handling
                const link = card.getAttribute('data-link');
                if (link) window.location.href = link;
            }
        });
    });

    // Close overlays when tapping outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.card')) {
            cards.forEach(card => card.classList.remove('active'));
        }
    });
}

/* =========================================
   5. INITIALIZE ALL SCRIPTS
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    type();
    initMobileMenu();
    initAnimations();
    initCarousel();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
