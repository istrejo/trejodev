import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <span class="font-mono text-muted text-sm">— projects —</span>
    </div>
  `,
})
export class ProjectListComponent {}
