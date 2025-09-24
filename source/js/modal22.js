// Modal functionality
function openModal(type) {
  const modal = document.getElementById("dynamicModal");
  const modalTitle = document.getElementById("dynamicModalLabel");
  const modalContent = document.getElementById("dynamicModalContent");

  let title = "";
  let content = "";

  switch (type) {
    case "contact":
      title = "HUBUNGI";
      content = `
                <div class="contact-info">
                    <div class="d-flex justify-content-between align-items-center mb-1 py-2">
                        <div class="d-flex flex-column">
                            <span class="text-start">Noor Hasyimah</span>
                        </div>
                        <div class="d-flex gap-2">
                            <a href="tel:+601123164027" class="text-primary">
                                <i class="bx bx-md bx-phone"></i>
                            </a>
                            <a href="https://wa.me/601123164027" target="_blank" class="text-primary">
                                <i class="bx bx-md bxl-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-1 py-2">
                        <div class="d-flex flex-column">
                            <span class="text-start">Nur Fatini</span>
                        </div>
                        <div class="d-flex gap-2">
                            <a href="tel:+601123164027" class="text-primary">
                                <i class="bx bx-md bx-phone"></i>
                            </a>
                            <a href="https://wa.me/601123164027" target="_blank" class="text-primary">
                                <i class="bx bx-md bxl-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-1 py-2">
                        <div class="d-flex flex-column">
                            <span class="text-start">Muhammad Azamuddin</span>
                        </div>
                        <div class="d-flex gap-2">
                            <a href="tel:+601123164027" class="text-primary">
                                <i class="bx bx-md bx-phone"></i>
                            </a>
                            <a href="https://wa.me/601123164027" target="_blank" class="text-primary">
                                <i class="bx bx-md bxl-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "rsvp":
      title = "RSVP & UCAPAN";
      content = `
                <div class="rsvp-initial">
                    <div class="row g-2 mb-4">
                        <div class="col-6">
                            <button class="btn btn-success w-100 rsvp-choice-btn" data-choice="hadir">
                                <i class="bx bx-check"></i>
                                Hadir
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-outline-secondary w-100 rsvp-choice-btn" data-choice="tidak-hadir">
                                <i class="bx bx-x"></i>
                                Tidak Hadir
                            </button>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "wish":
      title = "UCAPAN";
      content = `<form id="rsvpForm" method="post">
      <input type="hidden" id="rsvpChoice" name="rsvpChoice" value="n">
      <div id="rsvpForm" class="rsvp-form">
        <div class="mb-3">
          <label for="guestName" class="form-label text-start d-block">Nama</label>
          <input type="text" class="form-control" name="guestName" id="guestName" required>
        </div>
        <div class="mb-3">
          <label for="guestMessage" class="form-label text-start d-block">Ucapan</label>
          <textarea class="form-control" name="guestWish" id="guestMessage" rows="3" required></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <button type="submit" id="submitButton" class="btn btn-success w-100">
              <span id="submitSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                <span id="submitButtonText">Hantar</span>
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-outline-secondary w-100" onclick="backToRSVPChoice()">
              Batal
            </button>
          </div>
        </div>
      </div>
      <div id="rsvpNote" class="d-none"></div>
    </form>`;
      break;

    case "location":
      title = "LOKASI MAJLIS";
      content = `
                <div class="location-info">
                    <h6>Dewan Dataran Dato' Mohd Said</h6>
                    <p class="mb-3">
                        Lot 897, Dataran Dato Mohd Said KM23.5, Jalan KL-Seremban, Jalan Rinching Tengah, 43700
Beranang, Selangor
                    </p>
                    <div class="row g-2">
                        <div class="col-6">
                            <a href="https://maps.app.goo.gl/95c7GSbEGpRrFebA6?g_st=ipc" target="_blank" class="btn btn-outline-secondary w-100">
                                <i class="bx bx-navigation"></i> Google Maps
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="https://waze.com/ul/hw282tfyzv" target="_blank" class="btn btn-outline-secondary  w-100">
                                <i class="bx bx-navigation"></i> Waze
                            </a>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "calendar":
      title = "SIMPAN TARIKH";
      content = `
                <div class="calendar-info">
                    <div class="mb-3">
                        <h6>Walimaturus Syukriah & Faiz</h6>
                        <p>Sabtu, 22 November 2025</p>
                        <p>11:00 AM - 4:00 PM</p>
                    </div>
                      <div class="col-12">
                          <button class="btn btn-outline-secondary w-100" onclick="addToGoogleCalendar()">
                              <i class="bx bx-calendar-plus"></i> Google Calendar
                          </button>
                      </div>
                      <div class="col-12 mt-2">
                          <button class="btn btn-outline-secondary w-100" onclick="addToAppleCalendar()">
                              <i class="bx bx-calendar-event"></i> Apple Calendar
                          </button>
                      </div>
                </div>
            `;
      break;
  }

  modalTitle.textContent = title;
  modalContent.innerHTML = content;

  // Initialize Bootstrap modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  // Add event listeners for RSVP choice buttons
  if (type === "rsvp") {
    const rsvpChoiceButtons = modal.querySelectorAll(".rsvp-choice-btn");
    rsvpChoiceButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const choice = this.getAttribute("data-choice");
        showRSVPForm(choice);
      });
    });
  }
}

function showRSVPForm(choice) {
  const modalContent = document.getElementById("dynamicModalContent");
  let formContent = "";

  if (choice === "hadir") {
    // Attendance confirmation form
    formContent = `
    <form id="rsvpForm" method="post">
      <input type="hidden" id="rsvpChoice" name="rsvpChoice" value="y">
      <div id="rsvpForm" class="rsvp-form">
        <div class="mb-3">
          <label for="guestName" class="form-label text-start d-block">Nama</label>
          <input type="text" class="form-control" name="guestName" id="guestName" required>
        </div>
        <div class="mb-3">
          <label for="attendeeCount" class="form-label text-start d-block">Jumlah Kehadiran</label>
          <select class="form-control" name="attendeesPax" id="attendeeCount" required>
            <option value="">-- Pilih Pax --</option>
            <option value="1">1 orang</option>
            <option value="2">2 orang</option>
            <option value="3">3 orang</option>
            <option value="4">4 orang</option>
            <option value="5">5 orang</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="guestMessage" class="form-label text-start d-block">Ucapan</label>
          <textarea class="form-control" name="guestWish" id="guestMessage" rows="3"></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <button type="submit" id="submitButton" class="btn btn-success w-100">
              <span id="submitSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                <span id="submitButtonText">Hantar</span>
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-outline-secondary w-100" onclick="backToRSVPChoice()">
              Batal
            </button>
          </div>
        </div>
      </div>
      <div id="rsvpNote" class="d-none"></div>
    </form>
    `;
  } else {
    // Just wish form for tidak hadir
    formContent = `
    <form id="rsvpForm" method="post">
      <input type="hidden" id="rsvpChoice" name="rsvpChoice" value="n">
      <div id="rsvpForm" class="rsvp-form">
        <div class="mb-3">
          <label for="guestName" class="form-label text-start d-block">Nama</label>
          <input type="text" class="form-control" name="guestName" id="guestName" required>
        </div>
        <div class="mb-3">
          <label for="guestMessage" class="form-label text-start d-block">Ucapan</label>
          <textarea class="form-control" name="guestWish" id="guestMessage" rows="3" required></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <button type="submit" id="submitButton" class="btn btn-success w-100">
              <span id="submitSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                <span id="submitButtonText">Hantar</span>
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-outline-secondary w-100" onclick="backToRSVPChoice()">
              Batal
            </button>
          </div>
        </div>
      </div>
      <div id="rsvpNote" class="d-none"></div>

    `;
  }

  modalContent.innerHTML = formContent;
}

function backToRSVPChoice() {
  // Reload the initial RSVP choice screen
  openModal("rsvp");
}

function addToGoogleCalendar() {
  const title = encodeURIComponent("Walimaturus Syukriah & Faiz");
  const details = encodeURIComponent("Walimaturus Syukriah & Faiz");
  const location = encodeURIComponent(
    "Dewan Dataran Dato' Mohd Said, Beranang, Selangor"
  );
  const startDate = "20251122T110000";
  const endDate = "20251122T160000";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

  window.open(googleCalendarUrl, "_blank");
}

function addToAppleCalendar() {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Event//EN
BEGIN:VEVENT
UID:wedding-faiz-syukriah@example.com
DTSTAMP:20251118T120000Z
DTSTART:20251122T110000
DTEND:20251122T160000
SUMMARY:Walimaturus Syukriah & Faiz
DESCRIPTION:Majlis Perkahwinan Syukriah & Faiz
LOCATION:Dewan Dataran Dato' Mohd Said, Beranang, Selangor
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = window.URL.createObjectURL(blob);

  // Create a temporary link with webcal protocol for Apple Calendar
  const webcalUrl = url.replace("blob:", "webcal://");

  // For iOS/macOS, try to open with calendar app
  if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i)) {
    // Try webcal protocol first
    window.location.href = `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(
      "Walimaturus Syukriah & Faiz"
    )}/public/basic.ics`;
  } else {
    // Fallback to download for other devices
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-syukriah-faiz.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  window.URL.revokeObjectURL(url);
}
