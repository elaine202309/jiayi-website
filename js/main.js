document.addEventListener('DOMContentLoaded', () => {

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ===== Active Nav Link =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== Scroll Reveal =====
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ===== Product Filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Product Modal =====
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalBody = document.querySelector('.modal-body');
  const modalClose = document.querySelector('.modal-close');

  if (modalOverlay && modalBody) {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const category = card.dataset.category;
        const specs = card.dataset.specs;
        const imgSrc = card.querySelector('.product-image img')?.src || 'images/product-1.jpg';

        modalBody.innerHTML = `
          <div class="modal-image"><img src="${imgSrc}" alt="${title}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;"></div>
          <span class="tag">${category}</span>
          <h2>${title}</h2>
          <p>${desc}</p>
          ${specs ? `
            <div class="modal-specs">
              ${specs.split(',').map(s => {
                const [label, value] = s.split(':');
                return `<div class="spec"><div class="spec-label">${label}</div><div class="spec-value">${value}</div></div>`;
              }).join('')}
            </div>
          ` : ''}
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== Contact Form =====
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('感谢您的留言，我们会尽快与您联系！', 'success');
      contactForm.reset();
    });
  }

  // ===== Toast =====
  function showToast(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
