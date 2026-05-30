import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
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
