// A-Frame examples stay offline: no URLs, no fetch, models and images made in code
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(import.meta.dirname, '../packages/aframe/examples');

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
 * A-Frame loads whatever a src, gltf-model, obj-model, sound or font names, so a URL in an
 * example would become a request from a card. The iframe's guard (shared/net.ts) throws at
 * runtime; this catches it before then. Images come from shared/images.ts (data: URLs),
 * models from shared/models.ts (blob: URLs). meta.ts files are skipped: they hold no
 * running code.
 */
describe('A-Frame examples make no network requests', () => {
  const files = sources().filter(([name]) => !name.endsWith('/meta.ts'));

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bfetch\s*\(/);
    expect(code).not.toMatch(/\bXMLHttpRequest\b/);
    expect(code).not.toMatch(/\bimport\s*\(\s*['"`]aframe['"`]|from\s+['"`]aframe['"`]/);
    const plain = code.replace(/['"`]http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)['"`]/g, "''");
    expect(plain).not.toMatch(/https?:\/\//i);
    expect(plain).not.toMatch(/['"`=]\/\/[a-z0-9-]+\./i);
  });
});
