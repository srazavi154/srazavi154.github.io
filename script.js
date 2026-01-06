const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const speed = 100; // Typing speed in milliseconds
    
  });

/* =========================================
   TYPEWRITER EFFECT
   ========================================= */
const words = ["professional-overthinker", "pixel-perfectionist", "whiteboard-philosopher", "complexity-simplifier"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 180; // Base typing speed

function type() {
    const typewriterSpan = document.getElementById("typewriter");
    
    // Safety check: only run if the element exists on this page
    if (!typewriterSpan) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove characters
        typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Dynamic Speed logic
    let typeSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of a full word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Word is fully erased, move to next
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

/* =========================================
   INITIALIZE SCRIPTS
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Start Typewriter
    type();

    // Smooth scrolling for any anchor links (if applicable)
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

