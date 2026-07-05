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

  const brentWidgetCard = document.querySelector('[data-brent-widget]');

  if (brentWidgetCard) {
    const widgetContainer = brentWidgetCard.querySelector('.tradingview-widget-container');
    const widgetTarget = brentWidgetCard.querySelector('[data-brent-widget-target]');
    const fallbackPanel = brentWidgetCard.querySelector('[data-brent-widget-fallback]');
    const retryButton = brentWidgetCard.querySelector('[data-brent-widget-retry]');
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    let activeBrentWidgetVariant = '';
    let fallbackTimer;

    const showBrentFallback = () => {
      activeBrentWidgetVariant = '';
      widgetTarget.hidden = true;
      fallbackPanel.hidden = false;
    };

    const hideBrentFallback = () => {
      widgetTarget.hidden = false;
      fallbackPanel.hidden = true;
    };

    const renderBrentWidget = (force = false) => {
      const isMobile = mobileMediaQuery.matches;
      const variant = isMobile ? 'mobile' : 'desktop';

      if ((variant === activeBrentWidgetVariant && !force) || !widgetContainer || !widgetTarget || !fallbackPanel) {
        return;
      }

      activeBrentWidgetVariant = variant;
      clearTimeout(fallbackTimer);
      hideBrentFallback();
      widgetTarget.innerHTML = '';
      widgetContainer.querySelectorAll('[data-brent-widget-script]').forEach((script) => script.remove());
      brentWidgetCard.classList.toggle('brent-widget-card--mobile', isMobile);

      // Use TradingView lightweight chart HTML embed instead of widget
      let embedHTML = '';
      
      if (isMobile) {
        // Mobile: lightweight embed
        embedHTML = `
          <iframe 
            src="https://www.tradingview.com/widgetembed/?symbol=TVC%3AUKOIL&interval=D&hidesidetoolbar=1&symboledit=1&toolbarbg=f1f3f6&studies=&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=&utm_medium=&utm_campaign=" 
            style="width: 100%; height: 100%; border: none; margin: 0; padding: 0;"
            allowtransparency="true"
            scrolling="no"
            frameborder="0"
            title="Brent Crude Oil Chart">
          </iframe>
        `;
      } else {
        // Desktop: full featured embed
        embedHTML = `
          <iframe 
            src="https://www.tradingview.com/widgetembed/?symbol=TVC%3AUKOIL&interval=D&hidesidetoolbar=0&symboledit=1&toolbarbg=f1f3f6&studies=&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=&utm_medium=&utm_campaign=" 
            style="width: 100%; height: 100%; border: none; margin: 0; padding: 0;"
            allowtransparency="true"
            scrolling="no"
            frameborder="0"
            title="Brent Crude Oil Chart">
          </iframe>
        `;
      }

      widgetTarget.innerHTML = embedHTML;

      // Set timeout to show fallback if iframe doesn't load
      fallbackTimer = window.setTimeout(() => {
        if (!widgetTarget.querySelector('iframe')) {
          console.warn('TradingView widget failed to load');
          showBrentFallback();
        }
      }, 6000);
    };

    const loadBrentWidget = () => renderBrentWidget();

    retryButton.addEventListener('click', () => renderBrentWidget(true));

    if ('IntersectionObserver' in window) {
      const brentWidgetObserver = new IntersectionObserver((entries, observerInstance) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadBrentWidget();
          observerInstance.disconnect();
        }
      }, { rootMargin: '300px 0px' });

      brentWidgetObserver.observe(brentWidgetCard);
    } else {
      loadBrentWidget();
    }
  }

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggle || !nav) {
    return;
  }

  const isNestedPage = /\/(products|packagings|blog|related-commodities)\//.test(window.location.pathname);
  const pathPrefix = isNestedPage ? '../' : '';
  const withPrefix = (path) => `${pathPrefix}${path}`;

  const dropdownMenus = {
    'packagings.html': {
      label: 'Packaging options',
      columns: [
        {
          heading: 'Export packagings',
          links: [
            ['Steel drums', 'packagings/steel-drums.html'],
            ['Jumbo bags', 'packagings/jumbo-bags.html'],
            ['Flexitank', 'packagings/flexitank.html'],
            ['Bulk shipment', 'packagings/bulk-shipment.html'],
          ],
        },
      ],
    },
  };

  const normalizeHref = (href) => href.replace(/^\.\.\//, '').replace(/^\.\//, '');

  const createDropdownPanel = ({ label, columns }) => {
    const panel = document.createElement('div');
    panel.className = 'nav-dropdown-panel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', label);

    columns.forEach((column) => {
      const group = document.createElement('div');
      group.className = 'nav-dropdown-group';

      const heading = document.createElement('span');
      heading.className = 'nav-dropdown-heading';
      heading.textContent = column.heading;
      group.appendChild(heading);

      column.links.forEach(([text, href]) => {
        const link = document.createElement('a');
        link.href = withPrefix(href);
        link.textContent = text;
        link.setAttribute('role', 'menuitem');
        group.appendChild(link);
      });

      panel.appendChild(group);
    });

    return panel;
  };

  nav.querySelectorAll(':scope > a').forEach((link) => {
    const menuKey = Object.keys(dropdownMenus).find((key) => normalizeHref(link.getAttribute('href') || '') === key);

    if (!menuKey) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'nav-dropdown';



    link.classList.add('nav-dropdown-trigger');
    link.setAttribute('aria-haspopup', 'true');

    link.parentNode.insertBefore(wrapper, link);
    wrapper.appendChild(link);
    wrapper.appendChild(createDropdownPanel(dropdownMenus[menuKey]));
  });

  const navLinks = nav.querySelectorAll('a');

  const closeMenu = () => {
    nav.classList.remove('show');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.setAttribute('aria-expanded', 'false');

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
