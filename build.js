// Static site builder. No dependencies: reads the content modules in
// src/content, renders HTML into dist/, and copies the assets.
//   node build.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from './src/site.js';
import { layout } from './src/lib/layout.js';
import { esc, relUrl, makeFormatter } from './src/lib/format.js';
import { glossary } from './src/content/glossary.js';
import { personal } from './src/content/personal.js';
import { business } from './src/content/business.js';
import { situations } from './src/content/situations.js';
import { scenarios } from './src/content/scenarios.js';
import { perils, excludedCauses } from './src/content/perils.js';
import { basics, claimSteps } from './src/content/basics.js';
import { declarations } from './src/content/declarations.js';
import { tree } from './src/content/tree.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist');

const glossaryMap = new Map(glossary.map((g) => [g.slug, g]));
const LINES = {
  personal: { label: 'Personal', href: '/personal/', title: 'Personal insurance' },
  business: { label: 'Business', href: '/business/', title: 'Business insurance' },
};
const policies = [...personal, ...business];
const policyMap = new Map(policies.map((p) => [p.slug, p]));
const policyUrl = (p) => `/${p.line}/${p.slug}/`;

const VERDICT = {
  yes: { label: 'Usually covered', icon: '✓' },
  no: { label: 'Usually not covered', icon: '✕' },
  depends: { label: 'It depends', icon: '?' },
};

const pages = [];
const searchIndex = [];

function addPage(page, opts) {
  pages.push({ page, ...opts });
}

// Every page gets its own formatter so term links are relative to it and the
// terms it uses can be embedded for the in-place definitions.
function ctx(page) {
  const used = new Set();
  const fmt = makeFormatter({ page, glossary: glossaryMap, onTerm: (s) => used.add(s) });
  const r = (to) => relUrl(page, to);
  const terms = () => [...used].map((s) => glossaryMap.get(s));
  return { fmt, r, terms, used };
}

const verdictBadge = (v) =>
  `<span class="verdict verdict-${v}"><span aria-hidden="true">${VERDICT[v].icon}</span> ${VERDICT[v].label}</span>`;

const list = (items, fmt, cls = '') => `<ul class="${cls}">${items.map((i) => `<li>${fmt(i)}</li>`).join('')}</ul>`;

function policyLink(slug, r, label) {
  const p = policyMap.get(slug);
  if (!p) throw new Error(`Unknown policy "${slug}"`);
  return `<a href="${r(policyUrl(p))}">${esc(label || p.name)}</a>`;
}

function exampleCards(examples, fmt) {
  return `<div class="examples">${examples
    .map(
      (e) => `<article class="example">
  <h3 class="example-q">${fmt(e.s)}</h3>
  ${verdictBadge(e.v)}
  <p>${fmt(e.a)}</p>
</article>`
    )
    .join('')}</div>`;
}

function table(t, fmt) {
  return `<div class="table-wrap" role="region" aria-label="${esc(t.title)}" tabindex="0"><table class="stack">
<caption>${esc(t.title)}</caption>
<thead><tr>${t.head.map((h) => `<th scope="col">${fmt(h)}</th>`).join('')}</tr></thead>
<tbody>${t.rows
    .map((row) => `<tr>${row.map((c, i) => (i === 0 ? `<th scope="row">${fmt(c)}</th>` : `<td data-label="${esc(stripFmt(t.head[i]))}">${fmt(c)}</td>`)).join('')}</tr>`)
    .join('')}</tbody>
</table></div>${t.note ? `<p class="note">${fmt(t.note)}</p>` : ''}`;
}

// ---------------------------------------------------------------- policies

