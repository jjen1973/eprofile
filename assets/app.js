document.addEventListener("DOMContentLoaded", () => {
  const aboutMeSection = document.getElementById("about-me");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");
  const openContact = document.getElementById("open-contact");
  const contactWindow = document.getElementById("contact-window");
  const closeContact = document.getElementById("close-contact");
  const form = document.getElementById("contact-form");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);

    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !isDark);
      themeIcon.classList.toggle("fa-sun", isDark);
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );
    }
  };

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      const nextTheme = isDark ? "light" : "dark";

      applyTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  if (aboutMeSection && typeof confetti === "function") {
    const aboutMeConfettiCanvas = document.createElement("canvas");
    aboutMeConfettiCanvas.className = "about-me-confetti-canvas";
    aboutMeSection.appendChild(aboutMeConfettiCanvas);

    const aboutMeConfetti = confetti.create(aboutMeConfettiCanvas, {
      resize: true,
      useWorker: true,
    });

    let confettiTimer = null;

    const launchConfetti = () => {
      aboutMeConfetti({
        particleCount: 18,
        spread: 60,
        startVelocity: 16,
        gravity: 0.45,
        ticks: 120,
        scalar: 0.9,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.25,
        },
      });
    };

    const startFloatingConfetti = () => {
      if (confettiTimer) {
        return;
      }

      confettiTimer = setInterval(launchConfetti, 700);
    };

    const stopFloatingConfetti = () => {
      if (!confettiTimer) {
        return;
      }

      clearInterval(confettiTimer);
      confettiTimer = null;
    };

    const aboutMeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startFloatingConfetti();
          } else {
            stopFloatingConfetti();
          }
        });
      },
      { threshold: 0.35 },
    );

    aboutMeObserver.observe(aboutMeSection);
  }

  if (openContact && contactWindow && closeContact) {
    const openContactWindow = () => {
      contactWindow.classList.add("is-open");
      contactWindow.setAttribute("aria-hidden", "false");
    };

    const closeContactWindow = () => {
      contactWindow.classList.remove("is-open");
      contactWindow.setAttribute("aria-hidden", "true");
    };

    openContact.addEventListener("click", (event) => {
      event.preventDefault();
      openContactWindow();
    });

    closeContact.addEventListener("click", closeContactWindow);

    contactWindow.addEventListener("click", (event) => {
      if (event.target === contactWindow) {
        closeContactWindow();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        contactWindow.classList.contains("is-open")
      ) {
        closeContactWindow();
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      console.log("FORM SUBMITTED:", { name, email, message });
    });
  }
});
