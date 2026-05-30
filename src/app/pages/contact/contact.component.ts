import { Component, OnInit, inject, signal } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { IconComponent } from '../../shared/atoms/icon/icon.component';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const INQUIRY_TYPES = [
  { value: 'discovery', label_es: 'Llamada de descubrimiento (gratis)', label_en: 'Discovery call (free)' },
  { value: 'project', label_es: 'Proyecto frontend', label_en: 'Frontend project' },
  { value: 'audit', label_es: 'Auditoría técnica', label_en: 'Technical audit' },
  { value: 'mentoring', label_es: 'Mentoría / consultoría', label_en: 'Mentoring / consulting' },
  { value: 'other', label_es: 'Otro', label_en: 'Other' },
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, IconComponent],
  styles: [`
    .page-title { animation: ctSlideUp 500ms ease-out 80ms both; }
    .page-form  { animation: ctSlideUp 500ms ease-out 200ms both; }
    @keyframes ctSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    /* Honeypot: visually hidden, still in DOM for bots */
    .hp-field { position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none; tab-index: -1; }
  `],
  template: `
    <!-- ═══ HEADER ══════════════════════════════════════════════════ -->
    <section class="border-b border-border">
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-4">
        <span class="font-mono text-xs text-accent-1 tracking-widest uppercase"
          i18n="@@contact.eyebrow">Contacto</span>
        <h1 class="page-title font-mono font-bold text-3xl sm:text-4xl text-text"
          i18n="@@contact.title">Trabajemos juntos.</h1>
        <p class="text-muted max-w-md leading-relaxed"
          i18n="@@contact.lead">
          Contame qué necesitás. Respondo en menos de 24 horas.
        </p>
      </div>
    </section>

    <!-- ═══ LAYOUT ═══════════════════════════════════════════════════ -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

        <!-- ── Form ──────────────────────────────────────────────── -->
        <div class="page-form">

          <!-- Success state -->
          @if (state() === 'success') {
            <div class="border border-accent-2/30 bg-accent-2/5 p-10 text-center space-y-4">
              <app-icon name="check" size="xl" class="text-accent-2 mx-auto block" />
              <h2 class="font-mono font-semibold text-lg text-text"
                i18n="@@contact.success.title">¡Mensaje enviado!</h2>
              <p class="text-muted text-sm" i18n="@@contact.success.body">
                Te respondo en menos de 24 horas.
              </p>
              <button
                type="button"
                class="font-mono text-xs text-accent-2 border border-accent-2/30 px-4 py-2 hover:bg-accent-2/10 transition-colors"
                (click)="reset()"
                i18n="@@contact.success.another"
              >Enviar otro mensaje</button>
            </div>
          }

          <!-- Form -->
          @if (state() !== 'success') {
            <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="space-y-6">

              <!-- Honeypot (hidden from humans) -->
              <div class="hp-field" aria-hidden="true">
                <input formControlName="_hp" type="text" autocomplete="off" tabindex="-1">
              </div>

              <!-- Name + Email row -->
              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="font-mono text-xs text-muted uppercase tracking-wide"
                    i18n="@@contact.field.name">Nombre *</label>
                  <input
                    formControlName="name"
                    type="text"
                    autocomplete="name"
                    [class]="inputClass('name')"
                    i18n-placeholder="@@contact.field.name.placeholder"
                    placeholder="Tu nombre"
                  >
                  @if (showError('name')) {
                    <p class="font-mono text-xs text-accent-1" i18n="@@contact.error.name">
                      Mínimo 2 caracteres.
                    </p>
                  }
                </div>

                <div class="space-y-1.5">
                  <label class="font-mono text-xs text-muted uppercase tracking-wide"
                    i18n="@@contact.field.email">Email *</label>
                  <input
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                    [class]="inputClass('email')"
                    i18n-placeholder="@@contact.field.email.placeholder"
                    placeholder="hola@ejemplo.com"
                  >
                  @if (showError('email')) {
                    <p class="font-mono text-xs text-accent-1" i18n="@@contact.error.email">
                      Email inválido.
                    </p>
                  }
                </div>
              </div>

              <!-- Inquiry type -->
              <div class="space-y-1.5">
                <label class="font-mono text-xs text-muted uppercase tracking-wide"
                  i18n="@@contact.field.type">¿Qué necesitás?</label>
                <select
                  formControlName="type"
                  [class]="inputClass('type')"
                >
                  @for (opt of inquiryTypes; track opt.value) {
                    <option [value]="opt.value">{{ opt.label_es }}</option>
                  }
                </select>
              </div>

              <!-- Message -->
              <div class="space-y-1.5">
                <label class="font-mono text-xs text-muted uppercase tracking-wide"
                  i18n="@@contact.field.message">Mensaje *</label>
                <textarea
                  formControlName="message"
                  rows="5"
                  [class]="inputClass('message')"
                  i18n-placeholder="@@contact.field.message.placeholder"
                  placeholder="Contame tu proyecto, contexto, timeline..."
                ></textarea>
                <div class="flex justify-between items-center">
                  @if (showError('message')) {
                    <p class="font-mono text-xs text-accent-1" i18n="@@contact.error.message">
                      Mínimo 20 caracteres.
                    </p>
                  } @else {
                    <span></span>
                  }
                  <span class="font-mono text-xs text-muted">
                    {{ msgLength() }}/500
                  </span>
                </div>
              </div>

              <!-- Server error -->
              @if (state() === 'error') {
                <div class="border border-accent-1/30 bg-accent-1/5 px-4 py-3">
                  <p class="font-mono text-xs text-accent-1">{{ errorMsg() }}</p>
                </div>
              }

              <!-- Submit -->
              <app-button
                variant="primary"
                size="lg"
                type="submit"
                [disabled]="state() === 'submitting'"
              >
                @if (state() === 'submitting') {
                  <span i18n="@@contact.submitting">Enviando...</span>
                } @else {
                  <span i18n="@@contact.submit">Enviar mensaje</span>
                }
              </app-button>

            </form>
          }
        </div>

        <!-- ── Sidebar ────────────────────────────────────────────── -->
        <div class="space-y-6 md:pt-2">

          <!-- Direct contact -->
          <div class="border border-border bg-surface p-6 space-y-4">
            <h3 class="font-mono text-xs text-muted tracking-widest uppercase"
              i18n="@@contact.direct.title">Contacto directo</h3>

            @for (link of directLinks; track link.href) {
              <a
                [href]="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 group"
              >
                <app-icon [name]="link.icon" size="sm" class="text-muted group-hover:text-text transition-colors" />
                <span class="font-mono text-xs text-muted group-hover:text-text transition-colors">{{ link.label }}</span>
              </a>
            }
          </div>

          <!-- Response time -->
          <div class="border border-border p-5 space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent-1 animate-pulse"></span>
              <span class="font-mono text-xs text-muted" i18n="@@contact.response.label">
                Disponible para proyectos
              </span>
            </div>
            <p class="font-mono text-xs text-muted/60" i18n="@@contact.response.time">
              Respuesta en &lt; 24 horas (días hábiles)
            </p>
          </div>

          <!-- Fallback mailto -->
          <p class="font-mono text-xs text-muted/50 leading-relaxed" i18n="@@contact.mailto.hint">
            ¿Preferís email directo?
            <a href="mailto:hola@digitalmente.studio"
              class="text-muted hover:text-text underline transition-colors">
              hola@digitalmente.studio
            </a>
          </p>

        </div>
      </div>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly seo = inject(SeoService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.seo.set({
      title: 'Contacto',
      description: 'Trabajemos juntos. Discovery call gratis, proyectos Angular, auditorías técnicas y mentoría. Respuesta en menos de 24 horas.',
      url: '/contact',
    });
  }

  readonly state = signal<FormState>('idle');
  readonly errorMsg = signal<string>('');
  readonly inquiryTypes = INQUIRY_TYPES;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    type: ['discovery'],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
    _hp: [''],
  });

  readonly directLinks = [
    { icon: 'mail' as const, href: 'mailto:hola@digitalmente.studio', label: 'hola@digitalmente.studio' },
    { icon: 'linkedin' as const, href: 'https://linkedin.com/in/alejandrotrejodev', label: 'LinkedIn / alejandrotrejodev' },
    { icon: 'github' as const, href: 'https://github.com/istrejo', label: 'GitHub / istrejo' },
  ];

  msgLength(): number {
    return (this.form.get('message')?.value ?? '').length;
  }

  showError(field: string): boolean {
    const ctrl = this.form.get(field) as AbstractControl;
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  inputClass(field: string): string {
    const base = 'w-full bg-bg border px-4 py-2.5 text-sm text-text font-sans placeholder:text-muted/50 focus:outline-none focus:border-accent-1/60 transition-colors duration-150';
    const ctrl = this.form.get(field) as AbstractControl;
    const hasError = ctrl.invalid && (ctrl.dirty || ctrl.touched);
    return `${base} ${hasError ? 'border-accent-1/50' : 'border-border'}`;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.state.set('submitting');
    const { _hp, ...payload } = this.form.value;

    this.http.post<{ ok: boolean; error?: string }>('/api/contact', { ...payload, _hp }).subscribe({
      next: () => this.state.set('success'),
      error: (err) => {
        this.errorMsg.set(err.error?.error ?? 'Error inesperado. Intentá de nuevo.');
        this.state.set('error');
      },
    });
  }

  reset(): void {
    this.form.reset({ type: 'discovery' });
    this.state.set('idle');
  }
}