function renderPolicy(p) {
  const page = `${p.line}/${p.slug}/`;
  const { fmt, r, terms } = ctx(page);
  const line = LINES[p.line];
  const sections = [];

  sections.push(`<header class="page-head">
  <p class="eyebrow">${esc(p.group)}${p.codes ? ` · <span class="codes">${esc(p.codes)}</span>` : ''}</p>
  <h1>${esc(p.name)}</h1>
  <p class="lead">${fmt(p.lead)}</p>
</header>`);

  sections.push(`<dl class="facts">
  <div><dt>Who it's for</dt><dd>${fmt(p.forWho)}</dd></div>
  <div><dt>Is it required?</dt><dd>${fmt(p.required)}</dd></div>
</dl>`);

  sections.push(`<section class="cover-split" aria-labelledby="cover-h">
  <h2 id="cover-h" class="visually-hidden">Covered and not covered</h2>
  <div class="cover-col cover-yes"><h3>${verdictBadge('yes')}</h3>${list(p.covered, fmt)}</div>
  <div class="cover-col cover-no"><h3>${verdictBadge('no')}</h3>${list(p.notCovered, fmt)}</div>
</section>`);

  if (p.examples?.length) {
    sections.push(`<section aria-labelledby="ex-h"><h2 id="ex-h">Real-life examples</h2>${exampleCards(p.examples, fmt)}</section>`);
  }

  if (p.parts?.length) {
    sections.push(`<section aria-labelledby="parts-h">
<h2 id="parts-h">${esc(p.partsTitle || 'The parts of the policy')}</h2>
${p.partsIntro ? `<p>${fmt(p.partsIntro)}</p>` : ''}
<div class="parts">${p.parts
      .map(
        (pt) => `<details class="part"${pt.id ? ` id="${pt.id}"` : ''}>
<summary><span class="part-code">${esc(pt.code)}</span><span class="part-name">${esc(pt.name)}</span><span class="part-short">${fmt(pt.short)}</span></summary>
<div class="part-body">${(Array.isArray(pt.more) ? pt.more : [pt.more]).map((m) => `<p>${fmt(m)}</p>`).join('')}${
          pt.example ? `<p class="part-example"><strong>Example:</strong> ${fmt(pt.example)}</p>` : ''
        }</div>
</details>`
      )
      .join('')}</div>
</section>`);
  }

  for (const t of p.tables || []) {
    sections.push(`<section>${t.heading ? `<h2 id="table-${(p.tables || []).indexOf(t)}">${esc(t.heading)}</h2>` : ''}${t.intro ? `<p>${fmt(t.intro)}</p>` : ''}${table(t, fmt)}</section>`);
  }

  if (p.more?.length) {
    sections.push(`<section aria-labelledby="more-h"><h2 id="more-h">Good to know</h2>
${p.more
  .map(
    (m) => `<details class="more"><summary>${fmt(m.title)}</summary><div>${m.body.map((b) => (Array.isArray(b) ? list(b, fmt) : `<p>${fmt(b)}</p>`)).join('')}</div></details>`
  )
  .join('')}</section>`);
  }

  if (p.check?.length) {
    sections.push(`<section class="checklist" aria-labelledby="check-h"><h2 id="check-h">Check your own policy</h2>
<p>Find these on your policy or declarations page, or ask your agent:</p>
<ul class="checks">${p.check.map((c) => `<li>${fmt(c)}</li>`).join('')}</ul>
<p class="note">Not sure where to look? See <a href="${r('/read-your-policy/')}">how to read your policy</a>.</p></section>`);
  }

  const related = (p.related || []).map((s) => policyMap.get(s)).filter(Boolean);
  const relSituations = situations.filter((s) => s.steps.some((st) => (st.policies || []).includes(p.slug)));
  if (related.length || relSituations.length) {
    sections.push(`<section class="related" aria-labelledby="rel-h"><h2 id="rel-h">Related</h2><ul>
${related.map((rp) => `<li>${policyLink(rp.slug, r)} <span class="muted">${fmt(rp.teaser)}</span></li>`).join('')}
${relSituations.map((s) => `<li><a href="${r(`/situations/${s.slug}/`)}">${esc(s.title)}</a> <span class="muted">Guide</span></li>`).join('')}
</ul></section>`);
  }

  const toc = [
    ['cover-h', 'Covered and not covered'],
    p.examples?.length && ['ex-h', 'Real-life examples'],
    p.parts?.length && ['parts-h', p.partsTitle || 'The parts of the policy'],
    ...(p.tables || []).map((t, i) => t.heading && [`table-${i}`, t.heading]),
    p.more?.length && ['more-h', 'Good to know'],
    p.check?.length && ['check-h', 'Check your own policy'],
    (related.length || relSituations.length) && ['rel-h', 'Related'],
  ].filter(Boolean);
  const aside = `<nav class="toc" aria-label="On this page"><p class="toc-title">On this page</p><ul>${toc
    .map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`)
    .join('')}</ul></nav>`;
  const body = `<div class="with-toc"><article class="policy">${sections.join('\n')}</article>${aside}</div>`;
  addPage(page, {
    title: p.name,
    description: stripFmt(p.lead),
    crumbs: [{ label: line.label, href: line.href }, { label: p.name }],
    body,
    terms,
  });
  searchIndex.push({
    t: p.name,
    u: page,
    k: 'Policy',
    d: stripFmt(p.teaser),
    x: [p.codes, p.group, ...(p.keywords || []), ...p.covered, ...p.notCovered].filter(Boolean).map(stripFmt).join(' '),
  });
}

function stripFmt(s) {
  return String(s || '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, slug, label) => label || glossaryMap.get(slug)?.label || glossaryMap.get(slug)?.term.toLowerCase() || slug)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

// ---------------------------------------------------------------- hubs

function policyListing(items, r, fmt) {
  const groups = [...new Set(items.map((p) => p.group))];
  return groups
    .map(
      (g) => `<section class="group"><h2>${esc(g)}</h2><ul class="policy-list">${items
        .filter((p) => p.group === g)
        .map(
          (p) => `<li><span><a class="pl-name" href="${r(policyUrl(p))}">${esc(p.name)}</a>${
            p.codes ? ` <span class="codes">${esc(p.codes)}</span>` : ''
          }</span><span class="pl-teaser">${fmt(p.teaser)}</span></li>`
        )
        .join('')}</ul></section>`
    )
    .join('');
}

function renderHub(lineKey, items, intro) {
  const page = `${lineKey}/`;
  const { fmt, r, terms } = ctx(page);
  const body = `<header class="page-head"><h1>${LINES[lineKey].title}</h1><p class="lead">${fmt(intro)}</p></header>
