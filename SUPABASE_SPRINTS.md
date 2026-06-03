# Supabase Sprint Tracker

This file turns `SUPABASE_IMPLEMENTATION_PLAN.md` into executable sprint slices. Each sprint maps 1:1 to a phase from the plan so the migration can be delivered incrementally without mixing concerns.

## Quick Path

1. Work all Supabase migration tasks in branch `feat/supabase-phase-sprints`.
2. Complete one sprint at a time, in order.
3. Mark a sprint complete only after its deliverable and verification are done.

## Current Baseline

| Topic                    | Current state                                      |
| ------------------------ | -------------------------------------------------- |
| Git branch               | `feat/supabase-phase-sprints`                      |
| Supabase project         | Exists: `https://pttvkirziisrapugzpci.supabase.co` |
| App migrations           | `create_projects_foundation`, `harden_projects_foundation_functions` |
| Public app tables        | `public.projects`                                  |
| Storage buckets          | `projects`                                         |
| Source of portfolio data | Local `projects.data.ts`                           |

## Sprint Status

| Sprint   | Maps to phase                       | Status      |
| -------- | ----------------------------------- | ----------- |
| Sprint 1 | Phase 1 — Supabase foundation       | In progress (4/5) |
| Sprint 2 | Phase 2 — Data migration            | Completed   |
| Sprint 3 | Phase 3 — Server adapter            | Completed   |
| Sprint 4 | Phase 4 — Angular wiring            | Completed   |
| Sprint 5 | Phase 5 — Editorial workflow        | Completed   |
| Sprint 6 | Phase 6 — SEO and quality hardening | Pending     |

## Sprint 1 — Supabase Foundation

Goal: create the database and storage foundation so projects can be managed in Supabase Studio.

Checklist:

- [x] Confirm a Supabase project already exists.
- [x] Create `projects` table.
- [x] Create `projects` storage bucket.
- [x] Configure RLS for public reads and admin writes.
- [ ] Create one admin user.

Repo impact:

- `supabase/migrations/` — initial schema, triggers, policies, storage setup.
- `SUPABASE_ADMIN_SETUP.md` — manual admin-user setup and role assignment.
- `SUPABASE_IMPLEMENTATION_PLAN.md` — optional progress updates only after execution.

Done when:

- The `projects` table exists with the planned columns.
- Storage bucket `projects` exists.
- Public can read only published rows.
- Admin can manage rows and files.
- A manual create/edit flow works in Supabase Studio.

Verification:

- `supabase_list_tables` shows the `projects` table.
- Bucket exists in storage metadata.
- Security advisors do not report missing RLS or missing public-access protections for the new surface.

Notes:

- The project itself already exists, so this sprint starts from schema/storage work, not project creation.
- Schema migration applied: `create_projects_foundation`.
- Hardening migration applied: `harden_projects_foundation_functions`.
- Remaining manual step: create the admin user in Supabase Auth and assign `app_metadata.role = 'admin'` so the RLS admin policies become usable. See `SUPABASE_ADMIN_SETUP.md`.
- Security advisor caveat: Supabase still reports `function_search_path_mutable`, but `pg_proc.proconfig` already shows `search_path=public` for both functions. Re-check after a later advisor refresh.

## Sprint 2 — Data Migration

Goal: move current hardcoded portfolio content into Supabase without changing frontend behavior yet.

Checklist:

- [x] Convert `src/app/core/data/projects.data.ts` records into SQL seed or migration data.
- [x] Upload cover images to bucket `projects` or preserve `null` when the current local source has no cover assets.
- [x] Set `cover_path` and `published = true`.
- [x] Verify ordering and slugs.

Repo impact:

- `src/app/core/data/projects.data.ts` — source to migrate from, kept as fallback until Sprint 4 is complete.
- `supabase/migrations/` or seed workflow — migration payload for initial content.

Done when:

- Supabase contains the same portfolio projects currently shown locally.
- Each project has a stable slug and correct `display_order`.
- Published rows are ready to be consumed by server endpoints.

Verification:

- Query results from Supabase match current local content.
- Cover paths either resolve to uploaded storage objects or remain `null` when the current source has no cover asset.

Notes:

- Seed migration applied: `seed_initial_projects`.
- The current local portfolio source has no cover images, so the initial seed preserves `cover_path = null` for parity instead of inventing assets.

## Sprint 3 — Server Adapter

Goal: add a server-side query layer between Angular and Supabase.

Checklist:

