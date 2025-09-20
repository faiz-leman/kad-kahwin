// Cache DOM elements for better performance
let countdownElements = null;

function initializeCountdown() {
  countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };
}

function updateCountdown() {
  const weddingDate = new Date("2025-11-29T11:00:00");
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

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeCountdown();
  updateCountdown();

  // Update countdown every second
  setInterval(updateCountdown, 1000);

  // Initialize AOS if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
});
