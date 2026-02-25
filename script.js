document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('h1, p, img');

  elements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  elements.forEach((el) => observer.observe(el));

  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');

  if (!header || !nav) {
    return;
  }

  if (!nav.id) {
    nav.id = 'mainNav';
  }

  let toggle = header.querySelector('#menuToggle, .menu-toggle');

  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.id = 'menuToggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');

    toggle.innerHTML = '<span></span><span></span><span></span>';

    const container = header.querySelector('.header-container') || header;
    container.appendChild(toggle);
  }

  const navLinks = nav.querySelectorAll('a');

  const closeMenu = () => {
    nav.classList.remove('show');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
