// Al actualizar la página, siempre empieza desde arriba
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash)
  history.replaceState(null, "", location.pathname + location.search);
window.scrollTo(0, 0);
window.addEventListener("load", () => window.scrollTo(0, 0));

// ---------- Productos (edita nombres, precios y colores) ----------
// Colores: colores: [{ n: "Negro", c: "#111", img: "imagenes/runner-negro.jpg", agotado: true }]
// Con foto, cada color necesita su propia imagen (img). Sin foto, el dibujo se pinta del color.
// Para fotos reales agrega  img: "fotos/runner.jpg"  a un producto.
const ENVIO_GRATIS = 250000;
const TALLAS = [37, 38, 39, 40, 41, 42];
const TALLAS_ROPA = ["S", "M", "L", "XL"];
const productos = [
  {
    id: 1,
    nombre: "Runner Aire 2",
    colores: [
      { n: "Negro", c: "#111111" },
      { n: "Rojo", c: "#e4002b" },
      { n: "Blanco", c: "#ffffff" },
      { n: "Gris", c: "#8a8f98", agotado: true },
    ],
    cat: "deportivos",
    precio: 289000,
    antes: 349000,
    oferta: true,
    suela: "#ff6a2b",
    img: "imagenes/zapato 1.jpg",
  },
  {
    id: 2,
    nombre: "Trail Cumbre",
    colores: [
      { n: "Negro", c: "#111111" },
      { n: "Verde oliva", c: "#4b5d3a" },
      { n: "Naranja", c: "#ff6a2b", agotado: true },
    ],
    nuevo: true,
    cat: "deportivos",
    precio: 329000,
    suela: "#111111",
    img: "imagenes/zapato 2.jpg",
  },
  {
    id: 3,
    nombre: "Urbano Lino",
    colores: [
      { n: "Verde", c: "#1d6b4f" },
      { n: "Crema", c: "#d8c7a6" },
      { n: "Azul", c: "#2f5bff" },
      { n: "Negro", c: "#111111", agotado: true },
    ],
    nuevo: true,
    cat: "casuales",
    precio: 219000,
    suela: "#1d6b4f",
    img: "imagenes/zapato 3.jpg",
  },
  {
    id: 4,
    nombre: "Classic Blanco",
    colores: [
      { n: "Blanco", c: "#ffffff" },
      { n: "Rojo", c: "#e4002b" },
      { n: "Azul", c: "#2f5bff", agotado: true },
      { n: "Negro", c: "#111111" },
    ],
    cat: "casuales",
    precio: 199000,
    antes: 239000,
    oferta: true,
    suela: "#2f5bff",
  },
  {
    id: 5,
    nombre: "Oxford Noche",
    colores: [
      { n: "Negro", c: "#111111" },
      { n: "Café", c: "#6b3e1d" },
      { n: "Vino", c: "#6d1a2b", agotado: true },
    ],
    ultimas: true,
    cat: "formales",
    precio: 379000,
    suela: "#111111",
  },
  {
    id: 6,
    nombre: "Mocasín Tabaco",
    colores: [
      { n: "Tabaco", c: "#8a4b22" },
      { n: "Negro", c: "#111111" },
      { n: "Azul noche", c: "#1b2a4a" },
    ],
    cat: "formales",
    precio: 349000,
    suela: "#8a4b22",
  },
  {
    id: 7,
    nombre: "Buzo Esencial",
    cat: "buzos",
    precio: 169000,
    suela: "#111111",
    colores: [
      { n: "Negro", c: "#111111" },
      { n: "Gris", c: "#9aa0a8" },
      { n: "Verde oliva", c: "#4b5d3a" },
    ],
  },
  {
    id: 8,
    nombre: "Hoodie Cumbre",
    cat: "buzos",
    precio: 189000,
    antes: 229000,
    oferta: true,
    suela: "#1b2a4a",
    colores: [
      { n: "Azul noche", c: "#1b2a4a" },
      { n: "Vino", c: "#6d1a2b" },
      { n: "Crema", c: "#e8dcc4", agotado: true },
    ],
  },
  {
    id: 9,
    nombre: "Buzo Oversize Arena",
    cat: "buzos",
    precio: 179000,
    nuevo: true,
    suela: "#d8c7a6",
    colores: [
      { n: "Arena", c: "#d8c7a6" },
      { n: "Negro", c: "#111111" },
      { n: "Naranja", c: "#ff6a2b", agotado: true },
    ],
  },
  {
    id: 10,
    nombre: "Camiseta Básica",
    cat: "camisas",
    precio: 69000,
    suela: "#ffffff",
    colores: [
      { n: "Blanco", c: "#ffffff" },
      { n: "Negro", c: "#111111" },
      { n: "Rojo", c: "#e4002b" },
      { n: "Azul", c: "#2f5bff" },
    ],
  },
  {
    id: 11,
    nombre: "Camiseta Estampada PASO",
    cat: "camisas",
    precio: 79000,
    antes: 99000,
    oferta: true,
    suela: "#0e1a2b",
    colores: [
      { n: "Azul noche", c: "#0e1a2b" },
      { n: "Blanco", c: "#ffffff" },
      { n: "Naranja", c: "#ff6a2b", agotado: true },
    ],
  },
  {
    id: 12,
    nombre: "Camisa de Lino",
    cat: "camisas",
    precio: 129000,
    ultimas: true,
    suela: "#e8dcc4",
    colores: [
      { n: "Crema", c: "#e8dcc4" },
      { n: "Verde", c: "#1d6b4f" },
      { n: "Azul claro", c: "#8fb3d9" },
    ],
  },
];
const nombresCat = {
  deportivos: "Deportivos",
  casuales: "Casuales",
  formales: "Formales",
  buzos: "Buzos",
  camisas: "Camisas",
};

