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
                    <div class="d-flex justify-content-between align-items-center mb-3 py-2">
                        <div class="d-flex flex-column">
                            <span class="text-start">Fatin Nabila</span>
                            <span class="fst-italic">Kakak</span>
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

    case "location":
      title = "LOKASI MAJLIS";
      content = `
                <div class="location-info">
                    <h6>Dewan Fairy Fairy</h6>
                    <p class="mb-3">
                        Level UG, Utropolis Marketplace, Jalan Kontraktor U1/14, 
                        Hicom-Glenmarie Industrial Park, 40150 Shah Alam, Selangor
                    </p>
                    <div class="row g-2">
                        <div class="col-6">
                            <a href="https://maps.app.goo.gl/gmDTzC1Y2Hq14PYV8" target="_blank" class="btn btn-outline-secondary w-100">
                                <i class="bx bx-navigation"></i> Google Maps
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="https://www.waze.com/en/live-map/directions/kamalinda-events-and-weddings,-utropolis-jalan-kontraktor-u114-shah-alam?place=w.66584607.665583925.20871982" target="_blank" class="btn btn-outline-secondary  w-100">
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
                        <h6>Walimaturus Faiz & Syukriah</h6>
                        <p>Sabtu, 29 November 2025</p>
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
    <form id="rsvpForm">
      <input type="hidden" id="rsvpChoice" name="rsvpChoice" value="y">
      <div class="rsvp-form">
        <div class="mb-3">
          <label for="guestName" class="form-label text-start d-block">Nama</label>
          <input type="text" class="form-control" name="guestName" id="guestName" required>
        </div>
        <div class="mb-3">
          <label for="attendeeCount" class="form-label text-start d-block">Jumlah Kehadiran</label>
          <select class="form-control" name="attendeesPax" id="attendeeCount" required>
            <option value="">1 orang</option>
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
            <button class="btn btn-success w-100" onclick="submitRSVP('hadir')">
              Hantar
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-outline-secondary w-100" onclick="backToRSVPChoice()">
              Batal
            </button>
          </div>
        </div>
      </div>
    </form>
    `;
  } else {
    // Just wish form for tidak hadir
    formContent = `
    <form id="rsvpForm">
      <input type="hidden" id="rsvpChoice" name="rsvpChoice" value="n">
      <div class="rsvp-form">
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
            <button class="btn btn-success w-100" onclick="submitRSVP('tidak-hadir')">
              Hantar
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-outline-secondary w-100" onclick="backToRSVPChoice()">
              Batal
            </button>
          </div>
        </div>
      </div>
    `;
  }

  modalContent.innerHTML = formContent;
}

function backToRSVPChoice() {
  // Reload the initial RSVP choice screen
  openModal("rsvp");
}

function submitRSVP(status) {
  const guestName = document.getElementById("guestName").value;
  const guestMessage = document.getElementById("guestMessage").value;

  if (!guestName.trim()) {
    alert("Sila masukkan nama anda");
    return;
  }

  let attendeeCount = 1;
  if (status === "hadir") {
    const guestPhone = document.getElementById("guestPhone").value;
    const attendeeCountElement = document.getElementById("attendeeCount");
    attendeeCount = attendeeCountElement.value || 1;

    if (!guestPhone.trim()) {
      alert("Sila masukkan nombor telefon anda");
      return;
    }

    console.log("RSVP Status:", status);
    console.log("Guest Name:", guestName);
    console.log("Guest Phone:", guestPhone);
    console.log("Attendee Count:", attendeeCount);
    console.log("Guest Message:", guestMessage);

    alert(
      `Terima kasih ${guestName}! Kehadiran ${attendeeCount} orang telah direkodkan.`
    );
  } else {
    if (!guestMessage.trim()) {
      alert("Sila tulis ucapan anda");
      return;
    }

    console.log("RSVP Status:", status);
    console.log("Guest Name:", guestName);
    console.log("Guest Message:", guestMessage);

    alert(`Terima kasih ${guestName}! Ucapan anda telah direkodkan.`);
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("dynamicModal")
  );
  modal.hide();
}

function addToGoogleCalendar() {
  const title = encodeURIComponent("Walimaturus Faiz & Syukriah");
  const details = encodeURIComponent("Majlis Perkahwinan Faiz & Syukriah");
  const location = encodeURIComponent("Dewan Fairy Fairy, Shah Alam, Selangor");
  const startDate = "20251129T110000";
  const endDate = "20251129T160000";

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
DTSTART:20251129T110000
DTEND:20251129T160000
SUMMARY:Walimaturus Faiz & Syukriah
DESCRIPTION:Majlis Perkahwinan Faiz & Syukriah
LOCATION:Dewan Fairy Fairy, Shah Alam, Selangor
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
      "Walimaturus Faiz & Syukriah"
    )}/public/basic.ics`;
  } else {
    // Fallback to download for other devices
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-faiz-syukriah.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  window.URL.revokeObjectURL(url);
}
