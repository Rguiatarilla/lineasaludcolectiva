# Línea del Tiempo · Salud Colectiva

Línea de tiempo interactiva sobre la evolución de la **Salud Colectiva** y la **Medicina Social** en América Latina y Colombia.

## Características

- Diseño moderno y responsive (escritorio, tablet y móvil).
- 4 etapas con 24 hitos históricos, cada uno con icono, descripción y enlace de referencia.
- Línea de tiempo en zigzag sobre una ilustración, con tarjetas de etapa desplegables.
- Modal de detalle por hito con navegación entre hitos e interstitial al cambiar de etapa.
- Accesibilidad: navegación por teclado, foco visible y soporte de `prefers-reduced-motion`.

## Estructura del proyecto

```
linea salud colectiva/
├── index.html          # Estructura de la página
├── css/
│   └── styles.css      # Estilos y animaciones
├── js/
│   ├── data.js         # Datos de las 4 etapas y 24 hitos
│   └── app.js          # Lógica (render, modal, animaciones)
└── assets/
    └── images/         # Iconos de los hitos + ilustración de la línea de tiempo
```

## Cómo ejecutarlo

No requiere servidor ni instalación. Solo abre el archivo **`index.html`** con doble clic
en cualquier navegador (Chrome, Edge, Firefox).

> Los iconos de los hitos están incluidos en `assets/images/`.

## Personalización

- **Iconos de los hitos:** reemplaza los archivos PNG en `assets/images/` manteniendo el mismo nombre.
- **Colores y velocidades:** variables al inicio de `css/styles.css` (sección `:root`).
- **Contenido de los hitos:** `js/data.js`.
