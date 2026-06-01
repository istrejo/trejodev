# CLAUDE.md — trejodev

Portfolio personal de Alejandro Trejo. Angular 21 con SSR, Tailwind 4, i18n (es/en), Storybook y Vitest.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Angular 21.2.x |
| Language | TypeScript 5.9.x |
| Styling | TailwindCSS 4.x + SCSS (component styles) |
| SSR | @angular/ssr + Express 5 |
| CMS | Sanity (via `SANITY_CONFIG` InjectionToken) |
| i18n | @angular/localize — locales: `es` (default), `en` |
| Email | Resend |
| Testing | Vitest 4.x |
| Docs | Storybook 10.x + Compodoc |
| Package manager | npm 11.x |

---

## Architecture

### Standalone-only

**All components must be standalone.** No NgModules, ever.

```ts
@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [CommonModule],   // ← only what's needed
  template: `...`,
})
export class Foo {}
```

### Signals API

Use the signals API exclusively. No `@Input()`, no `@Output()`, no constructor injection.

```ts
// Correct
name = input<string>('');
name = input.required<string>();
clicked = output<void>();
classes = computed(() => `base ${this.variant()}`);
private readonly svc = inject(MyService);

// Wrong
@Input() name: string;
constructor(private svc: MyService) {}
```

### Dependency injection

Always `inject()`. Never constructor injection.

```ts
private readonly router = inject(Router);
private readonly localeId = inject(LOCALE_ID);
```

### Routing

All routes use `loadComponent` for lazy loading. Never eager imports in `app.routes.ts`.

```ts
{
  path: 'about',
  loadComponent: () => import('./pages/about/about').then(m => m.About),
  data: { animation: 'about' },
}
```

---

## Naming conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Class name | No `Component` suffix | `export class Button` |
| File name | Matches class, kebab-case | `button.ts` |
| Selector | `app-` prefix | `app-button` |
| Services | `Injectable`, no suffix | `SeoService`, `SanityService` |
| Models | Interface + `.model.ts` | `project.model.ts` |
| Tokens | `InjectionToken`, uppercase | `SANITY_CONFIG` |

---

## Folder structure

```
src/app/
  core/          # guards, interceptors, models, services, tokens
  layout/        # header, footer, nav (shell components)
  pages/         # route-level components (one folder per route)
  shared/
    atoms/       # smallest UI units (Button, Badge, Icon, Tag, Chip)
    molecules/   # composed units (ProjectCard, NavLink, SkillChip)
    directives/  # structural/attribute directives
    pipes/       # pure pipes
    animations/  # route animation definitions
src/styles/
  tokens.css     # CSS custom properties via @theme (TailwindCSS 4)
```

**Atoms** have no business logic. **Molecules** may inject services or receive complex inputs. **Pages** own route logic and call `SeoService.set()`.

---

## Design tokens

Defined in `src/styles/tokens.css` via TailwindCSS 4 `@theme`.

```css
--color-bg: #0A0A0A
--color-surface: #111111
--color-border: #1E1E1E
--color-text: #F5F5F5
--color-muted: #6B6B6B
--color-accent-1: #DD0031   /* red — primary accent */
--color-accent-2: #2496ED   /* blue — secondary accent */

--font-mono: 'JetBrains Mono', monospace
--font-sans: 'Inter', 'DM Sans', sans-serif
--font-code: 'Fira Code', monospace
```

Always use these tokens — never hardcode hex values in components.

---

## Styling rules

- Component styles: inline `styles: [``]` or `styleUrl`. Use SCSS.
- Layout and utilities: Tailwind classes in template.
- Global resets and keyframes: `src/styles.scss`.
- Design tokens only: no hardcoded colors, no `px` font sizes outside Tailwind scale.
- Theme is dark-only. No light mode.

---

## i18n

Bilingual site: `es` (default locale) + `en`.

- Source strings in templates use `i18n` attribute or `$localize`.
- Components that render locale-dependent text inject `LOCALE_ID` and check `localeId.startsWith('en')`.
- Translation file: `src/locale/messages.en.xlf`.
- Never hardcode locale strings — use `$localize` or the XLF pipeline.

---

## SSR constraints

- No direct access to browser globals (`window`, `document`, `localStorage`) without checking `isPlatformBrowser`.
- Use `inject(PLATFORM_ID)` when browser-only code is required.
- All HTTP calls use `HttpClient` with `withFetch()` (already configured).
- `SeoService.set()` must be called in every page component.

---

## TypeScript strictness

Config in `tsconfig.json`:

- `strict: true`
- `noImplicitOverride: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true` (Angular compiler)
- `strictInjectionParameters: true`

No `any`. No type assertions unless absolutely necessary (explain why in a comment).

---

## Testing

Test runner: Vitest 4. Config: `tsconfig.spec.json`.

- Unit tests: `*.spec.ts` co-located with the file under test.
- Component tests: use `@testing-library/angular` when available.
- Do not test implementation details — test behavior.
- Run: `ng test`

---

## Storybook

- Story files: `*.stories.ts` co-located with the component.
- Each atom and molecule must have a story.
- Use `@storybook/angular` — no global style imports in `preview.ts`.
- Run: `ng run trejodev:storybook`

---

## Bad practices — never do these

- NgModules: no.
- Constructor injection: no.
- `@Input()` / `@Output()` decorators: no. Use `input()` / `output()`.
- Hardcoded hex colors or font sizes in components: no.
- Eager route imports: no. Always `loadComponent`.
- `window` / `document` access without platform check: no.
- `any` type: no.
- Class names with `Component` suffix (e.g., `ButtonComponent`): no.
- Committing secrets or real Sanity tokens: no. Use `environment.ts` (gitignored in prod).
