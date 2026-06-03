# Stitch Master Prompt — Portfolio Admin Mini App

Use this prompt in Stitch to generate the screens for a private admin mini app that manages portfolio projects stored in Supabase.

## Target Stitch Project

| Field | Value |
|-------|-------|
| Title | Stitch Design System Framework |
| Project ID | `737008992815353346` |

## MCP status

The project is configured as the target for generation. Direct Stitch tools in this session attempt incompatible OAuth, but raw MCP JSON-RPC with `X-Goog-Api-Key` works for project/design-system reads.

Direct tool error:

```text
Incompatible auth server: does not support dynamic client registration
```

Generation status:

- ✅ `Admin Login - Back Office` — `projects/737008992815353346/screens/8c8537a35b5e460baad8f42225cbff80`
- ✅ `Portfolio Admin - Project Dashboard` — `projects/737008992815353346/screens/268fa543357d411e93cd8f9b78c43991`
- ✅ `Portfolio Admin - Cover Image Manager` — `projects/737008992815353346/screens/3c07a9a631094e0d8d6f640fc8ce8dc5`
- ✅ `Project Preview - Back Office Admin` — `projects/737008992815353346/screens/1c97fb205cb44755bae8139c11b9b29f`
- ✅ `Publish Confirmation - Portfolio Admin` — `projects/737008992815353346/screens/f51085ccea5041d6a27d86891e2ac7e7`
- ✅ `Project Dashboard - Empty State` — `projects/737008992815353346/screens/6afac494aa4a4041be127094ac7eb120`
- ⬜ `Create / Edit Project` — still needs generation. A direct retry returned: `Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential.`

Retry the missing Create/Edit screen after Stitch grants write/generation access with user credentials, or generate it manually in the Stitch UI using the focused prompt below.

## Focused prompt for missing Create/Edit screen

```text
Create the missing desktop screen for the private portfolio admin mini app: Create / Edit Project.

Use the existing Stitch design system "Architectural Dark Tech" in project 737008992815353346.

Design direction: dark-only, technical, editorial, minimalist brutalist, precise, premium, efficient. Use near-black background, #111111 cards, #1E1E1E borders, #DD0031 primary action, #2496ED secondary accent, JetBrains Mono labels/headings, DM Sans body, 8pt spacing, compact but readable form density.

Screen title: Create / Edit Project - Portfolio Admin.

Purpose: one owner/admin creates or edits a Supabase portfolio project before previewing and publishing.

Data fields to represent:
- title
- slug
- role
- stack text array as tag input
- display_order
- description_es
- description_en
- highlights_es as repeatable bullet fields
- highlights_en as repeatable bullet fields
- project_url
- repo_url
- cover_path
- published toggle
- featured toggle

Layout requirements:
- Desktop-first 1280px wide admin screen.
- Header with breadcrumb: Projects / Edit Project.
- Main title: Edit project.
- Status badge: Draft or Published.
- Organize form into clear sections:
  1. Identity
  2. Spanish content
  3. English content
  4. Links
  5. Media
  6. Publishing
- Use two-column layout where useful, but keep bilingual text areas large and readable.
- Spanish and English sections should visually mirror each other.
- Show validation states for missing required bilingual fields.
- Media section should show cover preview placeholder and cover path input using projects/<slug>/cover.webp.
- Publishing section should include Published and Featured toggles plus helper text explaining public visibility.
- Sticky footer action bar with: Save draft, Preview, Publish.
- Make Preview feel like the main editorial checkpoint.
- Use realistic English admin copy.

Avoid:
- public registration
- analytics widgets
- team/member management
- generic SaaS clutter
- light mode
```

