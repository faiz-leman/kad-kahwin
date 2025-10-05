// Cache DOM elements for better performance
let countdownElements = null;
let isAutoScrolling = false;
let autoScrollInterval = null;

function initializeCountdown() {
  countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };
}

function updateCountdown() {
  // Set wedding date based on path
  let weddingDate;
  const currentPath = window.location.pathname;
  if (currentPath.includes("/syukriah-faiz")) {
    weddingDate = new Date("2025-11-22T11:00:00");
  } else {
    weddingDate = new Date("2025-11-29T11:00:00");
  }
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (countdownElements) {
      countdownElements.days.textContent = days;
      countdownElements.hours.textContent = hours;
      countdownElements.minutes.textContent = minutes;
      countdownElements.seconds.textContent = seconds;
    }
  } else {
    if (countdownElements) {
      countdownElements.days.textContent = 0;
      countdownElements.hours.textContent = 0;
      countdownElements.minutes.textContent = 0;
      countdownElements.seconds.textContent = 0;
    }
  }
}

// Auto scroll function that continuously scrolls
function startAutoScroll() {
  isAutoScrolling = true;
  let scrollPosition = 0;
  const scrollSpeed = 2; // 2 pixels per interval
  const scrollDelay = 40;

  // Start from top
  window.scrollTo(0, 0);

  // Wait a moment before starting scroll
  setTimeout(() => {
    autoScrollInterval = setInterval(() => {
      if (!isAutoScrolling) {
        clearInterval(autoScrollInterval);
        return;
      }

      scrollPosition += scrollSpeed;
      window.scrollTo(0, scrollPosition);

      // Stop when reached bottom
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (scrollPosition >= documentHeight - windowHeight) {
        clearInterval(autoScrollInterval);
        isAutoScrolling = false;
      }
    }, scrollDelay);
  }, 500); // Wait 2 seconds before starting auto scroll
}

// Stop auto scroll when user interacts
function stopAutoScroll() {
  isAutoScrolling = false;
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
  }
}

// Function to handle opening invitation
function openInvitation() {
  const overlay = document.getElementById("openerOverlay");
  const mainContent = document.getElementById("mainContent");
  const audio = document.getElementById("audio");

  if (!overlay || !mainContent) {
    console.error("Opener overlay or main content not found");
    return;
  }

  // Hide opener with animation
  overlay.classList.add("hide");

  // Show main content and start music after animation
  setTimeout(() => {
    mainContent.style.opacity = "1";

    // Initialize AOS animations
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: false,
        mirror: true,
        offset: 50,
        anchorPlacement: "top-bottom",
        delay: 0,
        debounceDelay: 50,
        throttleDelay: 99,
        disable: false,
        startEvent: "DOMContentLoaded",
      });
    }

    // Auto-play music
    if (audio) {
      try {
        audio
          .play()
          .then(() => {
            // Music started successfully
            const musicBtn = document.getElementById("musicBtn");
            const visualizer = document.getElementById("musicVisualizer");
            if (musicBtn && visualizer) {
              musicBtn.classList.add("playing");
              visualizer.classList.add("playing");
            }
          })
          .catch((e) => {
            // Auto-play failed, user needs to interact first
            console.log("Auto-play prevented by browser policy");
          });
      } catch (e) {
        console.log("Audio play error:", e);
      }
    }

    // Initialize particles
    if (typeof particlesJS !== "undefined") {
      // Your particle configuration here
    }

    // Start auto scroll after opening
    setTimeout(() => {
      startAutoScroll();
    }, 1000);
  }, 800);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Check if main content exists before trying to hide it
  const mainContent = document.getElementById("mainContent");
  if (mainContent) {
    mainContent.style.opacity = "0";
  }

  initializeCountdown();
  updateCountdown();

  // Update countdown every second
  setInterval(updateCountdown, 1000);

  // Only initialize AOS if we're not showing the opener
  const openerOverlay = document.getElementById("openerOverlay");
  if (!openerOverlay) {
    // No opener, initialize AOS immediately
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: false,
        mirror: true,
        offset: 50,
        anchorPlacement: "top-bottom",
        delay: 0,
        debounceDelay: 50,
        throttleDelay: 99,
        disable: false,
        startEvent: "DOMContentLoaded",
      });
    }
  }

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Path detection and body attribute setting
  const currentPath = window.location.pathname;
  if (currentPath.includes("/syukriah-faiz")) {
    document.body.setAttribute("data-path", "syukriah-faiz");
  } else if (currentPath.includes("/faiz-syukriah")) {
    document.body.setAttribute("data-path", "faiz-syukriah");
  }

  // Stop auto scroll on user interaction
  document.addEventListener("wheel", stopAutoScroll);
  document.addEventListener("touchstart", stopAutoScroll);
  document.addEventListener("touchmove", stopAutoScroll);
  document.addEventListener("keydown", stopAutoScroll);
  document.addEventListener("click", stopAutoScroll);
});

// Start auto scroll when everything is loaded
window.addEventListener("load", function () {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  // Only start auto scroll if there's no opener overlay
  const openerOverlay = document.getElementById("openerOverlay");
  if (!openerOverlay) {
    setTimeout(() => {
      startAutoScroll();
    }, 1000);
  }
});
