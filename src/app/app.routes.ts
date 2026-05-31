import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
    data: { animation: 'home' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.About),
    data: { animation: 'about' },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/portfolio/project-list/project-list').then(
        (m) => m.ProjectList
      ),
    data: { animation: 'projects' },
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/portfolio/project-detail/project-detail').then(
        (m) => m.ProjectDetail
      ),
    data: { animation: 'project-detail' },
  },
  {
    path: 'stack',
    loadComponent: () =>
      import('./pages/expertise/stack/stack').then(
        (m) => m.Stack
      ),
    data: { animation: 'stack' },
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/expertise/experience/experience').then(
        (m) => m.Experience
      ),
    data: { animation: 'experience' },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog').then((m) => m.Blog),
    data: { animation: 'blog' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(
        (m) => m.Contact
      ),
    data: { animation: 'contact' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
