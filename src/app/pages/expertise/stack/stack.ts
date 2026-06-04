import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

type Level = 'expert' | 'advanced' | 'intermediate' | 'familiar';

interface Skill {
  name: string;
  level: Level;
}

interface SkillGroup {
  category: string;
  skills: Skill[];
}

const LEVEL_STYLES: Record<Level, string> = {
  expert:       'text-accent-1 border-accent-1/40 bg-accent-1/8',
  advanced:     'text-accent-2 border-accent-2/40 bg-accent-2/8',
  intermediate: 'text-text border-border bg-surface',
  familiar:     'text-muted border-border/60 bg-transparent',
};

const LEVEL_LABEL: Record<Level, string> = {
  expert:       'Expert',
  advanced:     'Advanced',
  intermediate: 'Intermediate',
  familiar:     'Familiar',
};

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack implements OnInit {
  private readonly seo = inject(SeoService);
  readonly legend = (Object.entries(LEVEL_LABEL) as [Level, string][]).map(([level, label]) => ({
    level,
    label,
    style: LEVEL_STYLES[level],
  }));

  skillClass(level: Level): string {
    return LEVEL_STYLES[level];
  }

  levelLabel(level: Level): string {
    return LEVEL_LABEL[level];
  }

  readonly skillGroups: SkillGroup[] = [
    {
      category: 'Frameworks & Libraries',
      skills: [
        { name: 'Angular', level: 'expert' },
        { name: 'RxJS', level: 'expert' },
        { name: 'Angular Signals', level: 'expert' },
        { name: 'NgRx', level: 'advanced' },
        { name: 'Storybook', level: 'advanced' },
        { name: 'Angular Material', level: 'advanced' },
        { name: 'React', level: 'intermediate' },
        { name: 'Vue 3', level: 'familiar' },
      ],
    },
    {
      category: 'Architecture & Patterns',
      skills: [
        { name: 'Microfrontends', level: 'expert' },
        { name: 'Module Federation', level: 'expert' },
        { name: 'Hexagonal Architecture', level: 'expert' },
        { name: 'Screaming Architecture', level: 'expert' },
        { name: 'Clean Architecture', level: 'advanced' },
        { name: 'DDD', level: 'advanced' },
        { name: 'SOLID', level: 'expert' },
        { name: 'Atomic Design', level: 'advanced' },
        { name: 'Container/Presentational', level: 'expert' },
      ],
    },
    {
      category: 'Build & Tooling',
      skills: [
        { name: 'Nx', level: 'expert' },
        { name: 'TypeScript', level: 'expert' },
        { name: 'esbuild', level: 'advanced' },
        { name: 'Webpack', level: 'advanced' },
        { name: 'Vite', level: 'intermediate' },
        { name: 'ESLint', level: 'advanced' },
        { name: 'Prettier', level: 'advanced' },
      ],
    },
    {
      category: 'Testing',
      skills: [
        { name: 'Jest', level: 'advanced' },
        { name: 'Cypress', level: 'advanced' },
        { name: 'Playwright', level: 'intermediate' },
        { name: 'Jasmine / Karma', level: 'advanced' },
        { name: 'Testing Library', level: 'intermediate' },
      ],
    },
    {
      category: 'Backend & APIs',
      skills: [
        { name: 'Node.js', level: 'intermediate' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'GraphQL', level: 'intermediate' },
        { name: 'Sanity.io', level: 'intermediate' },
        { name: 'Firebase', level: 'advanced' },
      ],
    },
    {
      category: 'DevOps & Infrastructure',
      skills: [
        { name: 'Docker', level: 'advanced' },
        { name: 'GitHub Actions', level: 'advanced' },
        { name: 'Dokploy', level: 'intermediate' },
        { name: 'Firebase Hosting', level: 'advanced' },
        { name: 'Nginx', level: 'intermediate' },
        { name: 'Linux (CLI)', level: 'intermediate' },
      ],
    },
    {
      category: 'Languages & Core',
      skills: [
        { name: 'TypeScript', level: 'expert' },
        { name: 'JavaScript (ES2024)', level: 'expert' },
        { name: 'HTML5 / Accessibility', level: 'advanced' },
        { name: 'SCSS / CSS', level: 'advanced' },
        { name: 'Go', level: 'familiar' },
        { name: 'SQL', level: 'intermediate' },
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Stack técnico',
      description: 'Angular, TypeScript, RxJS, Nx, microfrontends, arquitectura hexagonal y más. Herramientas con criterio y trade-offs claros.',
      url: '/stack',
    });
  }
}
