// Postres (categoría, nombre, precio y foto real)
const products = [
  { id: 1, cat: "Waffle", name: "Waffle con frutos rojos", price: 6.5, img: "images/waffle.jpg", alt: "Waffle con frutos rojos" },
  { id: 2, cat: "Crème Brûlée", name: "Crème brûlée de vainilla", price: 7, img: "images/brulee.jpg", alt: "Crème brûlée de vainilla" },
  { id: 3, cat: "Macaron", name: "Surtido de cinco macarons", price: 8, img: "images/macarons.jpg", alt: "Surtido de cinco macarons" },
  { id: 4, cat: "Tiramisú", name: "Tiramisú clásico", price: 5.5, img: "images/tiramisu.jpg", alt: "Tiramisú clásico" },
  { id: 5, cat: "Baklava", name: "Baklava de pistacho", price: 4, img: "images/baklava.jpg", alt: "Baklava de pistacho" },
  { id: 6, cat: "Tarta", name: "Tarta de limón con merengue", price: 5, img: "images/tarta-limon.jpg", alt: "Tarta de limón con merengue" },
  { id: 7, cat: "Pastel", name: "Pastel red velvet", price: 4.5, img: "images/red-velvet.jpg", alt: "Pastel red velvet" },
  { id: 8, cat: "Brownie", name: "Brownie con caramelo salado", price: 5.5, img: "images/brownie.jpg", alt: "Brownie con caramelo salado" },
  { id: 9, cat: "Panna cotta", name: "Panna cotta de vainilla", price: 6.5, img: "images/panna-cotta.jpg", alt: "Panna cotta de vainilla" }
];

const STORAGE_KEY = "carrito-postres";
let cart = {}; // { idProducto: cantidad }

const $ = id => document.getElementById(id);
const byId = id => products.find(p => p.id === id);
const money = n => "$" + n.toFixed(2);

// Iconos SVG inline
const ICON_CART = '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true"><g fill="#c73b0f"><path d="M6.3 17.8a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zM15.2 17.8a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z"/><path d="M2 2h2.3l.4 2H18l-1.6 7.4H6.3L4.3 3.5H2z" fill="none" stroke="#c73b0f" stroke-width="1.5" stroke-linejoin="round"/></g></svg>';
const ICON_MINUS = '<svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor" aria-hidden="true"><rect width="10" height="2"/></svg>';
const ICON_PLUS = '<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M4 0h2v4h4v2H6v4H4V6H0V4h4z"/></svg>';
const ICON_X = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m1 1 8 8M9 1 1 9"/></svg>';

// Persistencia
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_) {} }
function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.keys(data).forEach(k => { if (byId(+k) && data[k] > 0) cart[+k] = data[k]; });
  } catch (_) { cart = {}; }
}

// Catálogo: se pinta una vez, luego solo se actualiza la acción de cada producto
function renderProducts() {
  $("products").innerHTML = products.map(p => `
    <li class="product" data-id="${p.id}">
      <div class="product__media">
        <img class="product__img" src="${p.img}" alt="${p.alt}" loading="lazy">
        <div class="product__action"></div>
      </div>
      <div class="product__info">
        <p class="product__cat">${p.cat}</p>
        <h2 class="product__name">${p.name}</h2>
        <p class="product__price">${money(p.price)}</p>
      </div>
    </li>`).join("");
}

// Botón "Añadir al carrito" o selector de cantidad según el carrito
function renderActions() {
  document.querySelectorAll(".product").forEach(li => {
    const id = +li.dataset.id, p = byId(id), q = cart[id] || 0;
    li.classList.toggle("product--selected", q > 0);
    li.querySelector(".product__action").innerHTML = q
      ? `<div class="qty">
           <button class="qty__btn" type="button" data-dec="${id}" aria-label="Reducir cantidad de ${p.name}">${ICON_MINUS}</button>
           <span aria-live="polite">${q}</span>
           <button class="qty__btn" type="button" data-inc="${id}" aria-label="Aumentar cantidad de ${p.name}">${ICON_PLUS}</button>
         </div>`
      : `<button class="add-btn" type="button" data-add="${id}">${ICON_CART} Añadir al carrito</button>`;
  });
}

// Carrito lateral
function renderCart() {
  const ids = Object.keys(cart).map(Number);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const total = ids.reduce((s, id) => s + cart[id] * byId(id).price, 0);
  $("cart-count").textContent = count;
  $("cart-empty").hidden = count > 0;
  $("cart-filled").hidden = count === 0;
  $("cart-list").innerHTML = ids.map(id => {
    const p = byId(id);
    return `<li class="cart__item">
      <div>
        <h3 class="cart__item-name">${p.name}</h3>
        <p class="cart__item-line"><span class="cart__item-qty">${cart[id]}×</span><span class="cart__item-unit">@ ${money(p.price)}</span><span class="cart__item-sum">${money(p.price * cart[id])}</span></p>
      </div>
      <button class="cart__remove" type="button" data-remove="${id}" aria-label="Quitar ${p.name} del carrito">${ICON_X}</button>
    </li>`;
  }).join("");
  $("cart-total").textContent = money(total);
}

function update() { save(); renderActions(); renderCart(); }

// Eventos del catálogo y del carrito (delegación)
document.addEventListener("click", e => {
  const b = e.target.closest("[data-add],[data-inc],[data-dec],[data-remove]");
  if (!b) return;
  const d = b.dataset;
  if (d.add) cart[+d.add] = 1;
  else if (d.inc) cart[+d.inc]++;
  else if (d.dec) { const id = +d.dec; if (--cart[id] <= 0) delete cart[id]; }
  else if (d.remove) delete cart[+d.remove];
  update();
  // Devuelve el foco al control equivalente tras repintar
  const id = +(d.add || d.inc || d.dec);
  if (id) {
    const sel = d.add ? `[data-inc="${id}"]` : (cart[id] ? `[data-${d.inc ? "inc" : "dec"}="${id}"]` : `[data-add="${id}"]`);
    const next = document.querySelector(sel);
    if (next) next.focus();
  }
});

// Modal de resumen
const modal = $("modal");
$("confirm-btn").addEventListener("click", () => {
  const ids = Object.keys(cart).map(Number);
  $("modal-list").innerHTML = ids.map(id => {
    const p = byId(id);
    return `<li class="modal__item">
      <img class="modal__thumb" src="${p.img}" alt="">
      <div class="modal__item-text">
        <p class="modal__item-name">${p.name}</p>
        <span class="cart__item-qty">${cart[id]}×</span><span class="cart__item-unit">@ ${money(p.price)}</span>
      </div>
      <span class="modal__item-sum">${money(p.price * cart[id])}</span>
    </li>`;
  }).join("");
  $("modal-total").textContent = $("cart-total").textContent;
  modal.showModal();
});
$("new-order-btn").addEventListener("click", () => {
  cart = {};
  update();
  modal.close();
});

load();
renderProducts();
update();
