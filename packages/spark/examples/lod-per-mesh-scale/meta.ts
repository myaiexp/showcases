// Spark example: SplatMesh.lodScale biasing one shared LoD budget between objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-object lodScale',
  summary:
    'Two copies of the same knot, each given an LoD tree with createLodSplats(), drawn from a single small lodSplatCount budget. SplatMesh.lodScale tells the LoD traversal how much finer (above 1) or coarser (below 1) one object should be relative to the rest, so the budget shifts: the knot with the high lodScale stays crisp while the other breaks into large splats.',
  section: 'Level-of-Detail',
  tags: ['lodScale', 'SplatMesh', 'lodSplatCount', 'createLodSplats'],
  docs: ['repo/docs/docs/lod-getting-started.md', 'repo/docs/docs/splat-mesh.md', 'repo/docs/docs/new-features-2.0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
