// Spark example: editing original splats and rebuilding with createLodSplats()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Re-creating the LoD tree after edits',
  summary:
    'A terrain gets its LoD tree from createLodSplats(), which keeps the original splats around. Each crater sets opacity 0 inside a circle and scorches a ring around it with forEachSplat and setSplat on the originals, then awaits packedSplats.createLodSplats() to rebuild the tree in the background and swap it in.',
  section: 'LoD Deep Dive',
  tags: ['createLodSplats', 'nonLod', 'setSplat', 'forEachSplat', 'lodSplats'],
  docs: ['repo/docs/docs/new-spark-renderer.md', 'repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
