document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ICONOS LUCIDE
  ==========================*/
  if (window.lucide) {
    lucide.createIcons();
  }

  /* =========================
   TOGGLE MODO CLARO GLOBAL
=========================*/

  const toggle = document.getElementById("toggleTheme");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
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
    const bajo = productos.filter((p) => Number(p.stock) <= 5).length;
    document.getElementById("stockBajo").textContent = bajo;

    // Movimientos hoy
    const hoy = new Date().toDateString();
    const movHoy = movimientos.filter(
      (m) => new Date(m.fecha).toDateString() === hoy,
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
          line_linked: { enable: true },
        },
      });
    }

    /* =========================
       GRÁFICO
    ==========================*/
    const ctx = document.getElementById("stockChart");

    if (ctx && window.Chart) {
      const labels = productos.map((p) => p.nombre || p.codigo);
      const data = productos.map((p) => Number(p.stock) || 0);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Stock Actual",
              data,
              backgroundColor: "#2563eb",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }
});

/* =========================
   SIDEBAR MOBILE LIMPIO
=========================*/

const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

// Solo aplicar lógica si es pantalla móvil
function esMobile() {
  return window.innerWidth <= 768;
}

menuOpen.addEventListener("click", () => {
  if (!esMobile()) return;

  sidebar.classList.add("active");
  overlay.classList.add("active");
  menuOpen.style.display = "none";
});

menuClose.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  menuOpen.style.display = "flex";
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  menuOpen.style.display = "flex";
});

// Si cambia el tamaño de pantalla, limpiar estado
window.addEventListener("resize", () => {
  if (!esMobile()) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuOpen.style.display = "none";
  }
});
