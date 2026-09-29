// Renders the social share image (og-image.png, 1200x630) and the
// apple-touch-icon.png into src/static. Run after changing the brand:
//   node scripts/social-images.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { SITE } from '../src/site.js';

const STATIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static');
const serif = "'Iowan Old Style', 'Palatino Linotype', Palatino, Charter, Georgia, serif";
const mark = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#1d5c57"/><rect x="7" y="8" width="18" height="2.5" rx="1" fill="#e4efed"/><rect x="7" y="14" width="18" height="2.5" rx="1" fill="#e4efed"/><rect x="7" y="20" width="11" height="2.5" rx="1" fill="#e4efed"/></svg>`;

const og = `<body style="margin:0;width:1200px;height:630px;background:#faf8f4;font-family:${serif};color:#1c2226;display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box;border-bottom:24px solid #1d5c57">
<div style="display:flex;align-items:center;gap:28px">${mark(96)}<span style="font-size:64px;font-weight:700">${SITE.name}</span></div>
<p style="font-size:52px;line-height:1.2;margin:56px 0 0">${SITE.tagline}</p>
<p style="font-size:30px;color:#5d6870;margin:28px 0 0;font-family:system-ui,sans-serif">What policies cover, and what they leave out.</p>
</body>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.screenshot({ path: path.join(STATIC, 'og-image.png') });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0;background:#1d5c57">${mark(180).replace('rx="5"', 'rx="0"')}</body>`);
await page.screenshot({ path: path.join(STATIC, 'apple-touch-icon.png') });
await browser.close();
console.log('Wrote og-image.png and apple-touch-icon.png');
