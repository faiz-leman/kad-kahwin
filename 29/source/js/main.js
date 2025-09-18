document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open-btn");
  const envelopeContainer = document.getElementById("envelope-container");
  const mainContent = document.getElementById("main-content");
  const envelope = document.querySelector(".envelope");

  openBtn.addEventListener("click", function () {
    // Add opening animation to envelope
    envelope.classList.add("opening");

    // After flap animation, fade out envelope and show main content
    setTimeout(() => {
      envelopeContainer.classList.add("fade-out");

      setTimeout(() => {
        envelopeContainer.style.display = "none";
        mainContent.style.display = "block";

        // Auto scroll to top and initialize AOS
        window.scrollTo(0, 0);

        // Initialize AOS if it exists
        if (typeof AOS !== "undefined") {
          AOS.init();
        }

        // Start particles if they exist
        if (typeof particlesJS !== "undefined") {
          // Initialize particles
          particlesJS("particles-js", {
            particles: {
              number: {
                value: 189,
                density: { enable: true, value_area: 800 },
              },
              color: { value: "#ffffff" },
              shape: {
                type: "star",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 },
              },
              opacity: {
                value: 0.2,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
              },
              size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
              },
              line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "bottom-left",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 600 },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: false, mode: "bubble" },
                onclick: { enable: false, mode: "repulse" },
                resize: true,
              },
              modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: {
                  distance: 250,
                  size: 0,
                  duration: 2,
                  opacity: 0,
                  speed: 3,
                },
                repulse: { distance: 400, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          });
        }

        // Auto-play music if available
        const audio = document.getElementById("audio");
        if (audio) {
          audio.play().catch((e) => console.log("Audio autoplay prevented"));
        }
      }, 800);
    }, 800);
  });
});

function updateCountdown() {
  const weddingDate = new Date("2025-11-29T11:00:00");
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  } else {
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown immediately
updateCountdown();
