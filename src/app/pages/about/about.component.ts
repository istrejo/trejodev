import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <span class="font-mono text-muted text-sm">— about —</span>
    </div>
  `,
})
export class AboutComponent {}
