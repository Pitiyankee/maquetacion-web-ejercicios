// Cerrar avisos
document.querySelectorAll('.aviso__cerrar').forEach((boton) => {
  boton.addEventListener('click', () => {
    boton.closest('.aviso').classList.add('aviso--oculto');
  });
});
