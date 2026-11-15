// tsl-textures example: Rough clay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rough clay',
  summary:
    'roughClay() on a normalNode: it moves no vertices and has no colour, only the lighting of clay strokes, so the material gets a flat clay colour. Scale, bump, stroke curvature and the seed are live. Needs vertex tangents, which the example computes.',
  section: 'Textures',
  tags: ['roughClay', 'normalNode', 'bump', 'curvature', 'tangents'],
  docs: ['repo/docs/rough-clay.md', 'repo/src/rough-clay.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
