import { Component, OnInit, inject, signal } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Button } from '../../shared/atoms/button/button';
import { Icon } from '../../shared/atoms/icon/icon';

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
  imports: [ReactiveFormsModule, Button, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
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
