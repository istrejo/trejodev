const BASE_URL = 'https://trejodev.com';

const STATIC_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.9' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/stack', changefreq: 'monthly', priority: '0.7' },
  { path: '/experience', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.8' },
] as const;

function urlEntry(path: string, changefreq: string, priority: string): string {
  return [
    '  <url>',
    `    <loc>${BASE_URL}${path}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export function buildSitemapXml(projectSlugs: string[]): string {
  const staticEntries = STATIC_ROUTES.map((route) =>
    urlEntry(route.path, route.changefreq, route.priority),
  );
  const projectEntries = projectSlugs.map((slug) => urlEntry(`/projects/${slug}`, 'weekly', '0.8'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...projectEntries,
    '</urlset>',
  ].join('\n');
}
