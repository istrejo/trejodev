# Implementación — Logo animado con transición en hover

## Objetivo

Implementar en mi landing page un componente de logo que fusione dos estados visuales:

1. **Estado inicial:** logo triangular.
2. **Estado hover:** logo tipo `T`.

Al hacer hover sobre el logo, debe cambiar automáticamente del logo triangular al logo tipo `T` con una animación fluida. No debe ser un simple cambio de imagen; debe sentirse como una transformación suave de marca.

---

## Requisitos visuales

- Mantener fondo oscuro con bordes redondeados.
- Usar los colores de marca:
  - Rojo principal: `#ed0033`
  - Blanco: `#f3f3f3`
  - Fondo: `#020304`
- El logo debe ser SVG inline, no una imagen `.png`.
- El estado inicial debe ser el triángulo.
- El estado hover debe revelar el logo tipo `T`.
- La transición debe usar:
  - `opacity`
  - `transform`
  - `scale`
  - `rotate`
  - `stroke-dasharray`
  - `stroke-dashoffset`
- Debe incluir soporte para `prefers-reduced-motion`.
- Debe ser reutilizable como componente.

---

## HTML / Template

Usa este SVG inline dentro del componente del logo:

```html
<a class="brand-logo" href="/" aria-label="Trejodev logo">
  <svg
    viewBox="0 0 400 400"
    class="brand-logo__svg"
    role="img"
    aria-hidden="true"
  >
    <rect class="brand-logo__bg" width="400" height="400" rx="72" />

    <!-- Estado 1: logo triangular -->
    <g class="logo-state logo-state--triangle">
      <path
        class="triangle-outline"
        d="M120 276 L200 116 L280 276 Z"
      />

      <path
        class="triangle-inner"
        d="M169 198 L200 136 L231 198"
      />

      <rect
        class="triangle-dot"
        x="190"
        y="241"
        width="21"
        height="21"
      />
    </g>

    <!-- Estado 2: logo tipo T -->
    <g class="logo-state logo-state--t">
      <path
        class="t-red"
        d="M88 134 H312"
      />

      <path
        class="t-white"
        d="M200 130 V310"
      />

      <path
        class="t-red-small t-red-small--left"
        d="M146 134 V170"
      />

      <path
        class="t-red-small t-red-small--right"
        d="M263 134 V160"
      />

      <rect
        class="t-red-block"
        x="190"
        y="220"
        width="22"
        height="22"
      />
    </g>
  </svg>
</a>
```

---

## CSS / SCSS

Añade estos estilos al archivo del componente. Si la app usa SCSS, puede pegarse tal cual en `brand-logo.component.scss`.

```scss
.brand-logo {
  width: 96px;
  height: 96px;
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
}

.brand-logo__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.brand-logo__bg {
  fill: #020304;
}

.logo-state {
  transform-origin: 200px 200px;
  transition:
    opacity 420ms ease,
    transform 520ms cubic-bezier(.2, .8, .2, 1),
    filter 420ms ease;
}

.logo-state--triangle {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.logo-state--t {
  opacity: 0;
  transform: scale(.86) rotate(-6deg);
}

.brand-logo:hover .logo-state--triangle,
.brand-logo:focus-visible .logo-state--triangle {
  opacity: 0;
  transform: scale(.86) rotate(6deg);
}

.brand-logo:hover .logo-state--t,
.brand-logo:focus-visible .logo-state--t {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.triangle-outline {
  fill: none;
  stroke: #ed0033;
  stroke-width: 20;
  stroke-linejoin: round;
  stroke-linecap: round;
  transition:
    stroke-dashoffset 520ms ease,
    opacity 420ms ease;
}

.triangle-inner {
  fill: none;
  stroke: #f3f3f3;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.triangle-dot {
  fill: #ed0033;
}

.t-red,
.t-red-small,
.t-white {
  fill: none;
  stroke-linecap: square;
  transition:
    stroke-dashoffset 520ms ease,
    opacity 420ms ease;
}

.t-red {
  stroke: #ed0033;
  stroke-width: 22;
}

.t-white {
  stroke: #f3f3f3;
  stroke-width: 22;
}

.t-red-small {
  stroke: #ed0033;
  stroke-width: 14;
}

.t-red-block {
  fill: #ed0033;
}

.logo-state--t .t-red {
  stroke-dasharray: 224;
  stroke-dashoffset: 224;
}

.logo-state--t .t-white {
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.logo-state--t .t-red-small {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
}

.brand-logo:hover .logo-state--t .t-red,
.brand-logo:hover .logo-state--t .t-white,
.brand-logo:hover .logo-state--t .t-red-small,
.brand-logo:focus-visible .logo-state--t .t-red,
.brand-logo:focus-visible .logo-state--t .t-white,
.brand-logo:focus-visible .logo-state--t .t-red-small {
  stroke-dashoffset: 0;
}

.brand-logo:focus-visible {
  outline: 2px solid #ed0033;
  outline-offset: 6px;
  border-radius: 18px;
}

@media (prefers-reduced-motion: reduce) {
  .logo-state,
  .triangle-outline,
  .triangle-inner,
  .t-red,
  .t-red-small,
  .t-white {
    transition: none;
  }
}
```

---

## Implementación en Angular

Crear un componente standalone llamado `BrandLogoComponent`.

### Archivo sugerido

```txt
src/app/shared/components/brand-logo/brand-logo.component.ts
src/app/shared/components/brand-logo/brand-logo.component.html
src/app/shared/components/brand-logo/brand-logo.component.scss
```

### brand-logo.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  templateUrl: './brand-logo.component.html',
  styleUrl: './brand-logo.component.scss',
})
export class BrandLogoComponent {}
```

### brand-logo.component.html

Usar exactamente el HTML/SVG indicado arriba.

### brand-logo.component.scss

Usar exactamente el CSS/SCSS indicado arriba.

---

## Uso dentro de la landing page

Importar el componente donde se use la landing page.

Ejemplo:

```ts
import { Component } from '@angular/core';
import { BrandLogoComponent } from '../../shared/components/brand-logo/brand-logo.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [BrandLogoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
```

Luego usarlo en el template:

```html
<header class="landing-header">
  <app-brand-logo />
</header>
```

---

## Requisitos de comportamiento

- En desktop, el cambio debe ocurrir en `hover`.
- Para accesibilidad con teclado, también debe ocurrir en `focus-visible`.
- En dispositivos con reducción de movimiento activada, la animación debe desactivarse.
- No usar JavaScript para la animación. Debe resolverse solo con SVG + CSS.
- No reemplazar el SVG por imágenes externas.
- No usar librerías adicionales.

---

## Notas de ajuste visual

Si el logo queda muy grande o muy pequeño, ajustar solo esta parte:

```scss
.brand-logo {
  width: 96px;
  height: 96px;
}
```

Tamaños sugeridos:

```scss
/* Navbar compacta */
.brand-logo {
  width: 56px;
  height: 56px;
}

/* Header principal */
.brand-logo {
  width: 96px;
  height: 96px;
}

/* Hero section */
.brand-logo {
  width: 128px;
  height: 128px;
}
```

---

## Resultado esperado

El resultado final debe ser un logo animado, limpio y reutilizable para la landing page. El usuario debe ver inicialmente el símbolo triangular. Al pasar el mouse o enfocar con teclado, el logo debe transformarse suavemente hacia el símbolo tipo `T`, manteniendo la estética tecnológica, oscura y minimalista de la marca `trejodev`.
