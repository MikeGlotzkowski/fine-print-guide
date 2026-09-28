// Small progressive enhancements. Every page works without this script:
// term links go to the glossary, the filter is simply hidden, and search
// falls back to a list of all topics.
(function () {
  'use strict';

  var root = document.body.getAttribute('data-root') || './';

  // ---------------------------------------------------------- open by hash
  // Links like /is-it-covered/#deer should land on an opened item.
  function openTarget() {
    if (!location.hash) return;
    var el;
    try { el = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { return; }
    if (!el) return;
    var d = el.tagName === 'DETAILS' ? el : el.querySelector('details') || el.closest('details');
    if (d) d.open = true;
  }
  openTarget();
  window.addEventListener('hashchange', openTarget);

  // Print everything, including folded sections.
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('details').forEach(function (d) { d.open = true; });
  });

  // ---------------------------------------------------------- open/close all
  document.querySelectorAll('.parts').forEach(function (group) {
    var items = group.querySelectorAll('details');
    if (items.length < 3) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'expand-all';
    btn.textContent = 'Open all';
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      items.forEach(function (d) { d.open = open; });
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close all' : 'Open all';
    });
    group.parentNode.insertBefore(btn, group);
  });

  // ---------------------------------------------------------- term definitions
  var dataEl = document.getElementById('term-data');
  var terms = dataEl ? JSON.parse(dataEl.textContent) : {};
  var pop = null;
  var opener = null;

  function closePop(returnFocus) {
    if (!pop) return;
    pop.remove();
    pop = null;
    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      if (returnFocus) opener.focus();
    }
    opener = null;
  }

  function showPop(link) {
    var slug = link.getAttribute('data-term');
    var t = terms[slug];
    if (!t) return false;
    var same = opener === link;
    closePop(false);
    if (same) return true;

    pop = document.createElement('div');
    pop.className = 'term-pop';
    pop.id = 'term-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t.term);
    pop.tabIndex = -1;

    var title = document.createElement('p');
    title.className = 'tp-term';
    title.textContent = t.term;
    var def = document.createElement('p');
    def.textContent = t.def.replace(/\*\*/g, '').replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, function (_, s, l) { return l || s.replace(/-/g, ' '); });
    var more = document.createElement('p');
    var a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.textContent = 'More in the glossary';
    more.appendChild(a);
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'tp-close';
    close.setAttribute('aria-label', 'Close definition');
    close.textContent = '×';
    close.addEventListener('click', function () { closePop(true); });

    pop.appendChild(close);
    pop.appendChild(title);
    pop.appendChild(def);
    pop.appendChild(more);
    document.body.appendChild(pop);

    var r = link.getBoundingClientRect();
    var w = pop.offsetWidth;
    var left = Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - w - 12);
    pop.style.left = Math.max(window.scrollX + 12, left) + 'px';
    pop.style.top = window.scrollY + r.bottom + 6 + 'px';

    opener = link;
    link.setAttribute('aria-expanded', 'true');
    pop.focus();
    return true;
  }

  document.querySelectorAll('a.term').forEach(function (link) {
    if (terms[link.getAttribute('data-term')]) {
      link.setAttribute('aria-expanded', 'false');
      link.setAttribute('aria-controls', 'term-pop');
    }
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a.term');
    if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && terms[link.getAttribute('data-term')]) {
      e.preventDefault();
      showPop(link);
      return;
    }
    if (pop && !pop.contains(e.target)) closePop(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pop) closePop(true);
  });

  // ---------------------------------------------------------- scenario filter
  var filter = document.querySelector('.filter:not(.gl-filter)');
  if (filter) {
    filter.hidden = false;
    var input = filter.querySelector('input');
    var chips = filter.querySelectorAll('.chip');
    var count = filter.querySelector('.filter-count');
    var items = document.querySelectorAll('.scenario');
    var area = '';

    var apply = function () {
      var words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (li) {
        var text = li.getAttribute('data-text');
        var ok = (!area || li.getAttribute('data-area') === area) &&
          words.every(function (w) { return text.indexOf(w) !== -1; });
        li.hidden = !ok;
        if (ok) shown++;
      });
      document.querySelectorAll('.sc-group').forEach(function (g) {
        g.hidden = !g.querySelector('.scenario:not([hidden])');
      });
      count.textContent = '';
      if (shown === 0) {
        count.append('No matching examples. Try another word, or ');
        var a = document.createElement('a');
        a.href = root + 'search/?q=' + encodeURIComponent(input.value.trim());
        a.textContent = 'search the whole site';
        count.append(a, '.');
      } else {
        count.textContent = shown === items.length ? items.length + ' examples' : 'Showing ' + shown + ' of ' + items.length + ' examples';
      }
    };
    input.addEventListener('input', apply);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        area = chip.getAttribute('data-area');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        apply();
      });
    });
    apply();
  }

  // ---------------------------------------------------------- glossary filter
  var glFilter = document.querySelector('.gl-filter');
  if (glFilter) {
    glFilter.hidden = false;
    var glInput = glFilter.querySelector('input');
    var glCount = glFilter.querySelector('.filter-count');
    var entries = document.querySelectorAll('.gl-entry');
    var az = document.querySelector('.az');
    glInput.addEventListener('input', function () {
      var q = glInput.value.toLowerCase().trim();
      var shown = 0;
      entries.forEach(function (e) {
        var ok = !q || e.textContent.toLowerCase().indexOf(q) !== -1;
        e.hidden = !ok;
        if (ok) shown++;
      });
      document.querySelectorAll('.az-section').forEach(function (sec) {
        sec.hidden = !sec.querySelector('.gl-entry:not([hidden])');
      });
      az.hidden = !!q;
      glCount.textContent = q ? (shown ? shown + (shown === 1 ? ' term' : ' terms') : 'No matching terms.') : '';
    });
  }

  // ---------------------------------------------------------- site search
  var results = document.getElementById('search-results');
  if (results) {
    var qInput = document.getElementById('search-q');
    var status = document.getElementById('search-status');
    var fallback = document.querySelector('.search-fallback');
    var index = null;
    var params = new URLSearchParams(location.search);
    qInput.value = params.get('q') || '';

    var esc = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    };

    var run = function () {
      var q = qInput.value.toLowerCase().trim();
      results.innerHTML = '';
      if (!q) { status.textContent = ''; fallback.hidden = false; return; }
      var words = q.split(/\s+/).filter(function (w) { return w.length > 1 || q.length === 1; });
      var scored = [];
      index.forEach(function (item) {
        var t = item.t.toLowerCase(), d = (item.d || '').toLowerCase(), x = (item.x || '').toLowerCase();
        var score = 0, all = true;
        words.forEach(function (w) {
          var s = 0;
          if (t.indexOf(w) !== -1) s += t.indexOf(w) === 0 ? 12 : 8;
          if (d.indexOf(w) !== -1) s += 3;
          if (x.indexOf(w) !== -1) s += 1;
          if (!s) all = false;
          score += s;
        });
        if (all && score) {
          if (item.k === 'Policy' || item.k === 'Guide') score += 2;
          scored.push({ item: item, score: score, strong: score >= 3 * words.length });
        }
      });
      // Prefer results that match in the title or summary; only fall back
      // to keyword-only matches when there's nothing better.
      if (scored.some(function (r) { return r.strong; })) scored = scored.filter(function (r) { return r.strong; });
      scored.sort(function (a, b) { return b.score - a.score; });
      var top = scored.slice(0, 25);
      fallback.hidden = top.length > 0;
      status.textContent = top.length ? top.length + (top.length === 1 ? ' result' : ' results') + ' for "' + qInput.value.trim() + '"' :
        'Nothing found for "' + qInput.value.trim() + '". Try a simpler word, like "water" or "car".';
      results.innerHTML = top.map(function (r) {
        return '<li><span class="sr-kind">' + esc(r.item.k) + '</span><a class="sr-title" href="' + root + esc(r.item.u) + '">' +
          esc(r.item.t) + '</a><span class="sr-desc">' + esc(r.item.d || '') + '</span></li>';
      }).join('');
    };

    fetch(root + 'search.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data;
        run();
        qInput.addEventListener('input', function () {
          run();
          var url = new URL(location.href);
          if (qInput.value.trim()) url.searchParams.set('q', qInput.value.trim()); else url.searchParams.delete('q');
          history.replaceState(null, '', url);
        });
      })
      .catch(function () { status.textContent = 'Search could not load. Browse all topics below.'; });

    document.querySelector('.search-page').addEventListener('submit', function (e) { e.preventDefault(); if (index) run(); });
  }
})();
