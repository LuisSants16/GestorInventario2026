document.addEventListener("DOMContentLoaded", () => {
  const productoInput = document.getElementById("productoInput");
  const listaResultados = document.getElementById("listaResultados");
  const stockActualInput = document.getElementById("stockActual");
  const cantidadInput = document.getElementById("cantidadConsumir");
  const motivoInput = document.getElementById("motivo");
  const form = document.getElementById("formConsumo");

  const pvProducto = document.getElementById("pvProducto");
  const pvStockAntes = document.getElementById("pvStockAntes");
  const pvCantidad = document.getElementById("pvCantidad");
  const pvStockDespues = document.getElementById("pvStockDespues");

  const listaConsumos = document.getElementById("listaConsumos");

  const fechaInput = document.getElementById("fechaConsumo");
  const pvFecha = document.getElementById("pvFecha");

  let productoSeleccionado = null;

  /* =========================
     AUTOCOMPLETE
  ==========================*/

  productoInput.addEventListener("input", () => {
    const valor = productoInput.value.trim().toLowerCase();
    const productos = getProductos();

    listaResultados.innerHTML = "";

    if (valor === "") {
      listaResultados.style.display = "none";
      return;
    }

    const filtrados = productos.filter((p) =>
      p.codigo.toLowerCase().includes(valor),
    );

    if (filtrados.length === 0) {
      listaResultados.style.display = "none";
      return;
    }

    filtrados.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("resultado-item");
      div.textContent = `${p.codigo} - ${p.nombre}`;

      div.addEventListener("click", () => {
        productoSeleccionado = p;
        productoInput.value = p.codigo;
        stockActualInput.value = p.stock;
        listaResultados.style.display = "none";
        actualizarPreview();
      });

      listaResultados.appendChild(div);
    });

    listaResultados.style.display = "block";
  });

  /* =========================
     PREVIEW
  ==========================*/

  function actualizarPreview() {
    if (!productoSeleccionado) return;

    const cantidad = Number(cantidadInput.value || 0);

    pvProducto.textContent = productoSeleccionado.nombre;
    pvStockAntes.textContent = productoSeleccionado.stock;
    pvCantidad.textContent = cantidad || "—";

    const nuevoStock = productoSeleccionado.stock - cantidad;
    pvStockDespues.textContent =
      nuevoStock >= 0 ? nuevoStock : "Stock insuficiente";

    pvFecha.textContent = fechaInput.value || "—";
  }

  cantidadInput.addEventListener("input", actualizarPreview);

  /* =========================
     REGISTRAR CONSUMO
  ==========================*/

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!productoSeleccionado) {
      alert("Selecciona un producto válido");
      return;
    }

    const productos = getProductos();
    const movimientos = getMovimientos();

    const cantidad = Number(cantidadInput.value);
    const motivo = motivoInput.value.trim();

    const index = productos.findIndex(
      (p) => p.codigo === productoSeleccionado.codigo,
    );

    if (productos[index].stock < cantidad) {
      alert("Stock insuficiente");
      return;
    }

    productos[index].stock -= cantidad;

    movimientos.push({
      tipo: "salida",
      producto: productos[index].nombre,
      codigo: productos[index].codigo,
      cantidad,
      motivo,
      fecha: fechaInput.value,
    });

    setProductos(productos);
    setMovimientos(movimientos);

    alert("Consumo registrado correctamente");

    form.reset();
    productoSeleccionado = null;
    stockActualInput.value = "";

    pvProducto.textContent = "—";
    pvStockAntes.textContent = "—";
    pvCantidad.textContent = "—";
    pvStockDespues.textContent = "—";

    actualizarUltimos();
  });

  /* =========================
     ÚLTIMOS CONSUMOS
  ==========================*/

  function actualizarUltimos() {
    const movimientos = getMovimientos();
    const ultimos = movimientos
      .filter((m) => m.tipo === "salida")
      .slice(-5)
      .reverse();

    listaConsumos.innerHTML = "";

    if (ultimos.length === 0) {
      listaConsumos.innerHTML = `<div class="recent-empty">Aún no hay consumos</div>`;
      return;
    }

    ultimos.forEach((m) => {
      const div = document.createElement("div");
      div.classList.add("recent-item");

    div.innerHTML = `
      <div class="ri-top">
        <span>${m.codigo}</span>
        <span>- ${m.cantidad}</span>
      </div>
      <div>${m.producto}</div>
      <div style="font-size:12px; opacity:0.6;">
        ${m.fecha}
      </div>
    `;

      listaConsumos.appendChild(div);
    });
  }

  actualizarUltimos();
});
