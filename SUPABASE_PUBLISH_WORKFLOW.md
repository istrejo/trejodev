# Supabase Publish Workflow

This workflow is the editorial path for publishing portfolio projects without touching the frontend repo.

## Decision

Supabase Studio is enough for the current scope.

Why:

- the `projects` table is small and explicit
- bilingual fields are visible without custom UI work
- publish state is a single boolean
- file management is already available in Storage
- a custom admin app would add maintenance before the editorial workflow proves painful

## Quick Path

1. Create or edit a row in `public.projects`.
2. Upload a cover image only if the project actually has one.
3. Set `published = true` when the row is ready.

## Create Or Edit A Project

Open Supabase Studio and go to `Table Editor > public.projects`.

Fill these fields:

- `slug`
- `title`
- `description_es`
- `description_en`
- `role`
- `stack`
- `highlights_es`
- `highlights_en`
- `featured`
- `display_order`
- `project_url` if available
- `repo_url` if available
- `published`

Rules:

- `slug` must stay unique
- `display_order` controls portfolio ordering
- `featured = true` makes the project eligible for the home teaser
- `published = true` is what makes the project public

## Cover Images

Current reality:

- the local portfolio source had no cover images when the migration started
- `cover_path` can safely stay `null` until a real cover asset exists

When a cover image exists:

1. Open `Storage > projects`.
2. Upload the file using the convention `projects/<slug>/cover.webp`.
3. Copy that relative object path into `public.projects.cover_path`.

Example:

```text
projects/ecommerce-mfe/cover.webp
```

Do not store the full public URL in the database. Store only the object path.

## Publish Checklist

- `slug` is unique and stable
- Spanish description exists
- English description exists
- Spanish highlights exist
- English highlights exist
- `display_order` is correct
- `featured` is correct
- `cover_path` is either a valid uploaded object path or `null`
- `published = true`

## Verify After Publish

1. Open `/projects` and confirm ordering.
2. Open `/projects/<slug>` and confirm title, role, stack, and highlights.
3. If `featured = true`, confirm the project appears on the home page.

## When To Build A Custom Admin App

Do not build one yet.

Build it only if one of these becomes true:

- bilingual editing in Studio becomes too error-prone
- preview before publish becomes essential
- more workflow states are needed beyond draft/published
- non-technical editors need a friendlier interface