${policyListing(items, r, fmt)}`;
  addPage(page, { title: LINES[lineKey].title, description: stripFmt(intro), crumbs: [], body, terms });
}

// ---------------------------------------------------------------- situations

function renderSituations() {
  const idx = 'situations/';
  {
    const { fmt, r, terms } = ctx(idx);
    const body = `<header class="page-head"><h1>Start from your situation</h1><p class="lead">Pick what's going on in your life. Each guide lists what to sort out, in order, and says what's legally required and what's optional.</p></header>
<ul class="situation-list">${situations
      .map((s) => `<li><a href="${r(`/situations/${s.slug}/`)}">${esc(s.title)}</a><span>${fmt(s.teaser)}</span></li>`)
      .join('')}</ul>`;
    addPage(idx, { title: 'Start from your situation', description: 'Insurance guides by life situation.', crumbs: [], body, terms });
  }

  const REQ = {
    law: 'Required by law',
    others: 'Often required by someone else',
    optional: 'Optional',
    check: 'Depends on state or visa',
  };

  for (const s of situations) {
    const page = `situations/${s.slug}/`;
    const { fmt, r, terms } = ctx(page);
    const steps = s.steps
      .map(
        (st, i) => `<li class="step">
<div class="step-head"><h2 id="step-${i + 1}"><span class="step-no">${i + 1}</span> ${esc(st.title)}</h2>${
          st.req ? `<span class="req req-${st.req}">${REQ[st.req]}</span>` : ''
        }</div>
<p>${fmt(st.body)}</p>
${st.points ? list(st.points, fmt) : ''}
${st.details ? `<details class="more"><summary>${fmt(st.details.title)}</summary><div>${st.details.body.map((b) => (Array.isArray(b) ? list(b, fmt) : `<p>${fmt(b)}</p>`)).join('')}</div></details>` : ''}
${st.policies?.length ? `<p class="step-links">Read more: ${st.policies.map((sl) => policyLink(sl, r)).join(' · ')}</p>` : ''}
</li>`
      )
      .join('');
    const body = `<article class="situation"><header class="page-head"><p class="eyebrow">Guide</p><h1>${esc(s.title)}</h1><p class="lead">${fmt(s.intro)}</p></header>
<section class="glance" aria-labelledby="glance-h"><h2 id="glance-h">At a glance</h2><ol>${s.steps
  .map((st, i) => `<li><a href="#step-${i + 1}">${esc(st.title)}</a>${st.req ? ` <span class="req req-${st.req}">${REQ[st.req]}</span>` : ''}</li>`)
  .join('')}</ol></section>
<ol class="steps">${steps}</ol>
${s.surprises?.length ? `<section class="surprises" aria-labelledby="sur-h"><h2 id="sur-h">Things that often surprise people</h2>${list(s.surprises, fmt)}</section>` : ''}
${s.links?.length ? `<section class="related" aria-labelledby="lk-h"><h2 id="lk-h">Official sources</h2>${list(s.links, fmt)}</section>` : ''}
</article>`;
    addPage(page, {
      title: s.title,
      description: stripFmt(s.teaser),
      crumbs: [{ label: 'Situations', href: '/situations/' }, { label: s.title }],
      body,
      terms,
    });
    searchIndex.push({ t: s.title, u: page, k: 'Guide', d: stripFmt(s.teaser), x: [s.intro, ...s.steps.map((x) => x.title), ...(s.keywords || [])].map(stripFmt).join(' ') });
  }
}

// ---------------------------------------------------------------- scenarios

function renderScenarios() {
  const page = 'is-it-covered/';
  const { fmt, r, terms } = ctx(page);
  const areas = [...new Set(scenarios.map((s) => s.area))];
  const itemHtml = (s) => `<li class="scenario" id="${s.id}" data-area="${esc(s.area)}" data-text="${esc(
        stripFmt([s.q, s.a, ...(s.tags || [])].join(' ')).toLowerCase()
      )}">
