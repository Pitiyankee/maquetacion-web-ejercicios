// Menú hamburguesa: abre/cierra y mantiene aria-expanded
const boton = document.querySelector('.header__toggle');
const menu = document.getElementById('menu');

function alternar(abrir) {
  boton.setAttribute('aria-expanded', String(abrir));
  boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  menu.hidden = !abrir;
}

boton.addEventListener('click', () => {
  alternar(boton.getAttribute('aria-expanded') !== 'true');
});

// Escape cierra el menú y devuelve el foco al botón
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) {
    alternar(false);
    boton.focus();
  }
});

// Cerrar al elegir un enlace
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) alternar(false);
});
