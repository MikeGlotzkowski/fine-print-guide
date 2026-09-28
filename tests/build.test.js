// Structural checks on the built site: run with `npm test` (builds first).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DIST, htmlPages } from './helpers.js';

const pages = htmlPages();
const html = new Map(pages.map((p) => [p.url, fs.readFileSync(p.file, 'utf8')]));
const ids = (s) => [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);

test('builds the expected sections', () => {
  assert.ok(pages.length >= 40, `only ${pages.length} pages`);
  for (const url of ['', 'personal/', 'business/', 'personal/home/', 'business/bop/', 'situations/new-to-the-us/', 'is-it-covered/', 'perils/', 'glossary/', 'basics/', 'read-your-policy/', 'map/', 'search/', 'about/']) {
    assert.ok(html.has(url), `missing page /${url}`);
  }
  assert.ok(fs.existsSync(path.join(DIST, '404.html')));
});

test('every page has lang, one h1, a title and a description', () => {
  for (const [url, s] of html) {
    assert.match(s, /<html lang="en-US">/, url);
    assert.equal((s.match(/<h1[\s>]/g) || []).length, 1, `h1 count on /${url}`);
    assert.match(s, /<title>[^<]{5,}<\/title>/, url);
    assert.match(s, /<meta name="description" content="[^"]{20,}">/, `description on /${url}`);
  }
});

test('no duplicate ids on a page', () => {
  for (const [url, s] of html) {
    const seen = new Set();
    for (const id of ids(s)) {
      assert.ok(!seen.has(id), `duplicate id "${id}" on /${url}`);
      seen.add(id);
    }
  }
});

test('every internal link and asset resolves, including #fragments', () => {
  let checked = 0;
  for (const [url, s] of html) {
    for (const m of s.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const ref = m[1].replace(/&amp;/g, '&');
      if (/^(https?:|mailto:)/.test(ref)) continue;
      const u = new URL(ref, `http://site/${url}`);
      let target = decodeURIComponent(u.pathname).slice(1);
      let file = path.join(DIST, target);
      if (target === '' || target.endsWith('/')) file = path.join(file, 'index.html');
      assert.ok(fs.existsSync(file), `/${url} links to missing ${ref}`);
      if (u.hash && file.endsWith('.html')) {
        const targetHtml = fs.readFileSync(file, 'utf8');
        assert.ok(ids(targetHtml).includes(decodeURIComponent(u.hash.slice(1))), `/${url} links to missing anchor ${ref}`);
      }
      checked++;
    }
  }
  assert.ok(checked > 1000, `only ${checked} links checked`);
});

test('external links are https', () => {
  for (const [url, s] of html) {
    for (const m of s.matchAll(/href="(http:[^"]+)"/g)) assert.fail(`/${url} has insecure link ${m[1]}`);
  }
});

test('search index entries point at real pages', () => {
  const index = JSON.parse(fs.readFileSync(path.join(DIST, 'search.json'), 'utf8'));
  assert.ok(index.length > 150);
  for (const e of index) {
    assert.ok(e.t && e.u !== undefined && e.k, JSON.stringify(e));
    const [p, hash] = e.u.split('#');
    assert.ok(html.has(p), `search entry ${e.u} has no page`);
    if (hash) assert.ok(ids(html.get(p)).includes(hash), `search entry ${e.u} has no anchor`);
  }
});

test('policy pages always show what is not covered, outside any folded section', () => {
  for (const [url, s] of html) {
    if (!/^(personal|business)\/[a-z-]+\/$/.test(url)) continue;
    const i = s.indexOf('class="cover-col cover-no"');
    assert.ok(i > 0, `/${url} has no "not covered" list`);
    const before = s.slice(0, i);
    assert.equal((before.match(/<details/g) || []).length, (before.match(/<\/details>/g) || []).length, `/${url} hides exclusions in a fold`);
  }
});

test('term definitions embedded on a page cover every term link on it', () => {
  for (const [url, s] of html) {
    const links = [...s.matchAll(/data-term="([^"]+)"/g)].map((m) => m[1]);
    if (!links.length || url === 'glossary/') continue;
    const data = JSON.parse(s.match(/<script type="application\/json" id="term-data">([\s\S]*?)<\/script>/)[1]);
    for (const t of links) assert.ok(data[t], `/${url} is missing definition for ${t}`);
  }
});

test('no leftover inline markup in the output', () => {
  for (const [url, s] of html) {
    const text = s.replace(/<script[\s\S]*?<\/script>/g, '');
    assert.doesNotMatch(text, /\[\[|\]\]|\*\*/, `raw markup on /${url}`);
  }
});
