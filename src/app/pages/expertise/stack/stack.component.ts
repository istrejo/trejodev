import { Component } from '@angular/core';
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
  styles: [`
    .page-title { animation: stackSlideUp 500ms ease-out 80ms both; }
    .page-lead   { animation: stackSlideUp 500ms ease-out 200ms both; }
    @keyframes stackSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <!-- ═══ HEADER ══════════════════════════════════════════════════ -->
    <section class="border-b border-border">
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-5">
        <span class="font-mono text-xs text-accent-1 tracking-widest uppercase"
          i18n="@@stack.eyebrow">Stack</span>
        <h1 class="page-title font-mono font-bold text-3xl sm:text-4xl text-text"
          i18n="@@stack.title">Herramientas con criterio.</h1>
        <p class="page-lead text-muted max-w-xl leading-relaxed"
          i18n="@@stack.lead">
          No colecciono frameworks. Profundizo en los que eleijo con criterio
          y entiendo sus trade-offs en contextos reales.
        </p>

        <!-- Legend -->
        <div class="flex flex-wrap gap-3 pt-2">
          @for (entry of legend; track entry.level) {
            <span class="inline-flex items-center px-2.5 py-1 text-xs font-mono border rounded-sm"
              [class]="entry.style">
              {{ entry.label }}
            </span>
          }
        </div>
      </div>
    </section>

    <!-- ═══ SKILL GROUPS ═════════════════════════════════════════════ -->
    <div class="max-w-6xl mx-auto px-6 py-12 space-y-12">
      @for (group of skillGroups; track group.category; let i = $index) {
        <div appReveal [appRevealDelay]="i * 60">
          <h2 class="font-mono text-xs text-muted tracking-widest uppercase mb-4 border-b border-border pb-3">
            {{ group.category }}
          </h2>
          <div class="flex flex-wrap gap-2">
            @for (skill of group.skills; track skill.name) {
              <span
                class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono border transition-colors duration-150"
                [class]="skillClass(skill.level)"
              >
                {{ skill.name }}
                <span class="text-[10px] opacity-60">{{ levelLabel(skill.level) }}</span>
              </span>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class StackComponent {
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
}
