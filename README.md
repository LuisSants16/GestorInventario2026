# 📦 Bodega Santos – Sistema de Control de Inventario

Sistema web de gestión de inventario desarrollado con **HTML, CSS y JavaScript puro**, diseñado para controlar entradas, salidas y stock de repuestos de forma simple, visual y profesional.

---

## 🚀 Características

### 📊 Dashboard
- Total de productos
- Stock bajo
- Movimientos del día
- Gráfica visual de inventario

### 📦 Inventario
- Vista general de productos
- Indicador de stock (Normal / Bajo)
- Interfaz moderna tipo card

### ➕ Añadir Productos
Registro de productos con:

- Documento de ingreso
- Número de documento
- Código
- Nombre
- Stock inicial
- Fecha de ingreso
- Vista previa en tiempo real
- Resumen rápido
- Últimos ingresos

### ➖ Consumir Productos
- Búsqueda inteligente por código
- Vista previa automática de salida
- Validación de stock
- Registro de motivo
- Fecha de consumo
- Historial de últimos consumos

### ⚙️ Configuración
- Modo claro / oscuro
- Persistencia con localStorage

---

## 🧠 Tecnologías Utilizadas

- HTML5
- CSS3 (Grid + Responsive Design)
- JavaScript Vanilla
- LocalStorage
- Lucide Icons
- Font Awesome

---

## 📱 Diseño Responsive

Optimizado para:

- 🖥 Desktop  
- 💻 Laptop  
- 📱 Tablet  
- 📲 Mobile  

Sidebar adaptable y menú hamburguesa en pantallas pequeñas.

---

## 📂 Estructura del Proyecto

```
Bodega-Santos/
│
├── css/
│   ├── global.css
│   ├── layout.css
│   ├── inventario.css
│   ├── añadir.css
│   └── consumir.css
│
├── js/
│   ├── store.js
│   ├── ui.js
│   ├── inventario.js
│   ├── añadir.js
│   └── consumir.js
│
├── index.html
├── inventario.html
├── añadir.html
├── consumir.html
├── configuracion.html
└── README.md
```

---

## 💾 Persistencia de Datos

El sistema utiliza **localStorage**, lo que permite:

- Mantener datos al recargar
- No requerir base de datos
- Funcionar completamente offline

---

## 🎯 Objetivo del Proyecto

Proyecto desarrollado como práctica avanzada de:

- Manipulación del DOM
- Organización modular de código
- Diseño UI profesional
- Lógica de inventario real
- Estructura tipo sistema empresarial

---

## 👨‍💻 Autor

**Luis Santos**  
