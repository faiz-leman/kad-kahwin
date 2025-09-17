// RSVP Modal functionality
function openRSVPModal() {
  const modal = new bootstrap.Modal(document.getElementById("rsvpModal"));
  modal.show();
}

// Handle RSVP button clicks
document.addEventListener("DOMContentLoaded", function () {
  const rsvpButtons = document.querySelectorAll(".rsvp-btn");

  rsvpButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      rsvpButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get RSVP status
      const status = this.getAttribute("data-status");
      console.log("RSVP Status:", status);

      // You can add your RSVP submission logic here
      // For example, send to server or store in localStorage
    });
  });
});
