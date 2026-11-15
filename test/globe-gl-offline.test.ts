// globe.gl examples stay offline: no fetch, no URLs, images painted in code
import { describe, expect, it } from 'vitest';
import { exampleSources } from './example-sources.ts';

/**
 * globe.gl's image props (globeImageUrl, bumpImageUrl, backgroundImageUrl, the tile engine)
 * load whatever URL they get, so a URL anywhere in an example could become a request from a
 * card. Images come from shared/textures.ts and shared/tiles.ts as blob: and data: URLs
 * instead. XML namespace URIs are allowed. meta.ts files are skipped: they hold no running code.
 */
describe('globe.gl examples make no network requests', () => {
  const files = exampleSources('globe-gl');

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