<details>
<summary><span class="sc-q">${fmt(s.q)}<span class="sc-policy">${s.policies.map((sl) => esc(policyMap.get(sl).name)).slice(0, 2).join(' · ')}</span></span> ${verdictBadge(s.v)}</summary>
<div class="sc-body"><p><strong>${fmt(s.short)}</strong></p><p>${fmt(s.a)}</p>${
        s.policies?.length ? `<p class="step-links">Read more: ${s.policies.map((sl) => policyLink(sl, r)).join(' · ')}</p>` : ''
      }</div>
</details>
</li>`;
  const body = `<header class="page-head"><h1>Is it covered?</h1><p class="lead">Common situations and the usual answer. Open one to see why, and what decides it on your own policy.</p></header>
<div class="filter" hidden>
  <label for="sc-filter">Filter situations</label>
  <input id="sc-filter" type="search" placeholder="Try: pipe, flight, laptop, dog" autocomplete="off">
  <div class="chips" role="group" aria-label="Filter by area">
    <button type="button" class="chip" aria-pressed="true" data-area="">All</button>
    ${areas.map((a) => `<button type="button" class="chip" aria-pressed="false" data-area="${esc(a)}">${esc(a)}</button>`).join('')}
  </div>
  <p class="filter-count" aria-live="polite"></p>
</div>
${areas
  .map(
    (a) => `<section class="sc-group" data-group="${esc(a)}" aria-labelledby="area-${esc(a.toLowerCase())}"><h2 id="area-${esc(a.toLowerCase())}">${esc(a)}</h2><ul class="scenarios">${scenarios
      .filter((s) => s.area === a)
      .map((s) => itemHtml(s))
      .join('')}</ul></section>`
  )
  .join('')}
<p class="note">"Usually" means under a typical standard policy. Your own policy's wording, endorsements and your state's rules can change the answer.</p>`;
  addPage(page, { title: 'Is it covered?', description: 'Common insurance situations with the usual answer: covered, not covered, or it depends.', crumbs: [], body, terms });
  scenarios.forEach((s) =>
    searchIndex.push({ t: stripFmt(s.q), u: `${page}#${s.id}`, k: VERDICT[s.v].label, d: stripFmt(s.short), x: stripFmt([s.a, ...(s.tags || [])].join(' ')) })
  );
}

// ---------------------------------------------------------------- perils

function renderPerils() {
  const page = 'perils/';
  const { fmt, r, terms } = ctx(page);
  const body = `<header class="page-head"><h1>Perils: the causes of damage</h1><p class="lead">${fmt("A [[peril]] is a cause of loss, like fire or theft. Property policies are built around them: some list the perils they cover, others cover every cause they don't specifically exclude.")}</p></header>
<section class="callout">
<h2>Two ways a policy can be written</h2>
<dl class="facts">
<div><dt>Named perils</dt><dd>${fmt('Covers only the causes listed. If it isn\'t on the list, it isn\'t covered. Your belongings under an HO-3 work this way.')}</dd></div>
<div><dt>Open perils</dt><dd>${fmt('Covers every cause **except** the ones excluded. Broader, and the insurer has to show an exclusion applies. The house itself under an HO-3 works this way.')}</dd></div>
</dl>
</section>
<h2>The 16 common named perils</h2>
<p>This is the standard list in broad-form home policies (HO-2, and belongings under HO-3). Basic forms like DP-1 cover fewer.</p>
<div class="peril-grid">${perils
    .map(
      (p) => `<article class="peril" id="${p.id}"><h3>${esc(p.name)}</h3><p>${fmt(p.what)}</p><p class="peril-ex"><strong>Example:</strong> ${fmt(p.example)}</p>${
        p.catch ? `<p class="peril-catch"><strong>Watch for:</strong> ${fmt(p.catch)}</p>` : ''
      }</article>`
    )
    .join('')}</div>
<h2 id="excluded">Causes that are usually excluded</h2>
<p>These are left out of standard home policies, whether named or open perils. Some can be added back or bought separately.</p>
<div class="table-wrap" role="region" aria-label="Usually excluded causes" tabindex="0"><table class="stack"><caption>Usually excluded, and where to get it</caption>
<thead><tr><th scope="col">Cause</th><th scope="col">Example</th><th scope="col">Where to get coverage</th></tr></thead>
<tbody>${excludedCauses.map((c) => `<tr><th scope="row">${esc(c.name)}</th><td data-label="Example">${fmt(c.example)}</td><td data-label="Where to get coverage">${fmt(c.fix)}</td></tr>`).join('')}</tbody></table></div>`;
  addPage(page, { title: 'Perils', description: 'The causes of damage home and property policies cover, with plain examples, and the causes they usually exclude.', crumbs: [], body, terms });
  searchIndex.push({ t: 'Perils: the causes of damage', u: page, k: 'Guide', d: 'Fire, wind, theft, water and the other named perils, with examples.', x: perils.map((p) => p.name + ' ' + stripFmt(p.what)).join(' ') + ' ' + excludedCauses.map((c) => c.name).join(' ') });
}

// ---------------------------------------------------------------- glossary

