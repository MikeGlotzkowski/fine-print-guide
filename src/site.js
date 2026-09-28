// Site-wide settings. The brand name lives here only, so a rename is one edit.
export const SITE = {
  name: 'Fine Print Guide',
  tagline: 'US insurance, explained plainly.',
  description:
    'A plain-language guide to how insurance works in the US: what home, auto, health, travel and business policies cover, what they leave out, and what the codes on your policy mean.',
  lastReviewed: 'September 2026',
  // Set SITE_URL at build time for canonical links and the sitemap,
  // e.g. SITE_URL=https://example.com npm run build
  // Path the site is served under; only 404.html needs it. For a GitHub Pages
  // project site use BASE_PATH=/repo-name/
  basePath: process.env.BASE_PATH || '/',
  url: (process.env.SITE_URL || '').replace(/\/$/, ''),
};
