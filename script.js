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

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggle || !nav) {
    return;
  }

  const isNestedPage = /\/(products|packagings|blog|related-commodities)\//.test(window.location.pathname);
  const pathPrefix = isNestedPage ? '../' : '';
  const withPrefix = (path) => `${pathPrefix}${path}`;

  const dropdownMenus = {
    'products.html': {
      label: 'Product categories',
      columns: [
        {
          heading: 'Penetration grades',
          links: [
            ['Bitumen 60/70', 'products/bitumen-60-70.html'],
            ['Bitumen 80/100', 'products/bitumen-80-100.html'],
            ['Bitumen 40/50', 'products/bitumen-40-50.html'],
            ['Bitumen 30/40', 'products/bitumen-30-40.html'],
            ['Bitumen 200/300', 'products/bitumen-200-300.html'],
          ],
        },
        {
          heading: 'Viscosity & oxidized',
          links: [
            ['VG 10', 'products/bitumen-vg-10.html'],
            ['VG 20', 'products/bitumen-vg-20.html'],
            ['VG 30', 'products/bitumen-vg-30.html'],
            ['VG 40', 'products/bitumen-vg-40.html'],
            ['R 85/25', 'products/bitumen-r85-25.html'],
            ['R 90/15', 'products/bitumen-r90-15.html'],
            ['R 115/15', 'products/bitumen-r115-15.html'],
          ],
        },
        {
          heading: 'Modified bitumen',
          links: [
            ['PMB Elastomeric', 'products/elastomeric-pmb.html'],
            ['PMB Plastomeric', 'products/plastomeric-pmb.html'],
            ['PMB Hybrid', 'products/hybrid-pmb.html'],
            ['CRMB 50', 'products/crmb-50-cold-climate.html'],
            ['CRMB 55', 'products/crmb-55-moderate-climate.html'],
            ['CRMB 60', 'products/crmb-60-warm-climate.html'],
          ],
        },
        {
          heading: 'Performance grade',
          links: [
            ['PG 70-16', 'products/pg70-16.html'],
            ['PG 70-10', 'products/pg70-10.html'],
            ['PG 64-16', 'products/pg64-16.html'],
            ['PG 64-22', 'products/pg64-22.html'],
            ['PG 58-34', 'products/pg58-34.html'],
          ],
        },
        {
          heading: 'MC cutback',
          links: [
            ['MC-30 Bitumen', 'products/mc-30-bitumen.html'],
            ['MC-70 Bitumen', 'products/mc-70-bitumen.html'],
            ['MC-250 Bitumen', 'products/mc-250-bitumen.html'],
            ['MC-800 Bitumen', 'products/mc-800-bitumen.html'],
          ],
        },
        {
          heading: 'RC cutback',
          links: [
            ['RC70', 'products/rc70.html'],
            ['RC250', 'products/rc250.html'],
            ['RC800', 'products/rc800.html'],
            ['RC3000', 'products/rc3000.html'],
          ],
        },
        {
          heading: 'SC cutback',
          links: [
            ['SC70', 'products/sc70.html'],
            ['SC250', 'products/sc250.html'],
            ['SC800', 'products/sc800.html'],
            ['SC3000', 'products/sc3000.html'],
          ],
        },
      ],
    },
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
    'blog.html': {
      label: 'Latest guides',
      columns: [
        {
          heading: 'Bitumen knowledge hub',
          links: [
            ['What is bitumen?', 'blog/what-is-bitumen.html'],
            ['Bitumen grades explained', 'blog/bitumen-grades-explained.html'],
            ['Packaging options', 'blog/bitumen-packaging-options.html'],
            ['Incoterms 2020 for bitumen', 'blog/incoterms-2020-bitumen.html'],
            ['Common import mistakes', 'blog/common-import-mistakes.html'],
            ['Global bitumen trends', 'blog/global-bitumen-trends.html'],
            ['Reliable supplier guide', 'blog/reliable-bitumen-supplier.html'],
          ],
        },
      ],
    },
    'related-commodities.html': {
      label: 'Commodity categories',
      columns: [
        {
          heading: 'Petrochemical & refinery',
          links: [
            ['EN590 10ppm diesel', 'related-commodities/en590-10ppm-diesel.html'],
            ['Granular sulfur', 'related-commodities/granular-sulfur.html'],
            ['Micronized gilsonite', 'related-commodities/micronized-gilsonite-powder.html'],
            ['Slack wax', 'related-commodities/slack-wax.html'],
            ['Polyethylene wax', 'related-commodities/polyethylene-wax.html'],
            ['Fully refined paraffin wax', 'related-commodities/fully-refined-paraffin-wax.html'],
          ],
        },
        {
          heading: 'Industrial & agricultural',
          links: [
            ['Urea 46 fertilizer', 'related-commodities/urea-46-fertilizer.html'],
            ['Dense soda ash', 'related-commodities/dense-soda-ash.html'],
            ['Calcium chloride', 'related-commodities/calcium-chloride.html'],
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

    if (menuKey === 'products.html') {
      wrapper.classList.add('nav-dropdown--wide');
    }

    if (menuKey === 'related-commodities.html') {
      wrapper.classList.add('nav-dropdown--right');
    }

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
