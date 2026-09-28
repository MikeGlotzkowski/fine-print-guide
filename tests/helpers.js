import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// All built HTML pages as { file, url } where url is the site path ("personal/home/").
export function htmlPages() {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === 'index.html') out.push({ file: full, url: path.relative(DIST, dir).split(path.sep).join('/') + (dir === DIST ? '' : '/') });
    }
  };
  walk(DIST);
  return out.sort((a, b) => a.url.localeCompare(b.url));
}
