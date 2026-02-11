const KEY_PRODUCTOS = "productos";
const KEY_MOVIMIENTOS = "movimientos";

/* =========================
   PRODUCTOS
=========================*/

function getProductos() {
  return JSON.parse(localStorage.getItem(KEY_PRODUCTOS)) || [];
}

function setProductos(productos) {
  localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productos));
}

/* =========================
   MOVIMIENTOS
=========================*/

function getMovimientos() {
  return JSON.parse(localStorage.getItem(KEY_MOVIMIENTOS)) || [];
}

function setMovimientos(movimientos) {
  localStorage.setItem(KEY_MOVIMIENTOS, JSON.stringify(movimientos));
}

/* =========================
   FUNCIONES AUXILIARES
=========================*/

function agregarProducto(nuevoProducto) {
  const productos = getProductos();
  productos.push(nuevoProducto);
  setProductos(productos);
}

function agregarMovimiento(nuevoMovimiento) {
  const movimientos = getMovimientos();
  movimientos.push(nuevoMovimiento);
  setMovimientos(movimientos);
}
