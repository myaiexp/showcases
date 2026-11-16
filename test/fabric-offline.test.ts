// Fabric.js examples stay offline: no fetch, no URLs, pictures painted in code
import { describe, expect, it } from 'vitest';
import { exampleSources } from './example-sources.ts';

/**
 * Fabric loads whatever URL its loaders get (FabricImage.fromURL, setSrc, loadSVGFromURL,
 * loadFromJSON with image `src`s), so a URL in an example becomes a request from a card. The
 * guides load pug.jpg and friends from fabricjs.com; here pictures come from shared/images.ts as
 * canvases and data: URLs, and SVG is written as strings. XML namespace URIs are allowed.
 * meta.ts files are skipped: they hold no running code.
 */
describe('fabric examples make no network requests', () => {
  const files = exampleSources('fabric');

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bfetch\s*\(/);
    expect(code).not.toMatch(/\bXMLHttpRequest\b/);
    const plain = code.replace(/['"`]http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)['"`]/g, "''");
    expect(plain).not.toMatch(/https?:\/\//i);
    expect(plain).not.toMatch(/['"`]\/\/[a-z0-9-]+\./i);
    // A literal path handed to a loader is a request to the gallery's own host.
    expect(plain).not.toMatch(/\b(?:fromURL|setSrc|loadSVGFromURL)\(\s*['"`](?!data:|blob:)/);
  });
});
