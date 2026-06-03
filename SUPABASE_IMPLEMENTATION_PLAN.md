# Supabase Plan For Portfolio Projects

This plan moves the portfolio from local `projects.data.ts` to Supabase without losing SSR, SEO, or control over the data model. The target is simple: publish or edit a project in Supabase and have it appear on the site without a frontend deploy.

## Quick Path

1. Create a Supabase project with one table for projects and one storage bucket for covers.
2. Add a server-side adapter in `src/server.ts` and expose internal endpoints like `/api/projects` and `/api/projects/:slug`.
3. Replace `ProjectDataService` local data reads with calls to those internal endpoints.
4. Use Supabase Studio as the first admin surface; build a custom admin only if Studio becomes limiting.
5. Verify SSR rendering, project detail SEO, and the publish flow end-to-end.

## Target Architecture

| Area | Decision |
|------|----------|
| Source of truth | Supabase Postgres |
| Images | Supabase Storage bucket `projects` |
| Read path | Existing Express server reads Supabase and serves internal JSON endpoints |
| Frontend data access | Angular services consume internal `/api/*` endpoints, not Supabase directly |
| Admin surface | Supabase Studio first, custom admin later if needed |
| Auth for editing | Supabase Auth restricted to the owner/admin user |
| Public access | Read-only via published rows only |
| Caching | Short server-side TTL cache for list/detail endpoints |

## Why This Shape

- It preserves SSR and SEO because Angular can render project data from the server path.
- It avoids leaking database structure into the frontend.
- It lets us change Supabase queries later without rewriting components.
- It gives you an immediate admin UI via Supabase Studio, so we do not waste time building a back office before the content flow works.

## Data Model

Use a single `projects` table for v1. Do not over-normalize a personal portfolio.

### `projects` table

| Column | Type | Notes |
|-------|------|-------|
| `id` | `uuid` | Primary key, default generated |
| `slug` | `text` | Unique, used in route `/projects/:slug` |
| `title` | `text` | Required |
| `description_es` | `text` | Required |
| `description_en` | `text` | Required |
| `role` | `text` | Required |
| `stack` | `text[]` | Array is enough for current filtering needs |
| `highlights_es` | `text[]` | Ordered bullets for ES |
| `highlights_en` | `text[]` | Ordered bullets for EN |
| `featured` | `boolean` | Default `false` |
| `display_order` | `integer` | Controls list order |
| `project_url` | `text` | Nullable |
| `repo_url` | `text` | Nullable |
| `cover_path` | `text` | Storage object path, nullable |
| `published` | `boolean` | Default `false`; only published rows are public |
| `created_at` | `timestamptz` | Default `now()` |
| `updated_at` | `timestamptz` | Maintained by trigger |

### Why not more tables yet

- `stack` as `text[]` is enough because filtering is simple.
- highlights need ordering, but `text[]` already preserves order.
- bilingual fields are explicit and easy to manage from Studio.

If later you need tags with icons, categories, or analytics, then split into relational tables. Not before.

## Storage Model

Create bucket `projects`.

Suggested path convention:

```text
projects/<slug>/cover.webp
```

Rules:

- Public read is acceptable for published cover images.
- Write access only for authenticated admin users.
- Store only the path in the DB, not the full public URL.

## Security Model

### Supabase Auth

- Create one admin user for yourself.
- Do not expose service role keys to the browser.

### Row-Level Security

For `projects`:

- Public users: can `select` only rows where `published = true`
- Authenticated admin: full CRUD

For storage bucket:

- Public users: can read public covers
- Authenticated admin: can upload, replace, delete

## Application Integration

Do not make Angular components talk to Supabase directly.

### Recommended server endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/projects` | Published summaries ordered by `display_order` |
| `GET /api/projects/featured` | Featured published summaries for home |
| `GET /api/projects/:slug` | Published detail for route detail |

### Why use internal API instead of direct Supabase calls from Angular

- one query layer for SSR and browser
- easier caching
- easier testing
- safer secrets handling
- easier future migration if Supabase changes

## Angular Changes

### Replace current local source

Current state:

- `src/app/core/data/projects.data.ts`
- `src/app/core/services/project-data.service.ts`

Target state:

- keep `ProjectDataService` as the app-facing contract
- replace local `of(...)` calls with `HttpClient` calls to internal endpoints

Example direction:

- `getProjects()` → `GET /api/projects`
- `getFeaturedProjects()` → `GET /api/projects/featured`
- `getProjectBySlug(slug)` → `GET /api/projects/:slug`

