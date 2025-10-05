$(document).ready(function () {
  // Get eventId from the script tag's src parameter or use default
  const eventId = getEventIdFromScript(); // Default to 29 if not found
  loadWishes(eventId);

  // Refresh every 30 seconds
  setInterval(() => loadWishes(eventId), 30000);

  // Use event delegation for dynamically created forms
  $(document).on("submit", "#rsvpForm", function (e) {
    e.preventDefault();

    $("#submitButton").prop("disabled", true);
    $("#submitButtonText").addClass("d-none");
    $("#submitSpinner").removeClass("d-none");
    $("#rsvpNote").html("").removeClass("d-none");

    var formData = $(this).serialize();
    // Add eventId to form data
    formData += "&eventId=" + (getEventIdFromScript() || "faiz-syukriah");

    var spinnerMinTime = 1000;
    var startTime = Date.now();

    $.ajax({
      url: "/kad-kahwin/controller/submit.php",
      type: "POST",
      data: formData,
      dataType: "json",
      success: function (response) {
        var elapsed = Date.now() - startTime;
        var remaining = spinnerMinTime - elapsed;
        if (remaining < 0) remaining = 0;

        setTimeout(function () {
          $("#submitButton").prop("disabled", false);
          $("#submitButtonText").removeClass("d-none");
          $("#submitSpinner").addClass("d-none");

          if (response.success) {
            $("#rsvpNote").html(
              '<div class="alert alert-success mt-3" role="alert">' +
                response.message +
                "</div>"
            );

            loadWishes(
              response.eventId || getEventIdFromScript() || "faiz-syukriah"
            );

            // Clear form after successful submission
            $("#rsvpForm")[0].reset();
          } else {
            $("#rsvpNote").html(
              '<div class="alert alert-danger mt-3" role="alert">' +
                response.message +
                "</div>"
            );
          }
        }, remaining);
      },
      error: function (xhr, status, error) {
        var elapsed = Date.now() - startTime;
        var remaining = spinnerMinTime - elapsed;
        if (remaining < 0) remaining = 0;

        setTimeout(function () {
          $("#rsvpNote").html(
            '<div class="alert alert-danger mt-3" role="alert">' +
              "Ralat berlaku. Sila cuba lagi." +
              "</div>"
          );
          $("#submitButton").prop("disabled", false);
          $("#submitButtonText").removeClass("d-none");
          $("#submitSpinner").addClass("d-none");
        }, remaining);
      },
    });
  });
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
    // Try absolute path instead of relative path
    url: "/inv/controller/getwish.php?eid=" + eventId,
    method: "GET",
    dataType: "json",
    success: function (wishes) {
      const wishContainer = $("#guestbook-container ul");

      if (wishes.length > 0) {
        wishContainer.empty();

        $.each(wishes, function (index, wish) {
          // Detect current path
          const currentPath = window.location.pathname;
          const isPath29 = currentPath.includes("/faiz-syukriah");

          // Update wishHtml with conditional classes
          const wishHtml = `
                    <li class="mb-3">
                        <span class="${
                          isPath29 ? "text-contra-brown" : "text-contra-brown"
                        } fst-italic">"${escapeHtml(wish.guestWish)}"</span><br>
                        <strong class="${
                          isPath29 ? "text-primary" : "text-brown"
                        }">${escapeHtml(wish.guestName)}</strong>
                    </li>
                `;
          wishContainer.append(wishHtml);
        });
      } else {
        // Generate random wishes if none exist
        const randomWishes = [
          { guestName: "Ali", guestWish: "Selamat pengantin baru!" },
          {
            guestName: "Siti",
            guestWish: "Semoga bahagia hingga ke Jannah.",
          },
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
            <div class="${
              isPath29 ? "text-contra-brown" : "text-contra-brown"
            } fst-italic">"${escapeHtml(randomWish.guestWish)}"</div><br>
            <strong class="text-primary">${escapeHtml(
              randomWish.guestName
            )}</strong>
        </li>`
        );
      }
    },
    error: function (xhr, status, error) {
      const errorWishes = [
        { guestName: "Zaid Jalil", guestWish: "Selamat pengantin baru!" },
        {
          guestName: "Ahmad Latif",
          guestWish: "Semoga bahagia hingga ke Jannah.",
        },
        {
          guestName: "Farah Nabihah",
          guestWish: "Tahniah dan selamat menempuh hidup baru!",
        },
        {
          guestName: "Nurul Jasmin",
          guestWish: "Moga kekal bahagia selamanya.",
        },
        {
          guestName: "Zikri Himratul",
          guestWish: "Barakallah, semoga dipermudahkan segalanya.",
        },
      ];
      const randomWish =
        errorWishes[Math.floor(Math.random() * errorWishes.length)];
      const wishContainer = $("#guestbook-container ul");
      const currentPath = window.location.pathname;
      const isPath29 = currentPath.includes("/faiz-syukriah");
      wishContainer.html(
        `<li class="mb-3">
          <div class="${
            isPath29 ? "text-contra-brown" : "text-contra-brown"
          } fst-italic">"${escapeHtml(randomWish.guestWish)}"</div><br>
          <strong class="text-primary">${escapeHtml(
            randomWish.guestName
          )}</strong>
      </li>`
      );
    },
  });
}

function escapeHtml(text) {
  return $("<div>").text(text).html();
}
