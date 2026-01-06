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

const words = ["creator", "problem solver", "innovator", "designer", "engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterSpan = document.getElementById("typewriter");

function type() {
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

  // Speed logic
  let typeSpeed = isDeleting ? 100 : 200;

  if (!isDeleting && charIndex === currentWord.length) {
    // Pause at the end of a word
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Start the effect when the page loads
document.addEventListener("DOMContentLoaded", type);
  
