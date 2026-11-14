// Spark example: two SparkRenderers rendering different splat sets in split panes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two renderers, two splat sets',
  summary:
    'Spark 2.0 lets several SparkRenderers share one scene, each with its own viewpoint, settings and splats. The left half is the default renderer drawing a torus knot; the right half is a second SparkRenderer with falloff 0 and a lower maxStdDev, called as spark.render(scene, camera), drawing a butterfly. Each camera’s layers decide which SplatMesh objects its renderer sees, and a checkbox lets the right pane see the knot as well.',
  section: 'New Features in 2.0',
  tags: ['SparkRenderer', 'render', 'layers', 'viewpoint', 'multiple renderers', 'falloff'],
  docs: [
    'repo/docs/docs/new-features-2.0.md',
    'repo/docs/docs/new-spark-renderer.md',
    'repo/docs/docs/0.1-2.0-migration-guide.md',
    'repo/docs/docs/spark-renderer.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
