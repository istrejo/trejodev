import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { Button } from '../../shared/atoms/button/button';
import { Tag } from '../../shared/atoms/tag/tag';
import { Icon } from '../../shared/atoms/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Principle {
  number: string;
  title: string;
  body: string;
}

interface ApproachStep {
  label: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, Button, Tag, Icon, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private readonly seo = inject(SeoService);
  readonly expertiseTags = [
    'Angular', 'TypeScript', 'Nx', 'Module Federation',
    'Hexagonal Architecture', 'Clean Architecture', 'SOLID', 'RxJS',
  ];

  readonly stats = [
    { value: '4+', label: 'años con Angular (v8–21)' },
    { value: '7', label: 'micro frontends implementados' },
    { value: '80%', label: 'reducción de carga (CRSoporte)' },
    { value: '100%', label: 'trabajo remoto' },
  ];

  readonly principles: Principle[] = [
    {
      number: '01',
      title: 'El framework es un detalle',
      body: 'Angular, React, Vue — son herramientas. La arquitectura correcta es independiente del framework que usés.',
    },
    {
      number: '02',
      title: 'El contexto siempre gana',
      body: 'No existe el patrón universal. Microservicios, monolito, MFE — cada solución tiene su contexto correcto.',
    },
    {
      number: '03',
      title: 'Los fundamentos escalan',
      body: 'SOLID, DDD, patrones de diseño — estas cosas no caducan. Las tendencias sí. Invertí en lo que dura.',
    },
  ];

  readonly approachSteps: ApproachStep[] = [
    {
      label: 'Entender el negocio primero',
      description: 'Antes de abrir el editor, entiendo qué problema real resuelve el sistema. El código sirve al negocio, no al revés.',
    },
    {
      label: 'Definir restricciones reales',
      description: 'Equipo, tiempo, deuda técnica, escala esperada — las restricciones reales definen la arquitectura posible.',
    },
    {
      label: 'Elegir la solución más simple que funcione',
      description: 'No la más elegante. No la más nueva. La que el equipo pueda mantener y escalar con el menor riesgo.',
    },
    {
      label: 'Documentar las decisiones, no el código',
      description: 'El código explica el QUÉ. Las Architecture Decision Records explican el POR QUÉ — lo que realmente importa.',
    },
    {
      label: 'Iterar con evidencia',
      description: 'Las decisiones arquitectónicas se validan con datos, no con intuición. Medí, iterá, ajustá.',
    },
  ];

  readonly services = [
    { title: 'Arquitectura Frontend', description: 'Diseño de sistemas Angular escalables desde cero.' },
    { title: 'Auditoría técnica', description: 'Review de codebase existente con plan de mejora concreto.' },
    { title: 'Migración Angular', description: 'AngularJS → Angular moderno, arquitectura limpia.' },
    { title: 'Mentoría técnica', description: 'Acompañamiento de equipos en transición a mejores prácticas.' },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Sobre mí',
      description: '4+ años construyendo sistemas frontend distribuidos con Angular v8–21, MFEs y Module Federation. Mi propuesta de valor es la decisión técnica correcta según el contexto real.',
      url: '/about',
    });
  }
}
