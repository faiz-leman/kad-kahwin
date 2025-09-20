$(document).ready(function () {
  // Get eventId from the script tag's src parameter or use default
  const eventId = getEventIdFromScript() || 29; // Default to 29 if not found
  loadWishes(eventId);

  // Refresh every 30 seconds
  setInterval(() => loadWishes(eventId), 30000);
});

function getEventIdFromScript() {
  // Find the script tag that loaded this file
  const scripts = document.getElementsByTagName("script");
  for (let script of scripts) {
    if (script.src && script.src.includes("ajax.js")) {
      const url = new URL(script.src);
      return url.searchParams.get("eventId");
    }
  }
  return null;
}

function loadWishes(eventId) {
  $.ajax({
    url: `../controller/getwish.php?eid=${eventId}`,
    method: "GET",
    dataType: "json",
    success: function (wishes) {
      const wishContainer = $("#guestbook-container ul");

      if (wishes.length > 0) {
        wishContainer.empty();

        $.each(wishes, function (index, wish) {
          const wishHtml = `
                        <li class="mb-3">
                            <span class="text-light fst-italic">"${escapeHtml(
                              wish.guestWish
                            )}"</span><br>
                            <strong class="text-primary">${escapeHtml(
                              wish.guestName
                            )}</strong>
                        </li>
                    `;
          wishContainer.append(wishHtml);
        });
      } else {
        // Generate random wishes if none exist
        const randomWishes = [
          { guestName: "Ali", guestWish: "Selamat pengantin baru!" },
          { guestName: "Siti", guestWish: "Semoga bahagia hingga ke Jannah." },
          {
            guestName: "Ahmad",
            guestWish: "Tahniah dan selamat menempuh hidup baru!",
          },
          { guestName: "Nurul", guestWish: "Moga kekal bahagia selamanya." },
          {
            guestName: "Zainab",
            guestWish: "Barakallah, semoga dipermudahkan segalanya.",
          },
        ];
        const randomWish =
          randomWishes[Math.floor(Math.random() * randomWishes.length)];
        wishContainer.html(
          `<li class="mb-3">
              <span class="text-light fst-italic">"${escapeHtml(
                randomWish.guestWish
              )}"</span><br>
              <strong class="text-primary">${escapeHtml(
                randomWish.guestName
              )}</strong>
          </li>`
        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching wishes:", error);
      $("#guestbook-container ul").html(
        '<li class="mb-3"><span class="text-light">Gagal memuatkan ucapan.</span></li>'
      );
    },
  });
}

function escapeHtml(text) {
  return $("<div>").text(text).html();
}

// Modal handling for RSVP
