# Fine Print Guide

A free, plain-language guide to US insurance: what personal and business policies cover, what they leave out, and what codes like HO-3, DP-3 or "Coverage A" mean.

Live: https://mikeglotzkowski.github.io/fine-print-guide/ · Planned domain: **fineprintguide.com** (not registered yet).

## What's in it

- **I have a policy:** 24 policy pages (13 personal, 11 business). Each one opens with a one-sentence answer, then "usually covered" and "usually not covered" side by side, then real-life examples. The coverage parts (A–F and so on) fold open, and each page ends with a checklist for your own policy.
- **Something happened:** "Is it covered?" has 43 common situations with a yes / no / it-depends answer. You can filter them by keyword or by area.
- **Start from my situation:** step-by-step guides for newcomers to the US, renting, buying a home or car, travel, starting a business and hiring. Each step says whether it's required by law, required by someone else, or optional.
- **Supporting pages:** the basics in six ideas, the 16 named perils with examples, how to read a declarations page, the whole map, a glossary, and search.
- **Terms explained in place:** tap any dotted-underlined word to see its definition without leaving the page.

See [docs/CONCEPT.md](docs/CONCEPT.md) for the design principles and the reasoning behind the structure.

## Run it

Requires Node 20 or later. The site itself has no dependencies.

```sh
npm run build      # writes the site to dist/
npm run serve      # preview at http://localhost:8080
```

## Test it

```sh
npm install                                # Playwright + axe-core, for browser tests only
npx playwright install chromium            # once, if you don't have it
npm test                                   # structure: links, anchors, headings, search index, markup
npm run test:browser                       # axe accessibility (light + dark), 360px phones, filter, definitions, search, 404
```

## Deploy

`dist/` is plain static files. All links are relative, so it works at a domain root or in a sub-folder.

- **GitHub Pages:** `.github/workflows/pages.yml` builds on every push to `main` and publishes to the `gh-pages` branch, which Pages serves (Settings > Pages > Deploy from a branch: `gh-pages`).
- **Netlify / Cloudflare Pages / Vercel:** build command `node build.js`, output directory `dist`. `netlify.toml` is included.
- **Anywhere else:** run `npm run build` and upload `dist/`.

Optional build settings:

- `SITE_URL=https://fineprintguide.com` adds canonical links and a sitemap.
- `BASE_PATH=/sub-folder/` is only needed for `404.html` when the site is served under a sub-path.

## Editing content

All text lives in `src/content/*.js` as plain data. Every page has the same structure, so pages stay consistent.

| File | What it holds |
| --- | --- |
| `personal-home.js`, `personal-other.js`, `business.js` | Policy pages |
| `situations.js` | Step-by-step guides |
| `scenarios.js` | "Is it covered?" entries |
| `glossary.js` | Terms. Link one anywhere with `[[slug]]` or `[[slug\|label]]` |
| `perils.js`, `basics.js`, `declarations.js` | The supporting pages |

Inline format: `**bold**`, `[[glossary-term]]`, `[text](/internal/path/)`. The build fails if a term or policy link doesn't exist. The tests fail on broken links, missing anchors or leftover markup.

The brand name lives in one place: `src/site.js`.

## Disclaimer

General information, not insurance, legal or tax advice. Policies differ by insurer and state; the policy wording decides.
