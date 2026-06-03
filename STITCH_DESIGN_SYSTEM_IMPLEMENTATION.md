# Stitch Design System Implementation

This checklist defines how the portfolio should use the existing Stitch project as a visual reference without turning Stitch into the technical source of truth. The codebase remains the implementation source through Tailwind theme tokens, Angular components, and Storybook stories.

## Decision

| Area | Source of truth |
|------|-----------------|
| Visual exploration | Stitch project |
| Runtime design tokens | `src/styles/tokens.css` |
| Component behavior | Angular standalone atoms and molecules |
| Living documentation | Storybook stories |
| Public site output | Angular SSR portfolio |

## Phase Checklist

### Phase 1 — Inventory current design system ✅

Goal: confirm what already exists before importing or changing anything from Stitch.

- [x] Verify the project already has token definitions in `src/styles/tokens.css`.
- [x] Verify the existing design system is documented as complete in `DEVELOPMENT_STATUS.md`.
- [x] Verify atoms and molecules already have Storybook stories.
- [x] Confirm no Stitch export or design artifact currently exists in the repo.

Deliverable:

- Current repo design-system baseline is known and safe to extend.

### Phase 2 — Extract Stitch decisions ⬜

Goal: capture only the design decisions that should become code.

- [x] Configure the Stitch MCP entry with an environment-based API key reference.
- [x] Export or document the Stitch color palette.
- [x] Export or document typography choices.
- [x] Export or document spacing, radius, shadow, and layout rules if available.
- [x] Identify which Stitch components map to existing atoms and molecules.
- [x] Separate visual inspiration from required implementation changes.

Deliverable:

- A compact Stitch handoff with colors, typography, spacing, and component references.

Extracted source:

- Project: `Stitch Design System Framework` (`737008992815353346`)
- Design system: `Architectural Dark Tech` (`assets/8e4947b92da14d50a6d7660e18c3b64e`)
- Colors: true dark surfaces (`#0A0A0A`, `#111111`, `#1A1A1A`), border `#1E1E1E`, text `#F5F5F5`, muted `#6B6B6B`, primary red `#DD0031`, secondary blue `#2496ED`.
- Typography: JetBrains Mono for headings and labels, DM Sans for body, Fira Code for code-like details.
- Layout: strict 8pt spacing, 12-column desktop grid, 24px gutters, 16px mobile margins.
- Components: solid red primary buttons, ghost secondary buttons, bordered cards, dark inputs with red focus glow, pill badges/chips.
- MCP note: direct Stitch tools in this session attempt incompatible OAuth, but raw MCP JSON-RPC with `X-Goog-Api-Key` works for read/list operations.

### Phase 3 — Map Stitch to technical tokens ⬜

Goal: translate Stitch decisions into stable repo tokens.

- [ ] Map Stitch colors to semantic tokens in `src/styles/tokens.css`.
- [ ] Keep existing dark-only theme constraints.
- [ ] Avoid hardcoded hex values inside components.
- [ ] Preserve current token names unless a rename is clearly justified.
- [ ] Add new tokens only when they represent reusable design decisions.

Deliverable:

- `src/styles/tokens.css` represents the approved Stitch design direction.

### Phase 4 — Align atoms and molecules ⬜

Goal: make existing components reflect the tokenized design language.

- [ ] Review `Button` against Stitch button treatment.
- [ ] Review `Badge`, `Tag`, and `Chip` against Stitch labeling treatment.
- [ ] Review `ProjectCard` against Stitch card layout and emphasis.
- [ ] Review `TimelineItem` against Stitch rhythm and hierarchy.
- [ ] Keep atoms free of business logic.

Deliverable:

- Existing reusable components express the Stitch direction through tokens and Tailwind utilities.

### Phase 5 — Validate in Storybook ⬜

Goal: use Storybook as the living design-system checkpoint.

- [ ] Update stories for changed atoms and molecules.
- [ ] Add variants that show primary, secondary, muted, and edge states.
- [ ] Verify dark-only rendering.
- [ ] Confirm component states are understandable without reading implementation code.

Deliverable:

- Storybook demonstrates the implemented design system clearly.

### Phase 6 — Apply to portfolio pages ⬜

Goal: apply the design system only after tokens and components are stable.

- [ ] Review Home visual hierarchy.
- [ ] Review Project List and Project Detail pages.
- [ ] Review About, Stack, Experience, and Contact pages for consistency.
- [ ] Keep SSR and i18n constraints intact.
- [ ] Avoid browser-only APIs unless guarded by platform checks.

Deliverable:

- The public portfolio reflects the Stitch design direction consistently.

### Phase 7 — Verification ⬜

Goal: prove the design-system implementation is safe.

- [ ] Run `ng test`.
- [ ] Run the Storybook command or a production build if Storybook is not needed for the current slice.
- [ ] Review changed files for hardcoded colors or forbidden Angular patterns.
- [ ] Update this checklist as phases complete.

Deliverable:

- The implementation is verified and the checklist reflects the real state.

## Next Required Input

To continue past Phase 1, the Stitch project needs to provide one of these:

- a usable `STITCH_API_KEY` environment variable for the OpenCode session,
- exported design tokens,
- screenshots with color and component references,
- a written palette/design-system summary,
- or access details/instructions for reading the Stitch project.

Without that source, the repo can be prepared, but the actual Stitch palette should not be guessed.
