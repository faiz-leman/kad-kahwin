class MusicPlayer {
  constructor() {
    this.TITLE = "Bermuara – Mahalini & Rizky Febian";

    this.musicBtn = document.getElementById("musicBtn");
    this.musicVisualizer = document.getElementById("musicVisualizer");
    this.audioPlayer = document.getElementById("audio");
    this.playing = false;
    this.visualizerInterval = null;
    this.userInteracted = false;

    this.init();
  }

  init() {
    this.setupAudioPlayer();
    this.musicBtn.addEventListener("click", () => this.toggle());

    // Add user interaction listeners
    this.addInteractionListeners();
  }

  setupAudioPlayer() {
    if (!this.audioPlayer) {
      // console.error("Audio element not found");
      return;
    }

    // Set audio properties
    this.audioPlayer.loop = true;
    this.audioPlayer.preload = "auto";

    // Add event listeners
    this.audioPlayer.addEventListener("play", () => this.setPlaying(true));
    this.audioPlayer.addEventListener("pause", () => this.setPlaying(false));
    this.audioPlayer.addEventListener("ended", () => this.setPlaying(false));

    // Handle loading events
    this.audioPlayer.addEventListener("canplaythrough", () => {
      // console.log("Audio ready to play");
      if (this.userInteracted) {
        this.tryAutoplay();
      }
    });

    // Try autoplay immediately (will only work after user interaction)
    this.tryAutoplay();
  }

  addInteractionListeners() {
    const interactionEvents = ["click", "touchstart", "keydown", "scroll"];

    interactionEvents.forEach((event) => {
      document.addEventListener(
        event,
        () => {
          if (!this.userInteracted) {
            this.userInteracted = true;
            this.tryAutoplay();
          }
        },
        { once: true, passive: true }
      );
    });
  }

  async tryAutoplay() {
    if (!this.audioPlayer || this.playing) return;

    try {
      // Small delay to ensure audio is ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (this.audioPlayer.readyState >= 3) {
        // HAVE_FUTURE_DATA or better
        await this.audioPlayer.play();
        // console.log("Autoplay successful");
      } else {
        // If not ready, wait for it to be ready
        this.audioPlayer.addEventListener(
          "canplaythrough",
          async () => {
            try {
              await this.audioPlayer.play();
              // console.log("Delayed autoplay successful");
            } catch (error) {
              // console.log("Delayed autoplay failed:", error);
            }
          },
          { once: true }
        );
      }
    } catch (error) {
      // console.log("Autoplay failed:", error);
      // Autoplay was prevented, wait for user interaction
    }
  }

  toggle() {
    if (!this.audioPlayer) return;

    this.userInteracted = true;

    if (this.playing) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play().catch((error) => {
        // console.log("Play failed:", error);
      });
    }
  }

  setPlaying(isPlaying) {
    this.playing = isPlaying;

    if (isPlaying) {
      if (this.musicVisualizer) {
        this.musicVisualizer.classList.add("playing");
        this.startDynamicVisualizer();
      }
      this.musicBtn.setAttribute("aria-label", "Pause");
      this.musicBtn.classList.add("playing");
    } else {
      if (this.musicVisualizer) {
        this.musicVisualizer.classList.remove("playing");
        this.stopDynamicVisualizer();
      }
      this.musicBtn.setAttribute("aria-label", "Play");
      this.musicBtn.classList.remove("playing");
    }
  }

  startDynamicVisualizer() {
    const bars = this.musicVisualizer.querySelectorAll(".visualizer-bar");

    this.visualizerInterval = setInterval(() => {
      bars.forEach((bar, index) => {
        let minHeight, maxHeight, intensity;

        switch (index) {
          case 0: // Bass
            minHeight = 4;
            maxHeight = 18;
            intensity = Math.random() > 0.7 ? 0.8 : 0.3;
            break;
          case 1: // Mid-bass
            minHeight = 6;
            maxHeight = 16;
            intensity = Math.random() > 0.6 ? 0.7 : 0.4;
            break;
          case 2: // Mid
            minHeight = 5;
            maxHeight = 17;
            intensity = Math.random() > 0.5 ? 0.9 : 0.5;
            break;
          case 3: // Mid-treble
            minHeight = 4;
            maxHeight = 15;
            intensity = Math.random() > 0.4 ? 0.8 : 0.3;
            break;
          case 4: // Treble
            minHeight = 3;
            maxHeight = 14;
            intensity = Math.random() > 0.3 ? 0.9 : 0.2;
            break;
        }

        const height = minHeight + (maxHeight - minHeight) * intensity;
        bar.style.height = `${height}px`;
      });
    }, 100);
  }

  stopDynamicVisualizer() {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
    }

    const bars = this.musicVisualizer.querySelectorAll(".visualizer-bar");
    bars.forEach((bar, index) => {
      const defaultHeights = [8, 12, 6, 14, 10];
      bar.style.height = `${defaultHeights[index]}px`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MusicPlayer();
});