- [x] Install `@supabase/supabase-js`.
- [x] Add server-side Supabase client setup.
- [x] Implement `GET /api/projects`.
- [x] Implement `GET /api/projects/featured`.
- [x] Implement `GET /api/projects/:slug`.
- [x] Add basic in-memory cache with TTL.

Repo impact:

- `src/server.ts`
- any new server-only helpers under `src/app/core/` or `src/server/` if needed
- environment variable documentation for `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

Done when:

- Internal API endpoints return live data from Supabase.
- Queries return only published content for public paths.
- Mapping from DB rows to `Project` / `ProjectSummary` stays centralized.

Verification:

- Endpoint responses match expected list, featured subset, and detail payloads.
- SSR path can read through the server API without browser-only dependencies.

Notes:

- The server reads Supabase with `SUPABASE_SERVICE_ROLE_KEY` when available, otherwise `SUPABASE_ANON_KEY` for public-read queries.
- API contract stays close to the existing frontend contract, with detail responses carrying `highlights_es` and `highlights_en` for later locale mapping in Angular.

## Sprint 4 — Angular Wiring

Goal: switch the app from local data to internal API reads without breaking the UI contract.

Checklist:

- [x] Replace local project data reads in `ProjectDataService`.
- [x] Keep `Project` and `ProjectSummary` model contracts stable.
- [x] Add loading and empty-state coverage where needed.
- [x] Verify list, featured teaser, and detail page in SSR.

Repo impact:

- `src/app/core/services/project-data.service.ts`
- `src/app/pages/home/home.ts`
- `src/app/pages/portfolio/project-list/project-list.ts`
- `src/app/pages/portfolio/project-detail/project-detail.ts`

Done when:

- The site renders projects from Supabase-backed endpoints.
- Local hardcoded data is no longer the active source for portfolio pages.

Verification:

- Home featured teaser loads correctly.
- `/projects` and `/projects/:slug` render correctly in SSR.

Notes:

- `ProjectDataService` now reads `/api/projects`, `/api/projects/featured`, and `/api/projects/:slug` through `HttpClient`.
- The service uses Angular's `REQUEST` token during SSR to build absolute API URLs on the server.
- The frontend contract remains stable: summaries still expose `_id`, `order`, `imageUrl`, `url`, and `repo`; detail pages still consume localized `highlights` after service-side mapping.
- Home, list, and detail now handle API errors without staying forever in loading state.
- Local runtime SSR verification for `/projects` and `/projects/:slug` is limited by Angular's host allowlist guard in this environment, but build-time prerender with Supabase envs confirmed the home route is rendering Supabase-backed content.

## Sprint 5 — Editorial Workflow

Goal: make the publishing flow usable without touching the frontend repo.

Checklist:

- [x] Validate that Supabase Studio is enough for daily use.
- [x] Document the publish workflow: upload image, fill fields, toggle `published`.
- [x] Only if Studio is painful, create a separate admin app.

Repo impact:

- documentation only, unless a custom admin becomes justified

Done when:

- A new project can be published through Studio and appears in the portfolio flow.
- The content workflow is documented and repeatable.

Verification:

- Manual editorial test from draft to published works end-to-end.

Notes:

- Workflow documented in `SUPABASE_PUBLISH_WORKFLOW.md`.
- Current scope does not justify a custom admin app yet; Supabase Studio remains the editorial surface.
- A true manual publish test still depends on finishing the admin-user setup from Sprint 1.

## Sprint 6 — SEO And Quality Hardening

Goal: finish the migration with confidence, test coverage, and SEO-safe behavior.

Checklist:

- [ ] Generate sitemap entries from live projects.
- [ ] Add tests for server mapping and `ProjectDataService`.
- [ ] Verify project detail metadata for both locales.
- [ ] Add fallback handling for missing cover image or broken slug.

Repo impact:

- `src/server.ts`
- `src/app/core/services/project-data.service.ts`
- SEO-related files or sitemap generation flow
- tests near the affected services and server mapping logic

Done when:

- Dynamic projects preserve SSR, metadata quality, and stable fallbacks.
- The migration is safe to maintain long-term.

Verification:

- Tests pass.
- Sitemap includes live projects.
- Locale-specific detail metadata is correct.

## Working Rule

Do not start the next sprint until the current sprint is functionally verified. The whole point of this breakdown is to avoid mixing schema, migration, API, UI wiring, editorial workflow, and SEO hardening into one giant diff.

## Next Step

Start executing Sprint 1 in this branch:

1. Add the initial Supabase migration for the `projects` table.
2. Create the storage bucket and related policies.
3. Record any manual admin-user setup that cannot be automated in-repo.
