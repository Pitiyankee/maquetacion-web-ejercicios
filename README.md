# Prácticas de maquetación web: HTML, CSS y JavaScript

Colección de prácticas de maquetación con **HTML5 semántico**, **CSS** (Flexbox, Grid, metodología BEM, diseño adaptable) y **JavaScript** básico para la interacción. Cada práctica es una página independiente: abre su `index.html` en el navegador para verla.

## Contenido

| Bloque | Qué trabaja | Prácticas |
|---|---|---|
| `1-Flexbox` | Maquetación unidimensional con Flexbox | 8: tres cajas, tarjeta centrada, menú horizontal, tarjetas con salto de línea, cabecera con logo y enlaces, dos columnas, botón centrado, navegación adaptable |
| `2-Grid` | Maquetación bidimensional con CSS Grid | 8: columnas en `px` y `fr`, `repeat()`, filas, `gap`, galería de tarjetas y galería adaptable |
| `3-BEM` | Nomenclatura BEM: bloques, elementos y modificadores | 6: tarjetas con variantes, perfil, aviso y barra de navegación, estos dos últimos con JavaScript |
| `4-Ejercicios-maquetas-1` | Maquetas completas con diseño de referencia | 4: perfil, blog, quiz de frontend y página de presentación de un servicio para negocios |
| `5-Ejercicios-maquetas-2` | Maquetas completas con interacción | 4: página de una ONG, lista de extensiones, postres con carrito y página de una conferencia |

## Qué se practica

- **Estructura semántica** con etiquetas HTML5 (`header`, `nav`, `main`, `section`, `footer`).
- **Diseño adaptable (responsive)** con media queries y unidades relativas.
- **Organización del CSS** con nombres BEM y archivos separados por práctica (`css/estilos.css`).
- **JavaScript sin librerías** para el DOM y los eventos: carrito de la compra con total, menús desplegables, avisos y secciones que se abren y cierran.
- **Persistencia en el navegador** con `localStorage` (por ejemplo, el estado de las extensiones).
- **Accesibilidad básica** con atributos ARIA (`aria-expanded`, `aria-label`, `aria-current`) en los componentes interactivos.

## Estructura

```
<bloque>/
└── Ejercicio-<n>-<nombre>/
    ├── index.html
    ├── css/estilos.css
    ├── js/main.js        (si la práctica tiene interacción)
    └── images/           (si usa imágenes)
```

## Cómo verlo

No necesita instalación. Clona el repositorio y abre el `index.html` de la práctica que quieras en cualquier navegador.

```bash
git clone https://github.com/Pitiyankee/maquetacion-web-practicas.git
```

## Autor

Pedro Bandes · [@Pitiyankee](https://github.com/Pitiyankee) · [LinkedIn](https://www.linkedin.com/in/pedrobandesduran)
