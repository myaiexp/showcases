// Spark example: many SplatMesh instances of one LoD tree under one splat budget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One budget across many LoD trees',
  summary:
    'Twenty-five SplatMeshes all point at the same PackedSplats, given one LoD tree with createLodSplats(). The LoD traversal starts from every instance’s root at once and spends one lodSplatCount budget on whichever splats are largest on screen, so as the camera glides over the field the nearby knots sharpen and the distant ones stay coarse.',
  section: 'LoD Deep Dive',
  tags: ['PackedSplats', 'createLodSplats', 'lodSplatCount', 'multi-tree traversal'],
  docs: ['repo/docs/docs/new-spark-renderer.md', 'repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/loading-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
