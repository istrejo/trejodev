import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'home' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: { animation: 'about' },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/portfolio/project-list/project-list.component').then(
        (m) => m.ProjectListComponent
      ),
    data: { animation: 'projects' },
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/portfolio/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    data: { animation: 'project-detail' },
  },
  {
    path: 'stack',
    loadComponent: () =>
      import('./pages/expertise/stack/stack.component').then(
        (m) => m.StackComponent
      ),
    data: { animation: 'stack' },
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/expertise/experience/experience.component').then(
        (m) => m.ExperienceComponent
      ),
    data: { animation: 'experience' },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent),
    data: { animation: 'blog' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { animation: 'contact' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
