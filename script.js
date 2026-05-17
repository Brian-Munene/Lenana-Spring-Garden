const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function initScrollReveal() {
  const revealItems = document.querySelectorAll(
    '.section, [data-reveal], .feature-list, .residence-card, .contact-details div, .contact-form'
  );

  if (!revealItems.length) return;

  document.querySelectorAll('.feature-list').forEach(list => {
    list.querySelectorAll('li').forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -70px 0px'
  });

  revealItems.forEach(item => observer.observe(item));
}

function initSiteInteractions() {
  initScrollReveal();

  navToggle?.addEventListener('click', () => {
    if (!mainNav) return;
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const modal = document.getElementById('contactModal');
  const modalOpeners = document.querySelectorAll('[data-modal-open]');
  const modalClosers = document.querySelectorAll('[data-modal-close]');
  let previousActiveElement = null;

  function getFocusableElements() {
    if (!modal) return [];
    return Array.from(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(element => !element.hasAttribute('disabled'));
  }

  function openModal() {
    if (!modal) return;
    previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    document.addEventListener('keydown', handleKeydown);

    const firstInput = modal.querySelector('input, textarea, button');
    if (firstInput instanceof HTMLElement) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
    document.removeEventListener('keydown', handleKeydown);
    try { previousActiveElement?.focus(); } catch (error) {}
    previousActiveElement = null;
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    if (event.key !== 'Tab' || !modal?.classList.contains('open')) return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  modalOpeners.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      openModal();
    });
  });

  modalClosers.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  modal?.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      closeModal();
      alert('Thanks. Your enquiry has been received. Please connect this form to your sales inbox before launch.');
    });
  });
}

if (document.readyState !== 'loading') {
  initSiteInteractions();
} else {
  document.addEventListener('DOMContentLoaded', initSiteInteractions);
}
