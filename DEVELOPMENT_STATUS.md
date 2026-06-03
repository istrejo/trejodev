# trejodev — Estado de Desarrollo

> Análisis del estado actual del portfolio. Última revisión: 2026-06-03.

---

## Resumen ejecutivo

| Fase | Estado | Prioridad |
|------|--------|-----------|
| 1. Infraestructura core | ✅ Completa | — |
| 2. Design system / componentes | ✅ Completa | — |
| 3. Páginas estáticas | ✅ Completa | — |
| 4. Contacto + email | ✅ Completa | — |
| 5. i18n (es/en) | ⚠️ Parcial | Media |
| 6. Portfolio / Proyectos | ✅ Completa | — |
| 7. Blog | ❌ No iniciada | Media |
| 8. SEO avanzado | ⚠️ Parcial | Media |
| 9. Testing | ❌ Mínimo | Alta |
| 10. CI/CD + Deploy | ✅ Completa | — |

---

## Fases completas

### Fase 1 — Infraestructura core ✅
- Angular 21 standalone + SSR (Express 5)
- Routing lazy con `loadComponent` en todas las rutas
- `app.config.ts` configurado: `withFetch`, `withComponentInputBinding`, i18n, animaciones
- `SeoService` con OG + Twitter meta tags
- `RevealDirective` para animaciones de scroll
- Dockerfile multi-stage + GitHub Actions → Docker → Dokploy

### Fase 2 — Design system ✅
- Design tokens en `src/styles/tokens.css` via `@theme`
- Atoms: `Button`, `Badge`, `Icon`, `Tag`, `Chip` — todos con Storybook stories
- Molecules: `ProjectCard`, `TimelineItem` — con Storybook stories
- `icon.registry.ts` con SVGs inline

### Fase 3 — Páginas estáticas ✅
- **Home**: hero, about teaser, projects teaser (hardcoded), stack teaser
- **About**: filosofía, approach, Digitalmente Studio, quote
- **Stack**: skill groups con niveles (expert/advanced/intermediate/familiar)
- **Experience**: timeline de jobs, educación, métricas

### Fase 4 — Contacto + email ✅
- Formulario reactivo con validación + honeypot anti-spam
- `/api/contact` en server.ts con integración Resend
- Dev mode: log silencioso si no hay `RESEND_API_KEY`

### Fase 6 — Portfolio / Proyectos ✅
- Fuente única en `src/app/core/data/projects.data.ts`
- `ProjectDataService` expone lista, featured y detalle por slug
- `ProjectList`, `ProjectDetail` y `Home` consumen la misma fuente local
- Se eliminó la dependencia funcional de Sanity y la configuración externa asociada

### Fase 10 — CI/CD ✅
- `.github/workflows/deploy.yml`: build `--localize` → Docker → GHCR → Dokploy webhook
- `Dockerfile` multi-stage (builder + runner), `NODE_ENV=production`, healthcheck
- `sitemap.xml` y `robots.txt` en `public/`

---

## Fases incompletas

### Fase 5 — i18n ⚠️ Parcial

**Lo que está hecho:**
- 94 translation units en `src/locale/messages.en.xlf`
- Cobertura completa: About, Stack, Experience, Contact, Home (hero)

**Lo que falta:**
- `contact.ts`: el `<select>` de tipos de consulta usa `opt.label_es` en el template. La propiedad `label_en` existe en el dato pero **no se renderiza en locale EN**. Hace falta lógica `LOCALE_ID` o `i18n` en el `<option>`.
- `home.ts`: el teaser de proyectos ya consume la fuente unificada, pero el resto del contenido de la página todavía necesita cerrar i18n completo.
- `sitemap.xml` estático — no incluye slugs de proyectos ni URLs `/en/`.

---

### Fase 7 — Blog ❌ No iniciada

**Estado actual:**
- `blog.ts` es un placeholder: `"— blog / próximamente —"`
- Ruta `/blog` activa en router y en sitemap

**Lo que falta (mínimo viable):**
- Decidir fuente de contenido (MDX files, Notion, static TS, o nuevo CMS)
- Listar posts con título, fecha, descripción
- Vista de detalle de post con contenido renderizado
- i18n de contenido (o decidir si el blog es solo en ES)

---

### Fase 8 — SEO avanzado ⚠️ Parcial

**Lo que está hecho:**
- `SeoService` con title + description + OG + Twitter
- `sitemap.xml` estático
- `robots.txt`

**Lo que falta:**
- **OG image**: `SeoService` referencia `/og-image.png` pero el archivo **no existe** en `public/`. El meta tag apunta a una imagen 404.
- **JSON-LD**: Sin structured data (`Person`, `WebSite`, `SoftwareSourceCode`). Impacta rich results en Google.
- **Sitemap dinámico**: Los slugs de proyectos y posts de blog no están en `sitemap.xml`. Requiere generación server-side o script de build.
- **Canonical links**: Sin `<link rel="canonical">` por locale (es/en duplicación).
- **404 page**: La ruta `**` hace `redirectTo: ''`. No hay página de not-found propia.

---

### Fase 9 — Testing ❌ Mínimo

**Estado actual:**
- Solo existe `src/app/app.spec.ts`
- `tsconfig.spec.json` configurado para Vitest
- `CLAUDE.md` dice: test runner Vitest 4, usar `@testing-library/angular`, no testear implementación

**Lo que falta (priorizado):**
- Tests unitarios para `SeoService` y ampliar cobertura de `ProjectDataService`
- Tests de componente para `Button`, `ProjectCard` (los átomos y moléculas más usados)
- Tests de integración para el formulario de `Contact` (validación + submit)
- Test E2E mínimo para el happy path: home → projects → detail

---

## Deuda técnica puntual

| Archivo | Problema |
|---------|----------|
| `contact.ts:133` | `opt.label_es` hardcodeado en `<option>` — no respeta locale EN |
| `server.ts` (contact handler) | HTML generado con template string sin escapar `name`/`message` — potencial XSS en el email (bajo riesgo, pero existe) |

---

## Orden de implementación sugerido

```
1. [ALTA]  Fase 9 — Tests mínimos (SeoService + Contact form)
              → permite CI con test gate antes de deploy
2. [MEDIA] Fase 8 — OG image + JSON-LD + canonical
              → impacto SEO real antes de lanzar
3. [MEDIA] Fase 5 — Cerrar i18n (select contact + home restante)
              → sitio bilingüe completo
4. [MEDIA] Fase 7 — Blog MVP
              → content marketing para el portfolio
```
