import { SITE } from '../site.js';
import { esc, relUrl } from './format.js';

const NAV = [
  { href: '/personal/', label: 'Personal' },
  { href: '/business/', label: 'Business' },
  { href: '/tree/', label: 'Insurance tree' },
  { href: '/is-it-covered/', label: 'Is it covered?' },
  { href: '/glossary/', label: 'Glossary' },
];

// Wraps page content in the shared document shell.
// `terms` holds the glossary entries used on the page; they are embedded so
// term links can show a definition in place without loading anything.
// Search engines show about 155 characters of a description; cut longer ones
// at a word boundary rather than mid-word.
export function metaDescription(text) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= 160) return s;
  const cut = s.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
}

// schema.org data: the site itself on the home page, a breadcrumb trail
// elsewhere. Google uses the trail in place of the URL in results.
function structuredData({ page, title, crumbs }) {
  const abs = (to) => SITE.url + to;
  if (page === '') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: abs('/'),
      description: SITE.description,
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: abs('/search/?q={search_term_string}') },
        'query-input': 'required name=search_term_string',
      },
    };
  }
  const here = crumbs.find((c) => !c.href)?.label || title;
  const trail = [{ label: 'Home', href: '/' }, ...crumbs.filter((c) => c.href), { label: here, href: '/' + page }];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href) })),
  };
}

export function layout({ page, title, description, body, crumbs = [], terms = [], bodyClass = '', base, noindex = false, ogType }) {
  // `base` switches to root-absolute links (used by 404.html, which hosts
  // serve from any depth).
  const r = base ? (to) => base + to.replace(/^\//, '') : (to) => relUrl(page, to);
  const fullTitle = page === '' && !base ? `${SITE.name}: ${SITE.tagline}` : `${title} · ${SITE.name}`;
  const desc = metaDescription(description || SITE.description);
  const url = `${SITE.url}/${page}`;
  // 404.html is served at any path, so it gets no canonical or social URL.
  const head = [
    noindex ? '<meta name="robots" content="noindex">' : '',
    SITE.url && !base ? `<link rel="canonical" href="${url}">` : '',
    `<meta property="og:site_name" content="${esc(SITE.name)}">`,
    `<meta property="og:title" content="${esc(page === '' ? SITE.name : title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:type" content="${ogType || (page === '' ? 'website' : 'article')}">`,
    '<meta property="og:locale" content="en_US">',
    SITE.url && !base ? `<meta property="og:url" content="${url}">` : '',
    SITE.url ? `<meta property="og:image" content="${SITE.url}/og-image.png">` : '',
    SITE.url ? '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">' : '',
    SITE.url ? `<meta property="og:image:alt" content="${esc(SITE.name)}: ${esc(SITE.tagline)}">` : '',
    '<meta name="twitter:card" content="summary_large_image">',
    SITE.url && !base && !noindex
      ? `<script type="application/ld+json">${JSON.stringify(structuredData({ page, title, crumbs })).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
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
<meta name="description" content="${esc(desc)}">
${head}
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${r('/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${r('/apple-touch-icon.png')}">
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
