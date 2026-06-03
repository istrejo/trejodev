import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import express from 'express';
import { join } from 'node:path';
import { ProjectApiDetail, ProjectApiSummary } from './app/core/models/project-api.model';
import { PublicProjectRow, toProjectApiDetail, toProjectApiSummary } from './server/project-api';
import { buildSitemapXml } from './server/sitemap';

const browserDistFolder = join(import.meta.dirname, '../browser');
const CACHE_TTL_MS = 60_000;

const app = express();
const angularApp = new AngularNodeAppEngine();

type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const apiCache = new Map<string, CacheEntry<unknown>>();

let supabaseClient: SupabaseClient | null | undefined;

function getCacheValue<T>(key: string): T | null {
  const entry = apiCache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() >= entry.expiresAt) {
    apiCache.delete(key);
    return null;
  }

  return entry.value as T;
}

function setCacheValue<T>(key: string, value: T): T {
  apiCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
  return value;
}

function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient !== undefined) {
    return supabaseClient;
  }

  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];

  if (!url || !key) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseClient;
}

function getProjectImageUrl(client: SupabaseClient, coverPath: string | null): string | undefined {
  if (!coverPath) {
    return undefined;
  }

  return client.storage.from('projects').getPublicUrl(coverPath).data.publicUrl;
}

function withProjectImage(client: SupabaseClient, row: PublicProjectRow): string | undefined {
  return getProjectImageUrl(client, row.cover_path);
}

async function loadPublishedProjects(): Promise<ProjectApiSummary[]> {
  const cached = getCacheValue<ProjectApiSummary[]>('projects:list');

  if (cached) {
    return cached;
  }

  const client = getSupabaseClient();

  if (!client) {
    throw new Error('Supabase server client is not configured.');
  }

  const { data, error } = await client
    .from('projects')
    .select(
      'id, slug, title, description_es, description_en, role, stack, featured, display_order, project_url, repo_url, cover_path, published',
    )
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    throw error;
  }

  return setCacheValue(
    'projects:list',
    (data as PublicProjectRow[]).map((row) => toProjectApiSummary(row, withProjectImage(client, row))),
  );
}

async function loadFeaturedProjects(): Promise<ProjectApiSummary[]> {
  const cached = getCacheValue<ProjectApiSummary[]>('projects:featured');

  if (cached) {
    return cached;
  }

  const client = getSupabaseClient();

  if (!client) {
    throw new Error('Supabase server client is not configured.');
  }

  const { data, error } = await client
    .from('projects')
    .select(
      'id, slug, title, description_es, description_en, role, stack, featured, display_order, project_url, repo_url, cover_path, published',
    )
    .eq('published', true)
    .eq('featured', true)
    .order('display_order', { ascending: true });

  if (error) {
    throw error;
  }

  return setCacheValue(
    'projects:featured',
    (data as PublicProjectRow[]).map((row) => toProjectApiSummary(row, withProjectImage(client, row))),
  );
}

async function loadProjectBySlug(slug: string): Promise<ProjectApiDetail | null> {
  const cached = getCacheValue<ProjectApiDetail | null>(`projects:detail:${slug}`);

  if (cached !== null) {
    return cached;
  }

  const client = getSupabaseClient();

  if (!client) {
    throw new Error('Supabase server client is not configured.');
  }

  const { data, error } = await client
    .from('projects')
    .select(
      'id, slug, title, description_es, description_en, role, stack, highlights_es, highlights_en, featured, display_order, project_url, repo_url, cover_path, published',
    )
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return setCacheValue(`projects:detail:${slug}`, null);
  }

  const row = data as PublicProjectRow;

  return setCacheValue(
    `projects:detail:${slug}`,
    toProjectApiDetail(row, withProjectImage(client, row)),
  );
}

app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
});

app.get('/api/projects', async (_req, res) => {
  try {
    res.json(await loadPublishedProjects());
  } catch (error) {
    console.error('[projects:list] error:', error);
    res.status(503).json({ error: 'Projects API is unavailable.' });
  }
});

app.get('/api/projects/featured', async (_req, res) => {
  try {
    res.json(await loadFeaturedProjects());
  } catch (error) {
    console.error('[projects:featured] error:', error);
    res.status(503).json({ error: 'Featured projects API is unavailable.' });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const project = await loadProjectBySlug(req.params['slug']);

    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('[projects:detail] error:', error);
    res.status(503).json({ error: 'Project detail API is unavailable.' });
  }
});

app.get('/sitemap.xml', async (_req, res) => {
  try {
    const projects = await loadPublishedProjects();
    res.type('application/xml').send(buildSitemapXml(projects.map((project) => project.slug)));
  } catch (error) {
    console.error('[sitemap] error:', error);
    res.status(503).type('application/xml').send(buildSitemapXml([]));
  }
});

// ─── Contact API ────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  type: string;
  message: string;
  _hp?: string; // honeypot — must be empty
}

app.post('/api/contact', async (req, res) => {
  const { name, email, type, message, _hp } = req.body as ContactPayload;

  // Honeypot: bots fill this field, humans don't
  if (_hp) {
    res.status(200).json({ ok: true }); // Silent accept to not reveal the trap
    return;
  }

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Campos requeridos faltantes.' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Email inválido.' });
    return;
  }
  if (message.trim().length < 20) {
    res.status(400).json({ error: 'Mensaje demasiado corto (mínimo 20 caracteres).' });
    return;
  }

  const apiKey = process.env['RESEND_API_KEY'];

  if (!apiKey) {
    // Dev mode: log and succeed silently
    console.log('[contact] Resend not configured — would send:', { name, email, type });
    res.json({ ok: true });
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'web@digitalmente.studio',
      to: 'hola@digitalmente.studio',
      replyTo: email,
      subject: `[trejodev.web] ${type || 'Contacto'} — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTipo: ${type}\n\n${message}`,
      html: `
        <h2>Nuevo mensaje desde trejodev.web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo:</strong> ${type}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    res.status(500).json({ error: 'Error al enviar. Intentá de nuevo o escribime directamente.' });
  }
});

// ─── Static files ────────────────────────────────────────────────────────────

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// ─── Angular SSR ─────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// ─── Server startup ──────────────────────────────────────────────────────────

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
