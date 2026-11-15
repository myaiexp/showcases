// tsl-textures example: Water drops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Water drops',
  summary:
    'waterDrops() on a normalNode: drops or frost as relief only, so the material gets a flat blue colour for the lighting to work on. Scale, drop density, bump height and the seed are live. Needs vertex tangents, which the example computes.',
  section: 'Textures',
  tags: ['waterDrops', 'normalNode', 'density', 'bump', 'tangents'],
  docs: ['repo/docs/water-drops.md', 'repo/src/water-drops.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