function renderGlossary() {
  const page = 'glossary/';
  const { fmt, terms } = ctx(page);
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(sorted.map((g) => g.term[0].toUpperCase()))];
  const body = `<header class="page-head"><h1>Glossary</h1><p class="lead">Insurance words in plain English. Across the site, underlined terms open a short definition right where you are.</p></header>
<div class="filter gl-filter" hidden><label for="gl-filter">Find a term</label><input id="gl-filter" type="search" placeholder="Try: deductible, PPO, peril" autocomplete="off"><p class="filter-count" aria-live="polite"></p></div>
<nav class="az" aria-label="Jump to letter"><ul>${letters.map((l) => `<li><a href="#letter-${l}">${l}</a></li>`).join('')}</ul></nav>
${letters
  .map(
    (l) => `<section class="az-section" aria-labelledby="letter-${l}"><h2 id="letter-${l}" class="az-letter">${l}</h2><dl class="glossary">${sorted
      .filter((g) => g.term[0].toUpperCase() === l)
      .map(
        (g) => `<div id="${g.slug}" class="gl-entry"><dt>${esc(g.term)}${g.aka ? ` <span class="muted">also: ${esc(g.aka)}</span>` : ''}</dt><dd><p>${fmt(g.def)}</p>${
          g.example ? `<p class="gl-ex"><strong>Example:</strong> ${fmt(g.example)}</p>` : ''
        }</dd></div>`
      )
      .join('')}</dl></section>`
  )
  .join('')}`;
  addPage(page, { title: 'Glossary', description: 'Insurance terms explained in plain English, with examples.', crumbs: [], body, terms: () => [] });
  glossary.forEach((g) => searchIndex.push({ t: g.term, u: `${page}#${g.slug}`, k: 'Term', d: stripFmt(g.def), x: g.aka || '' }));
}

// ---------------------------------------------------------------- basics

function renderBasics() {
  const page = 'basics/';
  const { fmt, r, terms } = ctx(page);
  const body = `<header class="page-head"><h1>The basics in six ideas</h1><p class="lead">Almost every policy, from car to cyber, is built from the same few pieces. Once you know them, any policy gets easier to read.</p></header>
<ol class="ideas">${basics
    .map(
      (b) => `<li class="idea" id="${b.id}"><h2>${esc(b.title)}</h2><p class="idea-short">${fmt(b.short)}</p>${b.body.map((x) => (Array.isArray(x) ? list(x, fmt) : `<p>${fmt(x)}</p>`)).join('')}${
        b.example ? `<div class="worked"><p class="worked-title">${esc(b.example.title)}</p>${b.example.lines.map((l) => `<p>${fmt(l)}</p>`).join('')}</div>` : ''
      }</li>`
    )
    .join('')}</ol>
<section aria-labelledby="claim-h"><h2 id="claim-h">How a claim works</h2>
<ol class="claim-steps">${claimSteps.map((c) => `<li><strong>${esc(c.title)}.</strong> ${fmt(c.body)}</li>`).join('')}</ol>
</section>
<section class="callout" aria-labelledby="help-h"><h2 id="help-h">If something goes wrong</h2>
<p>${fmt('If a claim is denied and you think it shouldn\'t be, ask the insurer to explain the denial in writing and point to the policy wording they rely on. You can appeal inside the company. Every state has an insurance department that takes complaints for free; find yours through the [NAIC state map](https://content.naic.org/state-insurance-departments).')}</p>
</section>`;
  addPage(page, { title: 'The basics', description: 'Premium, deductible, limit, covered causes and exclusions, and replacement cost vs. actual cash value, explained with examples.', crumbs: [], body, terms });
  searchIndex.push({ t: 'The basics in six ideas', u: page, k: 'Guide', d: 'Premium, deductible, limits, what\'s covered, and how payouts are calculated.', x: basics.map((b) => b.title + ' ' + stripFmt(b.short)).join(' ') + ' claim denied complaint' });
}

// ---------------------------------------------------------------- declarations page

