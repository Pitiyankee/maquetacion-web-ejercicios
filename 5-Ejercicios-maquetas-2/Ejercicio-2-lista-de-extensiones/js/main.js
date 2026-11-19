// Datos de las extensiones (icono = clave de ICONS)
const extensions = [
  { name: "DevLens", desc: "Inspecciona rápidamente los diseños de página y visualiza los límites de los elementos.", active: true, color: "#bfd8bd", icon: "lupa" },
  { name: "StyleSpy", desc: "Analiza y copia al instante el CSS de cualquier elemento web.", active: true, color: "#a5d8e6", icon: "corchetes" },
  { name: "SpeedBoost", desc: "Optimiza el uso de recursos del navegador para acelerar la carga de páginas.", active: false, color: "#ffd0d4", icon: "cronometro" },
  { name: "JSONWizard", desc: "Da formato, valida y embellece respuestas JSON en el navegador.", active: true, color: "#f0c1e8", icon: "varita" },
  { name: "TabMaster Pro", desc: "Organiza las pestañas del navegador en grupos y sesiones.", active: true, color: "#d2bdf0", icon: "bandeja" },
  { name: "ViewportBuddy", desc: "Simula distintas resoluciones de pantalla directamente en el navegador.", active: false, color: "#a9c4f5", icon: "salida" },
  { name: "Markup Notes", desc: "Permite anotar y tomar notas directamente en las páginas web para depurar en colaboración.", active: true, color: "#9ad9f2", icon: "nota" },
  { name: "GridGuides", desc: "Superpón cuadrículas y guías de alineación personalizables en cualquier página.", active: false, color: "#b9b6fb", icon: "cuadricula" },
  { name: "Palette Picker", desc: "Extrae al instante paletas de colores de cualquier página web.", active: true, color: "#9cf0d8", icon: "paleta" },
  { name: "LinkChecker", desc: "Analiza y resalta los enlaces rotos de cualquier página.", active: true, color: "#ffd3b8", icon: "enlace" },
  { name: "DOM Snapshot", desc: "Captura y exporta estructuras DOM rápidamente.", active: false, color: "#8eeaf0", icon: "instantanea" },
  { name: "ConsolePlus", desc: "Consola de desarrollo mejorada con filtrado y registro avanzados.", active: true, color: "#a8f5c4", icon: "terminal" }
];

// Iconos SVG sencillos (trazo)
const SVG_OPEN = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const ICONS = {
  lupa: '<rect x="3" y="4" width="18" height="16" rx="4"/><circle cx="11.5" cy="13" r="3"/><path d="m13.8 15.3 2 2M7 8h.01M10 8h.01M13 8h.01"/>',
  corchetes: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M10 8H8.5v8H10M14 8h1.5v8H14"/>',
  cronometro: '<circle cx="12" cy="13.5" r="7"/><path d="M10 3h4M12 3v3.5M12 13.5l3-3"/>',
  varita: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="m8 18 7-9M16 5.5v3M14.5 7h3"/>',
  bandeja: '<path d="M8 6h8M7 9h10"/><path d="M5.5 11h13l-1 7.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z"/>',
  salida: '<path d="M18 13v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4"/><path d="M14 4h6v6M20 4l-8 8M9 14l3-2"/>',
  nota: '<path d="M6 3h8l4 4v6M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M8 11h5M8 15h3"/><path d="m14 21 5-5 2 2-5 5h-2z"/>',
  cuadricula: '<rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/>',
  paleta: '<rect x="4" y="4" width="7" height="7" rx="2"/><path d="M5 15h5M5 19h3M15 20l5-8-3-5-5 8z"/>',
  enlace: '<path d="M10 14a4 4 0 0 1 0-5.5l2-2a4 4 0 0 1 5.5 0M14 10a4 4 0 0 1 0 5.5l-2 2a4 4 0 0 1-5.5 0M5 5l1.5 1.5M3 9h2M9 3v2M19 19l-1.5-1.5M21 15h-2M15 21v-2"/>',
  instantanea: '<path d="M6 11V7l3-3h6l3 3v4z"/><path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6zM9 8h6"/>',
  terminal: '<rect x="3.5" y="4" width="17" height="16" rx="4"/><path d="m8 10 3 2-3 2M13 15h3"/>'
};

const STORAGE_THEME = "ext-theme";
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const themeBtn = document.getElementById("theme-btn");
const filterBtns = document.querySelectorAll(".filters__btn");
let filter = "all";

// Renderiza las tarjetas según el filtro activo
function render() {
  grid.innerHTML = "";
  const visibles = extensions.filter(e =>
    filter === "all" || (filter === "active" ? e.active : !e.active));
  visibles.forEach(ext => {
    const idx = extensions.indexOf(ext);
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div class="card__top">
        <div class="card__icon" style="background:${ext.color}">${SVG_OPEN}${ICONS[ext.icon]}</svg></div>
        <div>
          <h2 class="card__name"></h2>
          <p class="card__desc"></p>
        </div>
      </div>
      <div class="card__bottom">
        <button class="card__remove" type="button" data-remove="${idx}">Quitar</button>
        <button class="switch" type="button" role="switch" data-toggle="${idx}"
          aria-checked="${ext.active}"></button>
      </div>`;
    li.querySelector(".card__name").textContent = ext.name;
    li.querySelector(".card__desc").textContent = ext.desc;
    li.querySelector(".switch").setAttribute("aria-label", `${ext.name}: activado`);
    li.querySelector(".card__remove").setAttribute("aria-label", `Quitar ${ext.name}`);
    grid.appendChild(li);
  });
  empty.hidden = visibles.length > 0;
}

// Delegación de eventos: interruptor y botón Quitar
grid.addEventListener("click", e => {
  const t = e.target.closest("[data-toggle],[data-remove]");
  if (!t) return;
  if (t.dataset.toggle !== undefined) {
    const ext = extensions[+t.dataset.toggle];
    ext.active = !ext.active;
    // Si hay filtro activo, la tarjeta puede desaparecer
    if (filter === "all") t.setAttribute("aria-checked", ext.active);
    else render();
  } else {
    extensions.splice(+t.dataset.remove, 1);
    render();
  }
});

// Filtros Todas / Activas / Inactivas
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filter = btn.dataset.filter;
  filterBtns.forEach(b => b.setAttribute("aria-pressed", b === btn));
  render();
}));

// Tema claro/oscuro con localStorage
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
}
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem(STORAGE_THEME, next); } catch (_) {}
});
try { applyTheme(localStorage.getItem(STORAGE_THEME) || "dark"); } catch (_) { applyTheme("dark"); }

render();
