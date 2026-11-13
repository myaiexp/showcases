// Spark example: SplatMesh lod: true on decoded splat bytes, with a lodSplatCount budget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LoD on load with a splat budget',
  summary:
    'A 400,000-splat terrain is encoded to .spz bytes with writeSpz and loaded back through fileBytes with lod: true, so the loader builds a level-of-detail tree in a background worker, as it would for a file. Each frame Spark picks the best cut through the tree within lodSplatCount splats: drag the budget down and far hills merge into fewer, larger splats. The full view can load butterfly.spz the same way.',
  section: 'Level-of-Detail',
  tags: ['lod', 'lodSplatCount', 'fileBytes', 'writeSpz', 'lodSplats'],
  docs: ['repo/docs/docs/lod-getting-started.md', 'repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/spark-renderer.md', 'repo/docs/docs/loading-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
