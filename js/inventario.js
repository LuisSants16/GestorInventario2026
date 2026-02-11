document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaInventario");
  const buscador = document.getElementById("buscador");

  function renderTabla(filtro = "") {
    const productos = getProductos();

    tabla.innerHTML = "";

    productos
      .filter(
        (p) =>
          p.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
          p.codigo?.toLowerCase().includes(filtro.toLowerCase()),
      )
      .forEach((producto) => {
        const tr = document.createElement("tr");

        const stock = Number(producto.stock);

        let estado = "";
        let clase = "";

        if (stock <= 5) {
          estado = "Crítico";
          clase = "badge-critico";
        } else if (stock <= 10) {
          estado = "Bajo";
          clase = "badge-bajo";
        } else {
          estado = "Normal";
          clase = "badge-normal";
        }

        // FORMATO DOCUMENTO
        let docTexto = "";

        if (producto.documento === "Factura") {
          docTexto = `F - ${producto.numeroDocumento}`;
        } else if (producto.documento === "Boleta") {
          docTexto = `B - ${producto.numeroDocumento}`;
        } else {
          docTexto = "S.D";
        }

        tr.innerHTML = `
          <td data-label="Código">${producto.codigo}</td>
          <td data-label="Nombre">${producto.nombre}</td>
          <td data-label="Documento">${docTexto}</td>
          <td data-label="Stock">
            ${stock}
            <span class="badge ${clase}">${estado}</span>
          </td>
        `;

        tabla.appendChild(tr);
      });
  }

  buscador.addEventListener("input", (e) => {
    renderTabla(e.target.value);
  });

  renderTabla();
});
