// tsl-textures example: Halftone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Halftone',
  summary:
    "halftone() on colorNode: keeps dots of the surface and discards the rest in screen space, with scale, radius, the pattern index, attenuation, near and far and the docs page's three snapshots.",
  section: 'Textures',
  tags: ['halftone', 'colorNode', 'discard', 'pattern', 'attenuation', 'screenCoordinate'],
  docs: ['repo/docs/halftone.md', 'repo/src/halftone.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
