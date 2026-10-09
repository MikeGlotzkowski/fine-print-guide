// Unit tests for the automatic glossary linker (src/lib/autolink.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeAutolinker, AUTOLINK } from '../src/lib/autolink.js';

const GLOSSARY = [
  { slug: 'peril', term: 'Peril', def: 'A cause of loss.' },
  { slug: 'named-perils', term: 'Named perils', def: 'Only the listed causes.' },
  { slug: 'cash-value', term: 'Cash value', def: 'Depreciated value.' },
  { slug: 'acv', term: 'Actual cash value', def: 'Replacement minus depreciation.' },
  { slug: 'deductible', term: 'Deductible', def: 'What you pay first.' },
  { slug: 'exclusion', term: 'Exclusion', def: 'What is not covered.' },
  { slug: 'hmo', term: 'HMO', def: 'Network-only plan.' }, // not allow-listed
  { slug: 'policy-period', term: 'Policy period', def: 'The dates in force.' },
];

const link = makeAutolinker(GLOSSARY);
const count = (s, re = /data-auto="1"/g) => (s.match(re) || []).length;

test('first occurrence only, per page', () => {
  const out = link('<p>A peril is a peril, and another peril too.</p>', 'x/');
  assert.equal(count(out), 1, out);
  assert.match(out, /<a class="term" href="\.\.\/glossary\/#peril"[^>]*>peril<\/a> is a peril/);
});

test('nothing linked inside headings', () => {
  const out = link('<h2>About the deductible</h2><p>The deductible applies.</p>', 'x/');
  assert.equal(count(out), 1);
  assert.ok(out.includes('<h2>About the deductible</h2>'), 'heading was changed');
  const head = out.slice(out.indexOf('<h2'), out.indexOf('</h2>'));
  assert.ok(!head.includes('<a'), 'link placed inside the heading');
});

test('nothing linked inside an existing link', () => {
  const out = link('<p><a href="/elsewhere/">the deductible guide</a> and the deductible.</p>', 'x/');
  assert.equal(count(out), 1);
  assert.ok(out.includes('<a href="/elsewhere/">the deductible guide</a>'), 'existing link was changed');
  // the auto link must be the second mention, not the one inside the anchor
  assert.match(out, /<\/a> and the <a class="term"/);
});

test('longest match wins over a shorter term', () => {
  const out = link('<p>With named perils, the peril list is fixed.</p>', 'x/');
  assert.match(out, /data-term="named-perils"[^>]*>named perils</i);
  assert.equal(count(out), 2, out); // named perils + peril later
  assert.equal(count(out, /data-term="named-perils"/g), 1);
});

test('"actual cash value" beats "cash value"', () => {
  const out = link('<p>Actual cash value is not cash value.</p>', 'x/');
  assert.match(out, /data-term="acv"[^>]*>Actual cash value</);
  assert.equal(count(out, /data-term="cash-value"/g), 0, out);
});

test('never links a term on its own glossary page', () => {
  const out = link('<p>The deductible and the peril.</p>', 'glossary/');
  assert.equal(count(out), 0, out);
  assert.equal(out, '<p>The deductible and the peril.</p>');
});

test('matches whole words only, case-insensitively, and simple plurals', () => {
  const out = link('<p>Deductibles everywhere, and a deductible.</p>', 'x/');
  assert.equal(count(out), 1);
  assert.match(out, /data-auto="1">Deductibles<\/a>/); // keeps original casing
  const none = link('<p>The dedicated specialist.</p>', 'x/');
  assert.equal(count(none), 0, 'must not match inside "dedicated"');
});

test('skips code, pre and summary, and textarea', () => {
  const out = link(
    '<p><code>deductible</code></p><pre>deductible</pre><details><summary>deductible</summary><p>deductible</p></details>',
    'x/'
  );
  assert.equal(count(out), 1, out);
  assert.ok(out.includes('<summary>deductible</summary>'), 'summary was changed');
  assert.ok(out.includes('<code>deductible</code>') && out.includes('<pre>deductible</pre>'));
  assert.match(out, /<p><a class="term"[^>]*>deductible<\/a><\/p>/); // only the body text
});

test('at most 3 automatic links per block', () => {
  const out = link(
    '<p>peril peril exclusion deductible policy period sublimit aggregate endorsement</p>',
    'x/'
  );
  assert.equal(count(out), 3, out);
});

test('a term already used explicitly is not auto-linked again', () => {
  const used = new Set(['peril']);
  const out = link('<p>A peril, and the peril again.</p>', 'x/', used);
  assert.equal(count(out), 0, out);
});

test('skips role="img" regions (sample declarations page)', () => {
  const out = link('<div class="dec-sample" role="img" aria-label="sample"><span>Policy period</span></div><p>Policy period</p>', 'x/');
  assert.equal(count(out), 1, out);
  const div = out.slice(out.indexOf('<div'), out.indexOf('</div>'));
  assert.ok(!div.includes('<a '), 'link inside role=img: ' + div);
});

test('only allow-listed terms are linked', () => {
  assert.ok(!AUTOLINK.has('hmo'), 'HMO must stay off the allowlist');
  const out = link('<p>Your HMO plan and your deductible.</p>', 'x/');
  assert.equal(count(out), 1, out);
  assert.ok(!out.includes('data-term="hmo"'), out);
});