function renderDeclarations() {
  const page = 'read-your-policy/';
  const { fmt, r, terms } = ctx(page);
  const d = declarations;
  const body = `<header class="page-head"><h1>How to read your policy</h1><p class="lead">${fmt(d.lead)}</p></header>
<section aria-labelledby="parts-h"><h2 id="parts-h">What a policy is made of</h2>
<dl class="doc-parts">${d.parts.map((p) => `<div><dt>${esc(p.name)}</dt><dd>${fmt(p.what)}</dd></div>`).join('')}</dl></section>
<section aria-labelledby="dec-h"><h2 id="dec-h">The declarations page, line by line</h2>
<p>${fmt(d.decIntro)}</p>
<div class="dec-sample" role="img" aria-label="Sample declarations page from a made-up homeowners policy">
<p class="dec-title">HOMEOWNERS POLICY DECLARATIONS <span class="dec-sample-tag">Sample</span></p>
${d.sample.map((row) => `<div class="dec-row"><span class="dec-num">${row.n}</span><span class="dec-label">${esc(row.label)}</span><span class="dec-value">${esc(row.value)}</span></div>`).join('')}
</div>
<ol class="dec-explain">${d.sample.map((row) => `<li value="${row.n}"><strong>${esc(row.label)}.</strong> ${fmt(row.explain)}</li>`).join('')}</ol>
</section>
<section aria-labelledby="order-h"><h2 id="order-h">Answering "am I covered?" in five steps</h2>
<ol class="claim-steps">${d.steps.map((s) => `<li>${fmt(s)}</li>`).join('')}</ol></section>
<section class="callout"><h2>Questions worth asking your agent</h2>${list(d.questions, fmt)}</section>`;
  addPage(page, { title: 'How to read your policy', description: 'What the declarations page, insuring agreement, exclusions and endorsements mean, with a sample walk-through.', crumbs: [], body, terms });
  searchIndex.push({ t: 'How to read your policy', u: page, k: 'Guide', d: 'The declarations page line by line, and how to check if something is covered.', x: 'declarations dec page endorsement exclusions conditions definitions ' + d.parts.map((p) => p.name).join(' ') });
}

// ---------------------------------------------------------------- tree

function renderTree() {
  const page = 'tree/';
  const { fmt, r, terms } = ctx(page);
  // Summaries hold plain text only: links inside a <summary> would be nested
  // inside its button role. Links for a branch go in its first fold-out line.
  const plain = (t) => esc(stripFmt(t.replace(/\*\*(.+?)\*\*/g, '\u0000$1\u0001'))).replace(/\u0000/g, '<strong>').replace(/\u0001/g, '</strong>');
  const badge = (v) => (v ? ` <span class="verdict verdict-${v} tn-v"><span aria-hidden="true">${VERDICT[v].icon}</span> ${VERDICT[v].label}</span>` : '');
  const node = (n, depth) => {
    if (!n.kids) {
      const label = n.href ? `<a href="${r(n.href)}">${esc(n.t)}</a>` : esc(n.t);
      return `<li class="tn tn-leaf"><span class="tn-label">${label}</span>${badge(n.v)}${n.d ? `<span class="tn-d">${fmt(n.d)}</span>` : ''}</li>`;
    }
    return `<li class="tn tn-branch tn-depth-${depth}"><details${depth === 0 ? ' open' : ''}>
<summary><span class="tn-label">${esc(n.t)}</span>${badge(n.v)}${n.d ? `<span class="tn-d">${plain(n.d)}</span>` : ''}</summary>
<ul class="tree">${n.href ? `<li class="tn tn-link"><a href="${r(n.href)}">Read the page about ${esc(n.t.toLowerCase())}</a></li>` : ''}${n.kids.map((k) => node(k, depth + 1)).join('')}</ul>
</details></li>`;
  };
  const body = `<header class="page-head"><h1>The insurance tree</h1><p class="lead">${fmt(
    'How US insurance is organized, from the two big families down to single causes of damage. Open a branch to go one level finer.'
  )}</p></header>
<section class="callout tree-key" aria-labelledby="key-h">
<h2 id="key-h">The one split that explains most of it</h2>
<dl class="facts">
<div><dt>Property</dt><dd>${fmt('Pays for **your own** things when they\'re damaged. What\'s covered depends on the cause, the [[peril]].')}</dd></div>
<div><dt>Liability</dt><dd>${fmt('Pays when **you harm someone else** or their things, plus your legal defense.')}</dd></div>
<div><dt>People</dt><dd>${fmt('Pays for health, lost income or death. Not tied to any object.')}</dd></div>
</dl>
<p class="note">Both personal and commercial lines split the same way. Under each Property branch you'll find the perils: wind, water, fire and the rest, down to single events like a hurricane\'s storm surge. The verdicts there are for a standard home policy (HO-3) under personal lines, and a standard commercial property policy under commercial lines.</p>
</section>
<p class="tree-tools"></p>
<ul class="tree tree-root">${tree.map((n) => node(n, 0)).join('')}</ul>`;
  addPage(page, {
    title: 'The insurance tree',
    description: 'A fold-out tree of US insurance: personal and commercial lines, property, liability and people, down to perils like tropical cyclones and winter storms.',
    crumbs: [],
    body,
    terms,
  });
  const flat = [];
  const walk = (n) => { flat.push(n.t); (n.kids || []).forEach(walk); };
  tree.forEach(walk);
  searchIndex.push({ t: 'The insurance tree', u: page, k: 'Guide', d: 'Personal and commercial lines, property, liability and people, down to single perils.', x: flat.join(' ') });
}

// ---------------------------------------------------------------- map

