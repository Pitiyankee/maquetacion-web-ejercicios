// Menú desplegable en móvil
const botonMenu = document.querySelector('.barra__boton');
const enlaces = document.querySelector('.barra__enlaces');
botonMenu.addEventListener('click', () => {
  const abierto = enlaces.classList.toggle('barra__enlaces--abierto');
  botonMenu.setAttribute('aria-expanded', String(abierto));
});