That means pages like `Home`, `ProjectList`, and `ProjectDetail` stay mostly unchanged.

## Server Changes

Add a Supabase server client in the Express layer.

### Environment variables

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Recommendation:

- use `SERVICE_ROLE_KEY` only on the server
- if public read policies are enough, reads can use anon key server-side too
- keep the service role available for admin or future private operations

### Query responsibilities

The server adapter should:

- map DB rows to `Project` / `ProjectSummary`
- resolve public cover URLs from `cover_path`
- return only published content
- sort consistently by `display_order`
- optionally cache responses for 60 to 300 seconds

## Phased Implementation

## Phase 1

Goal: create Supabase foundation.

Checklist:

- [ ] Create Supabase project
- [ ] Create `projects` table
- [ ] Create `projects` storage bucket
- [ ] Configure RLS for public reads and admin writes
- [ ] Create one admin user

Deliverable:

- You can create a project manually in Supabase Studio.

## Phase 2

Goal: migrate current hardcoded data.

Checklist:

- [ ] Convert `projects.data.ts` records into SQL seed or migration script
- [ ] Upload cover images to bucket
- [ ] Set `cover_path` and `published = true`
- [ ] Verify ordering and slugs

Deliverable:

- Supabase contains the same portfolio content currently shown locally.

## Phase 3

Goal: add the server adapter.

Checklist:

- [ ] Install `@supabase/supabase-js`
- [ ] Add server-side Supabase client setup
- [ ] Implement `GET /api/projects`
- [ ] Implement `GET /api/projects/featured`
- [ ] Implement `GET /api/projects/:slug`
- [ ] Add basic in-memory cache with TTL

Deliverable:

- Hitting internal API endpoints returns live data from Supabase.

## Phase 4

Goal: wire Angular to the new source.

Checklist:

- [ ] Replace local project data reads in `ProjectDataService`
- [ ] Keep existing `Project` and `ProjectSummary` model contract stable
- [ ] Add loading and empty-state coverage where needed
- [ ] Verify list, featured teaser, and detail page in SSR

Deliverable:

- The site renders projects from Supabase without using local hardcoded data.

## Phase 5

Goal: editorial workflow.

Checklist:

- [ ] Validate that Supabase Studio is enough for daily use
- [ ] Document the publish workflow: upload image, fill fields, toggle `published`
- [ ] Only if Studio is painful, create a separate admin app

Deliverable:

- You can publish a new project without touching the frontend repo.

## Phase 6

Goal: harden SEO and quality.

Checklist:

- [ ] Generate sitemap entries from live projects
- [ ] Add tests for server mapping and `ProjectDataService`
- [ ] Verify project detail metadata for both locales
- [ ] Add fallback handling for missing cover image or broken slug

Deliverable:

- Dynamic portfolio with solid SEO and predictable quality.

## Admin Strategy

Start with Supabase Studio. Seriously.

It already gives you:

- row editing
- file management
- auth-managed access
- no extra frontend to maintain

Build a custom admin only if one of these becomes true:

- you need richer preview before publish
- you want friendlier bilingual editing UX
- you want workflow states beyond draft/published

## Migration Notes From Current Repo

These files are the main integration points:

- `src/app/core/models/project.model.ts`
- `src/app/core/services/project-data.service.ts`
- `src/app/pages/home/home.ts`
- `src/app/pages/portfolio/project-list/project-list.ts`
- `src/app/pages/portfolio/project-detail/project-detail.ts`
- `src/server.ts`

Keep the current local data source until Phase 3 and 4 are complete. That gives you a safe fallback during the migration.

## Risks And Controls

| Risk | Control |
|------|---------|
| Broken SEO because data loads only in browser | Read through Express and SSR path |
| Exposed secrets | Never use service role in the client |
| Inconsistent data shape | Keep mapping centralized in server adapter |
| Manual content errors | Use `published` flag and unique slug constraint |
| Overbuilding admin | Start with Supabase Studio |

## Acceptance Criteria

- [ ] Adding a new published project in Supabase makes it visible on `/projects` without redeploying
- [ ] A featured project appears on home automatically
- [ ] `/projects/:slug` renders server-side with correct SEO metadata
- [ ] Project covers load from Supabase Storage
- [ ] Only authenticated admin users can create or edit projects

## Recommended Next Step

Implement Phase 1 and Phase 2 first.

That means:

1. create the Supabase project
2. define the table and bucket
3. load the current four projects there

Once that exists, wiring the code becomes straightforward instead of speculative.
