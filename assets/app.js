const openContact = document.getElementById("open-contact");
const contactWindow = document.getElementById("contact-window");
const closeContact = document.getElementById("close-contact");

openContact.addEventListener("click", function (event) {
  event.preventDefault();
  contactWindow.setAttribute("aria-hidden", "false");
});

closeContact.addEventListener("click", function () {
  contactWindow.setAttribute("aria-hidden", "true");
});