// ---------- Utilidades ----------
const $ = (id) => document.getElementById(id);
const formato = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
const zapato = (suela = "#111", cuerpo = "#fff") => `
  <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zapato">
    <path d="M10 85C10 70 30 68 45 60L70 35C75 30 82 32 85 38L95 55C110 60 150 62 175 78C190 86 192 98 180 100H20C12 100 10 94 10 85Z" fill="${cuerpo}"/>
    <path d="M70 35L95 55M62 47L84 64M54 55L74 71" stroke="${suela}" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 78C40 80 60 78 80 70" stroke="${suela}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <rect x="6" y="96" width="190" height="16" rx="8" fill="${suela}"/>
  </svg>`;
const esRopa = (p) => p.cat === "buzos" || p.cat === "camisas";
const tallasDe = (p) => (esRopa(p) ? TALLAS_ROPA : TALLAS);
const tv = (v) => (isNaN(v) ? v : Number(v));
const contraste = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 >
    150
    ? "#111"
    : "#fff";
};
const buzo = (c = "#111") => `
  <svg class="ropa" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Buzo">
    <path d="M62 40L38 52L14 112L40 122L52 96V176Q52 184 60 184H140Q148 184 148 176V96L160 122L186 112L162 52L138 40Q130 62 100 62Q70 62 62 40Z" fill="${c}" stroke="#000" stroke-opacity=".2" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M62 40Q70 12 100 12Q130 12 138 40Q130 62 100 62Q70 62 62 40Z" fill="${c}" stroke="#000" stroke-opacity=".25" stroke-width="3"/>
    <path d="M82 116H118L126 152H74Z" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="3" stroke-linejoin="round"/>
    <path d="M92 62V94M108 62V94" stroke="#000" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
const camisa = (c = "#111") => `
  <svg class="ropa" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camiseta">
    <path d="M70 30Q100 52 130 30L174 52L158 94L142 86V178H58V86L42 94L26 52Z" fill="${c}" stroke="#000" stroke-opacity=".2" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70 30Q100 52 130 30" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>
    <text x="100" y="112" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="800" font-size="26" letter-spacing="2" fill="${contraste(c)}" opacity=".9">PASO</text>
  </svg>`;
const dibujo = (p, c) =>
  p.cat === "buzos"
    ? buzo(c || p.suela)
    : p.cat === "camisas"
      ? camisa(c || p.suela)
      : zapato(p.suela, c || "#fff");
// Reseñas de ejemplo: id del producto -> [promedio, cantidad de reseñas]
const RESENAS = {
  1: [4.7, 128],
  2: [4.5, 86],
  3: [4.3, 54],
  4: [4.8, 203],
  5: [4.4, 41],
  6: [4.6, 67],
  7: [4.5, 112],
  8: [4.7, 95],
  9: [4.2, 38],
  10: [4.6, 246],
  11: [4.8, 174],
  12: [4.1, 29],
};
const estrellas = (p) => {
  const r = RESENAS[p.id];
  if (!r) return "";
  const nota = r[0].toFixed(1).replace(".", ",");
  return `<div class="rating"><span class="stars" style="--v:${r[0]}" role="img" aria-label="Valoración ${nota} de 5"></span><span class="rev">${nota} (${r[1]})</span></div>`;
};
const colorActual = (p) =>
  p.colores &&
  p.colores[colorSel[p.id] ?? p.colores.findIndex((c) => !c.agotado)];
const colorPorNombre = (p, n) => p.colores && p.colores.find((c) => c.n === n);
const imagen = (p, col) =>
  col && col.img
    ? `<img src="${col.img}" alt="${p.nombre}">`
    : p.img && (!col || col === p.colores[0])
      ? `<img src="${p.img}" alt="${p.nombre}">`
      : dibujo(p, col ? col.c : null);
const swatches = (p, attr = "data-color") => {
  const act = colorActual(p);
  if (!p.colores || !act) return "";
  return `<div class="swatches">${p.colores
    .map(
      (c, i) =>
        `<button class="sw ${c === act ? "sel" : ""} ${c.agotado ? "out" : ""}" ${attr}="${i}" style="--c:${c.c}" aria-label="${c.n}${c.agotado ? " (agotado)" : ""}" title="${c.n}${c.agotado ? " · Agotado" : ""}"></button>`,
    )
    .join(
      "",
    )}<span class="sw-name">${act.n}${act.agotado ? " · Agotado" : ""}</span></div>`;
};

// ---------- Estado ----------
let categoria = "todos",
  orden = "",
  tallas = {};
let busqueda = "";
let colorSel = {};
let usuario = JSON.parse(localStorage.getItem("paso-usuario") || "null");
let cupon = localStorage.getItem("paso-cupon") === "PASO10";
const descuento = (t) => (cupon ? Math.round(t * 0.1) : 0);
let carrito = JSON.parse(localStorage.getItem("paso-bolsa") || "[]").filter(
  (i) => productos.some((p) => p.id === i.id),
);
let favs = JSON.parse(localStorage.getItem("paso-favs") || "[]").filter((id) =>
  productos.some((p) => p.id === id),
);

// ---------- Hero y categorías ----------
// Hero animado: el zapato, el buzo y la camiseta van rotando solos
$("heroShoe").innerHTML = [
  zapato("#ff6a2b"),
  buzo("#e8dcc4"),
  camisa("#ff6a2b"),
]
  .map((s, i) => `<div class="hero-slide ${i === 0 ? "on" : ""}">${s}</div>`)
  .join("");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const slides = document.querySelectorAll(".hero-slide");
  let actual = 0;
  setInterval(() => {
    slides[actual].classList.remove("on");
    actual = (actual + 1) % slides.length;
    slides[actual].classList.add("on");
  }, 3500);
}
// Video opcional de fondo: si no existe videos/hero.mp4, se quita solo
$("heroVideo").addEventListener("error", (e) => e.target.remove());
$("tiles").innerHTML = [
  ["calzado", "Calzado", zapato("#ff6a2b"), (p) => !esRopa(p)],
  ["buzos", "Buzos", buzo("#0e1a2b"), (p) => p.cat === "buzos"],
  ["camisas", "Camisas", camisa("#ff6a2b"), (p) => p.cat === "camisas"],
]
  .map(
    ([k, n, svg, f]) => `
  <button class="tile" data-go="${k}">${svg}
    <span>${n}<small>${productos.filter(f).length} modelos</small></span></button>`,
  )
  .join("");

// ---------- Catálogo ----------
function mostrar() {
  let lista = productos.filter(
    (p) =>
      (categoria === "todos" ||
        (categoria === "ofertas"
          ? p.oferta
          : categoria === "calzado"
            ? !esRopa(p)
            : p.cat === categoria)) &&
      p.nombre.toLowerCase().includes(busqueda),
  );
  if (orden === "menor") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "mayor") lista.sort((a, b) => b.precio - a.precio);
  $("conteo").textContent = `(${lista.length})`;
  $("productos").innerHTML = lista
    .map(
      (p) => `
    <article class="card" data-id="${p.id}">
      <div class="media">
        ${p.oferta ? `<span class="tag">Oferta${p.antes ? " −" + Math.round((1 - p.precio / p.antes) * 100) + "%" : ""}</span>` : p.ultimas ? '<span class="tag tag-last">Últimas unidades</span>' : p.nuevo ? '<span class="tag tag-new">Nuevo</span>' : ""}
        <button class="fav ${favs.includes(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="Favorito">${favs.includes(p.id) ? "♥" : "♡"}</button>
        ${imagen(p, colorActual(p))}
        <div class="sizes">${tallasDe(p)
          .map(
            (t) =>
              `<button class="size ${tallas[p.id] === t ? "sel" : ""}" data-talla="${t}">${t}</button>`,
          )
          .join("")}</div>
      </div>
      <div class="info">
        <h3>${p.nombre}</h3>
        <span class="price">${formato(p.precio)}${p.antes ? `<span class="old">${formato(p.antes)}</span>` : ""}</span>
        <div class="meta"><span class="cat">${nombresCat[p.cat]}</span>${estrellas(p)}${swatches(p)}</div>
        <button class="add" ${colorActual(p) && colorActual(p).agotado ? "disabled" : ""}>${colorActual(p) && colorActual(p).agotado ? "Agotado" : "Agregar a la bolsa"}</button>
      </div>
    </article>`,
    )
    .join("");
}

function filtrar(cat) {
  categoria = cat;
  const esCalzado = ["calzado", "deportivos", "casuales", "formales"].includes(
    cat,
  );
  const grupo = esCalzado ? "calzado" : cat;
  $("subfiltros").hidden = !esCalzado;
  document.querySelectorAll(".filter").forEach((b) => {
    const activo = b.closest("#subfiltros")
      ? b.dataset.cat === cat
      : b.dataset.cat === grupo;
    b.classList.toggle("active", activo);
  });
  mostrar();
}
$("subfiltros").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (b) filtrar(b.dataset.cat);
});

document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (go) {
    filtrar(go.dataset.go);
    $("coleccion").scrollIntoView({ behavior: "smooth" });
  }
});
$("filtros").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (b) filtrar(b.dataset.cat);
});
$("orden").addEventListener("change", (e) => {
  orden = e.target.value;
  mostrar();
});

$("productos").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = Number(card.dataset.id);

  const fav = e.target.closest(".fav");
  if (fav) {
    favs = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    localStorage.setItem("paso-favs", JSON.stringify(favs));
    fav.classList.toggle("on");
    fav.textContent = favs.includes(id) ? "♥" : "♡";
    $("favNum").textContent = favs.length;
    return;
  }
  const talla = e.target.closest(".size");
  if (talla) {
    tallas[id] = tv(talla.dataset.talla);
    card
      .querySelectorAll(".size")
      .forEach((s) => s.classList.toggle("sel", s === talla));
    card.classList.remove("pick");
    return;
  }
  const add = e.target.closest(".add");
  if (add) {
    if (!tallas[id]) {
      card.classList.add("pick");
      add.classList.add("err");
      add.textContent = "Elige tu talla";
      setTimeout(() => {
        add.classList.remove("err");
        add.textContent = "Agregar a la bolsa";
      }, 1400);
      return;
    }
    agregar(id, tallas[id]);
    aviso("Agregado a tu bolsa");
  }
});

// ---------- Bolsa ----------
function agregar(id, talla) {
  const col = colorActual(productos.find((p) => p.id === id));
  const color = col ? col.n : "";
  const it = carrito.find(
    (i) => i.id === id && i.talla === talla && (i.color || "") === color,
  );
  it ? it.cantidad++ : carrito.push({ id, talla, color, cantidad: 1 });
  pintarBolsa();
}
function pintarBolsa() {
  localStorage.setItem("paso-bolsa", JSON.stringify(carrito));
  const total = carrito.reduce(
    (s, i) => s + i.cantidad * productos.find((p) => p.id === i.id).precio,
    0,
  );
  $("contador").textContent = carrito.reduce((s, i) => s + i.cantidad, 0);
  $("total").textContent = formato(total - descuento(total));
  $("cuponMsg").textContent = cupon
    ? `Cupón PASO10 aplicado: −${formato(descuento(total))}`
    : "";
  const falta = ENVIO_GRATIS - total;
  $("envioTxt").textContent =
    falta > 0
      ? `Te faltan ${formato(falta)} para el envío gratis`
      : "Tu pedido tiene envío gratis";
  $("envioBar").style.width = Math.min(100, (total / ENVIO_GRATIS) * 100) + "%";
  $("listaCarrito").innerHTML = carrito.length
    ? carrito
        .map((i, n) => {
          const p = productos.find((x) => x.id === i.id);
          return `<li class="cart-item">
      <button class="trash" data-x="${n}" aria-label="Eliminar ${p.nombre} de la bolsa"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg></button>
      <div class="cart-thumb">${imagen(p, colorPorNombre(p, i.color))}</div>
      <div class="cart-info"><strong>${p.nombre}</strong><span>Talla ${i.talla}${i.color ? " · " + i.color : ""}</span><span>${formato(p.precio)}</span>
        <div class="qty"><button data-n="${n}" data-d="-1" aria-label="Quitar uno">−</button><span>${i.cantidad}</span><button data-n="${n}" data-d="1" aria-label="Agregar uno">+</button></div>
      </div></li>`;
        })
        .join("")
    : '<li class="vacio">Tu bolsa está vacía.</li>';
}
$("listaCarrito").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-n]");
  if (!b) return;
  const it = carrito[b.dataset.n];
  it.cantidad += Number(b.dataset.d);
  if (it.cantidad <= 0) carrito.splice(b.dataset.n, 1);
  pintarBolsa();
});
const toggle = (abrir) => {
  $("carrito").classList.toggle("open", abrir);
  $("overlay").classList.toggle("open", abrir);
};
$("abrirCarrito").onclick = () => toggle(true);
$("cerrarCarrito").onclick = () => toggle(false);
$("overlay").onclick = () => toggle(false);
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && toggle(false),
);
$("pagar").onclick = () => abrirCheckout();

// ---------- Newsletter ----------
$("formNews").addEventListener("submit", (e) => {
  e.preventDefault();
  $("msgNews").textContent =
    "Listo. Usa el código PASO10 en tu bolsa y recibe 10% de descuento.";
  e.target.reset();
});

// Si una foto no carga, se muestra el dibujo del zapato en su lugar
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName !== "IMG") return;
    const p = productos.find((x) => x.nombre === e.target.alt);
    e.target.outerHTML = zapato(p ? p.suela : "#111");
  },
  true,
);

// ---------- Inicio ----------
$("favNum").textContent = favs.length;
mostrar();
pintarBolsa();

// =====================================================
// Ventanas (favoritos, pedido, ayuda, contacto) y menú móvil
// =====================================================
const modal = $("modal");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const subtotal = () =>
  carrito.reduce(
    (s, i) => s + i.cantidad * productos.find((p) => p.id === i.id).precio,
    0,
  );
const COSTO_ENVIO = 12000;

function abrirModal(titulo, html) {
  toggle(false);
  $("modalTitulo").textContent = titulo;
  $("modalCuerpo").innerHTML = html;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function cerrarModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

$("cerrarModal").onclick = cerrarModal;
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && cerrarModal(),
);
modal.addEventListener("click", (e) => {
  if (e.target === modal) return cerrarModal();
  const c = e.target.closest("[data-cerrar]");
  if (c) {
    cerrarModal();
    if (c.dataset.cerrar === "ir") {
      filtrar("todos");
      $("coleccion").scrollIntoView({ behavior: "smooth" });
    }
  }
  const ver = e.target.closest("[data-ver]");
  if (ver) {
    cerrarModal();
    filtrar("todos");
    const card = document.querySelector(`.card[data-id="${ver.dataset.ver}"]`);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 1800);
  }
  const quitar = e.target.closest("[data-quitar]");
  if (quitar) {
    favs = favs.filter((f) => f !== Number(quitar.dataset.quitar));
    localStorage.setItem("paso-favs", JSON.stringify(favs));
    $("favNum").textContent = favs.length;
    mostrar();
    abrirFavs();
  }
});

// ---------- Favoritos ----------
function abrirFavs() {
  if (!favs.length)
    return abrirModal(
      "Tus favoritos",
      `<p>Aún no tienes favoritos. Toca el corazón en un zapato para guardarlo aquí.</p><button class="btn btn-dark full" data-cerrar="ir">Ver colección</button>`,
    );
  abrirModal(
    "Tus favoritos",
    favs
      .map((id) => {
        const p = productos.find((x) => x.id === id);
        return `<div class="row"><div class="fav-thumb">${imagen(p, colorActual(p))}</div><div class="fav-name"><strong>${p.nombre}</strong><br><span class="cat">${formato(p.precio)}</span></div>
      <div class="row-btns"><button class="mini" data-ver="${id}">Ver</button><button class="mini" data-quitar="${id}">Quitar</button></div></div>`;
      })
      .join(""),
  );
}
$("abrirFavs").onclick = abrirFavs;

// ---------- Finalizar compra ----------
function abrirCheckout() {
  if (!carrito.length)
    return abrirModal(
      "Tu bolsa está vacía",
      `<p>Agrega un par para continuar con tu compra.</p><button class="btn btn-dark full" data-cerrar="ir">Seguir comprando</button>`,
    );
  const sub = subtotal(),
    envio = sub >= ENVIO_GRATIS ? 0 : COSTO_ENVIO;
  const lineas = carrito
    .map((i) => {
      const p = productos.find((x) => x.id === i.id);
      return `<div class="row"><span>${p.nombre} · Talla ${i.talla}${i.color ? " · " + i.color : ""} × ${i.cantidad}</span><strong>${formato(p.precio * i.cantidad)}</strong></div>`;
    })
    .join("");
  abrirModal(
    "Finalizar compra",
    `${lineas}
    <div class="row"><span>Envío</span><strong>${envio ? formato(envio) : "Gratis"}</strong></div>
    ${descuento(sub) ? `<div class="row"><span>Cupón PASO10</span><strong>−${formato(descuento(sub))}</strong></div>` : ""}
    <div class="row total-row"><span>Total</span><strong>${formato(sub - descuento(sub) + envio)}</strong></div>
    <form class="form" id="formPedido">
      <label>Nombre completo<input name="nombre" required autocomplete="name" value="${esc(usuario ? usuario.nombre : "")}"></label>
      <label>Correo<input name="correo" type="email" required autocomplete="email" value="${esc(usuario ? usuario.correo : "")}"></label>
      <label>Teléfono<input name="tel" type="tel" required autocomplete="tel"></label>
      <label>Ciudad<input name="ciudad" required></label>
      <label>Dirección<input name="dir" required autocomplete="street-address"></label>
      <label>Método de pago<select name="pago"><option>Tarjeta</option><option>PSE</option><option>Nequi</option><option>Contra entrega</option></select></label>
      <button class="btn btn-dark full" type="submit">Confirmar pedido</button>
    </form>`,
  );
}

// ---------- Formularios dentro de ventanas ----------
modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  if (e.target.id === "formPedido") {
    const n = "PASO-" + Math.floor(10000 + Math.random() * 90000);
    carrito = [];
    pintarBolsa();
    $("modalTitulo").textContent = "¡Pedido confirmado!";
    $("modalCuerpo").innerHTML =
      `<p>Gracias, ${esc(f.get("nombre"))}. Tu pedido <strong>${n}</strong> quedó registrado y te enviaremos la confirmación a ${esc(f.get("correo"))}.</p><button class="btn btn-dark full" data-cerrar="ir">Seguir comprando</button>`;
  }
  if (e.target.id === "formContacto") {
    $("modalTitulo").textContent = "Mensaje enviado";
    $("modalCuerpo").innerHTML =
      `<p>Gracias, ${esc(f.get("nombre"))}. Te responderemos a ${esc(f.get("correo"))} lo antes posible.</p><button class="btn btn-dark full" data-cerrar>Cerrar</button>`;
  }
});

// ---------- Páginas de ayuda (textos de ejemplo: cámbialos por los tuyos) ----------
const paginas = {
  envios: [
    "Envíos",
    `<p>Enviamos a toda Colombia en 2 a 4 días hábiles.</p><p>El envío es gratis en compras desde ${formato(ENVIO_GRATIS)}. Por debajo de ese valor cuesta ${formato(COSTO_ENVIO)}.</p>`,
  ],
  cambios: [
    "Cambios y devoluciones",
    `<p>Tienes 30 días desde que recibes tu pedido para pedir un cambio o devolución.</p><p>El calzado debe estar sin uso y en su caja original.</p>`,
  ],
  tallas: [
    "Guía de tallas",
    `<p>Mide tu pie sobre una hoja, de talón a dedo más largo, y compara. Medidas de referencia:</p>
    <table class="tabla"><tr><th>Talla</th><th>Largo del pie</th></tr>${[
      [37, 23.5],
      [38, 24],
      [39, 25],
      [40, 25.5],
      [41, 26.5],
      [42, 27],
    ]
      .map(([t, c]) => `<tr><td>${t}</td><td>${c} cm</td></tr>`)
      .join("")}</table>`,
  ],
  nosotros: [
    "Nosotros",
    `<p>PASO nació para ofrecer calzado y ropa cómodos, bien hechos y a buen precio. Cada prenda está pensada para acompañarte en tu día a día.</p>`,
  ],
  terminos: [
    "Términos y privacidad",
    `<p>Al comprar en PASO aceptas nuestras condiciones de venta. Usamos tus datos solo para procesar tu pedido y contactarte, y no los compartimos con terceros.</p>`,
  ],
};
function abrirContacto() {
  abrirModal(
    "Contacto",
    `<p>Escríbenos y te respondemos lo antes posible.</p>
    <form class="form" id="formContacto">
      <label>Nombre<input name="nombre" required></label>
      <label>Correo<input name="correo" type="email" required></label>
      <label>Mensaje<textarea name="mensaje" rows="4" required></textarea></label>
      <button class="btn btn-dark full" type="submit">Enviar mensaje</button>
    </form>`,
  );
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-info]");
  if (!a) return;
  e.preventDefault();
  a.dataset.info === "contacto"
    ? abrirContacto()
    : abrirModal(...paginas[a.dataset.info]);
});

// ---------- Menú móvil ----------
const navEl = document.querySelector(".nav");
$("menuBtn").onclick = () =>
  $("menuBtn").setAttribute("aria-expanded", navEl.classList.toggle("open"));
document.addEventListener("click", (e) => {
  if (e.target.closest(".nav a")) {
    navEl.classList.remove("open");
    $("menuBtn").setAttribute("aria-expanded", "false");
  }
});

// =====================================================
// Buscador, aviso al agregar, cupón y vista rápida
// =====================================================
$("buscar").addEventListener("input", (e) => {
  busqueda = e.target.value.trim().toLowerCase();
  mostrar();
});

const toastEl = document.createElement("button");
toastEl.className = "toast";
document.body.appendChild(toastEl);
let toastT;
function aviso(msg) {
  toastEl.textContent = msg + " · Ver bolsa";
  toastEl.classList.add("on");
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove("on"), 3000);
}
toastEl.onclick = () => {
  toastEl.classList.remove("on");
  toggle(true);
};

$("formCupon").addEventListener("submit", (e) => {
  e.preventDefault();
  cupon = $("cuponIn").value.trim().toUpperCase() === "PASO10";
  localStorage.setItem("paso-cupon", cupon ? "PASO10" : "");
  pintarBolsa();
  if (!cupon) $("cuponMsg").textContent = "Ese código no es válido";
});

// Textos de ejemplo por categoría: cámbialos por la descripción real de cada modelo
const DESC = {
  buzos:
    "Tela suave y abrigada, corte cómodo y capucha ajustable. Ideal para el frío y para el día a día.",
  camisas:
    "Algodón fresco y liviano, de caída cómoda. Una prenda básica que combina con todo.",
  deportivos:
    "Amortiguación ligera y suela con buen agarre para correr y entrenar todos los días.",
  casuales:
    "Comodidad para el día a día, con un diseño limpio que combina con todo.",
  formales:
    "Acabado elegante y horma cómoda para la oficina, eventos y ocasiones especiales.",
};
function vistaRapida(id) {
  const p = productos.find((x) => x.id === id);
  abrirModal(
    p.nombre,
    `<div class="qv"><div class="qv-img">${imagen(p, colorActual(p))}</div><div>
      <p class="cat">${nombresCat[p.cat]}</p>
      ${estrellas(p)}
      <p class="qv-price"><strong>${formato(p.precio)}</strong>${p.antes ? `<span class="old">${formato(p.antes)}</span>` : ""}</p>
      <p>${DESC[p.cat]}</p>
      ${swatches(p, "data-qc")}
      <div class="qv-sizes">${tallasDe(p)
        .map((t) => `<button class="size" data-qt="${t}">${t}</button>`)
        .join("")}</div>
      <button class="btn btn-dark full" data-qadd="${p.id}" ${colorActual(p) && colorActual(p).agotado ? "disabled" : ""}>${colorActual(p) && colorActual(p).agotado ? "Agotado" : "Agregar a la bolsa"}</button>
      <p class="qv-msg" id="qvMsg" role="status"></p></div></div>`,
  );
}
$("productos").addEventListener("click", (e) => {
  if (e.target.closest(".fav, .size, .add, .sw")) return;
  const card = e.target.closest(".card");
  if (card) vistaRapida(Number(card.dataset.id));
});
modal.addEventListener("click", (e) => {
  const t = e.target.closest("[data-qt]");
  if (t) {
    modal
      .querySelectorAll("[data-qt]")
      .forEach((s) => s.classList.toggle("sel", s === t));
    $("qvMsg").textContent = "";
  }
  const a = e.target.closest("[data-qadd]");
  if (a) {
    const sel = modal.querySelector("[data-qt].sel");
    if (!sel) return ($("qvMsg").textContent = "Elige tu talla para continuar");
    agregar(Number(a.dataset.qadd), tv(sel.dataset.qt));
    cerrarModal();
    aviso("Agregado a tu bolsa");
  }
});

// Eliminar un producto completo de la bolsa (basurita)
$("listaCarrito").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-x]");
  if (!b) return;
  carrito.splice(Number(b.dataset.x), 1);
  pintarBolsa();
});

// =====================================================
// Cuenta: iniciar sesión / crear cuenta (versión de demostración)
// =====================================================
function pintarCuenta() {
  $("cuentaTxt").textContent = usuario
    ? "Hola, " + usuario.nombre.split(" ")[0]
    : "Ingresar";
}
function entrar(u) {
  usuario = u;
  localStorage.setItem("paso-usuario", JSON.stringify(u));
  pintarCuenta();
  abrirModal(
    "¡Bienvenido!",
    `<p>Ya iniciaste sesión, ${esc(u.nombre)}. Tus datos se completarán solos al finalizar la compra.</p><button class="btn btn-dark full" data-cerrar>Seguir comprando</button>`,
  );
}
function abrirCuenta(tab = "login") {
  if (usuario)
    return abrirModal(
      "Mi cuenta",
      `<p>Hola, <strong>${esc(usuario.nombre)}</strong>.</p>${usuario.correo ? `<p>${esc(usuario.correo)}</p>` : ""}<button class="btn btn-dark full" data-salir>Cerrar sesión</button>`,
    );
  const reg = tab === "registro";
  abrirModal(
    reg ? "Crea tu cuenta" : "Inicia sesión",
    `<div class="tabs"><button class="${reg ? "" : "on"}" data-tab="login">Iniciar sesión</button><button class="${reg ? "on" : ""}" data-tab="registro">Crear cuenta</button></div>
    <div class="social">
      <button data-social="Google"><i style="background:#ea4335">G</i>Continuar con Google</button>
      <button data-social="Facebook"><i style="background:#1877f2">f</i>Continuar con Facebook</button>
      <button data-social="Apple"><i style="background:#000">A</i>Continuar con Apple</button>
    </div>
    <div class="or">o con tu correo</div>
    <form class="form" id="${reg ? "formRegistro" : "formLogin"}">
      ${reg ? '<label>Nombre completo<input name="nombre" required autocomplete="name"></label>' : ""}
      <label>Correo<input name="correo" type="email" required autocomplete="email"></label>
      <label>Contraseña<input name="clave" type="password" required minlength="6" autocomplete="${reg ? "new-password" : "current-password"}"></label>
      <button class="btn btn-dark full" type="submit">${reg ? "Crear cuenta" : "Iniciar sesión"}</button>
    </form>`,
  );
}
$("abrirCuenta").onclick = () => abrirCuenta();
modal.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab]");
  if (t) abrirCuenta(t.dataset.tab);
  const s = e.target.closest("[data-social]");
  if (s)
    entrar({
      nombre: "Cliente " + s.dataset.social,
      correo: "",
      via: s.dataset.social,
    });
  if (e.target.closest("[data-salir]")) {
    usuario = null;
    localStorage.removeItem("paso-usuario");
    pintarCuenta();
    cerrarModal();
  }
});
modal.addEventListener("submit", (e) => {
  if (e.target.id !== "formLogin" && e.target.id !== "formRegistro") return;
  const f = new FormData(e.target);
  const correo = String(f.get("correo")).trim();
  entrar({
    nombre: String(f.get("nombre") || correo.split("@")[0]).trim(),
    correo,
  });
});
pintarCuenta();

// Elegir color (tarjeta y vista rápida)
$("productos").addEventListener("click", (e) => {
  const b = e.target.closest(".sw");
  if (!b) return;
  colorSel[Number(b.closest(".card").dataset.id)] = Number(b.dataset.color);
  mostrar();
});
modal.addEventListener("click", (e) => {
  const b = e.target.closest("[data-qc]");
  if (!b) return;
  const id = Number(modal.querySelector("[data-qadd]").dataset.qadd);
  colorSel[id] = Number(b.dataset.qc);
  mostrar();
  vistaRapida(id);
});

// Botón de volver arriba: aparece al bajar y sube suavemente al inicio
const subir = $("subir");
window.addEventListener(
  "scroll",
  () => subir.classList.toggle("on", window.scrollY > 600),
  { passive: true },
);
subir.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
