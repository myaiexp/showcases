// Spark example: keeping originals beside the LoD tree, switched with enableLod
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching LoD and original splats',
  summary:
    'createLodSplats() builds the tree and, like nonLod: true for a file, keeps the original splats: they stay in packedSplats and the tree goes in packedSplats.lodSplats. enableLod left undefined renders the tree once it exists; true forces the tree, false forces every original splat. Switching is instant because nothing is rebuilt, and the drawn count shows the difference.',
  section: 'Level-of-Detail',
  tags: ['nonLod', 'enableLod', 'lodSplats', 'createLodSplats'],
  docs: ['repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/splat-mesh.md', 'repo/docs/docs/new-spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
