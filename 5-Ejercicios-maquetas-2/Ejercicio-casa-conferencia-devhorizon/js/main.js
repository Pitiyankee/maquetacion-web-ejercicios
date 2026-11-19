// Menú colapsable en móvil con aria-expanded
const toggle = document.querySelector('.header__toggle');
const nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

// Botón activo (Inicio): aria-current="page" según el enlace marcado
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav__link').forEach((l) => {
      l.removeAttribute('aria-current');
      l.classList.remove('nav__link--active');
    });
    link.setAttribute('aria-current', 'page');
    link.classList.add('nav__link--active');
  });
});

// "+ ver detalles" despliega/pliega el panel de cada ticket
document.querySelectorAll('.ticket__toggle').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.textContent = expanded ? '+ ver detalles' : '− ocultar detalles';
    if (panel) panel.hidden = expanded;
  });
});

// "Back to top" con scroll suave, respetando prefers-reduced-motion
const backToTop = document.querySelector('[data-back-to-top]');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus?.({ preventScroll: true });
  });
}
