// playcanvas example: 2D blend trees
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '2D blend trees',
  summary:
    "A blend tree can read two parameters and place its clips on a plane. An idle at the origin and four torso leans at the compass points are blended by moveX and moveZ, which a draggable pad sets. The tree type switches between Cartesian and Directional, which compares points by angle and length.",
  section: 'Animation',
  tags: ['ANIM_BLEND_2D_CARTESIAN', 'ANIM_BLEND_2D_DIRECTIONAL', 'blendTree', 'parameters', 'setFloat', 'loadStateGraph', 'assignAnimation'],
  docs: ['repo/docs/user-manual/animation/blend-trees.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
