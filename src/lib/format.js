// Small helpers shared by every page: escaping, relative links and the
// inline text format used in content files.
//
// Inline format (kept deliberately tiny):
//   **bold**                 -> <strong>
//   [[deductible]]           -> glossary term link (label = term name)
//   [[deductible|your deductible]] -> glossary term link with custom label
//   [label](/personal/home/) -> internal link, rewritten to a relative URL
//   [label](https://...)     -> external link

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Turn a site-absolute path ("/glossary/#x") into a path relative to the
// page being rendered ("personal/home/"), so the output works on any host,
// including GitHub Pages project sites that live under a sub-path.
export function relUrl(fromPage, to) {
  if (/^(https?:|mailto:|#)/.test(to)) return to;
  const depth = fromPage.split('/').filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  const target = to.replace(/^\//, '');
  return prefix + target;
}

export function makeFormatter({ page, glossary, onTerm, onLink }) {
  return function fmt(text) {
    if (text == null) return '';
    let s = esc(text);
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, slug, label) => {
      const g = glossary.get(slug);
      if (!g) throw new Error(`Unknown glossary term "${slug}" on page ${page}`);
      onTerm && onTerm(slug);
      const href = relUrl(page, `/glossary/#${slug}`);
      return `<a class="term" href="${href}" data-term="${slug}">${label || g.label || g.term.toLowerCase()}</a>`;
    });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const raw = href.replace(/&amp;/g, '&');
      onLink && onLink(raw);
      if (/^https?:/.test(raw)) {
        return `<a href="${esc(raw)}" rel="noopener">${label}</a>`;
      }
      return `<a href="${relUrl(page, raw)}">${label}</a>`;
    });
    return s;
  };
}
