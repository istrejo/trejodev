# Supabase Admin Setup

This project uses `app_metadata.role = 'admin'` to unlock write access through RLS.

## Quick Path

1. Create your user in Supabase Auth.
2. Set `raw_app_meta_data.role = 'admin'` for that user.
3. Sign out and sign back in so a fresh JWT includes the admin role.

## Why This Exists

The policies created in Sprint 1 use this function:

```sql
public.is_admin()
```

That function returns `true` only when the authenticated JWT contains:

```json
{
  "app_metadata": {
    "role": "admin"
  }
}
```

Without that claim, authenticated users still cannot write projects or upload covers.

## Create The User

Use Supabase Dashboard:

1. Open `Authentication`.
2. Create the owner/admin user.
3. Confirm the email if your auth settings require it.

## Assign The Admin Role

Run this SQL in Supabase SQL Editor after creating the user:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'you@example.com';
```

Replace `you@example.com` with the real admin email.

## Verify

1. Sign in with the admin user.
2. Refresh the session by signing out and back in.
3. Confirm the user can create and edit rows in `public.projects`.
4. Confirm the user can upload files into bucket `projects`.

## Notes

- The bucket is private at the storage level.
- Public reads for cover images are granted only when `public.projects.cover_path = storage.objects.name` and the related project is published.
- If the admin role is added after the first login, the old JWT will not pick it up until the session is refreshed.
