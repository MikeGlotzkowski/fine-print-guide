// Automatic glossary links for rendered page HTML.
//
// Explicit [[slug]] markup is the author's choice and always renders. This
// module adds the rest: the first plain-text mention of an allow-listed term
// becomes the same kind of link, so a reader can tap a word instead of
// hunting the glossary. It stays a real <a href> with no JavaScript needed.
//
// It runs on already-rendered, already-escaped HTML and only rewrites text
// between tags, so attributes, URLs and markup are never touched.
//
// Rules:
//   - only the FIRST linkable occurrence of a term per page,
//   - never inside headings, links, code, pre, summary or caption,
//   - never on the glossary page itself,
//   - longest term first, so "named perils" beats "peril",
//   - at most 3 automatic links per block (paragraph or list item),
//   - terms already used via [[slug]] count as that term's occurrence.

import { relUrl, esc } from './format.js';

// Elements whose text must stay link-free. `a` also covers links the formatter
// already produced, and `summary`/`caption` avoid nesting a link inside the
// clickable part of a <details> or a table's title.
export const SKIP_TAGS = new Set([
  'a', 'caption', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'pre', 'script', 'style', 'summary', 'button', 'textarea', 'title',
]);

// Blocks counted against the per-paragraph cap.
const BLOCK_TAGS = new Set(['p', 'li', 'dd', 'dt', 'td', 'th']);
const MAX_PER_BLOCK = 3;

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

// The allowlist. Everything not named here is left as plain text.
//
// Kept deliberately narrow: bare "limit", "claim", "agent" or "broker" would
// turn ordinary prose into links, and short tokens ("do", "pip", "coi") or
// 3-letter acronyms ("HMO", "PPO", "HSA", "FSA") collide with English or read
// badly out of context. Multi-word phrases and clearly technical single words
// stay in.
export const AUTOLINK = new Set([
  // core ideas
  'deductible', 'sublimit', 'aggregate', 'per-occurrence', 'peril',
  'named-perils', 'open-perils', 'exclusion', 'endorsement', 'declarations',
  'replacement-cost', 'acv', 'depreciation', 'adjuster', 'subrogation',
  'policy-period', 'waiting-period', 'liability', 'bodily-injury',
  'property-damage',
  // home
  'dwelling', 'other-structures', 'personal-property', 'loss-of-use',
  'fair-rental-value', 'personal-liability', 'medical-payments',
  'scheduled-property', 'water-backup', 'wind-deductible', 'ordinance-or-law',
  'nfip', 'flood-zone', 'mortgagee', 'master-policy', 'loss-assessment',
  // auto
  'collision', 'comprehensive', 'uninsured-motorist', 'no-fault',
  'split-limits', 'sr22',
  // health
  'copay', 'coinsurance', 'oop-max', 'hdhp', 'open-enrollment', 'cobra',
  'eob', 'prior-auth',
  // life, disability, travel
  'beneficiary', 'term-life', 'permanent-life', 'elimination-period', 'cfar',
  'pre-existing', 'covered-reason',
  // extra liability + business
  'umbrella', 'bop', 'cgl', 'products-completed', 'occurrence', 'claims-made',
  'business-income', 'extra-expense', 'workers-comp', 'employers-liability',
  'additional-insured', 'inland-marine', 'coinsurance-property', 'epli', 'eo',
  'surety-bond',
]);

function plural(word) {
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + 'es';
  return word + 's';
}

function singular(word) {
  if (/ies$/i.test(word)) return word.slice(0, -3) + 'y';
  if (/[^s]s$/i.test(word)) return word.slice(0, -1);
  return word;
}

// The strings that count as a mention: the term, plus a simple plural (or
// singular, when the term is already plural). No `aka` matching.
function surfaces(term) {
  const out = [term];
  const words = term.split(' ');
  const last = words[words.length - 1];
  if (/s$/i.test(last)) {
    const one = singular(last);
    if (one !== last) out.push([...words.slice(0, -1), one].join(' '));
  } else {
    out.push([...words.slice(0, -1), plural(last)].join(' '));
  }
  return out;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function makeAutolinker(entries) {
  // surface (lowercase) -> entry, longest surface wins.
  const bySurface = new Map();
  for (const g of entries) {
    if (!AUTOLINK.has(g.slug)) continue;
    // A term wrapped in parentheses ("Coinsurance (health)") isn't matchable
    // as written; use its short label instead.
    const base = g.term.includes('(') && g.label ? g.label : g.term;
    for (const s of surfaces(base)) {
      const key = s.toLowerCase();
      if (!bySurface.has(key)) bySurface.set(key, { g, surface: s });
    }
  }
  const keys = [...bySurface.keys()].sort((a, b) => b.length - a.length || a.localeCompare(b));
  if (!keys.length) return (html) => html;
  const re = new RegExp(
    '(?<![\\p{L}\\p{N}])(' + keys.map(escapeRe).join('|') + ')(?![\\p{L}\\p{N}])',
    'giu'
  );

  return function link(html, page, used) {
    // The glossary page lists every term in its own heading and definition;
    // linking there would be noise, and a term must never link to itself.
    if (page === 'glossary/') return html;
    const seen = used || new Set();
    const stack = [];

    const inSkip = () => stack.some((e) => SKIP_TAGS.has(e.tag) || e.skip);
    const block = () => {
      for (let i = stack.length - 1; i >= 0; i--) if (BLOCK_TAGS.has(stack[i].tag)) return stack[i];
      return null;
    };

    const text = (chunk) => {
      if (!chunk || inSkip()) return chunk;
      return chunk.replace(re, (m) => {
        const entry = bySurface.get(m.toLowerCase());
        if (!entry || seen.has(entry.g.slug)) return m;
        const b = block();
        if (b && b.count >= MAX_PER_BLOCK) return m;
        if (b) b.count++;
        seen.add(entry.g.slug);
        const href = relUrl(page, `/glossary/#${entry.g.slug}`);
        return `<a class="term" href="${href}" data-term="${entry.g.slug}" data-auto="1">${esc(m)}</a>`;
      });
    };

    let out = '';
    let i = 0;
    while (i < html.length) {
      const lt = html.indexOf('<', i);
      if (lt === -1) {
        out += text(html.slice(i));
        break;
      }
      out += text(html.slice(i, lt));
      const gt = html.indexOf('>', lt);
      if (gt === -1) {
        out += html.slice(lt);
        break;
      }
      const tag = html.slice(lt, gt + 1);
      out += tag;
      if (tag.startsWith('<!')) {
        i = gt + 1;
        continue;
      }
      const m = /^<\s*(\/?)\s*([a-zA-Z0-9]+)/.exec(tag);
      if (m) {
        const name = m[2].toLowerCase();
        if (m[1]) {
          for (let k = stack.length - 1; k >= 0; k--) {
            if (stack[k].tag === name) {
              stack.length = k;
              break;
            }
          }
        } else if (!tag.endsWith('/>') && !VOID_TAGS.has(name)) {
          // role="img" regions (the sample declarations page) are decorative:
          // a link inside one would be focusable content in an image role.
          const skip = /\brole\s*=\s*("|')?img\b/i.test(tag);
          stack.push({ tag: name, count: 0, skip });
        }
      }
      i = gt + 1;
    }
    return out;
  };
}
