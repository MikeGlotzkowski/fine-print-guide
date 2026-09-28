// Browser checks with Playwright + axe-core: accessibility on every page in
// light and dark mode, no sideways scrolling on phones, and the interactive
// parts (filter, definitions, search). Run with `npm run test:browser`.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { createServer } from '../../scripts/serve.js';
import { htmlPages } from '../helpers.js';

const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORT = 8765;
const BASE = `http://localhost:${PORT}/`;
// Use the preinstalled browser when present (CI images), else Playwright's own.
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

let server, browser;
before(async () => {
  server = createServer().listen(PORT);
  browser = await chromium.launch(EXE ? { executablePath: EXE } : {});
});
after(async () => {
  await browser?.close();
  server?.close();
});

async function page(opts = {}) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  p.errors = [];
  p.on('pageerror', (e) => p.errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && p.errors.push(m.text()));
  return p;
}

async function axe(p) {
  await p.addScriptTag({ content: AXE });
  return p.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] });
    return r.violations.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`);
  });
}

for (const scheme of ['light', 'dark']) {
  test(`every page passes axe accessibility checks (${scheme} mode)`, async () => {
    const p = await page({ colorScheme: scheme });
    const problems = [];
    for (const { url } of htmlPages()) {
      await p.goto(BASE + url);
      const v = await axe(p);
      if (v.length) problems.push(`/${url}\n  ${v.join('\n  ')}`);
    }
    assert.deepEqual(problems, [], problems.join('\n'));
    assert.deepEqual(p.errors, []);
  });
}

test('no page scrolls sideways on a 360px phone', async () => {
  const p = await page({ viewport: { width: 360, height: 740 }, isMobile: true });
  const wide = [];
  for (const { url } of htmlPages()) {
    await p.goto(BASE + url);
    const w = await p.evaluate(() => document.documentElement.scrollWidth);
    if (w > 360) wide.push(`/${url} is ${w}px wide`);
  }
  assert.deepEqual(wide, []);
});

test('scenario filter narrows the list by words and by area', async () => {
  const p = await page();
  await p.goto(BASE + 'is-it-covered/');
  const visible = () => p.locator('.scenario:visible').count();
  const total = await visible();
  assert.ok(total > 30);
  await p.fill('#sc-filter', 'deer');
  assert.equal(await visible(), 1);
  await p.fill('#sc-filter', '');
  await p.click('.chip[data-area="Travel"]');
  const travel = await visible();
  assert.ok(travel > 3 && travel < total);
  assert.equal(await p.locator('.chip[data-area="Travel"]').getAttribute('aria-pressed'), 'true');
  await p.fill('#sc-filter', 'zzzz');
  assert.match(await p.textContent('.filter-count'), /No matching/);
});

test('a link to a scenario opens it', async () => {
  const p = await page();
  await p.goto(BASE + 'is-it-covered/#deer');
  assert.equal(await p.locator('#deer details').evaluate((d) => d.open), true);
});

test('term links show a definition in place, and Escape closes it', async () => {
  const p = await page();
  await p.goto(BASE + 'personal/home/');
  const link = p.locator('a.term[data-term="deductible"]').first();
  await link.click();
  await p.waitForSelector('.term-pop');
  assert.match(await p.textContent('.term-pop'), /part of a covered loss you pay yourself/);
  assert.equal(await link.getAttribute('aria-expanded'), 'true');
  assert.equal(new URL(p.url()).pathname, '/personal/home/');
  await p.keyboard.press('Escape');
  assert.equal(await p.locator('.term-pop').count(), 0);
});

test('search finds the flood policy first', async () => {
  const p = await page();
  await p.goto(BASE + 'search/?q=flood');
  await p.waitForSelector('#search-results li');
  assert.equal((await p.textContent('#search-results li .sr-title')).trim(), 'Flood insurance');
  await p.fill('#search-q', 'trip cancellation');
  await p.waitForFunction(() =>
    [...document.querySelectorAll('#search-results li .sr-title')].slice(0, 3).some((a) => a.textContent === 'Travel insurance')
  );
  assert.deepEqual(p.errors, []);
});

test('header search from a deep page lands on results', async () => {
  const p = await page();
  await p.goto(BASE + 'business/cyber/');
  await p.fill('#q', 'renters');
  await p.press('#q', 'Enter');
  await p.waitForSelector('#search-results li');
  assert.match(p.url(), /\/search\/\?q=renters$/);
});

test('"Open all" opens every coverage part', async () => {
  const p = await page();
  await p.goto(BASE + 'personal/home/');
  await p.click('.expand-all');
  const closed = await p.locator('.parts details:not([open])').count();
  assert.equal(closed, 0);
});

test('unknown URLs get the 404 page with working links', async () => {
  const p = await page();
  const res = await p.goto(BASE + 'no/such/page/');
  assert.equal(res.status(), 404);
  await p.click('main a[href$="search/"]');
  assert.match(p.url(), /\/search\/$/);
});
