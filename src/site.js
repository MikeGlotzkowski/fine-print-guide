// Site-wide settings. The brand name lives here only, so a rename is one edit.
export const SITE = {
  name: 'Fine Print Guide',
  tagline: 'US insurance, explained plainly.',
  description:
    'A plain-language guide to US insurance: what home, auto, health, travel and business policies cover, what they leave out, and what the codes on a policy mean.',
  lastReviewed: 'September 2026',
  // Production origin, used for canonical links, social tags and the sitemap.
  // Every copy of the site (GitHub Pages fallback, pages.dev, local builds)
  // points search engines here. Override with SITE_URL=https://example.com.
  // Path the site is served under; only 404.html needs it. For a GitHub Pages
  // project site use BASE_PATH=/repo-name/
  basePath: process.env.BASE_PATH || '/',
  url: (process.env.SITE_URL || 'https://fineprintguide.com').replace(/\/$/, ''),
};
