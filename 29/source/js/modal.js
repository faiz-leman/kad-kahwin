// Modal functionality
function openModal(type) {
  const modal = document.getElementById("dynamicModal");
  const modalTitle = document.getElementById("dynamicModalLabel");
  const modalContent = document.getElementById("dynamicModalContent");

  let title = "";
  let content = "";

  switch (type) {
    case "contact":
      title = "HUBUNGI KAMI";
      content = `
                <div class="contact-info">
                    <div class="mb-3">
                        <h6>Pihak Lelaki</h6>
                        <p>Muhammad Faiz bin Leman</p>
                        <a href="tel:+60123456789" class="btn btn-outline-primary">
                            <i class="bx bx-phone"></i> 012-345 6789
                        </a>
                    </div>
                    <div class="mb-3">
                        <h6>Pihak Perempuan</h6>
                        <p>Syukriah binti Hj. Zahari</p>
                        <a href="tel:+60123456789" class="btn btn-outline-primary">
                            <i class="bx bx-phone"></i> 012-345 6789
                        </a>
                    </div>
                </div>
            `;
      break;

    case "rsvp":
      title = "RSVP";
      content = `
                <div class="row g-2 mb-4">
                    <div class="col-6">
                        <button class="btn btn-success w-100 rsvp-btn" data-status="hadir">
                            <i class="bx bx-check"></i>
                            Hadir
                        </button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-outline-secondary w-100 rsvp-btn" data-status="tidak-hadir">
                            <i class="bx bx-x"></i>
                            Tidak Hadir
                        </button>
                    </div>
                </div>
                <div class="mt-3">
                    <input type="text" class="form-control mb-2" placeholder="Nama anda" id="guestName">
                    <textarea class="form-control" placeholder="Ucapan (pilihan)" rows="3" id="guestMessage"></textarea>
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
                            <a href="https://maps.google.com" target="_blank" class="btn btn-primary w-100">
                                <i class="bx bx-map"></i> Google Maps
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="https://waze.com" target="_blank" class="btn btn-outline-primary w-100">
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
                    <div class="row g-2">
                        <div class="col-6">
                            <button class="btn btn-primary w-100" onclick="addToGoogleCalendar()">
                                <i class="bx bx-calendar-plus"></i> Google Calendar
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-outline-primary w-100" onclick="downloadICS()">
                                <i class="bx bx-download"></i> Download ICS
                            </button>
                        </div>
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

  // Add event listeners for RSVP buttons if it's RSVP modal
  if (type === "rsvp") {
    const rsvpButtons = modal.querySelectorAll(".rsvp-btn");
    rsvpButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const status = this.getAttribute("data-status");
        handleRSVP(status);
      });
    });
  }
}

function handleRSVP(status) {
  const guestName = document.getElementById("guestName").value;
  const guestMessage = document.getElementById("guestMessage").value;

  if (!guestName.trim()) {
    alert("Sila masukkan nama anda");
    return;
  }

  // Here you can add your RSVP submission logic
  console.log("RSVP Status:", status);
  console.log("Guest Name:", guestName);
  console.log("Guest Message:", guestMessage);

  alert(`Terima kasih ${guestName}! RSVP anda telah direkodkan.`);

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

function downloadICS() {
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
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-faiz-syukriah.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
