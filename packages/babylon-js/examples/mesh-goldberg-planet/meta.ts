// babylon-js example: Goldberg polyhedron planet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Goldberg polyhedron planet',
  summary:
    'CreateGoldberg with m and n sliders, painted with setGoldbergFaceColors ranges: the twelve pentagonal poles, the hexagons nearest each pole found with relatedGoldbergFace, and ocean for the rest. A cone tree sits on each pole via placeOnGoldbergFaceAt; goldbergData gives the face counts.',
  section: 'Mesh',
  tags: ['CreateGoldberg', 'setGoldbergFaceColors', 'relatedGoldbergFace', 'placeOnGoldbergFaceAt', 'goldbergData'],
  docs: ['repo/content/features/featuresDeepDive/mesh/creation/polyhedra/goldberg_poly.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
