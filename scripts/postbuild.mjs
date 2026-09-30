// Runs automatically after `npm run build` (npm "postbuild" hook).
// Creates sitemap.xml from the prerendered pages, so it can never go out of sync with the routes.
// For builds with a sub-path base href (GitHub Pages preview) it also fixes root-relative URLs.
import { copyFileSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const SITE_URL = 'https://www.hund-katze-kaefer.de';
const OUT_DIR = 'dist/hund-katze-kaefer/browser';
const EXCLUDE = new Set(['/404']);
const PRIORITY = {
  '/': '1.0',
  '/leistungen': '0.9',
  '/katzen-ernaehrungsberatung': '0.9',
  '/kontakt': '0.8',
};

function findPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return findPages(path);
    return name === 'index.html' ? [path] : [];
  });
}

const today = new Date().toISOString().slice(0, 10);
const urls = findPages(OUT_DIR)
  .map((file) => '/' + relative(OUT_DIR, file).split(sep).slice(0, -1).join('/'))
  .filter((path) => !EXCLUDE.has(path))
  .sort((a, b) => a.length - b.length || a.localeCompare(b));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${PRIORITY[path] ?? (path === '/impressum' || path === '/datenschutz' ? '0.2' : '0.7')}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(OUT_DIR, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);

// ── Sub-path deployments (e.g. https://user.github.io/hund-katze-kaefer/) ──
const baseHref = /<base href="([^"]*)"/.exec(
  readFileSync(join(OUT_DIR, 'index.html'), 'utf8'),
)?.[1];

if (baseHref && baseHref !== '/') {
  function findFiles(dir) {
    return readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? findFiles(path) : [path];
    });
  }

  // The font URLs in styles.scss / index.html are root-relative and ignore the base href.
  for (const file of findFiles(OUT_DIR)) {
    if (!['.html', '.css'].includes(extname(file))) continue;
    const before = readFileSync(file, 'utf8');
    const after = before.replace(/(url\(\s*["']?|href=")\/fonts\//g, `$1${baseHref}fonts/`);
    if (after !== before) writeFileSync(file, after);
  }

  const manifest = join(OUT_DIR, 'site.webmanifest');
  writeFileSync(manifest, readFileSync(manifest, 'utf8').replaceAll('": "/', `": "${baseHref}`));

  // GitHub Pages serves /404.html for unknown URLs (there is no .htaccess).
  copyFileSync(join(OUT_DIR, '404', 'index.html'), join(OUT_DIR, '404.html'));
  console.log(`base href ${baseHref}: font URLs and manifest rewritten, 404.html created`);
}
