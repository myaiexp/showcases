// globe.gl examples stay offline: no fetch, no URLs, images painted in code
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(import.meta.dirname, '../packages/globe-gl/examples');

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
 * globe.gl's image props (globeImageUrl, bumpImageUrl, backgroundImageUrl, the tile engine)
 * load whatever URL they get, so a URL anywhere in an example could become a request from a
 * card. Images come from shared/textures.ts and shared/tiles.ts as blob: and data: URLs
 * instead. XML namespace URIs are allowed. meta.ts files are skipped: they hold no running code.
 */
describe('globe.gl examples make no network requests', () => {
  const files = sources().filter(([name]) => !name.endsWith('/meta.ts'));

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bfetch\s*\(/);
    expect(code).not.toMatch(/\bXMLHttpRequest\b/);
    expect(code).not.toMatch(/\bnew\s+(?:THREE\.)?(?:FontLoader|GLTFLoader|FileLoader)\b/);
    const plain = code.replace(/['"`]http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)['"`]/g, "''");
    expect(plain).not.toMatch(/https?:\/\//i);
    // Protocol-relative URLs, the README's own script-tag form.
    expect(plain).not.toMatch(/['"`]\/\/[a-z0-9-]+\./i);
  });
});