function renderMap() {
  const page = 'map/';
  const { fmt, r, terms } = ctx(page);
  const col = (key, items) => {
    const groups = [...new Set(items.map((p) => p.group))];
    return `<section class="map-col" aria-labelledby="map-${key}"><h2 id="map-${key}"><a href="${r(LINES[key].href)}">${LINES[key].title}</a></h2>${groups
      .map(
        (g) => `<div class="map-group"><h3>${esc(g)}</h3><ul>${items
          .filter((p) => p.group === g)
          .map((p) => `<li><a href="${r(policyUrl(p))}">${esc(p.name)}</a>${p.codes ? ` <span class="codes">${esc(p.codes)}</span>` : ''}</li>`)
          .join('')}</ul></div>`
      )
      .join('')}</section>`;
  };
  const body = `<header class="page-head"><h1>The whole map</h1><p class="lead">${fmt(
    'US insurance splits into two big families. **Personal lines** protect you, your family and your things. **Commercial lines** protect a business. Inside each, policies cover either **property** (your stuff), **liability** (harm you cause others) or **people** (health, income, life).'
  )}</p></header>
<p>${fmt('To see how the pieces split into property, liability and people, and down to single perils, open [the insurance tree](/tree/).')}</p>
<div class="map">${col('personal', personal)}${col('business', business)}</div>`;
  addPage(page, { title: 'The whole map', description: 'Every type of personal and business insurance on one page.', crumbs: [], body, terms });
}

// ---------------------------------------------------------------- home

function renderHome() {
  const page = '';
  const { fmt, r, terms } = ctx(page);
  const quick = (slugs) => slugs.map((s) => `<li>${policyLink(s, r, policyMap.get(s).short || policyMap.get(s).name)}</li>`).join('');
  const body = `<section class="hero">
<h1>Understand what your insurance covers.</h1>
<p class="lead">${fmt('Plain answers about US insurance: what a policy is for, what it pays for, what it leaves out, and what all those letters and codes mean. No selling, no jargon without an explanation.')}</p>
</section>

<section class="doors" aria-label="Ways to start">
  <div class="door">
    <h2>I have a policy</h2>
    <p>Pick the kind you have to see what it usually covers and doesn't.</p>
    <ul class="quick">${quick(['home', 'renters', 'condo', 'landlord', 'auto', 'health', 'travel', 'life', 'umbrella'])}</ul>
    <p class="door-more"><a href="${r('/personal/')}">All personal insurance</a> · <a href="${r('/business/')}">Business insurance</a></p>
  </div>
  <div class="door">
    <h2>Something happened</h2>
    <p>A pipe burst, a flight was cancelled, a customer slipped. See the usual answer and why.</p>
    <ul class="quick">${['burst-pipe', 'rain-basement', 'flight-delayed', 'deer', 'customer-slips', 'ring-stolen']
      .map((id) => scenarios.find((s) => s.id === id))
      .map((s) => `<li><a href="${r(`/is-it-covered/#${s.id}`)}">${esc(s.label)}</a></li>`)
      .join('')}</ul>
    <p class="door-more"><a href="${r('/is-it-covered/')}">All ${scenarios.length} examples</a> · <a href="${r('/perils/')}">What counts as a peril</a></p>
  </div>
  <div class="door">
    <h2>Start from my life right now</h2>
    <p>Step-by-step guides: what to sort out, in order, and what's actually required.</p>
    <ul class="quick">${situations.map((s) => `<li><a href="${r(`/situations/${s.slug}/`)}">${esc(s.short)}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="tree-teaser" aria-labelledby="tree-h">
<div>
<h2 id="tree-h">See how it all fits together</h2>
<p>${fmt('The insurance tree goes from personal and business lines, through property, liability and people, down to single perils like a hurricane\'s storm surge or a burst pipe.')}</p>
</div>
<p><a class="button" href="${r('/tree/')}">Open the insurance tree</a></p>
</section>

<section class="primer" aria-labelledby="primer-h">
<h2 id="primer-h">Six ideas that explain most policies</h2>
<ol class="primer-list">${basics.map((b) => `<li><a href="${r(`/basics/#${b.id}`)}"><strong>${esc(b.label)}</strong></a><span>${fmt(b.short)}</span></li>`).join('')}</ol>
</section>

<section class="home-links" aria-label="More">
<p>${fmt('New to all this? See how it all fits together in [the insurance tree](/tree/), browse [the whole map](/map/) of policies, or learn [how to read your policy](/read-your-policy/).')}</p>
</section>`;
  addPage(page, { title: SITE.name, description: SITE.description, crumbs: [], body, terms, bodyClass: 'home' });
}

// ---------------------------------------------------------------- search, about, 404

function renderSearch() {
  const page = 'search/';
  const { r } = ctx(page);
  const all = [...policies.map((p) => ({ t: p.name, u: policyUrl(p) })), ...situations.map((s) => ({ t: s.title, u: `/situations/${s.slug}/` }))].sort((a, b) =>
    a.t.localeCompare(b.t)
  );
  const body = `<header class="page-head"><h1>Search</h1></header>
<form class="search-page" role="search" action="./" method="get">
<label for="search-q">Search policies, situations and terms</label>
<div class="search-row"><input id="search-q" name="q" type="search" autocomplete="off"><button type="submit">Search</button></div>
</form>
<p id="search-status" class="filter-count" aria-live="polite"></p>
<ol id="search-results" class="search-results"></ol>
<section class="search-fallback"><h2>All topics</h2><ul class="columns">${all.map((a) => `<li><a href="${r(a.u)}">${esc(a.t)}</a></li>`).join('')}</ul>
<p>Or browse the <a href="${r('/glossary/')}">glossary</a> and <a href="${r('/is-it-covered/')}">common situations</a>.</p></section>`;
  addPage(page, { title: 'Search', description: 'Search every policy, guide, situation and glossary term on the site.', crumbs: [], body, terms: () => [], bodyClass: 'search-body' });
}

function renderAbout() {
  const page = 'about/';
  const { fmt, terms } = ctx(page);
  const body = `<header class="page-head"><h1>About this site</h1><p class="lead">${esc(SITE.name)} is a free, independent guide to how insurance works in the US. It doesn't sell insurance, take referral fees, or collect your data.</p></header>
<h2>How to use what you read here</h2>
<p>${fmt('Everything here describes **typical** policies, usually the standard forms most insurers base theirs on. Your own policy can be broader or narrower, and state law changes some rules. So treat an answer here as "what to check", not as a promise of coverage. When it matters, read your policy wording and ask your agent or insurer, ideally in writing.')}</p>
<h2>How the pages are written</h2>
<ul>
<li>The answer comes first, the details after. You can stop reading once you have what you need.</li>
<li>What's <strong>not</strong> covered is always shown next to what is, never hidden in a fold.</li>
<li>Insurance words are explained where they appear. Tap an underlined word for its meaning.</li>
<li>"Usually" means: under a common standard policy, before endorsements and state differences.</li>
</ul>
<h2>Sources</h2>
<p>${fmt('Written from standard policy forms and public consumer guides, including the [Insurance Information Institute](https://www.iii.org/), the [NAIC](https://content.naic.org/consumer), [HealthCare.gov](https://www.healthcare.gov/), [FloodSmart (NFIP)](https://www.floodsmart.gov/) and state insurance departments. Rules for health coverage change often; check HealthCare.gov for the current year.')}</p>
<h2>Not advice</h2>
<p>This site is general information. It isn't legal, tax or insurance advice, and it doesn't replace a licensed agent, broker or attorney.</p>`;
  addPage(page, { title: 'About', description: `About ${SITE.name}: who writes it, how to use it, and where the information comes from.`, crumbs: [], body, terms });
}

function render404() {
  const base = SITE.basePath;
  return layout({
    page: '',
    base,
    title: 'Page not found',
    description: 'Page not found.',
    body: `<header class="page-head"><h1>That page isn't here</h1><p class="lead">It may have moved. Try <a href="${base}search/">searching</a> or start from the <a href="${base}">home page</a>.</p></header>`,
  });
}

