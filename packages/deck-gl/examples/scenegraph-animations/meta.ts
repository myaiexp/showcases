// deck-gl example: ScenegraphLayer: glTF Animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScenegraphLayer: glTF Animations',
  summary:
    'The experimental _animations prop playing a rotation animation written into a glTF in code: the "*" key targets every animation, with playing and speed set per key, and Deck _animate keeps frames coming.',
  section: 'Mesh layers',
  tags: ['ScenegraphLayer', '_animations', '_animate', 'scenegraph'],
  docs: ['repo/docs/api-reference/mesh-layers/scenegraph-layer.md', 'repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
