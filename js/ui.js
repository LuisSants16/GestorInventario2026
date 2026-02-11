document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ICONOS LUCIDE
  ==========================*/
  if (window.lucide) {
    lucide.createIcons();
  }

  /* =========================
     TOGGLE TEMA
  ==========================*/
  const toggle = document.getElementById("toggleTheme");
  const themeText = document.getElementById("themeText");

  if (toggle) {
    const savedTheme = localStorage.getItem("theme") || "dark";

    if (savedTheme === "light") {
      document.body.classList.add("light");
      toggle.checked = true;
      if (themeText) themeText.textContent = "Modo Claro";
    }

    toggle.addEventListener("change", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      if (themeText) {
        themeText.textContent = isLight ? "Modo Claro" : "Modo Oscuro";
      }
    });
  }

  /* =========================
     DASHBOARD (solo index)
  ==========================*/
  const totalElement = document.getElementById("totalProductos");

  if (totalElement) {

    const productos = getProductos();
    const movimientos = getMovimientos();

    // Total productos
    totalElement.textContent = productos.length;

    // Stock bajo
    const bajo = productos.filter(p => Number(p.stock) <= 5).length;
    document.getElementById("stockBajo").textContent = bajo;

    // Movimientos hoy
    const hoy = new Date().toDateString();
    const movHoy = movimientos.filter(m =>
      new Date(m.fecha).toDateString() === hoy
    ).length;

    document.getElementById("movimientosHoy").textContent = movHoy;

    /* =========================
       PARTICLES
    ==========================*/
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 30 },
          size: { value: 3 },
          move: { speed: 0.6 },
          line_linked: { enable: true }
        }
      });
    }

    /* =========================
       GRÁFICO
    ==========================*/
    const ctx = document.getElementById("stockChart");

    if (ctx && window.Chart) {

      const labels = productos.map(p => p.nombre || p.codigo);
      const data = productos.map(p => Number(p.stock) || 0);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Stock Actual",
            data,
            backgroundColor: "#2563eb"
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

  }

});

/* =========================
   SIDEBAR RESPONSIVE
=========================*/

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

if(menuToggle){
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

if(overlay){
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}
