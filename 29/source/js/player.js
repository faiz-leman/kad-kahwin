class MusicPlayer {
  constructor() {
    this.YOUTUBE_VIDEO_ID = "GAf2DQPYvGE";
    this.TITLE = "Bermuara – Mahalini & Rizky Febian";

    this.musicBtn = document.getElementById("musicBtn");
    this.musicVisualizer = document.getElementById("musicVisualizer");
    this.playing = false;
    this.player = null;
    this.visualizerInterval = null;

    this.init();
  }

  init() {
    this.loadYouTubeAPI();
    this.musicBtn.addEventListener("click", () => this.toggle());
  }

  loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("youtube-player", {
        height: "1",
        width: "1",
        videoId: this.YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: this.YOUTUBE_VIDEO_ID,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => this.onPlayerReady(event),
          onStateChange: (event) => this.onPlayerStateChange(event),
        },
      });
    };
  }

  onPlayerReady(event) {
    console.log("YouTube player ready");
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      this.setPlaying(true);
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      this.setPlaying(false);
    }
  }

  toggle() {
    if (!this.player) return;

    if (this.playing) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
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
    }, 100); // Update every 100ms for smooth animation
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