// ---------------------------------------------------------------- write

function write(file, content) {
  const full = path.join(OUT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

export function build() {
  pages.length = 0;
  searchIndex.length = 0;
  fs.rmSync(OUT, { recursive: true, force: true });

  renderHome();
  renderHub('personal', personal, 'Insurance for you and your household: your home and things, your car, your health and income, and trips.');
  renderHub('business', business, 'Insurance for a business, from a one-person consultancy to a shop with staff. Most small businesses start with a [[bop]] and add what their work needs.');
  policies.forEach(renderPolicy);
  renderSituations();
  renderScenarios();
  renderPerils();
  renderGlossary();
  renderBasics();
  renderDeclarations();
  renderTree();
  renderMap();
  renderSearch();
  renderAbout();

  for (const p of pages) {
    const terms = typeof p.terms === 'function' ? p.terms() : p.terms || [];
    write(path.join(p.page, 'index.html'), layout({ ...p, terms }));
  }
  write('404.html', render404());
  write('search.json', JSON.stringify(searchIndex));
  copyDir(path.join(ROOT, 'src/assets'), path.join(OUT, 'assets'));
  copyDir(path.join(ROOT, 'src/static'), OUT);

  if (SITE.url) {
    const urls = pages.map((p) => `<url><loc>${SITE.url}/${p.page}</loc></url>`).join('');
    write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
    write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
  } else {
    write('robots.txt', 'User-agent: *\nAllow: /\n');
  }
  return { pages: pages.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { pages: n } = build();
  console.log(`Built ${n} pages into dist/`);
}
