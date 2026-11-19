// Interruptor de tema claro/oscuro con persistencia en localStorage
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-switch__btn');

  // Aplica el tema y sincroniza el estado accesible (checked = oscuro)
  function aplicar(tema) {
    root.setAttribute('data-theme', tema);
    btn.setAttribute('aria-checked', String(tema === 'dark'));
  }

  aplicar(root.getAttribute('data-theme') || 'dark');

  btn.addEventListener('click', function () {
    var nuevo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicar(nuevo);
    try { localStorage.setItem('quiz-theme', nuevo); } catch (e) {}
  });
})();
