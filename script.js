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