```text
Create a private admin mini app for managing portfolio projects in Supabase.

Context:
- This is not a public-facing app. It is a small private back office for one owner/admin.
- The public website is a personal portfolio for Alejandro Trejo.
- The admin app exists only to create, edit, preview, publish, and organize portfolio projects without touching the frontend repository.
- Start from a polished, dark-only design system inspired by a senior developer portfolio.
- The design should feel technical, editorial, minimal, premium, and efficient.

Design direction:
- Dark-only interface.
- Use a near-black background, elevated dark surfaces, subtle borders, high-contrast text, muted secondary text, and sharp accent colors.
- Primary accent: strong red, inspired by Angular red.
- Secondary accent: vivid blue, inspired by cloud/dev tooling.
- Typography should feel modern, developer-oriented, and readable.
- Use clean spacing, strong hierarchy, compact tables, clear form sections, and restrained motion.
- Avoid generic SaaS dashboard clutter.
- Avoid playful illustrations.
- Prioritize clarity, speed, and confidence.

Technical content model:
The admin app manages a Supabase `projects` table with these fields:
- id: uuid
- slug: text
- title: text
- description_es: text
- description_en: text
- role: text
- stack: text[]
- highlights_es: text[]
- highlights_en: text[]
- featured: boolean
- display_order: integer
- project_url: text | null
- repo_url: text | null
- cover_path: text | null
- published: boolean
- created_at: timestamptz
- updated_at: timestamptz

Create the following screens:

1. Login
- Simple private login screen.
- Email and password fields.
- Clear message that access is restricted to the portfolio owner.
- Primary action: “Sign in”.
- Include subtle brand/monogram area.
- No public sign-up flow.

2. Project Dashboard
- Main admin landing screen.
- Header with app title, current admin user, and sign-out action.
- Summary cards:
  - Published projects
  - Draft projects
  - Featured projects
  - Last updated
- Project table with columns:
  - Title
  - Slug
  - Status
  - Featured
  - Display order
  - Updated at
  - Actions
- Actions:
  - Edit
  - Preview
  - Publish / Unpublish
- Include search by title or slug.
- Include filters for Published, Draft, and Featured.
- Include primary CTA: “New project”.

3. Create / Edit Project
- Large but well-organized form.
- Divide the form into sections:
  - Identity
  - Spanish content
  - English content
  - Links
  - Media
  - Publishing
- Identity section:
  - Title
  - Slug
  - Role
  - Stack tags input
  - Display order
- Spanish content:
  - Spanish description
  - Spanish highlights as repeatable bullet fields
- English content:
  - English description
  - English highlights as repeatable bullet fields
- Links:
  - Project URL
  - Repository URL
- Media:
  - Cover image preview
  - Cover path field
  - Upload/replace cover action
- Publishing:
  - Published toggle
  - Featured toggle
- Sticky footer actions:
  - Save draft
  - Preview
  - Publish
- Show validation states for required bilingual fields.

4. Cover Image Manager
- Dedicated media workflow screen or modal.
- Show upload area for project cover image.
- Use path convention: `projects/<slug>/cover.webp`.
- Show current image preview.
- Show storage path after upload.
- Actions:
  - Upload image
  - Replace image
  - Remove image
  - Save cover path
- Include helper copy explaining that the database stores the path, not the public URL.

5. Project Preview
- Preview how the project will look before publishing.
- Include tabs or segmented control:
  - Spanish
  - English
  - Card preview
  - Detail preview
- Card preview should resemble a portfolio project card.
- Detail preview should show title, role, description, stack, highlights, cover image, and links.
- Include a clear draft warning if `published` is false.
- Primary actions:
  - Back to edit
  - Publish

6. Publish Confirmation
- Confirmation screen or modal before publishing.
- Show checklist:
  - Spanish description complete
  - English description complete
  - Highlights complete
  - Cover image present
  - Slug valid
  - Preview reviewed
- Actions:
  - Cancel
  - Publish project
- Keep this screen serious and confidence-building, not decorative.

7. Empty State
- Dashboard empty state when there are no projects.
- Explain that the admin can create the first project and publish it to the portfolio.
- CTA: “Create first project”.

UX requirements:
- The app should feel like a focused editorial tool, not a generic CMS.
- Make bilingual editing easy to understand.
- Make draft vs published status obvious.
- Make dangerous actions visually calm but clearly confirmed.
- Keep navigation minimal.
- Prefer practical controls over decorative widgets.
- Use semantic status badges for Draft, Published, and Featured.
- Use consistent spacing and visual grouping.

Output requirements:
- Generate desktop-first screens.
- Keep the visual language consistent across all screens.
- Use realistic admin copy in English.
- Do not create a marketing landing page.
- Do not create a public registration flow.
- Do not create analytics-heavy dashboards.
- Do not create multi-tenant or team-management screens.

Success criteria:
- A portfolio owner can log in, create a project, fill Spanish and English content, upload or assign a cover image path, preview the result, and publish it.
- The UI should make it obvious what is published publicly and what is still draft.
- The admin should be small enough to implement later without becoming a full CMS.
```

## Suggested follow-up prompt

```text
Refine the generated admin screens to match a dark technical portfolio design system. Reduce visual noise, improve bilingual form clarity, strengthen published/draft status hierarchy, and make the preview workflow feel like the main editorial checkpoint.
```
