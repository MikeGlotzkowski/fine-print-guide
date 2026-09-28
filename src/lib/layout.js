import { SITE } from '../site.js';
import { esc, relUrl } from './format.js';

const NAV = [
  { href: '/personal/', label: 'Personal' },
  { href: '/business/', label: 'Business' },
  { href: '/tree/', label: 'Tree' },
  { href: '/is-it-covered/', label: 'Is it covered?' },
  { href: '/glossary/', label: 'Glossary' },
];

// Wraps page content in the shared document shell.
// `terms` holds the glossary entries used on the page; they are embedded so
// term links can show a definition in place without loading anything.
export function layout({ page, title, description, body, crumbs = [], terms = [], bodyClass = '', base }) {
  // `base` switches to root-absolute links (used by 404.html, which hosts
  // serve from any depth).
  const r = base ? (to) => base + to.replace(/^\//, '') : (to) => relUrl(page, to);
  const fullTitle = page === '' && !base ? `${SITE.name}: ${SITE.tagline}` : `${title} · ${SITE.name}`;
  const canonical = SITE.url ? `<link rel="canonical" href="${SITE.url}/${page}">` : '';
  const current = '/' + page.split('/')[0] + '/';

  const nav = NAV.map(
    (n) =>
      `<li><a href="${r(n.href)}"${n.href === current ? ' aria-current="true"' : ''}>${n.label}</a></li>`
  ).join('');

  const crumbHtml = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
        .map((c) => (c.href ? `<li><a href="${r(c.href)}">${esc(c.label)}</a></li>` : `<li aria-current="page">${esc(c.label)}</li>`))
        .join('')}</ol></nav>`
    : '';

  const termData = terms.length
    ? `<script type="application/json" id="term-data">${JSON.stringify(
        Object.fromEntries(terms.map((t) => [t.slug, { term: t.term, def: t.def }]))
      ).replace(/</g, '\\u003c')}</script>`
    : '';

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || SITE.description)}">
${canonical}
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description || SITE.description)}">
<meta property="og:type" content="website">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${r('/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${r('/assets/style.css')}">
<script src="${r('/assets/app.js')}" defer></script>
</head>
<body class="${bodyClass}" data-root="${r('/')}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${r('/')}"><span class="brand-mark" aria-hidden="true"></span>${esc(SITE.name)}</a>
    <nav class="main-nav" aria-label="Main"><ul>${nav}</ul></nav>
    <form class="search" role="search" action="${r('/search/')}" method="get">
      <label for="q" class="visually-hidden">Search topics</label>
      <input id="q" name="q" type="search" placeholder="Search, e.g. flood" autocomplete="off">
      <button type="submit">Search</button>
    </form>
  </div>
</header>
<main id="main" class="wrap">
${crumbHtml}
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <p><strong>General information, not advice.</strong> Policies differ by insurer and by state. What your own policy says is what counts, so use this site to know what to look for and what to ask.</p>
    <p class="footer-links"><a href="${r('/basics/')}">Basics</a> · <a href="${r('/situations/')}">Start from your situation</a> · <a href="${r('/map/')}">The whole map</a> · <a href="${r('/tree/')}">The insurance tree</a> · <a href="${r('/perils/')}">Perils</a> · <a href="${r('/read-your-policy/')}">Reading your policy</a> · <a href="${r('/about/')}">About</a></p>
    <p class="muted">Content last reviewed ${SITE.lastReviewed}.</p>
  </div>
</footer>
${termData}
</body>
</html>
`;
}
