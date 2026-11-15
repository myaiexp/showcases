// Leaflet examples stay offline: no plain tile layers, no fetch, no URLs off *.example hosts
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(import.meta.dirname, '../packages/leaflet/examples');

/** Every .ts file of every example, as [example/file, source]. */
function sources(): [string, string][] {
  const out: [string, string][] = [];
  for (const slug of readdirSync(ROOT)) {
    let files: string[];
    try {
      files = readdirSync(join(ROOT, slug));
    } catch {
      continue;
    }
    for (const f of files) if (f.endsWith('.ts')) out.push([`${slug}/${f}`, readFileSync(join(ROOT, slug, f), 'utf8')]);
  }
  return out;
}

/**
 * The plain classes would request their URLs from the network, even an unresolvable one;
 * LocalTileLayer and LocalWMSTileLayer answer them in the page. A URL in a string is fine only
 * on a .example host (the pretend servers); any other could become a request or a link out of
 * a card. meta.ts files are skipped: they hold no running code.
 */
describe('leaflet examples make no network requests', () => {
  const files = sources().filter(([name]) => !name.endsWith('/meta.ts'));

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bnew\s+(?:L\.)?(?:TileLayer|WMSTileLayer)\s*\(/);
    expect(code).not.toMatch(/\bfetch\s*\(/);
    for (const m of code.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
      const host = (m[1] ?? '').toLowerCase();
      expect(host === 'example' || host.endsWith('.example'), `${m[0]} is not a .example host`).toBe(true);
    }
  });
});
