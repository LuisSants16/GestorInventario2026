document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CAMBIO DE TABS
  ==========================*/
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  /* =========================
     ELEMENTOS AGREGAR
  ==========================*/
  const form = document.getElementById("formAgregar");
  const documentoSelect = document.getElementById("documento");
  const grupoNumero = document.getElementById("grupoNumeroDocumento");
  const numeroDocumentoInput = document.getElementById("numeroDocumento");

  // Ocultar número al inicio
  grupoNumero.style.display = "none";

  // Mostrar u ocultar número según tipo
  documentoSelect.addEventListener("change", () => {
    const tipo = documentoSelect.value;

    if (tipo === "Factura" || tipo === "Boleta") {
      grupoNumero.style.display = "block";
    } else {
      grupoNumero.style.display = "none";
      numeroDocumentoInput.value = "";
    }
  });

  /* =========================
     AGREGAR PRODUCTO
  ==========================*/
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const stock = Number(document.getElementById("stock").value);
    const documento = documentoSelect.value;
    const numeroDocumento = numeroDocumentoInput.value.trim();
    const fechaIngreso = document.getElementById("fechaIngreso").value;

    // Validaciones básicas
    if (!codigo || !nombre || stock < 0 || !fechaIngreso) {
      alert("Completa correctamente los campos obligatorios");
      return;
    }

    // Validar número si es factura o boleta
    if ((documento === "Factura" || documento === "Boleta") && !numeroDocumento) {
      alert("Debes ingresar el número del documento");
      return;
    }

    const productos = getProductos();

    if (productos.some((p) => p.codigo === codigo)) {
      alert("Ese código ya existe");
      return;
    }

    const nuevoProducto = {
      codigo,
      nombre,
      stock,
      documento,
      numeroDocumento: documento === "Sin Documento" ? null : numeroDocumento,
      fechaIngreso,
    };

    productos.push(nuevoProducto);
    setProductos(productos);

    alert("Producto agregado correctamente");

    form.reset();
    grupoNumero.style.display = "none";
  });

  /* =========================
     BUSCAR Y EDITAR PRODUCTO
  ==========================*/
  const buscarInput = document.getElementById("buscarCodigo");
  const codigoEditar = document.getElementById("codigoEditar");
  const nombreActual = document.getElementById("nombreActual");
  const nuevoNombreInput = document.getElementById("nuevoNombre");
  const btnEditar = document.getElementById("btnEditar");

  let productoSeleccionado = null;

  buscarInput.addEventListener("input", () => {
    const codigo = buscarInput.value.trim();
    const productos = getProductos();

    const encontrado = productos.find((p) => p.codigo === codigo);

    if (encontrado) {
      codigoEditar.value = encontrado.codigo;
      nombreActual.value = encontrado.nombre;
      productoSeleccionado = encontrado;
    } else {
      codigoEditar.value = "";
      nombreActual.value = "";
      productoSeleccionado = null;
    }
  });

  btnEditar.addEventListener("click", () => {
    if (!productoSeleccionado) {
      alert("Busca primero un código válido");
      return;
    }

    const nuevoNombre = nuevoNombreInput.value.trim();

    if (!nuevoNombre) {
      alert("Ingresa un nuevo nombre");
      return;
    }

    const productos = getProductos();
    const index = productos.findIndex(
      (p) => p.codigo === productoSeleccionado.codigo
    );

    if (index === -1) {
      alert("Producto no encontrado");
      return;
    }

    productos[index].nombre = nuevoNombre;
    setProductos(productos);

    alert("Nombre actualizado correctamente");

    nombreActual.value = nuevoNombre;
    nuevoNombreInput.value = "";
  });

});
