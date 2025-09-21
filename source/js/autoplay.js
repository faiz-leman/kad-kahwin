document.addEventListener("DOMContentLoaded", function () {
  let hasUserInteracted = false;
  let autoScrollInterval;
  let isScrolling = false;

  // Track user interaction for mobile browsers
  function enableUserInteraction() {
    hasUserInteracted = true;
    document.removeEventListener("touchstart", enableUserInteraction);
    document.removeEventListener("click", enableUserInteraction);
  }

  // Add interaction listeners
  document.addEventListener("touchstart", enableUserInteraction, {
    once: true,
  });
  document.addEventListener("click", enableUserInteraction, { once: true });

  // Auto-play music function
  function autoPlayMusic() {
    const audio = document.getElementById("audio");
    const musicBtn = document.getElementById("musicBtn");

    if (audio && musicBtn) {
      // Set audio properties for better mobile support
      audio.muted = false;
      audio.volume = 0.7;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Music started playing automatically");
            // Update music button state if it exists
            if (typeof updateMusicButton === "function") {
              updateMusicButton(true);
            }
          })
          .catch((error) => {
            console.log("Auto-play was prevented:", error);
            // Fallback: play on first user interaction
            document.addEventListener(
              "click",
              function playOnInteraction() {
                audio
                  .play()
                  .then(() => {
                    if (typeof updateMusicButton === "function") {
                      updateMusicButton(true);
                    }
                  })
                  .catch((e) => console.log("Manual play failed:", e));
                document.removeEventListener("click", playOnInteraction);
              },
              { once: true }
            );
          });
      }
    }
  }

  // Auto-scroll function
  function startAutoScroll() {
    if (isScrolling) return;

    isScrolling = true;
    const scrollSpeed = 30; // pixels per second
    const scrollStep = 1; // pixels per step
    const stepDelay = 1000 / scrollSpeed; // milliseconds between steps

    function smoothScroll() {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (currentScroll < maxScroll) {
        window.scrollBy(0, scrollStep);
        autoScrollInterval = setTimeout(smoothScroll, stepDelay);
      } else {
        // Reached bottom, pause for 3 seconds then scroll back to top
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          // Restart auto-scroll after reaching top
          setTimeout(() => {
            isScrolling = false;
            startAutoScroll();
          }, 2000);
        }, 3000);
      }
    }

    // Start scrolling after 2 seconds
    setTimeout(smoothScroll, 2000);
  }

  // Stop auto-scroll on user interaction
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearTimeout(autoScrollInterval);
      autoScrollInterval = null;
    }
    isScrolling = false;
  }

  // User interaction events that should stop auto-scroll
  const interactionEvents = [
    "wheel",
    "touchstart",
    "touchmove",
    "keydown",
    "mousedown",
  ];

  function handleUserInteraction() {
    stopAutoScroll();
    // Remove listeners after first interaction
    interactionEvents.forEach((event) => {
      document.removeEventListener(event, handleUserInteraction);
    });
  }

  // Add interaction listeners
  interactionEvents.forEach((event) => {
    document.addEventListener(event, handleUserInteraction, { passive: true });
  });

  // Initialize auto-play and auto-scroll
  function initialize() {
    // Wait for all content to load
    if (document.readyState === "complete") {
      setTimeout(() => {
        autoPlayMusic();
        startAutoScroll();
      }, 1000);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          autoPlayMusic();
          startAutoScroll();
        }, 1000);
      });
    }
  }

  // Start initialization
  initialize();

  // Expose functions globally if needed
  window.stopAutoScroll = stopAutoScroll;
  window.startAutoScroll = startAutoScroll;
});
