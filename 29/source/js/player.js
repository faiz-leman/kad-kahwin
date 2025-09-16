var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
if (
  (firstScriptTag.parentNode.insertBefore(tag, firstScriptTag),
  $("#videoId").val())
) {
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
      height: "390",
      width: "640",
      videoId: $("#videoId").val(),
      playerVars: {
        playsinline: 1,
      },
      playerVars: {
        loop: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }
  function onPlayerReady(e) {
    player.loadVideoById({
      videoId: $("#videoId").val(),
      startSeconds: $("#videoStart").val(),
      endSeconds: $("#videoEnd").val(),
    });
  }
  $("#start-btn").click(function () {
    $(".music-title").text(player.videoTitle), playMusic();
  });
}
function playMusic() {
  player.playVideo();
}
function pauseMusic() {
  player.pauseVideo();
}
$("#music-btn").length &&
  $("#music-btn").click(function () {
    if ($("#videoId").val())
      1 != player.getPlayerState()
        ? (playMusic(), $(".music-player").removeClass("paused"))
        : (pauseMusic(), $(".music-player").addClass("paused"));
    else {
      const e = $("#audio").get(0);
      e.paused
        ? (e.play(), $(".music-player").removeClass("paused"))
        : (e.pause(), $(".music-player").addClass("paused"));
    }
  }),
  document.addEventListener("visibilitychange", () => {
    if (!$(".main-div.hidden").length)
      if ($("#videoId").val())
        pauseMusic(), $(".music-player").addClass("paused");
      else {
        $("#audio").get(0).pause(), $(".music-player").addClass("paused");
      }
  });
