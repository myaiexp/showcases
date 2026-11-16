// Leafer UI examples stay offline: no fetch, no URLs, image urls from shared/images.ts only
import { describe, expect, it } from 'vitest';
import { exampleSources } from './example-sources.ts';

/**
 * Cards must never touch the network. The docs load images, videos and films from their own
 * site (`url: '/image/leafer.jpg'`); here every image is painted in code by
 * packages/leafer-ui/shared/images.ts, so a string literal after `url:` is always a leak.
 * XML namespace URIs inside SVG markup are allowed.
 */
describe('leafer-ui examples make no network requests', () => {
  const files = exampleSources('leafer-ui');

  it('finds the examples', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bfetch\s*\(/);
    expect(code).not.toMatch(/\bXMLHttpRequest\b/);
    expect(code).not.toMatch(/\burl\s*:\s*['"`](?!data:)/);
    expect(code).not.toMatch(/\.src\s*=\s*['"`](?!data:)/);
    const plain = code.replace(/http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)/g, '');
    expect(plain).not.toMatch(/https?:\/\//i);
    expect(plain).not.toMatch(/['"`]\/\/[a-z0-9-]+\./i);
  });
});
