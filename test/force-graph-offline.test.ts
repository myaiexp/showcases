// force-graph examples stay offline: no fetch, no URLs, images drawn in code
import { describe, expect, it } from 'vitest';
import { exampleSources } from './example-sources.ts';

/**
 * Cards must never touch the network. Image nodes and textures are drawn in code, and
 * graph data is built in the page. XML namespace URIs are allowed.
 */
describe('force-graph examples make no network requests', () => {
  const files = exampleSources('force-graph');

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bfetch\s*\(/);
    expect(code).not.toMatch(/\bXMLHttpRequest\b/);
    expect(code).not.toMatch(/\bnew\s+(?:THREE\.)?(?:TextureLoader|FontLoader|GLTFLoader|FileLoader|ImageLoader)\b/);
    const plain = code.replace(/['"`]http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)['"`]/g, "''");
    expect(plain).not.toMatch(/https?:\/\//i);
    // Protocol-relative URLs, the README's own script-tag form.
    expect(plain).not.toMatch(/['"`]\/\/[a-z0-9-]+\./i);
  });
});
