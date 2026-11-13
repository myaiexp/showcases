// Spark example: SparkRenderer.sortRadial radial against z-depth sorting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sortRadial under fast turns',
  summary:
    'The camera sits inside two rings of splat pillars, bright ones near and pale ones far, and swings quickly left and right. SparkRenderer.sortRadial sorts by distance from the viewpoint, which stays valid as the view rotates; setting it false sorts by z-depth, which goes stale on a fast turn until the next sort lands, so splats near the screen edges are missing or blended in the wrong order (the docs’ black side bars). A longer minSortIntervalMs exaggerates the lag.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'sortRadial', 'minSortIntervalMs', 'sorting'],
  docs: ['repo/docs/docs/spark-renderer.md', 'repo/docs/docs/0.1-2.0-migration-guide.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
