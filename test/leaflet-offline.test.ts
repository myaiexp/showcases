// Leaflet examples stay offline: no plain tile layers, no fetch, no URLs off *.example hosts
import { describe, expect, it } from 'vitest';
import { exampleSources } from './example-sources.ts';

/**
 * The plain classes would request their URLs from the network, even an unresolvable one;
 * LocalTileLayer and LocalWMSTileLayer answer them in the page. A URL in a string is fine only
 * on a .example host (the pretend servers); any other could become a request or a link out of
 * a card. XML namespace URIs are allowed. meta.ts files are skipped: they hold no running code.
 */
describe('leaflet examples make no network requests', () => {
  const files = exampleSources('leaflet');

  it.each(files)('%s', (_name, src) => {
    const code = src.replace(/^\s*\/\/.*$/gm, '');
    expect(code).not.toMatch(/\bnew\s+(?:L\.)?(?:TileLayer|WMSTileLayer)\s*\(/);
    expect(code).not.toMatch(/\bfetch\s*\(/);
    // XML namespace URIs (createElementNS) name a vocabulary; nothing requests them.
    const plain = code.replace(/['"`]http:\/\/www\.w3\.org\/(?:2000\/svg|1999\/xhtml|1999\/xlink)['"`]/g, "''");
    for (const m of plain.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
      const host = (m[1] ?? '').toLowerCase();
      expect(host === 'example' || host.endsWith('.example'), `${m[0]} is not a .example host`).toBe(true);
    }
  });
});
