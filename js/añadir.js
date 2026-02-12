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
    actualizarResumen();

    alert("Producto agregado correctamente");

    form.reset();
    actualizarPreview();
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

/* =========================
   VISTA PREVIA DINÁMICA
=========================*/

const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputStock = document.getElementById("stock");
const inputDocumento = document.getElementById("documento");
const inputNumeroDoc = document.getElementById("numeroDocumento");
const inputFecha = document.getElementById("fechaIngreso");

// Elementos preview
const pvCodigo = document.getElementById("pvCodigo");
const pvNombre = document.getElementById("pvNombre");
const pvStock = document.getElementById("pvStock");
const pvDoc = document.getElementById("pvDoc");
const pvFecha = document.getElementById("pvFecha");

function actualizarPreview(){

  // Código
  pvCodigo.textContent = inputCodigo.value || "—";

  // Nombre
  pvNombre.textContent = inputNombre.value || "—";

  // Stock
  pvStock.textContent = inputStock.value || "—";

  // Documento
  let tipo = inputDocumento.value;
  let numero = inputNumeroDoc.value.trim();

  let docTexto = "—";

  if(tipo === "Factura"){
    docTexto = numero ? `F - ${numero}` : "F - (sin número)";
  }
  else if(tipo === "Boleta"){
    docTexto = numero ? `B - ${numero}` : "B - (sin número)";
  }
  else if(tipo === "Sin Documento"){
    docTexto = "S.D";
  }

  pvDoc.textContent = docTexto;

  // Fecha
  if(inputFecha.value){
    const fecha = new Date(inputFecha.value);
    pvFecha.textContent = fecha.toLocaleDateString("es-PE");
  }else{
    pvFecha.textContent = "—";
  }

}

// Escuchar cambios
[inputCodigo, inputNombre, inputStock, inputDocumento, inputNumeroDoc, inputFecha]
.forEach(input => {
  input.addEventListener("input", actualizarPreview);
});

/* =========================
   RESUMEN DINÁMICO
=========================*/

const rsTotal = document.getElementById("rsTotal");
const rsStockTotal = document.getElementById("rsStockTotal");
const rsBajo = document.getElementById("rsBajo");

function actualizarResumen(){

  const productos = getProductos();

  // Total productos
  rsTotal.textContent = productos.length;

  // Stock total
  const totalStock = productos.reduce((acc, p) => {
    return acc + Number(p.stock || 0);
  }, 0);

  rsStockTotal.textContent = totalStock;

  // Stock bajo (<=5)
  const bajo = productos.filter(p => Number(p.stock) <= 5).length;
  rsBajo.textContent = bajo;

}

// Ejecutar al cargar página
actualizarResumen();