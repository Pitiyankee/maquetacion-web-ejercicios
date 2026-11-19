// Contador animado de cifras al entrar en pantalla (respeta prefers-reduced-motion)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  var items = document.querySelectorAll('.stats__value');

  function animar(el) {
    var meta = Number(el.dataset.target);
    var sufijo = el.dataset.suffix || '';
    var dur = 1200, ini = null;
    function paso(t) {
      if (ini === null) ini = t;
      var p = Math.min((t - ini) / dur, 1);
      el.textContent = Math.round(meta * p) + sufijo;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { animar(e.target); obs.unobserve(e.target); }
    });
  });
  items.forEach(function (el) { obs.observe(el); });
})();
