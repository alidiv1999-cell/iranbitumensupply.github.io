const elements = document.querySelectorAll('h1, p, img');

elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'all 0.6s ease';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

elements.forEach(el => observer.observe(el));

// 🔒 Force menu closed on page load (mobile safety)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMenu");

  if (!toggle || !nav) {
    console.error("Menu toggle or nav not found");
    return;
  }

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    nav.classList.toggle("show");
  });

  // Auto-close on link tap
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      toggle.classList.remove("open");
    });
  });
});
