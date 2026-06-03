create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description_es text not null,
  description_en text not null,
  role text not null,
  stack text[] not null default '{}',
  highlights_es text[] not null default '{}',
  highlights_en text[] not null default '{}',
  featured boolean not null default false,
  display_order integer not null default 0,
  project_url text,
  repo_url text,
  cover_path text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_not_blank check (btrim(slug) <> ''),
  constraint projects_title_not_blank check (btrim(title) <> ''),
  constraint projects_role_not_blank check (btrim(role) <> ''),
  constraint projects_display_order_non_negative check (display_order >= 0)
);

create index if not exists projects_published_display_order_idx
  on public.projects (published, display_order);

create index if not exists projects_featured_display_order_idx
  on public.projects (featured, display_order);

drop trigger if exists projects_set_updated_at on public.projects;

create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
to public
using (published = true);

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'projects',
  'projects',
  false,
  5242880,
  array['image/webp', 'image/png', 'image/jpeg']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read published project covers" on storage.objects;
create policy "Public can read published project covers"
on storage.objects
for select
to public
using (
  bucket_id = 'projects'
  and exists (
    select 1
    from public.projects p
    where p.cover_path = storage.objects.name
      and p.published = true
  )
);

drop policy if exists "Admins can manage project covers" on storage.objects;
create policy "Admins can manage project covers"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'projects'
  and public.is_admin()
)
with check (
  bucket_id = 'projects'
  and public.is_admin()
);
