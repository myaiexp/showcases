// playcanvas example: A direct blend tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A direct blend tree',
  summary:
    "A direct blend tree has one parameter per child and no points: each clip's weight is its parameter divided by the sum of them all. Four sliders mix idle, walk, wave and a lean by hand on one creature, and the normalised shares are printed.",
  section: 'Animation',
  tags: ['ANIM_BLEND_DIRECT', 'blendTree', 'parameters', 'setFloat', 'loadStateGraph', 'assignAnimation'],
  docs: ['repo/docs/user-manual/animation/blend-trees.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
